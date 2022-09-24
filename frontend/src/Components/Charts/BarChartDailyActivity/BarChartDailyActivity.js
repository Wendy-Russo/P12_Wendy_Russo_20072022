import React, { useEffect } from 'react';
import { create, schemeBuGn, select, arc } from 'd3';
import { PropTypes } from "prop-types";
import { makeArray } from '../../../Utils/makeArray';



const MAX_BAR_HEIGHT = 150;
const WIDTH = 750;
const HEIGHT = 250;
const MARGIN_Y = 30;
const KG_CAl_SPACING = 10;
const GRAPH_WITH = 700;
const BAR_WIDTH = 7;

/**
 * Creates a barChart for daily weight and burned calories, with tooltip and legend (see maquette)
 * @param {object} props - must contain a "sessions" array proprety containing "calories" and "kilogram" sub propreties
 * @returns {object} returns the created JSX object 
 */
function BarChartDailyActivity(props) {
  
  const SESSIONS = props.sessions;

  if(!document.querySelector(".barChart-svg") && (SESSIONS)){

    const calorieMax = Math.max( ...SESSIONS.map(AVG => AVG.calories));
    const kgMax = Math.max( ...SESSIONS.map(AVG => AVG.kilogram));
    const kgMin = Math.min( ...SESSIONS.map(AVG => AVG.kilogram)) -1;

    const KG_RANGE = kgMax - kgMin;
    const KG_SCALE = MAX_BAR_HEIGHT / KG_RANGE;

    const BAR_NUMBER = SESSIONS.length;
    const BAR_SPACING = GRAPH_WITH / BAR_NUMBER;

    const SVG = select(".barChart-container ")
      .append("svg")
      .attr("class","barChart-svg chart")
      .attr("height","100%")
      .attr("width","100%")
      .attr("viewBox",`${0} ${-HEIGHT} ${WIDTH} ${HEIGHT}`)
      .style("background","#FBFBFB")
      .style("border-radius","5px")

    const LEGEND = SVG
      .append("g")
      .attr("class","barChart-legend")

    LEGEND
      .selectAll("line")
      .data(makeArray(3))
      .join("line")
      .attr("class","dashed stroke-light-grey" )
      .attr("x1","0")
      .attr("y1", (elem, id) => -id * (MAX_BAR_HEIGHT*0.5) -MARGIN_Y)
      .attr("x2",GRAPH_WITH)
      .attr("y2", (elem, id) => -id * (MAX_BAR_HEIGHT*0.5) -MARGIN_Y)

    LEGEND
      .selectAll("text.poids")
      .data(makeArray(3))
      .join("text")
      .attr("class","poids fw-500 fs-14")
      .attr("x", GRAPH_WITH + (WIDTH - GRAPH_WITH) * 0.3 )
      .attr("y", (elem, id) => -id * (MAX_BAR_HEIGHT*0.5) - MARGIN_Y + 5)
      .text((elem,id) => (kgMin) + id * (KG_RANGE * 0.5))
      .attr("fill","#9B9EAC")

    LEGEND
      .selectAll("circle")
      .data(makeArray(2))
      .join("circle")
      .attr("class",(i,id) => id === 0 ? "fill-dark-red" : "dark-grey" )
      .attr("cx",(i,id) => WIDTH - 160 - id * 100)
      .attr("cy", -HEIGHT + 20)
      .attr("r" , 4)

    LEGEND
      .selectAll("text.color")
      .data(makeArray(2))
      .join("text")
      .attr("class","color fw-500 fs-14")
      .attr("x",(i,id) => WIDTH - 150 - id * 100)
      .attr("y", -HEIGHT + 25)
      .attr("fill","#74798C" )
      .text((i,id) => id === 0 ? "Calories brûlées (kCal)" : "Poids (kg)")

    LEGEND
      .append("text")
      .attr("class","title fw-500 fs-15")
      .attr("x", (BAR_SPACING * 0.5) - Math.abs(KG_CAl_SPACING) - (BAR_WIDTH*0.5))
      .attr("y", -HEIGHT + 25)
      .attr("fill","#20253A" )
      .text("Activité quotidienne")

    LEGEND
      .selectAll("text.days")
      .data(SESSIONS)
      .join("text")
      .attr("class","days text-center fw-500 fs-14")
      .attr("x",(i,id) => BAR_SPACING*0.5 + id * BAR_SPACING)
      .attr("y", - MARGIN_Y * 0.2 )
      .attr("fill", "#9B9EAC" )
      .text((i,id) => id + 1 )
    
    for (let KG_CAL_ID = 0; KG_CAL_ID < 2; KG_CAL_ID++) {
      for (let ROUND_ID = 0; ROUND_ID < 2; ROUND_ID++) {

        const GROUP = SVG
          .selectAll(`g.${KG_CAL_ID ? "kg" : "kCal"}`)
          .data(SESSIONS)
          .join("g")
          .attr("class",`${KG_CAL_ID ? "kg" : "kCal"}`)
          .attr("transform",`scale(1 -1)`)

        GROUP
          .append("line")
          .attr("class" , `stroke-dark-${KG_CAL_ID ? "grey" : "red"} stroke-${ROUND_ID ? "round" : "butt"}`)
          .attr("x1" , (elem, id) => ((id + 0.5) * BAR_SPACING) + (KG_CAL_ID ? -KG_CAl_SPACING : KG_CAl_SPACING))
          .attr("y1" , ROUND_ID ? (MARGIN_Y + 0.5 * BAR_WIDTH) : (MARGIN_Y))
          .attr("x2" , (elem, id) => ((id + 0.5) * BAR_SPACING) + (KG_CAL_ID ? -KG_CAl_SPACING : KG_CAl_SPACING))
          .attr("y2" , (elem, id) => (MARGIN_Y - BAR_WIDTH * 0.5) + (KG_CAL_ID ? ((elem.kilogram - kgMin) * KG_SCALE) : (elem.calories / calorieMax * MAX_BAR_HEIGHT)))
          .attr("stroke-width" , (elem) => KG_CAL_ID ? (elem.kilogram > kgMin ? BAR_WIDTH : 0 ) : BAR_WIDTH)
      }
    }

    //TOOLTIP

    const TOOLTIP = SVG
      .append("g")
      .attr("id","barChart-tooltip")
    
    const G = TOOLTIP
      .selectAll(".barChart_tooltip_group")
      .data(SESSIONS)
      .join("g")
      .attr("class","barChart_tooltip_group")
      .style("opacity", 0)     

    G
      .append("rect")
      .attr("class","tooltip_overlay fill-black-overlay")
      .attr("x",(elem,id) => id * BAR_SPACING )
      .attr("y",-MAX_BAR_HEIGHT - MARGIN_Y)
      .attr("width", BAR_SPACING)
      .attr("height", MAX_BAR_HEIGHT)

    G
      .append("rect")
      .attr("class","fill-dark-red")
      .attr("x", (elem,id) => (id + (id === 6 ? -0.6 : +1.1)) * BAR_SPACING )
      .attr("y", -MAX_BAR_HEIGHT - MARGIN_Y)
      .attr("width", BAR_SPACING * 0.5)
      .attr("height", 30)
      .attr("rx", 3)

    for (let ID = 0; ID < 2; ID++) {
      G
        .append("text")
        .attr("class","bar_tooltip_text text-center white fw-500 fs-10")
        .attr("x", (elem,id) => (id + (id === 6 ? -0.35 : +1.35)) * BAR_SPACING )
        .attr("y", -MAX_BAR_HEIGHT - MARGIN_Y - (ID ? -13 : -25))
        .text( (elem,id) => (ID ? SESSIONS[id].kilogram  + " kg" : SESSIONS[id].calories + " Kcal" ))
    }

    TOOLTIP
      .selectAll(".barChart_tooltip_group")
        .on("mouseover",function(a){
          select(this).style("opacity",1)
        })
        .on("mouseout",function(a){
          select(this).style("opacity",0)
        })

    //__________STYLE__________//

    SVG
      .selectAll(".fill-black-overlay")
      .attr("fill", "rgba(0,0,0,0.2)")

    SVG
      .selectAll(".fill-dark-red")
      .attr("fill", "#E60000")

    SVG
      .selectAll(".stroke-dark-red")
      .attr("stroke", "#E60000")

      
    SVG
      .selectAll(".white")
      .attr("fill", "white")
      
    SVG
      .selectAll(".dark-grey")
      .attr("fill", "#282D30") 

    SVG
      .selectAll(".stroke-dark-grey")
      .attr("stroke", "#282D30")

    SVG
      .selectAll(".stroke-light-grey")
      .attr("stroke", "#dedede")
  }


  return(
    <div className="barChart-container">
    </div>
  )
}
BarChartDailyActivity.propTypes = {
  sessions: PropTypes.array
}

export default BarChartDailyActivity

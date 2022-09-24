import React from 'react';
import {select,create} from 'd3';
import { PropTypes } from "prop-types";

const WIDTH = 200;
const SPACING_DAYS = WIDTH / 7;
const HEIGHT = 200;
const GRAPH_HEIGHT = 130;
const MARGIN = 10;
const DAYS = [ "L" , "M" , "M" , "J" , "V" , "S" , "D" ]

/**
 * Creates a line chart for daily average session length, with tooltip and legend (see maquette)
 * @param {object} props - "props.average" must contain a "sessions" array proprety containing a "sessionLength" sub proprety
 * @returns {object} returns the created JSX object 
 */
function LineChart(props) {

  const AVERAGE = props.average;

  if(!document.querySelector("#lineChart-svg") && (AVERAGE)){

    const AVG_MAX = Math.max( ...AVERAGE.map(AVG => AVG.sessionLength));
    const AVG_MIN = Math.min( ...AVERAGE.map(AVG => AVG.sessionLength));
    const SCALE = -(GRAPH_HEIGHT / (AVG_MAX - AVG_MIN));
    const MARGIN_GRAPH = -AVG_MIN * SCALE - (HEIGHT - GRAPH_HEIGHT) * 0.5;
    
    const SVG = select(".lineChart-container")
      .append("svg")
      .attr("id","lineChart-svg")
      .attr("height","100%")
      .attr("width","100%")
      .attr("viewBox",`${0} ${-HEIGHT} ${WIDTH} ${HEIGHT}`)
      .style("background","red")
      .style("border-radius","5px")

    SVG
      .append("g")
      .append("path")
      .attr("d",`
        M${SPACING_DAYS * 0 } , ${ MARGIN_GRAPH + AVERAGE[0].sessionLength * SCALE}
        L${SPACING_DAYS * 0.5}, ${ MARGIN_GRAPH + AVERAGE[0].sessionLength * SCALE}
        C${SPACING_DAYS * 1 }   ${ MARGIN_GRAPH + AVERAGE[0].sessionLength * SCALE} , ${SPACING_DAYS * 1 } ${ MARGIN_GRAPH + AVERAGE[1].sessionLength * SCALE} , ${SPACING_DAYS * 1.5 } ${ MARGIN_GRAPH + AVERAGE[1].sessionLength * SCALE}
        C${SPACING_DAYS * 2 }   ${ MARGIN_GRAPH + AVERAGE[1].sessionLength * SCALE} , ${SPACING_DAYS * 2 } ${ MARGIN_GRAPH + AVERAGE[2].sessionLength * SCALE} , ${SPACING_DAYS * 2.5 } ${ MARGIN_GRAPH + AVERAGE[2].sessionLength * SCALE}
        C${SPACING_DAYS * 3 }   ${ MARGIN_GRAPH + AVERAGE[2].sessionLength * SCALE} , ${SPACING_DAYS * 3 } ${ MARGIN_GRAPH + AVERAGE[3].sessionLength * SCALE} , ${SPACING_DAYS * 3.5 } ${ MARGIN_GRAPH + AVERAGE[3].sessionLength * SCALE}
        C${SPACING_DAYS * 4 }   ${ MARGIN_GRAPH + AVERAGE[3].sessionLength * SCALE} , ${SPACING_DAYS * 4 } ${ MARGIN_GRAPH + AVERAGE[4].sessionLength * SCALE} , ${SPACING_DAYS * 4.5 } ${ MARGIN_GRAPH + AVERAGE[4].sessionLength * SCALE}
        C${SPACING_DAYS * 5 }   ${ MARGIN_GRAPH + AVERAGE[4].sessionLength * SCALE} , ${SPACING_DAYS * 5 } ${ MARGIN_GRAPH + AVERAGE[5].sessionLength * SCALE} , ${SPACING_DAYS * 5.5 } ${ MARGIN_GRAPH + AVERAGE[5].sessionLength * SCALE}
        C${SPACING_DAYS * 6 }   ${ MARGIN_GRAPH + AVERAGE[5].sessionLength * SCALE} , ${SPACING_DAYS * 6 } ${ MARGIN_GRAPH + AVERAGE[6].sessionLength * SCALE} , ${SPACING_DAYS * 6.5 } ${ MARGIN_GRAPH + AVERAGE[6].sessionLength * SCALE}
        L${SPACING_DAYS * 7 }   ${ MARGIN_GRAPH + AVERAGE[6].sessionLength * SCALE}
      `)
      .attr("stroke","white")
      .attr("stroke-width","2")
      .attr("fill","none")

    SVG
      .append("g")
      .attr("class"," lineChart-text text-center fs-12 fill-white")
      .selectAll("text")
      .data(DAYS)
      .join("text")
      .attr("x", (d,id) => (SPACING_DAYS*0.5) + SPACING_DAYS * (id) )
      .attr("y", -MARGIN)
      .text((d) => d)

    const TOOLTIP = SVG
      .append("g")
      .attr("transform",`scale(1 -1)`)
      .attr("class","lineBar_tooltip")

    const TOOLTIP_GROUPS = TOOLTIP
      .selectAll("g")
      .data(DAYS)
      .join("g")
      .attr("class","tooltip_group")
      .style("opacity",0)
    
    TOOLTIP_GROUPS
      .append("rect")
      .attr("x",(elem,id) =>  (id + 0.5) *SPACING_DAYS)
      .attr("y",0)
      .attr("width",WIDTH)
      .attr("height",HEIGHT)
      .style("opacity",0.2)

    for (let index = 0; index < 2; index++) {
      TOOLTIP_GROUPS
        .append("circle")
        .attr("class","fill-white")
        .attr("cx",(elem,id) => id *SPACING_DAYS + (0.5 * SPACING_DAYS))
        .attr("cy",(elem,id) => -(MARGIN_GRAPH + AVERAGE[id].sessionLength * SCALE))
        .attr("r", index ? 4 : 10)
        .attr("opacity", index ? 1 : 0.33 )
    }

    TOOLTIP_GROUPS
      .append("rect")
      .attr("class","fill-white")
      .attr("x",(elem,id) => id *SPACING_DAYS + (0.1 * SPACING_DAYS))
      .attr("y",(elem,id) => -(MARGIN_GRAPH + AVERAGE[id].sessionLength * SCALE) + ( 0.5 * SPACING_DAYS))
      .attr("width", 0.8 * SPACING_DAYS)
      .attr("height", 0.8 * SPACING_DAYS)
      .attr("rx",3)
  
    const TEXT = TOOLTIP_GROUPS
      .append("g")
      .attr("class","tooltip-text")
      .attr("transform",`scale(1 -1)`)

    for (let index = 0; index < 2; index++){
      TEXT
        .append("text")
        .attr("class","text-center fs-10")
        .attr("x",(elem,id) => id *SPACING_DAYS + 0.5 * SPACING_DAYS )
        .attr("y",(elem,id) => (MARGIN_GRAPH + AVERAGE[id].sessionLength * SCALE)- (( index ? 0.95 : 0.6) * SPACING_DAYS))
        .text((elem,id) => index ? AVERAGE[id].sessionLength : "min" )
    }     
    
    TOOLTIP
      .selectAll(".tooltip_group")
        .on("mouseover",function(a){
          select(this).style("opacity",1)
        })
        .on("mouseout",function(a){
          select(this).style("opacity",0)
        })    
  }

  return(
    <>
      <div className='lineChart-container square-chart'>
      </div>
    </>
  )  
}
LineChart.propTypes = {
  average: PropTypes.array
}

export default LineChart

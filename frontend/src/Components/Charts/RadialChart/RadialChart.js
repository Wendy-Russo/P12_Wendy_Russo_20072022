import React from 'react';
import { select, text} from 'd3';
import { PropTypes } from "prop-types";


const POLY_ANGLE = 2 * Math.PI / 6
const WIDTH = 200;
const HEIGHT = 200;
const TEXT_OFFSET_Y = 2.5;

/**
 * Creates a hexagon of the right size, must be used in an SVG path's "d" attribute
 * @param {number} reScale - will multiply the radius, usefull to scale the entire chart 
 * @param {number} radius - desired radius, in pixels
 * @returns {object} returns the created JSX object 
 */
function RegularHexagon(reScale,radius) {

  const SIZE = reScale * radius;
  return `
  M${Math.sin(POLY_ANGLE*4) * SIZE},${Math.cos(POLY_ANGLE*4) * SIZE}
  L${Math.sin(POLY_ANGLE*5) * SIZE},${Math.cos(POLY_ANGLE*5) * SIZE}
  L${Math.sin(POLY_ANGLE*6) * SIZE},${Math.cos(POLY_ANGLE*6) * SIZE}
  L${Math.sin(POLY_ANGLE*7) * SIZE},${Math.cos(POLY_ANGLE*7) * SIZE}
  L${Math.sin(POLY_ANGLE*8) * SIZE},${Math.cos(POLY_ANGLE*8) * SIZE}
  L${Math.sin(POLY_ANGLE*9) * SIZE},${Math.cos(POLY_ANGLE*9) * SIZE}
  Z`
}
RegularHexagon.propTypes = {
  radius: PropTypes.number,
  reScale: PropTypes.number
}

/**
 * Creates a radial (spider) chart for 6 types of performance , with a legend and no tooltip (see maquette)
 * @param {object} props - "props.perf.data" must be an array containing a "value" attribute for each performance type
 * @returns {object} returns the created JSX object 
 */
function RadialChart(props) {

  const P_DATA = props.perf;

  if(!document.querySelector("#radal-svg") && (P_DATA)){

    const MAX = Math.max( P_DATA[0].value, P_DATA[1].value, P_DATA[2].value, P_DATA[3].value, P_DATA[4].value, P_DATA[5].value)
    const SCALE = 0.36;

    const SCALE_1 = P_DATA[0].value / MAX * 200 * SCALE; //BOTTOM RIGHT
    const SCALE_2 = P_DATA[1].value / MAX * 200 * SCALE;  //TOP RIGHT
    const SCALE_3 = P_DATA[2].value / MAX * 200 * SCALE;  //TOP
    const SCALE_4 = P_DATA[3].value / MAX * 200 * SCALE;  //TOP LEFT 
    const SCALE_5 = P_DATA[4].value / MAX * 200 * SCALE;  //BOTTOM LEFT
    const SCALE_6 = P_DATA[5].value / MAX * 200 * SCALE;  //BOTTOM

    const SVG = select(".radalChart-container")
      .append("svg")
      .attr("id","radal-svg")
      .attr("height","100%")
      .attr("width","100%")
      .attr("viewBox",`${-WIDTH/2} ${-HEIGHT/2} ${WIDTH} ${HEIGHT}`)
      .style("background","#282D30")
      .style("border-radius","5px")


    SVG
      .append("g")
      .selectAll("path")
      .data([ 2 , 25 , 50 , 100 , 150 , 200])
      .join("path")
      .attr("d",(elem) => RegularHexagon(SCALE,elem))
      .attr("stroke","white")
      .attr("fill","none")
    
    SVG
      .append("g")
      .append("path")
      .attr("d",`
        M${Math.sin(POLY_ANGLE*4) * SCALE_1},${Math.cos(POLY_ANGLE*4) * SCALE_1}
        L${Math.sin(POLY_ANGLE*5) * SCALE_2},${Math.cos(POLY_ANGLE*5) * SCALE_2}
        L${Math.sin(POLY_ANGLE*6) * SCALE_3},${Math.cos(POLY_ANGLE*6) * SCALE_3}
        L${Math.sin(POLY_ANGLE*7) * SCALE_4},${Math.cos(POLY_ANGLE*7) * SCALE_4}
        L${Math.sin(POLY_ANGLE*8) * SCALE_5},${Math.cos(POLY_ANGLE*8) * SCALE_5}
        L${Math.sin(POLY_ANGLE*9) * SCALE_6},${Math.cos(POLY_ANGLE*9) * SCALE_6}
      `)
      .attr("fill","#FF0101B2")

    const TEXT = SVG
      .append("g")
      .attr("class","radialChart-text")
      .attr("opacity","0.9")
      .style("font-size","10")
      .style("font-weight","500")
      .style("text-align","center")
      .attr("text-anchor", "middle")
      .attr("fill", "white")

    const TEXT_SCALE_X = 95;
    const TEXT_SCALE_Y = 85;

    TEXT
      .selectAll("text")
      .data(["Cardio","Energie","Endurance","Force","Vitesse","Intensité"])
      .join("text")
      .attr("class","nutrient-description")
      .attr("dx",(elem,id) => Math.sin(POLY_ANGLE * (4 + id)) * TEXT_SCALE_X)
      .attr("dy",(elem,id) => Math.cos(POLY_ANGLE * (4 + id)) * TEXT_SCALE_Y + TEXT_OFFSET_Y)
      .text((elem) => elem)
      
  }

  return(
    <>
      <div className='radalChart-container square-chart'>
      </div>
    </>
  )
}
RadialChart.propTypes = {
  perf: PropTypes.array
}

export default RadialChart //193

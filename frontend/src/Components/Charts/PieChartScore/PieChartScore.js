import React, { useEffect } from 'react';
import { select, arc } from 'd3';
import { PropTypes } from "prop-types";

const WIDTH = 200;
const HEIGHT = 200;
const IN_RADIUS = 70;
const THICKNESS= 10;
const CIRCLE_Y = -IN_RADIUS -(THICKNESS/2);

/**
 * Creates a pie (donue) chart for the daily score, with a legend and no tooltip(see maquette)
 * @param {object} props - "props.score" must be a number between 0 and 1
 * @returns {object} returns the created JSX object 
 */
function PieChartScore(props) {

  const SCORE = props.score;

  if(!document.querySelector("#pie-svg") && SCORE){

    const ANGLE_PI = SCORE * Math.PI * 2;
    const ANGLE_DEG = SCORE * 360;

    const DONUT_PATH =  arc()
      .innerRadius(IN_RADIUS)         // This is the size of the donut hole
      .outerRadius(IN_RADIUS+THICKNESS)
      .startAngle(0)
      .endAngle(-ANGLE_PI)

    if(!document.querySelector("#pie-svg")){
      const SVG = select(".pieChart-container")
        .append("svg")
        .attr("id","pie-svg")
        .attr("height","100%")
        .attr("width","100%")
        .attr("viewBox",`${-WIDTH/2} ${-HEIGHT/2} ${WIDTH} ${HEIGHT}`)
        .style("background-color","#FBFBFB")
        .style("border-radius","5px")

      SVG
        .append("g")
        .attr("class","donut fill-red")
        .append("path")
        .attr('d', DONUT_PATH)

      SVG
        .append("g")
        .attr("class","circle-start fill-red")
        .append("circle")
        .attr('r', THICKNESS/2)
        .attr('cy', CIRCLE_Y)

      SVG
        .append("g")
        .attr("class","circle-end fill-red")
        .append("circle")
        .attr('r', THICKNESS/2)
        .attr('cy', CIRCLE_Y)
        .attr("transform",`rotate(${-ANGLE_DEG} 0 0)`)

      const DESCRIPTION = SVG
        .append("g")
        .attr("class","text")

      DESCRIPTION
        .selectAll("text")
        .data([ "" , "" ])
        .join("text")
        .attr("class","description-text text-center")
        .attr("dy",(elem,id) => (id+1) *20 )
        .text((elem,id) =>  id ? "objectif" : "de votre")

      DESCRIPTION
        .append("text")
        .attr("class","description-percentage text-center fw-700 fs-26")
        .attr("fill", "#282D30")
        .text(SCORE * 100 + "%")

      DESCRIPTION
        .append("text")
        .attr("class","title text-center fs-15")
        .attr("dx",-WIDTH*0.25)
        .attr("dy",-HEIGHT/2+15)
        .attr("fill", "#20253A")
        .text("Score")

      DESCRIPTION
        .selectAll(".description-text")
        .attr("fill", "#74798C")

    }
  }

  return(
    <>
      <div className='pieChart-container square-chart'>
      </div>
    </>
  )  
}
PieChartScore.propTypes = {
  score: PropTypes.number
}

export default PieChartScore

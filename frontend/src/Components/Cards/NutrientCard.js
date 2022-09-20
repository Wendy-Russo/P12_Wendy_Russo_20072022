import React, { useState, useEffect }  from 'react';
import './NutrientCard.scss';

import  caloriesIcon from '../../Data/icons/calories.svg'
import  proteinesIcon from "../../Data/icons/proteine.svg"
import  glucidesIcon from  "../../Data/icons/glucides.svg"
import  lipidesIcon from   "../../Data/icons/lipides.svg"

import { PropTypes } from "prop-types";

let color = -1;
let iconToUse = proteinesIcon;
let unit;
let quantity;

/**
 * Can create 4 different nutrient cards with different colors, icons, units and quantities (see maquette)
 * @param {object} props - must have both "props.nutrient" and "props.quantity" propreties 
 * @returns {object} returns the created JSX object 
 */
function NutrientCard(props) {

  const NUTRIENT = props.nutrient;
  const QUANTITY = props.quantity; 

  if(QUANTITY && NUTRIENT){
    
    switch (NUTRIENT) {
      case "calories":
        color = "red" ;
        iconToUse = caloriesIcon;
        unit = "kCal";
        quantity = QUANTITY.calorieCount;
        break;
      case "proteines":
        color = "blue" ;
        iconToUse = proteinesIcon;
        unit = "g";
        quantity = QUANTITY.proteinCount;
        break;
      case "glucides":
        color = "orange" ;
        iconToUse = glucidesIcon;
        unit = "g";
        quantity = QUANTITY.carbohydrateCount;
        break;
      case "lipides":
        color = "pink" ;
        iconToUse = lipidesIcon;
        unit = "g";
        quantity = QUANTITY.lipidCount;
        break;
      default:
        color = "red" ;
        iconToUse = caloriesIcon;
        unit = "g";
        quantity = QUANTITY.calorieCount;
        break;
    }
  
    return(
      
      <div className='card'>
        <div className={"iconContainer " + color}>
          <img className='nutrientIcon' src={iconToUse}/>
        </div>
        <p className='quantity'>{quantity + unit}</p>
        <p className='nutrient'>{NUTRIENT[0].toUpperCase()+NUTRIENT.substring(1)}</p>
      </div>

    )
  }

  else{
    return(
  
      <div className='card'>
      </div>

    )
  }
}

NutrientCard.propTypes = {
  nutrient: PropTypes.string,
  quantity: PropTypes.object
}

export default NutrientCard

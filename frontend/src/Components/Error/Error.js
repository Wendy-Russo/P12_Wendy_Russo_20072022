import React, { useEffect, useState } from "react";
import './Error.scss'

const Error = () => {

    return(
        <>
            
            <div className="error-overlay text-center fs-26 fw-700 ">
                <span>
                    ERROR<br/> COULDN'T FETCH DATA FROM SERVER
                </span>
                
            </div>
            <div className="error-greetings bg z-4">

            </div>
            <section className="charts-section z-4" >
                <div className="error-barchart-container bg">
                
                </div>
                <div className="square bg">
                
                </div >
                <div className="square bg">
                
                </div>
                <div className="square bg">
                
                </div>
            </section>
            <section className="error-cards-section cards-section z-4" >
                <div className="error-card bg">
                
                </div>
                <div className="error-card bg">
                
                </div>
                <div className="error-card bg">
                
                </div>
                <div className="error-card bg">
                
                </div>
            </section>
            <div className="error-bg">
            </div>

            
        </>
    )
    
}

export default Error

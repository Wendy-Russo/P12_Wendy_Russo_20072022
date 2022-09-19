import React, { useEffect, useState } from "react";
import { useParams, useRoutes } from 'react-router-dom';

import { getAllData } from "../Service/getAllData.js";

import TopNav from '../Components/TopNav/TopNav.js'
import SideNav from  '../Components/SideNav/SideNav.js'
import Greetings from '../Components/Greetings/Greetings'
import BarChartDailyActivity from '../Components/Charts/BarChartDailyActivity/BarChartDailyActivity'
import LineChart from '../Components/Charts/LineChart/LineChart'
import RadialChart from '../Components/Charts/RadialChart/RadialChart'
import PieChartScore from '../Components/Charts/PieChartScore/PieChartScore'
import NutrientCard from "../Components/Cards/NutrientCard";

import Error from "../Components/Error/Error.js";

import './Dashboard.scss'

let isError = false;



const Dashboard = () => {

    const [userData, setUserData] = useState()
    const [firstNames, setFirstNames] = useState()
    //array ids
    const [userScore, setUserScore] = useState() 
    const [keyData, setKeydata] = useState()
    const [sessions, setSessions] = useState()
    const [activity, setActivity] = useState()
    const [performance, setPerformance] = useState()
    const { id } = useParams()
   
    
   
    useEffect(()=>{
        getAllData(id)
        .then((values)=>{
            setUserData(values[0].data.userInfos.firstName) //GREETINGS
            setKeydata(values[0].data.keyData)
            setUserScore(values[0].data.todayScore || values[0].data.score) //PIECHART
            setSessions(values[1].data.sessions)
            setActivity(values[2].data.sessions) //BARCHART
            setPerformance(values[3].data.data) //RADIAL
        })
        .catch((error)=>{
            console.log(error)
        });  
        let x;
        [18,12].forEach((ids,idx) => {
            getAllData(ids)
            .then((values)=>{
                x.push(values[0].data.userInfos.firstName)
            })
            .catch((error)=>{
                console.log(error)
            }); 
        })
        setFirstNames(x)
            
    },[id])

    console.log(firstNames)

    if(userData !== undefined && keyData !== undefined && userScore !== undefined && sessions !== undefined && activity !== undefined && performance !== undefined){
        isError = false;
    }
    if(userData === undefined || keyData === undefined || userScore === undefined || sessions === undefined || activity === undefined || performance === undefined){
        isError = true;
    }

    //console.log(isError)

    return  <>

            
            <header>
                <TopNav ids={0}/>
                <SideNav/>
            </header>
            
            <main>
                
                {isError &&<Error />}

                <Greetings firstName={userData || ""}/>
                <section className="charts-section" >
                    <BarChartDailyActivity sessions={activity} />
                    <LineChart average={sessions} />
                    <RadialChart perf={performance} />
                    <PieChartScore score={userScore}/>
                </section>
                <section className="cards-section" >
                    <NutrientCard nutrient={"calories"} quantity={keyData} />
                    <NutrientCard nutrient={"proteines"} quantity={keyData} />
                    <NutrientCard nutrient={"glucides"} quantity={keyData} />
                    <NutrientCard nutrient={"lipides"} quantity={keyData} />
                </section>
                
            </main>
        </>
}

export default Dashboard

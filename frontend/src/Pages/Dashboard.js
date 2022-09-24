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
const ALL_IDS = [12,18]

/**
 * Uses multiple components to create a dashboard page (see maquette)
 * @returns {object} returns the created JSX object
 */
const Dashboard = () => {

    const [userData, setUserData] = useState()
    const [firstNames, setFirstNames] = useState()

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
        let tempFirstNames;
        ALL_IDS.forEach((ids) => {
            getAllData(ids)
            .then((values)=>{
                if(tempFirstNames !== undefined){
                    tempFirstNames = [tempFirstNames,[ids ,values[0].data.userInfos.firstName]]
                }
                else{
                    tempFirstNames = [ids ,values[0].data.userInfos.firstName]
                }
                setFirstNames(tempFirstNames)

            })
            .catch((error)=>{
                console.log(error)
            });
        })

    },[id])

    //console.log(firstNames)

    if(userData !== undefined && keyData !== undefined && userScore !== undefined && sessions !== undefined && activity !== undefined && performance !== undefined){
        isError = false;
    }
    if(userData === undefined || keyData === undefined || userScore === undefined || sessions === undefined || activity === undefined || performance === undefined){
        isError = true;
    }

    //console.log(isError)

    return  <>


            <header>
                <TopNav names={firstNames} ids={ALL_IDS}/>
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

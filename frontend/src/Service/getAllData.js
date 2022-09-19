import { getUserMainData, getUserActivity, getUserAverageSessions, getUserPerformance  } from "./callApi"
import { getUserMainDataMocked, getUserActivityMocked, getUserAverageSessionsMocked, getUserPerformanceMocked } from './getMockedData';

/**
 * function that returns the data according to the API data or the mocked data thanks to the environment variables
 * @function getAllData : return array with Promise.all 
 * @returns [Promise.all]
 */

export const getAllData = async (id)=>{

    const MOCKED = false;

   if(! MOCKED){
       const user =  await getUserMainData(id);
       const average = await getUserAverageSessions(id);
       const activity = await getUserActivity(id);
       const perform = await getUserPerformance(id);

        //console.log("getAll", ([user, average, activity,perform]))

      return ([user, average, activity,perform])
   }
   else if(MOCKED){
      const user = await getUserMainDataMocked(id);
      const average = await getUserAverageSessionsMocked(id);
      const activity = await getUserActivityMocked(id);
      const perform = await getUserPerformanceMocked(id);
      
      //console.log(user)
     return Promise.all([user, average, activity,perform])  
   }

     
}


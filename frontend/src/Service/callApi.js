
/**
 * functions that returns the  API data depending on the id using axios
 * @function getUserMainData
 * @function getUserActivity
 * @function getUserAverageSessions
 * @function getUserPerformance
 * @returns {response.data}
 */


export const getUserMainData = async (id) =>{
    try {
        const response = await fetch(`http://localhost:3000/user/${id}`)
        const JSON = response.json()
        return JSON
    } catch (error) {
        console.log("error " + error)
    }
}

export const getUserActivity = async(id)=>{


    try {

        const response = await fetch(`http://localhost:3000/user/${id}/activity`)
        const JSON = response.json()
        return JSON
    } catch (error) {
        console.log("error " + error)
    }
}

export const getUserAverageSessions = async(id)=>{

    try {

        const response = await fetch(`http://localhost:3000/user/${id}/average-sessions`)
        const JSON = response.json()
        return JSON
        
    } catch (error) {
        console.log("error " + error)
    }
}

export const getUserPerformance= async(id)=>{

    try {

        const response =  await fetch(`http://localhost:3000/user/${id}/performance`)
        const JSON = response.json()
        return JSON
        
    } catch (error) {
        console.log("error " + error)
    }
}
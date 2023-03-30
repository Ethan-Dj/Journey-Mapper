
import { useEffect } from "react"
import { useState } from "react";

const Home = (props) => {

    const [fetchedData, setFetchedData]=useState({})
    const [loaded, setLoaded]=useState(false)
    const [track, setTrack] = useState({})

    useEffect(()=>{
    fetch('http://localhost:3001/api/images')
    .then(response => response.json())
    .then(data => {
        const reversed = data.reverse()
        console.log(reversed)
        setFetchedData(reversed)
        setLoaded(true)
    })
    .catch(error => console.error(error));
    },[])

    useEffect(()=>{
        let emptyObj = {}
        if (Object.keys(fetchedData).length !== 0 && loaded == true){
            fetchedData.forEach(item => {
                emptyObj[`${item.journeyname}`] = 0;
            })
            setTrack(emptyObj)
        }
    },[loaded])

    const goBack = (name) => {
        
    }

    const goForward = (name) => {
        console.log(name)
        let data = {...track}
        data.empty ++
        setTrack(data)
        // now add limits for going either way
        // add option for video 
        // add map functionality
        // add other titles
        // add map page go back to same coordinates store state in redux
        // for more than 15 journeys just have button to load more
    }

    return(
        <>
        <h1>Home</h1>
        {console.log("track", track)}
        <div style={{width:"100vw", height:"100vw", border:"2px white solid", 
                backgroundImage: `url('${Object.keys(track).length === 0? null : fetchedData[track.empty].url}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}>
            <button onClick={()=> goBack(fetchedData[0].journeyname)} style ={{opacity: "0", width:"45vw", marginRight:"5vw", marginTop:"10vw", height:"80vw"}}>Left</button>
            <button onClick={()=> goForward(fetchedData[0].journeyname)}style={{opacity: "0", width:"45vw", marginLeft:"5vw", marginTop:"10vw", height:"80vw"}}>Right</button>
        </div>
        <div style={{width:"100vw", height:"27vh", border:"2px white solid"}}></div>
        </>
    )
}

export default Home
import { useEffect } from "react"
import { useState, useRef } from "react";
import Map1 from "./Map"
import { Map } from "mapbox-gl";
import { useNavigate } from "react-router-dom"

const Home = (props) => {
    const navigate = useNavigate()

    const [fetchedData, setFetchedData]=useState({})
    const [loaded, setLoaded]=useState(false)
    const [track, setTrack] = useState({})
    const [isImage, setIsImage] = useState(true) // true if image false if not
    const [muted, setMuted] = useState(true);

    useEffect(()=>{setMuted(true)},[track])

    useEffect(()=>{
    fetch('http://localhost:3001/api/images')
    .then(response => response.json())
    .then(data => {
        const reversed = data.reverse()
        setFetchedData(reversed)
        console.log(reversed)
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

    useEffect(()=> {
        if (Object.keys(track).length !== 0){
            if (fetchedData[track.empty].url.match(/\.(mp4|webm|ogg|mov|avi|wmv|flv)$/) != null) {
                // console.log(`${fetchedData[track.empty].url}`)
                setIsImage(false)
            } else {
                setIsImage(true)
                // console.log(`${fetchedData[track.empty].url}`)
        }}
    },[track])

    const goForward = (name) => {
        let data = {...track}
        if (data.empty !== Object.keys(fetchedData).length -1 ){
            data.empty ++
            setTrack(data)
        } else {
            data.empty = 0 
            setTrack(data)
        }

    }

    const goBack = (name) => {
        let data = {...track}
        if (data.empty !== 0){
            data.empty --
            setTrack(data)
        } else {
            data.empty = Object.keys(fetchedData).length-1
            setTrack(data)
        }
    }

    function handleToggleMute() {
        setMuted(!muted);
      }

    return(
        <>
        <h1>Home</h1>
        {isImage === true ? (
        <div style={{width:"100vw", height:"100vw", border:"2px white solid", 
                backgroundImage: `url('${Object.keys(track).length === 0? null : fetchedData[track.empty].url}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}>
            <div style={{display:"flex", flexDirection: "row", justifyContent:"space-between", height: "15vw", alignItems: "center"}}>
                <button style={{border:"none", marginLeft:"5vw", height: "30px", fontSize:"16px"}}>{Object.keys(track).length === 0? null : fetchedData[track.empty].journeyname}</button>
                <button style={{border:"none", marginRight:"5vw", height: "30px"}}><i>{Object.keys(track).length === 0? null : fetchedData[track.empty].locationname}</i></button>
            </div>
            <button onClick={()=> goBack(fetchedData[0].journeyname)} style ={{opacity: "0", width:"45vw", marginRight:"5vw", marginTop:"0vw", height:"70vw"}}>Left</button>
            <button onClick={()=> goForward(fetchedData[0].journeyname)}style={{opacity: "0", width:"45vw", marginLeft:"5vw", marginTop:"0vw", height:"70vw"}}>Right</button>
            <div style={{display:"flex", flexDirection: "row", justifyContent:"space-between", height: "15vw", alignItems: "center"}}>
                <button style={{border:"#1012FA 1px solid", marginLeft:"5vw", height: "30px"}}><i>{Object.keys(track).length === 0? null : fetchedData[track.empty].imgtimedisplay.replace(/\-/g, " ")}</i></button>
                <button style={{ marginRight:"5vw", height: "30px", border: "solid 2px white"}} onClick={()=> navigate("/largemap", {state: {fetchedData: fetchedData, current: "empty"}})}>View Journey Map</button>
            </div>
        </div>
        ) : (
            <div style={{width:"100vw", height:"100vw", border:"2px white solid", position: "relative"}}>
            <video autoPlay loop muted={muted} style={{ width: "100%",  objectFit: "cover"}} controls src={`${fetchedData[track.empty].url}`}/>
            <div style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", zIndex: "1"}}>
            <div style={{display:"flex", flexDirection: "row", justifyContent:"space-between", height: "15vw", alignItems: "center"}}>
                <button style={{border:"none", marginLeft:"5vw", height: "30px", fontSize:"16px"}}>{Object.keys(track).length === 0? null : fetchedData[track.empty].journeyname}</button>
                <button style={{border:"none", marginRight:"5vw", height: "30px"}}><i>{Object.keys(track).length === 0? null : fetchedData[track.empty].locationname}</i></button>
            </div>
            <button onClick={()=> goBack(fetchedData[0].journeyname)} style ={{opacity: "0", width:"45vw", marginRight:"5vw", marginTop:"0vw", height:"70vw"}}>Left</button>
            <button onClick={()=> goForward(fetchedData[0].journeyname)}style={{opacity: "0", width:"45vw", marginLeft:"5vw", marginTop:"0vw", height:"70vw"}}>Right</button>
            <div style={{display:"flex", flexDirection: "row", justifyContent:"space-between", height: "15vw", alignItems: "center"}}>
                <button style={{border:"#1012FA 1px solid", marginLeft:"5vw", height: "30px"}}><i>{Object.keys(track).length === 0? null : fetchedData[track.empty].imgtimedisplay.replace(/\-/g, " ")}</i></button>
                <button style={{height: "30px", border: "none", backgroundColor: "transparent", display:muted ? "block" : "none" }} onClick={handleToggleMute}>Unmute</button>
                <button style={{ marginRight:"5vw", height: "30px"}} onClick={()=> navigate("/largemap") }>View Journey Map</button>
            </div>
            </div>
        </div>
        )}
        <div style={{width:"100vw", height:"27vh", border:"2px white solid"}}>
            <Map1 track={track} fetchedData={fetchedData} />
        </div>
        </>
    )
}

export default Home
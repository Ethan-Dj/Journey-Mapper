import { useEffect } from "react"
import { useState, useRef } from "react";
import Map1 from "./Map"
import { Map } from "mapbox-gl";
import { useNavigate } from "react-router-dom"

const Home = (props) => {
    const navigate = useNavigate()

    const [fetchedData, setFetchedData]=useState({})
    const [loaded, setLoaded]=useState(false)
    const [track, setTrack] = useState([])
    const [isImage, setIsImage] = useState([]) // true if image false if not
    const [muted, setMuted] = useState(true);
    const [seperated, setSeperated] = useState([])

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
        if (Object.keys(fetchedData).length !== 0 && loaded == true){
            let seperatedJourneys = []
            fetchedData.map((item, index)=>{
                if (index === 0){
                    let array = [item]
                    seperatedJourneys.push(array)
                } else if (item.journeyname ==  seperatedJourneys[seperatedJourneys.length-1][0].journeyname){
                    seperatedJourneys[seperatedJourneys.length-1].push(item)
                }
                 else {
                    let array = [item]
                    seperatedJourneys.push(array)
                }
            })
        let ordered = []
        seperatedJourneys.map(item => {
            ordered.push(item.reverse())
        })
        console.log(ordered)
        setSeperated(ordered)
        }
    },[fetchedData])

    useEffect(()=>{
        let emptyArr = []
        if (seperated.length !== 0){
            seperated.forEach(item => {
                emptyArr.push([0,item.length])
            })
            console.log(emptyArr)
            setTrack(emptyArr)
        }
    },[seperated])

    useEffect(()=> {
        let type = []
        if (track.length !== 0){
            seperated.forEach((item, index)=>{
                if (seperated[index][track[index][0]].url.match(/\.(mp4|webm|ogg|mov|avi|wmv|flv)$/) != null) {
                    type.push(false)
                } else {
                    console.log("image")
                    type.push(true)
                    // setIsImage(true)
                    // console.log(`${fetchedData[track.empty].url}`)
            }})
            console.log(type)
            setIsImage(type)
            } 
    },[track])

    const goForward = (index) => {
        let data = {...track}
        if (data[index][0]+1 !== data[index][1] ){
            data[index][0] ++ 
            setTrack(data)
        } else {
            data[index][0] = 0 
            setTrack(data)
        }
    }

    const goBack = (index) => {
        let data = {...track}
        if (data[index][0] !== 0){
            data[index][0] --
            setTrack(data)
        } else {
            data[index][0] = data[index][1]-1
            setTrack(data)
        }
    }

    function handleToggleMute() {
        setMuted(!muted);
      }

    return(
        <>
        <div style ={{height:"6vh"}}>
        <h1 >Home</h1>
        </div>

        {seperated.length == 0 ? console.log("fuck") : (
            seperated.map((item, index) => {
                // let type = true 
                return isImage[index] === true ? (
                    <>
                    <div style={{width:"100vw", height:"60vh", border:"2px white solid", 
                            backgroundImage: `url('${track.length == 0 ? null : seperated[index][track[index][0]].url}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            }}>
                        <div style={{display:"flex", flexDirection: "row", justifyContent:"space-between", height: "8vh", alignItems: "center"}}>
                            <button style={{border:"none", marginLeft:"5vw", height: "30px", fontSize:"16px", borderRadius:"6px"}}>{track.length == 0 ? null : seperated[index][track[index][0]].journeyname}</button>
                            <button style={{border:"none", marginRight:"5vw", height: "30px", borderRadius:"6px"}}><i>{track.length == 0 ? null : seperated[index][track[index][0]].locationname}<u style={{opacity:"0", fontSize:"4px"}}>.-</u></i></button>
                        </div>
                        <button onClick={()=> goBack(index)} style ={{opacity: "0", width:"45vw", marginRight:"5vw", marginTop:"0vw", height:"44vh"}}>Left</button>
                        <button onClick={()=> goForward(index)}style={{opacity: "0", width:"45vw", marginLeft:"5vw", marginTop:"0vw", height:"44vh"}}>Right</button>
                        <div style={{display:"flex", flexDirection: "row", justifyContent:"space-between", height: "8vh", alignItems: "center"}}>
                            <button style={{border:"#1012FA 1px solid", marginLeft:"5vw", height: "30px", borderRadius:"6px"}}><i>{track.length == 0 ? null : seperated[index][track[index][0]].imgtimedisplay.replace(/\-/g, " ")}<u style={{opacity:"0", fontSize:"4px"}}>.-</u></i></button>
                            <button style={{ marginRight:"5vw", height: "30px", border: "solid 2px white"}} onClick={()=> navigate("/largemap", {state: {fetchedData: seperated[index].reverse(), current: "empty"}})}>View Journey Map</button>
                        </div>
                    </div>
                    <div style={{width:"100vw", height:"30vh", border:"2px white solid"}}>
                        <Map1 track={track.length == 0? null : track[index]} fetchedData={seperated.length == 0? null : seperated[index]} />
                    </div>
                    </>
                    
                    ) : (
                        <>
                        <div style={{width:"100vw", height:"60vh", border:"2px white solid", position: "relative"}}>
                        <video autoPlay loop muted={muted} style={{ width: "100%",  objectFit: "cover"}} controls src={`${track.length == 0 ? null : seperated[index][track[index][0]].url}`}/>
                        <div style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", zIndex: "1"}}>
                        <div style={{display:"flex", flexDirection: "row", justifyContent:"space-between", height: "8vh", alignItems: "center"}}>
                            <button style={{border:"none", marginLeft:"5vw", height: "30px", fontSize:"16px", borderRadius:"6px"}}>{track.length == 0 ? null : seperated[index][track[index][0]].journeyname}</button>
                            <button style={{border:"none", marginRight:"5vw", height: "30px", borderRadius:"6px"}}><i>{track.length == 0 ? null : seperated[index][track[index][0]].locationname}<u style={{opacity:"0", fontSize:"4px"}}>.-</u></i></button>
                        </div>
                        <button onClick={()=> goBack(index)} style ={{opacity: "0", width:"45vw", marginRight:"5vw", marginTop:"0vw", height:"44vh"}}>Left</button>
                        <button onClick={()=> goForward(index)}style={{opacity: "0", width:"45vw", marginLeft:"5vw", marginTop:"0vw", height:"44vh"}}>Right</button>
                        <div style={{display:"flex", flexDirection: "row", justifyContent:"space-between", height: "8vh", alignItems: "center"}}>
                            <button style={{border:"#1012FA 1px solid", marginLeft:"5vw", height: "30px", borderRadius:"6px"}}><i>{track.length == 0 ? null : seperated[index][track[index][0]].imgtimedisplay.replace(/\-/g, " ")}<u style={{opacity:"0", fontSize:"4px"}}>.-</u></i></button>
                            <button style={{height: "30px", border: "none", backgroundColor: "transparent", display:muted ? "block" : "none" }} onClick={handleToggleMute}>Unmute</button>
                            <button style={{ marginRight:"5vw", height: "30px", border: "solid 2px white"}} onClick={()=> navigate("/largemap", {state: {fetchedData: seperated[index].reverse(), current: "empty"}}) }>View Journey Map</button>
                        </div>
                        </div>
                    </div>
                    <div style={{width:"100vw", height:"30vh", border:"2px white solid"}}>
                        <Map1 track={track.length == 0? null : track[index]} fetchedData={seperated.length == 0? null : seperated[index]} />
                    </div>
                    </>
                    )
            })
        )}
        </>
    )
}

export default Home
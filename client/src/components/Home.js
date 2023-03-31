import { useEffect } from "react"
import { useState } from "react";

const Home = (props) => {

    const [fetchedData, setFetchedData]=useState({})
    const [loaded, setLoaded]=useState(false)
    const [track, setTrack] = useState({})
    const [isImage, setIsImage] = useState(true) // true if image false if not
    const [muted, setMuted] = useState(true);

    function handleToggleMute() {
      setMuted(!muted);
    }

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
                console.log(`${fetchedData[track.empty].url}`)
                setIsImage(false)
            } else {
                setIsImage(true)
                console.log(`${fetchedData[track.empty].url}`)
        }}
    },[track])

    const goForward = (name) => {
        let data = {...track}
        data.empty ++
        setTrack(data)
    }

    const goBack = (name) => {
        let data = {...track}
        if (data.empty !== 0){
            data.empty --
            setTrack(data)
        }
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
                <button style={{border:"orange 1px solid", marginLeft:"5vw", height: "30px"}}>{Object.keys(track).length === 0? null : fetchedData[track.empty].journeyname}</button>
                <button style={{border:"none", marginRight:"5vw", height: "30px"}}>{Object.keys(track).length === 0? null : fetchedData[track.empty].locationname}</button>
            </div>
            <button onClick={()=> goBack(fetchedData[0].journeyname)} style ={{opacity: "0", width:"45vw", marginRight:"5vw", marginTop:"0vw", height:"70vw"}}>Left</button>
            <button onClick={()=> goForward(fetchedData[0].journeyname)}style={{opacity: "0", width:"45vw", marginLeft:"5vw", marginTop:"0vw", height:"70vw"}}>Right</button>
            <div style={{display:"flex", flexDirection: "row", justifyContent:"space-between", height: "15vw", alignItems: "center"}}>
                <button style={{border:"#1012FA 1px solid", marginLeft:"5vw", height: "30px"}}>{Object.keys(track).length === 0? null : fetchedData[track.empty].imgtimedisplay.replace(/\-/g, " ")}</button>
                <button style={{ marginRight:"5vw", height: "30px"}} onClick={()=>console.log("fuck")}>View Journey Map</button>
            </div>
        </div>
        ) : (
            <div style={{width:"100vw", height:"100vw", border:"2px white solid", position: "relative"}}>
            <video autoPlay loop muted={muted} style={{ width: "100%",  objectFit: "cover"}} controls src={`${fetchedData[track.empty].url}`}/>
            <div style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", zIndex: "1"}}>
            <div style={{display:"flex", flexDirection: "row", justifyContent:"space-between", height: "15vw", alignItems: "center"}}>
                <button style={{border:"orange 1px solid", marginLeft:"5vw", height: "30px"}}>{Object.keys(track).length === 0? null : fetchedData[track.empty].journeyname}</button>
                <button style={{border:"none", marginRight:"5vw", height: "30px"}}>{Object.keys(track).length === 0? null : fetchedData[track.empty].locationname}</button>
            </div>
            <button onClick={()=> goBack(fetchedData[0].journeyname)} style ={{opacity: "0", width:"45vw", marginRight:"5vw", marginTop:"0vw", height:"70vw"}}>Left</button>
            <button onClick={()=> goForward(fetchedData[0].journeyname)}style={{opacity: "0", width:"45vw", marginLeft:"5vw", marginTop:"0vw", height:"70vw"}}>Right</button>
            <div style={{display:"flex", flexDirection: "row", justifyContent:"space-between", height: "15vw", alignItems: "center"}}>
                <button style={{border:"#1012FA 1px solid", marginLeft:"5vw", height: "30px"}}>{Object.keys(track).length === 0? null : fetchedData[track.empty].imgtimedisplay.replace(/\-/g, " ")}</button>
                <button style={{height: "30px", display:muted ? "block" : "none" }} onClick={handleToggleMute}>Unmute</button>
                <button style={{ marginRight:"5vw", height: "30px"}} onClick={()=>console.log("fuck")}>View Journey Map</button>
            </div>
            </div>
        </div>
        )}
        <div style={{width:"100vw", height:"27vh", border:"2px white solid"}}></div>
        </>
    )
}

export default Home

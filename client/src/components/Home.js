import { useEffect } from "react"
import { useState, useRef } from "react";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoiZXRoYW4xMjEiLCJhIjoiY2wzYmV2bW50MGQwbTNpb2lxdm56cGdpNyJ9.-wLLlz-sFhNPiXCyVCQ6kg';

const Home = (props) => {

    const [fetchedData, setFetchedData]=useState({})
    const [loaded, setLoaded]=useState(false)
    const [track, setTrack] = useState({})
    const [isImage, setIsImage] = useState(true) // true if image false if not
    const [muted, setMuted] = useState(true);

    const [map, setMap] = useState(null);
    const [start, setStart] = useState([34.801720704888070, 32.086978083560936]);
    const [end, setEnd] = useState([34.8017207048, 32.089828845381180]);
    const [startZoom, setStartZoom] = useState(15);
    const [endZoom, setEndZoom] = useState(16);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: start,
      zoom: startZoom
    });

    setMap(map);

    // Clean up on unmount
        return () => map.remove();
    }, []);

    const animateTo = () => {

        const distance = mapboxgl.LngLat.convert(end).distanceTo(mapboxgl.LngLat.convert(map.getCenter()));
        const speed = distance / 500; // 1000 pixels per second
        const duration = Math.min(distance / speed, 500);

        map.flyTo({
          center: end,
          zoom: endZoom,
          speed: 8,
          curve: 1,
          easing: t => t,
          duration: duration
        });
      };

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
                <button style={{border:"none", marginLeft:"5vw", height: "30px", fontSize:"16px"}}>{Object.keys(track).length === 0? null : fetchedData[track.empty].journeyname}</button>
                <button style={{border:"none", marginRight:"5vw", height: "30px"}}><i>{Object.keys(track).length === 0? null : fetchedData[track.empty].locationname}</i></button>
            </div>
            <button onClick={()=> goBack(fetchedData[0].journeyname)} style ={{opacity: "0", width:"45vw", marginRight:"5vw", marginTop:"0vw", height:"70vw"}}>Left</button>
            <button onClick={()=> goForward(fetchedData[0].journeyname)}style={{opacity: "0", width:"45vw", marginLeft:"5vw", marginTop:"0vw", height:"70vw"}}>Right</button>
            <div style={{display:"flex", flexDirection: "row", justifyContent:"space-between", height: "15vw", alignItems: "center"}}>
                <button style={{border:"#1012FA 1px solid", marginLeft:"5vw", height: "30px"}}><i>{Object.keys(track).length === 0? null : fetchedData[track.empty].imgtimedisplay.replace(/\-/g, " ")}</i></button>
                <button style={{ marginRight:"5vw", height: "30px", border: "solid 2px white"}} onClick={()=>console.log("fuck")}>View Journey Map</button>
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
                <button style={{ marginRight:"5vw", height: "30px"}} onClick={()=>console.log("fuck")}>View Journey Map</button>
            </div>
            </div>
        </div>
        )}
        <div style={{width:"100vw", height:"27vh", border:"2px white solid"}}>
            <div id="map" className="map-container" />
            <button onClick={animateTo}>Animate to End</button>
        </div>
        </>
    )
}

export default Home

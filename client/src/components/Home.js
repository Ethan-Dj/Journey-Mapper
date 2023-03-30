
import { useEffect } from "react"
import { useState } from "react";

const Home = (props) => {

    const [fetchedData, setFetchedData]=useState({})

    useEffect(()=>{
    fetch('http://localhost:3001/api/images')
    .then(response => response.json())
    .then(data => setFetchedData(data))
    .catch(error => console.error(error));
    },[])

    return(
        <>
        <h1>Home</h1>
        <div style={{width:"100vw", height:"100vw", border:"2px white solid", 
                backgroundImage: "url('http://res.cloudinary.com/dumufhfgv/image/upload/v1680182158/JourneyMapper/cc9mdusybpmqunzxk63x.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}>
            <button style ={{opacity: "0", width:"45vw", marginRight:"5vw", marginTop:"10vw", height:"80vw"}}>Left</button>
            <button style={{opacity: "0", width:"45vw", marginLeft:"5vw", marginTop:"10vw", height:"80vw"}}>Right</button>
        </div>
        <div style={{width:"100vw", height:"27vh", border:"2px white solid"}}></div>
        </>
    )
}

export default Home
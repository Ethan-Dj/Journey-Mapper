import { useState } from 'react';
import { useEffect } from 'react';

const UploadNewJourney = (props) => {

  const [selectedImage, setSelectedImage] = useState(null)
  const [changeButton, setChangeButton] = useState("Choose Photo/Video")
  const [location, setLocation] = useState({})
  const [imgTime, setImgTime] = useState("")
  const [imgTimeDisplay, setImgTimeDisplay] = useState("")

  const getLocation = (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'a234d69e68msh0dd62b791a51637p16c7e5jsn4cf39ed5ac8d',
        'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
      }
    };
    fetch(`https://trueway-geocoding.p.rapidapi.com/ReverseGeocode?location=${lat}%2C${long}&language=en`, options)
    .then(response => response.json())
    .then(res => {
      let inputArea
      `${res.results[0].area}` === "undefined" ? (
         inputArea = res.results[0].locality
      ) : (
        inputArea = res.results[0].area
      )
      let inputAreaFinal
      `${inputArea}` === "undefined" ? inputAreaFinal = "No-Where" : inputAreaFinal = `${inputArea}, ${res.results[0].country}`
      const locationData = {lat:lat, long:long, name: inputAreaFinal}
      setLocation(locationData)
    })
    .catch(err => console.error(err));
  }

  useEffect(()=> {
      window.navigator.geolocation.getCurrentPosition(getLocation);
      const now = new Date();
      const year = now.getFullYear();
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      const displayFormattedTime = `${hours}:${minutes}-${day}/${month}/${year-2000}`
      setImgTimeDisplay(displayFormattedTime)
      setImgTime(formattedDateTime)

  },[])

  const display = (e) => {
    console.log(location)
    console.log(imgTime)
    console.log(imgTimeDisplay)
    const file = e.target.files[0];
    setChangeButton("Change Photo/Video")
    setSelectedImage(file);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!selectedImage) return
    const reader = new FileReader()
    reader.readAsDataURL(selectedImage)
    reader.onload = () => {
      uploadImage(reader.result)
    }
  }

  const uploadImage = async (base64EncodedImage) => {
    await fetch('http://localhost:3001/api/upload', {
    method: 'POST',
    body: JSON.stringify({
      data: base64EncodedImage,
      locationName: location.name,
      long: location.long,
      lat: location.lat,
      imgtime: imgTime,
      imgTimeDisplay: imgTimeDisplay,
      journeyname: "pasta",
      userid: 1

    }),
    headers: {'Content-type':'application/json'}
    })
    .then(res => console.log(res))
  }

  return ( 
    <>
      <div style = {{height:"8vh",display:"flex", flexDirection:"row", alignItems: "center", justifyContent:"space-between",borderBottom:"2px solid white" }}>
        <button style={{width:"72px", margin:"0px 20px"}}>Cancel</button>
        <h3 style={{fontWeight: "500"}}><u>Upload</u></h3>
        <div style={{width:"72px", height: "30px", margin:"0px 20px"}}></div>
      </div>

      <div>
      <form style={{display: "flex", flexDirection:"column", alignItems: "center"}}onSubmit = {(e)=> handleSubmit(e)}>
        <label style={{marginTop:"50px", marginBottom:"25px"}}>
            <input type="file" name="image" onChange={(e) => display(e)} style={{ display: "none" }} />
            <span>{changeButton}</span>
        </label>

          <div style={{width:"80vw", height: "100vw", border:"solid 2px white", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden"}}>
          {selectedImage && selectedImage.type.includes("image") && 
            <img style={{ maxWidth: "100%"}} src={`${URL.createObjectURL(selectedImage)}`} alt="Selected" />
          }
          {selectedImage && selectedImage.type.includes("video") && 
            <video autoPlay loop style={{ width: "100%",  objectFit: "cover"}} controls src={`${URL.createObjectURL(selectedImage)}`}/>
          }
        </div>

        <input style={{margin:"20px"}} id="submit" type="submit" value="Add photo/video and location to journey"/>

        <p style={{fontSize:"12px"}}>Only photos and videos please...</p>
      </form>
      </div>
    </>
    )};

export default UploadNewJourney
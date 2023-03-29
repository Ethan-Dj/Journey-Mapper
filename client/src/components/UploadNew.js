import { useState } from 'react';
import { useEffect } from 'react';

const UploadNew = (props) => {

  const [selectedImage, setSelectedImage] = useState(null)
  const [changeButton, setChangeButton] = useState("Choose Photo/Video")
  const [location, setLocation] = useState({})
  const [locationName, setLocationName] = useState("")

  const getLocation = async (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const coords = {lat, long};
    setLocation(coords)
  }

  useEffect(()=> {
    window.navigator.geolocation.getCurrentPosition(getLocation);
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'a234d69e68msh0dd62b791a51637p16c7e5jsn4cf39ed5ac8d',
        'X-RapidAPI-Host': 'trueway-geocoding.p.rapidapi.com'
      }
    };
    
    fetch('https://trueway-geocoding.p.rapidapi.com/ReverseGeocode?location=11.830023%2C6.277828&language=en', options)
      .then(response => response.json())
      .then(res => console.log(res.results[0].area, res.results[0].country))
      .catch(err => console.error(err));

    console.log("running")
    console.log(location)

  },[])

  const display = (e) => {
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
      locationName: "ehee",
      long: location.long,
      lat: location.lat,
      imgtime: 4444,
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

          <div style={{width:"270px", height: "270px", border:"solid 2px white"}}>
          {selectedImage && selectedImage.type.includes("image") && 
            <img src={`${URL.createObjectURL(selectedImage)}`} alt="Selected" />
          }
          {selectedImage && selectedImage.type.includes("video") && 
            <video controls src={`${URL.createObjectURL(selectedImage)}`}/>
          }
        </div>

        <input style={{margin:"20px"}} id="submit" type="submit" value="Add photo/video and location to journey"/>

        <p style={{fontSize:"12px"}}>Only photos and videos please...</p>
      </form>
      </div>
    </>
    )};

export default UploadNew
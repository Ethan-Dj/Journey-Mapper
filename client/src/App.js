import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { upload } from '@testing-library/user-event/dist/upload';


function App() {

  const [selectedImage, setSelectedImage] = useState(null)
  const [changeButton, setChangeButton] = useState("Choose Photo/Video")

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
    console.log(base64EncodedImage)
    try {
      await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: JSON.stringify({
          url: base64EncodedImage,
          long: 222.222,
          lat: 333.333
        }),
        headers: {'Content-type':'application/json'}
      })
    } catch (err){
      console.log(err)
    }
  }

  return ( 
    <>
      <h1>Hello</h1>

      <form onSubmit = {(e)=> handleSubmit(e)}>
        <label>
            <input type="file" name="image" onChange={(e) => display(e)} style={{ display: "none" }} />
            <span>{changeButton}</span>
        </label>
        <input type="submit" value="post"/>
      </form>

      {selectedImage && ( // only create img tag if selected Image is not null
        <img src={`${URL.createObjectURL(selectedImage)}`} alt="Selected" />
      )}
    </>
  );
}

export default App;

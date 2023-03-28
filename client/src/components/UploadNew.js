import { useState } from 'react';

const UploadNew = (props) => {

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
  await fetch('http://localhost:3001/api/upload', {
    method: 'POST',
    body: JSON.stringify({
      data: base64EncodedImage,
      long: 222.222,
      lat: 333.333,
      time: 4444,
      journeyname: "p",
      userid: 1

    }),
    headers: {'Content-type':'application/json'}
    })
    .then(res => console.log(res))
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

      {!selectedImage ? null : (
      (selectedImage.type.includes("image")) ? 
      ( 
        <img src={`${URL.createObjectURL(selectedImage)}`} alt="Selected" />
      ): null)
      (selectedImage.type.includes("video")) ? 
      ( 
        <video controls src={`${URL.createObjectURL(selectedImage)}`}/>
      ): null}
    </>
    )};

export default UploadNew
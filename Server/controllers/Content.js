const {getAllImages, uploadImages, register, login} = require("../modules/Content.js")
const { cloudinary } = require('../utils/cloudinary');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const _login = async (req, res) => {
    console.log(req.body.email);
    try {
        const result = await login(req.body);
        if (result[0].email == req.body.email){
            const match = await bcrypt.compare(req.body.password, result[0].password)
            if (match == true){
                res.status(200).json({id:result[0].id})
            } else {
                res.status(500).json({id: "error"})
            }
        } else {
            res.status(500).json({id: "error"})
        }
        

        // res.status(200).json(data);
    } catch (err) {
        console.log("no");
        res.status(500).json({ id: "error" });
    }
};

const _register = async (req, res) => {
    try {
      const result = await register(req.body);
      console.log("yes");
      res.json({ id: result[0] });
    } catch (err) {
      console.log("no", err);
      res.json({ id: "error" });
    }
  };

const _getAllImages = (req,res) => {
    getAllImages()
    .then(data => {
        res.json(data)
    })
    .catch(err =>
        console.log(err)
    )
}

const _uploadImages = async(req,res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'mapper',
            resource_type: "auto"
        });
        console.log("here")
        const obj = {
            "url": uploadResponse.url,
            "locationname" : req.body.locationName,
            "long": req.body.long,
            "lat": req.body.lat,
            "imgtime": req.body.imgTime,
            "imgtimedisplay":req.body.imgTimeDisplay,
            "journeyname": req.body.journeyName,
            "userid" : req.body.userId
        }
        uploadImages(obj)
        .then(data => {
            res.json({msg:"success"})
        })
        .catch(err =>
            console.log(err)
        )

    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
}

module.exports = {
    _uploadImages,
    _getAllImages,
    _register,
    _login
}
const {getAllImages, uploadImages, register, login, getAll, getAllNames} = require("../modules/Content.js")
const { cloudinary } = require('../utils/cloudinary');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const _login = async (req, res) => {
    console.log(req.body.email,"fuck");
    try {
        const result = await login(req.body);
        if (result[0].email == req.body.email){
            const match = await bcrypt.compare(req.body.password, result[0].password)
            if (match == true){
                const email1 = {email: req.body.email }
                const token = jwt.sign(email1, process.env.ACCESS_TOKEN_SECRET)
                res.status(200).json({id:result[0].id, token: token})
            } else {
                res.status(500).json({id: "error"})
            }
        } else {
            res.status(500).json({id: "error"})
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ id: "error" });
    }
};

const _register = async (req, res) => {
    try {
        const email1 = {email: req.body.email }
        const token = jwt.sign(email1, process.env.ACCESS_TOKEN_SECRET)

        const result = await register(req.body, token);

        res.status(200).json({id:result[0].id, token: token})
    } catch (err) {
      console.log("no", err);
      res.json({ id: "error" });
    }
  };

const _getAllImages = (req,res) => {
    getAllImages(req.headers.id)
    .then(data => {
        res.json(data)
    })
    .catch(err =>
        console.log(err)
    )
}

const _getAll = (req,res) => {
    getAll(req.headers.id)
    .then(data => {
        const result = JSON.stringify(data)
        const reversed = data.reverse();
        const groupedArrays = [];
        const objectsById = {};
        const groupedObjects = [];
        reversed.forEach(obj => {
            const key = `${obj.userid}-${obj.journeyname}`;
            const group = groupedObjects.find(g => g[0] && g[0].userid === obj.userid && g[0].journeyname === obj.journeyname);
            if (group) {
            group.push(obj)
            } else if (groupedObjects.length < 15) {
            groupedObjects.push([obj]);
            }
        });

        let ids = []
        groupedObjects.forEach(elem => {
            ids.push(elem[0].userid)
        })

        getAllNames(ids)
        .then(data1 => {
            res.json(data1);
        })

        
    })
    .catch(err =>
        console.log(err)
    )
}

// const _getAllNames = (req,res) => {
//     getAllNames()
//     .then(data => {
//         console.log(JSON.stringify(data));
//         console.log("fucking hell")
//         res.json(data)
//     })
//     .catch(err =>
//         console.log(err)
//     )
// }

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
        .catch(err =>{
            console.log(err)
            res.status(500).json({ err: 'inside broken' })
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
}

module.exports = {
    _uploadImages,
    _getAllImages,
    _register,
    _login, 
    _getAll, 
    _getAllNames
}
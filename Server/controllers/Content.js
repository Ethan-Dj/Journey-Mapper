const {getAllImages, uploadImages} = require("../modules/Content.js")
const { cloudinary } = require('../utils/cloudinary');

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
    _getAllImages
}
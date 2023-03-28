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
        const obj = {
            "url": uploadResponse.url,
            "lat": req.body.lat,
            "long": req.body.long,
            "journeyname": req.body.journeyname,
            "imgtime": req.body.imgtime,
            "userid" : 1,
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
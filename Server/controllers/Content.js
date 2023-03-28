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

// app.post('/api/upload', async (req, res) => {
//     try {
//         const fileStr = req.body.data;
//         const uploadResponse = await cloudinary.uploader.upload(fileStr, {
//             upload_preset: 'dev_setups',
//         });
//         console.log(uploadResponse);
//         res.json({ msg: 'yaya' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ err: 'Something went wrong' });
//     }
// });

const _uploadImages = async(req,res) => {
    console.log(req.body.url)
    try {
        const fileStr = req.body.url;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'mapper',
        });
        console.log(uploadResponse);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
}

module.exports = {
    _uploadImages,
    _getAllImages
}
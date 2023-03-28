const express = require("express")
const router = express.Router()

const {_uploadImages, _getAllImages} = require("../controllers/Content.js")

router.get("/images", _getAllImages);

router.post("/upload", _uploadImages)

module.exports = router
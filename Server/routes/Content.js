const express = require("express")
const router = express.Router()

const {_uploadImages, _getAllImages, _register, _login} = require("../controllers/Content.js")

router.get("/images", _getAllImages);

router.post("/upload", _uploadImages)

router.post("/register", _register)

router.post("/login", _login)

module.exports = router
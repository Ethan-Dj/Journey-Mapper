const db = require('../Database/db.js')

const getAllImages = () => {
    return db("testimg") 
    .select("*")
}

const uploadImages = (value) => {
    console.log("loading")
    return db("testimg")
    .insert(value)
}

module.exports = {
    getAllImages, 
    uploadImages
}





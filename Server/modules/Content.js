const db = require('../Database/db.js')

const getAllImages = () => {
    return db("testimg") 
    .select("id","url","lat","long")
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





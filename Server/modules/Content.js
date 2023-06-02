const db = require('../Database/db.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (value) => {
    try{
    const email = value.email
    console.log("working inside the login func")
    console.log("email,", email)
    const result = await db("users") 
        .select("*")
        .where("email", email)
        .returning("id")
    return result
    }
    catch (err){
        console.log(err)
    }
}

const register = async (value, token) => {
    const {email, password} = value;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password,salt);

    const obj = {email:email, password: hashPassword, token: token}
    const result = await db("users").insert(obj).returning('id');
    return result;
}

const getAllImages = (id) => {
    return db("testimg") 
    .select("*")
    .where("userid", id)
}

const getAll = () => {
    return db("testimg") 
    .select("*")
    // .where("journeyname", "asdfghjkl")
}

const getAllNames = () => {
    return db("users") 
    .select("*")
    .returning(["id","email"])
}

const uploadImages = (value) => {
    console.log("loading")
    return db("testimg")
    .insert(value)
}

module.exports = {
    getAllImages, 
    uploadImages,
    register, 
    login, 
    getAll, 
    getAllNames
}





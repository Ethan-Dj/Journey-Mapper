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
    .orderBy("id")
}

const getAll = () => {
    return db("testimg") 
      .select("*")
      .where("journeyname", "like", "%asdfghjkl%")
      .orderBy("id")
  }
  

const getAllNames = (ids) => {
    return db("users")
      .select("id", "email")
      .whereIn("id", ids);
  };

const uploadImages = (value) => {
    console.log("loading")
    return db("testimg")
    .insert(value)
}

const likeA = (value, journeyname) => {
    return db("testimg")
      .where("journeyname", "=", journeyname)
      .update({ likea: value });
  };
  
  const likeB = (value, journeyname) => {
    return db("testimg")
      .where("journeyname", "=", journeyname)
      .update({ likeb: value });
  };
  
  const likeC = (value, journeyname) => {
    return db("testimg")
      .where("journeyname", "=", journeyname)
      .update({ likec: value });
  };

module.exports = {
    getAllImages, 
    uploadImages,
    register, 
    login, 
    getAll, 
    getAllNames,
    likeA,
    likeB,
    likeC
}





const userModel = require('../models/userModels')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {generateAccessToken} =require('../config/authenticateToken')

const getUsers = async (req,res)=>{
  let user = await  userModel.find({})
  return res.json(user)
}
const getByEmail = async (req,res)=>{
  const email = req.body
  let user = await userModel.findOne({email})
  return res.json(user).status(200)
}   

const createUser = async (req,res)=>{
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
        //create new user
        const newUser = new userModel({
            name:req.body.name,
              img:req.body.img,
              username:req.body.username,
              email:req.body.email,
              password:hashedPassword,
              phone:req.body.phone,
        });  
    
        //save user and respond
        const user = await newUser.save();
        res.status(200).json(user._id);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
}
const login =async (req,res)=>{
 try {
    
    const user = await userModel.findOne({email:req.body.email});
    console.log(user);
    if(!user) return res.status(400).json('Wrong username or password')
    
    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    )
    if(!validPassword) return res.status(400).json('Wrong username or password')
    const refreshToken=jwt.sign({role:user.permissions,userId:user._id},process.env.REFRESH_TOKEN_SECRET)
    
    const token =generateAccessToken({role:user.permissions,userId:user._id})

    res.status(200).json({user,token,refreshToken})
    
  } catch (err) {
    res.status(500).json({err})
  }
}

const updateUser = async(req,res)=>{
  const id = req.params.id
  //generate new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  // Find the user by ID and update their name
  userModel.findById(id, (err, user) => {
  if (err) return handleError(err);
  // Update the user's name
  user.set({ password: hashedPassword });
  
  // Save the updated user
  user.save((err, updatedUser) => {
    if (err) return handleError(err);
    res.status(200).json(updatedUser);
  });
});



}


module.exports = {
    createUser,
    login,
    getUsers,
    getByEmail,
    updateUser
}

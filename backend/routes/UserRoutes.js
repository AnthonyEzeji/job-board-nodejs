const express = require('express')
const userModel = require('../models/UserModel')
const bcrypt = require('bcrypt')
const router =  express.Router()

router.post('/register',async (req,res)=>{

    let body = req.body

    try {
        var userCheck = null
        await userModel.findOne({email:body.email}).then(doc=>{
           if(doc){
               userCheck = doc
                res.send({message:'This e-mail address is signed up already. Please login.'})
           }else{
              userCheck = doc
           }
          })
          if(userCheck==null){
           const newUser = new userModel({email:body.email.toLowerCase(), firstName: body.firstName, lastName:body.lastName, password: body.password})
           const salt = await bcrypt.genSalt(10);
           newUser.password = await bcrypt.hash(newUser.password, salt);
           newUser.save().then((doc) => res.status(201).send(doc));
          }
        
     
    } catch (error) {
        console.log(error)
    }
})
router.post('/login',async(req,res)=>{

    try {
       const user = await userModel.findOne({email:req.body?.email.toLowerCase()})
       if(user){
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (validPassword) {
           
          res.status(200).json({ email:user.email, firstName:user.firstName, lastName: user.lastName, _id:user._id });
        } else {
          res.json({ message: "Invalid Password" });
        }
       } else {
        res.json({ message: "User does not exist" });
      }
    } catch (error) {
        console.log(error)
        res.send({message:error})
    }
})

module.exports = router
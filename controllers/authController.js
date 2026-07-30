const Usermodel = require('../models/Usermodel');
const bcrypt = require('bcrypt');

const register = async(req,res)=>{
    try{
        const { name , password , email} = req.body;

        //check exising user
        const existinguser = await Usermodel.findOne({email});

        if(existinguser){
            return res.status(400).json({
                success: false,
        message: "User already exists"
            })
        }
        const hashpwd = await bcrypt.hash(password , 10);

        //save
        const user = new Usermodel({name, email , password : hashpwd});

        await user.save();

        res.status(201).json({
            success : true,
            message : 'User registered successfull'
        });
    }catch(err){
        res.status(500).json({
      success: false,
      message: err.message
    });
    }
};
module.exports = { register };
import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup = async(req,res,next) =>{

    const{username, email,password} =req.body;
    const hasedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username, email,password:hasedPassword});

    try{  await newUser.save()
     res.status(201).json('user Created Successfully')
    } catch(error){
         next(errorHandler(550,'error from a function'));
    }
   
    console.log(req.body)

};
export const signin = async(req,res,next) =>{
    const {email ,password} =req.body;
    try {
        const validUser= await User.findOne({email:email});
        if(!validUser) return next(errorHandler(404,'User not Found!'));
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandler(401,'Invalid Credientials !'));
        const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
        const{password: pass, ...rest}=validUser._doc;
        res.cookie('access_token',token,{httpOnly: true,}).status(200).json(rest);

    } catch (error) {
        next(error) 
    }


};


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
        next(error); 
    }
};


export const google = async (req, res, next) => {
    try {
  
      // Check if the user exists
      const user = await User.findOne({ email:req.body.email});
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        const { password, ...rest } = user._doc;
        return res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json(rest);
      }
  
      // Generate a password and username for new users
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      // Create a new user
      const newUser = new User({
        username:req.body.name,
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
  
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  
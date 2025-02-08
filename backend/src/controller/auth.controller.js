import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js"; // Add the .js extension
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

// we handling signup where any post request come then what to do

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if(!fullName|| !email||!password){
          return res.status(400).json({message:"all field require"})//if any field is empty then send response all field required
        }
        
        if (password.length < 6) {
            return res.status(400).json({ message: "password must be at least 6 characters" });//if pswrd less then 6 
        }

        const user = await User.findOne({ email });//here checking user already exist or not
        if (user) {
            return res.status(400).json({ message: "email already exists" });
        }
        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //creating newUser
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });
        if (newUser) {
            // generate token
            const token = generateToken(newUser._id, res);

            await newUser.save();//saving user in database
            res.status(201).json({id:newUser._id,
                email:newUser.email,
                profilePic:newUser.profilePic
            });// sending response if user successfully created
            }else{
                res.status(400).json({message:"invalid user data"});
            }
    } catch (error) {
        console.log("erron in signup controller",error.message)
        return res.status(500).json({ message: "internal server error" });
    }
};
//handling login functionality
export const login = async(req, res) => {
    const {email, password}=req.body
    try {
        const user = await User.findOne({email})
        if (!user){
            return res.status(400).json({message:"invalid credential"})
        }
        const isCorrect=await bcrypt.compare(password,user.password);
        if(!isCorrect){
            return res.status(400).json({message:"invalid credential"});
        }
        generateToken(user._id,res)
        res.status(200).json({id:user._id,
            email:user.email,
            profilePic:user.profilePic})

        
    } catch (error) {
        console.log("erron in login controller",error.message)
        return res.status(500).json({ message: "internal server error" });
    }
   
};

export const logout = (req, res) => {
   try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({
        message:"logout successfully"
    })
   } catch (error) {
    
   }
};
export const updateProfile =async(req,res)=>{
   try {
    const {profilePic}=req.body;
    const userId=req.user._id
    if(!profilePic){
        return res.status(400).json({message:"profile pic is required"})
    }
    const uploadResponse=await cloudinary.uploader.upload(profilePic)
    const updateUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})
    res.status(200).json(updateUser)
   } catch (error) {
    console.log("error in update profile",error)
    res.status(500).json({messagge:"internal server error"});
   } 
};
export const checkAuth=(req,res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("error in checkauth controller",error.message);
       res.status(500).json({message:"Internal server error"});
    }
};
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


const userAuthorization =async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
     try{
        token = req.headers.authorization.split(" ")[1];
    
        const userDecoded = jwt.verify(token,process.env.JWT_TOKEN);
      console.log(userDecoded);
        req.user = await User.findById(userDecoded.id).select("-password");
        console.log(req.user);
        res.status(201).json({message:"Authorized user"});
        next();
     }catch(err){
       res.json(400).json({err:err.message,
        message: "Not authorized"
       });
     }
    }
    if(!token){
       
        res.status(400).json({message:"No token not authorized"});
    }
  
}
export default {userAuthorization };
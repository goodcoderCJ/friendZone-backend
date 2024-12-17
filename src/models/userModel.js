import  mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        trim:true,
        required:"Name is a required field",
    },
   email: {
        type: String,
        unique: "Email already exists",
        trim: true,
        match:[/.+\@.+\..+/, "Please fill a valid email"],
        require:"Email is required"
    },
    password:{
        type:String,
        trim: true,
        required: "Password is required"
        
    }
    
},
{timestamps:true})
export default mongoose.model("User", UserSchema);
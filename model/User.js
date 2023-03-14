import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  userName: { type: String, default: null },
  email: {
    type: String,
    unique: true,
    required: [true, "Please Provide Email"],
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
    select:false
  },
  token: { type: String },
});
userSchema.pre('save',async function(){
	if(!this.isModified('password')) return

	const salt=await bcrypt.genSalt(12)
	this.password=await bcrypt.hash(this.password,salt)
})
userSchema.methods.comparePassword=async function (candidatePassword){
	const isMatch=await bcrypt.compare(candidatePassword,this.password)
	return isMatch
}
userSchema.methods.createJWT=function(){
  return jwt.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})
}

export default mongoose.model("User", userSchema);

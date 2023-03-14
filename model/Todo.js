import mongoose from "mongoose";

const TodoSchema=new mongoose.Schema({
	todo:{
		type:String,
		required:[true,"Please provide all the values"]
	},
	createdBy:{
		type:mongoose.Types.ObjectId,
		ref:'User',
		required:[true,"Please provide user"]
	}
})

export default mongoose.model("Todo",TodoSchema)
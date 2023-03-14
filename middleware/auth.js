import  jwt from "jsonwebtoken";

const auth =(req,res,next)=>{
	const headers=req.headers
	const authHeader=req.headers.authorization
	

	if(!authHeader || !authHeader.startsWith('Bearer')){
		res.status(400).send("Authentication Invalid")
	}

	const token=authHeader.split(' ')[1]
	try{
		const payload=jwt.verify(token,process.env.JWT_SECRET)
		req.user={userId:payload.userId}
		next()
	}catch(err){
		res.status(400).send(err)
	}
}
export default auth
const errorHandlerMiddleware=(err,req,res,next)=>{
	console.log(err);
	const defaultError={
		statusCode:500,
		msg:err.message || 'Something went wrong, try again later'
	}
	if(err.name==='ValidationError'){
		defaultError.statusCode=400
		defaultError.msg=err.message
	}
	//res.status(defaultError.statusCode).json({msg:err})
	res.status(defaultError.statusCode).json({msg:defaultError.msg})
}

export default errorHandlerMiddleware
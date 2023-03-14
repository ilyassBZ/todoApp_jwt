
const checkPermissions=(requestUser,resourceUserId)=>{
	if(requestUser.userId === resourceUserId.toString()) return

	resourceUserId.status(400).send("Not authorized to access this route")
}

export default checkPermissions
function allowedRoles(...roles) {
    return ( (req, res, next) => {
        const {role} = req.user;
        console.log(role);

        if(!role){
            return res.status(400).json({message:"User role not found"})
        }
        //verify user role
        if(!roles.includes(role)){
            return res.status(403).json({message:"Unauthorized"})
        }
        next()
    }
    )
}

export default allowedRoles;
const errorHandler= (err, req, res, next) => {
    console.log(err);
    return res.status(500).json({message:"500: error handling under development"});
}

export default errorHandler;
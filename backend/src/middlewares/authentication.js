import {decode} from "../utils/jwt.js";


/**
 @description - accepts session cookies and produces req.user
 */

const authenticate = (req, res, next) => {
    const {access, refresh} = req.cookies;
    console.log(req.cookies);

    if(!access || !refresh ){
        return res.status(400).json({message:"session cookies required"})
    }

    //assigning req.user
    const userData = decode(access);
    req.user = userData;
    next();
}

export default authenticate;
import hash from "../../utils/hash.js";
import {User} from "./auth.models.js";
import {encode} from "../../utils/jwt.js";
import { optional } from "zod";
import  sequelize  from "../../config/db.js";

/**
@description regeister user and generate session tokens
@param {object} -expects username, email, password  and confirm password 
@returns {void} does not retun any data just cookies
*/

export const register = async (req, res, next) => {
    const {username, email, password, confirm} = req.body;

    //password and confirm password must match
    if(password !== confirm){
        return res.status(400).json({message:"400: Password does not match"})
    }
    //check if user exists
    const count = await User.count({where:{"username":username}});
    if(count !== 0){
        return res.status(400).json({message:"User already exists, please login"});
    }
    try{
        //hash password
        const password_hash = await hash(password);

        await sequelize.transaction( async(t) => {
            //create user
            const instance =await User.create({
                username:username,
                email:email,
                password:password_hash
                },
            {
                transaction:t
                }
            );

            const {username:user, email:userEmail} = instance;

            //generate session tokens
            const {access, refresh} = encode(user, userEmail);

            //set cookies
            const cookieOptions = {
                secure:true,
                sameSite:'none',
                httpOnly:true,
            }

            res.cookie("access", access, {...cookieOptions, maxAge: 15 * 60 * 1000});
            res.cookie("refresh", refresh, {...cookieOptions, maxAge: 24 * 60 * 60 * 1000});

            //return 
            return res.status(201).json({message:"Registred successfully"})
        })

    } catch (err) {
        next(err);
    }
}

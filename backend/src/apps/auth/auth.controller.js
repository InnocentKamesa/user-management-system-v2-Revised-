import hash from "../../utils/hash.js";
import {User} from "../../models/user.models.js";
import {encode} from "../../utils/jwt.js";
import { optional } from "zod";
import  sequelize  from "../../config/db.js";
import bcrypt from "bcrypt";

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



/**
@description - user login and return auth session cookies
@param {object} - expects email and password for login 
@returns {void} - returns auth session cookies (access, refresh)
*/
export const login = async (req, res, next) => {
    const {email, password} = req.body;

    try{
        //user exists
        const user = await User.findOne({where:{email:email}});

        if(user === null){
            return res.status(404).json({message:"User not found, please register"});
        }

        //verify password
        const password_hash = user.password;
        const passwordMatch = await bcrypt.compare(password, password_hash);

        if(!passwordMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }

        //generate session cookies
        const {access, refresh} = encode(user.username, user.email); 

        //set cookies
        const cookieOptions = {
            httpOnly:true,
            sameSite:"none",
            secure:true
        }

        res.cookie("access", access, {...cookieOptions, maxAge: 15 * 60 * 1000});
        res.cookie("refresh", refresh, {...cookieOptions, maxAge: 24 * 60 * 60 * 1000});
        
        return res.status(200).json({message:"Login successful"});

    } catch(err){
        next(err);
    }
}
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.JWT_SECRET;
//generate tokens
export const encode = (username, email, role) => {

    //config variables
    const payload = {username, email, role};

    const access = jwt.sign(payload, SECRET, {expiresIn:"15m"});
    const refresh = jwt.sign(payload, SECRET, {expiresIn:"1d"});

    return {access, refresh}
}

export const decode = (token) => {
    try{
        const userData = jwt.verify(token, SECRET);
        return userData

    } catch (error){
        console.log("JWT decode error: ", error);
        throw new Error("Failed to decode session token:")
    }

}
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//generate tokens
export const encode = (username, email) => {

    //config variables
    const secret = process.env.JWT_SECRET;
    const payload = {username, email};

    const access = jwt.sign(payload, secret, {expiresIn:"15m"});
    const refresh = jwt.sign(payload, secret, {expiresIn:"1d"});

    return {access, refresh}
}
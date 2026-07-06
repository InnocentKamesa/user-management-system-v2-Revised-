import { where } from "sequelize";
import {Profile} from "../../models/user.models.js";

/** 
@typedef {Object} ProfileInput
 * @property {string} fullName - User's legal full name.
 * @property {string} phoneNumber - Active contact mobile number.
 * @property {string} [bio] - Optional short professional background description.
 */

export const createProfile = async(req, res, next) => {
    const {phone, first, last} = req.body;
    const {id} = req.user;

    //verifying user id
    if(!id){
        return res.status(400).json({message:"user id required"});
    }

    try{
    //verify profile exists
    const exists = await Profile.count({
        where:{userId:id}
    });

    if(exists){
        res.status(400).json({message:"Profile for target user already exists"});
    }

    //create profile
    const profile = await Profile.create({userId:id, first:first, last:last, phone:phone});

    //return 
    return res.status(201).json({message:"Successfully created profile"});

    }
    catch (error){
        next(error);
    }
}
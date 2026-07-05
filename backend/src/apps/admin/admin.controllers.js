import {User} from "../../models/user.models.js";
import {registerService, userExists} from "../auth/services/auth.services.js";

/**
 * @description - retrieves paginated users
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */


export const getAll = async (req, res, next) => {

    //ensuring pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit

    try{
        const {count, rows} = await User.findAndCountAll({
            limit,
            offset,
            order: [["createdAt", "DESC"]]
    })
        //return
        return res.status(200).json({
            users:rows,
            totalUsers:count,
            currentPage:page,
            totaPage: Math.ceil((count / limit))
        })
    } catch(error) {
        next(error)
    }
}

/**
 * @description - retrieves a user by id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

export const getUserById = async (req, res, next) => {
    const {id} = req.params;

    try{
        // fetch user
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }
        return res.status(200).json({
            user
        })
    } catch(error) {
        next(error)
    }
}

/**
 * @description - allows admin to add user, accepts userrname, email, password
 * @param {object} - accepts username, email, password.
 */

export const addUser = async (req, res, next) => {
    const {username, email, password, role} = req.body;

    //verify roole choices
    const ROLE_CHOICES = ["Administrator", "Standard", "Moderator"];
    if(!role || !ROLE_CHOICES.includes(role)){
        return res.status(400).json({message:"Invalid role choice"});
    }

    //check if user exists
    try{
        const exists = await userExists(email);
        if(exists){
            return res.status(400).json({message:"User already exists"});
        }
    }
    catch (err){
        next(err)
    }

    //create user
    try{
        const {username:user, email:userEmail, role} = await registerService(username, email, password);

        //return
        return res.status(201).json({message:"Successfully created user"})
    }
    catch (err) {
        next(err)
    }
}
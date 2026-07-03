import {User} from "../../models/user.models.js";

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
            totaPage: Math.cell(count / limit)
        })
    } catch(error) {
        next(error)
    }



}
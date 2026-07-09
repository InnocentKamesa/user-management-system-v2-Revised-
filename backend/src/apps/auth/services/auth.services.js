import sequelize from "../../../config/db.js";
import { User } from "../../../models/user.models.js";
import hash from "../../../utils/hash.js";


export async function registerService(username, email, password) {
    //hash password
    const password_hash = await hash(password);

    //create user
    const instance = await User.create({
        username: username,
        email: email,
        password: password_hash,
        is_active:true
    });

    const { username:user, email:userEmail, role } = instance;
    return {
        user, userEmail, role
    }

}


export async function userExists(email) {
    //verify user
    const count = await User.count({ where: { "email": email } });
    if (count !== 0) {
        return true
    }
    return false;
}
import sequelize from "../../config/db.js";
import { DataTypes } from "sequelize";

//user model
export const User = sequelize.define("users", {
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    is_active:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    role:{
        type:DataTypes.ENUM('user', 'moderator', 'admin'),
        allowNull:false,
        defaultValue:'user',
        validate:{
            isIn:{
                args:[['user', 'moderator', 'admin']],
                msg:'Unsupported user role'
            }
        }
    }
}, {
    timestamps:true
});
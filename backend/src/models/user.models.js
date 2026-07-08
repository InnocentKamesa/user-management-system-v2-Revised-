import { defaultValueSchemable } from "sequelize/lib/utils";
import sequelize from "../config/db.js";
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
        type:DataTypes.ENUM('Standard', 'Moderator', 'Administrator'),
        allowNull:false,
        defaultValue:'Standard',
        validate:{
            isIn:{
                args:[['Standard', 'Moderator', 'Administrator']],
                msg:'Unsupported user role'
            }
        }
    }
}, {
    timestamps:true,
    defaultScope:{
        attributes: {exclude: ['password'] }
    },
    scopes:{
        withPassword:{
            attributes:{}
        }
    }
});

//user profiles
export const Profile = sequelize.define("profiles", {
    first:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    last:{
        type:DataTypes.STRING(50),
        allowNull:false
    },
    profile_url:{
        type:DataTypes.STRING(255),
        allowNull:true
    },
    phone:{
        type:DataTypes.STRING(15),
        allowNull:true
    }
},
    {
        timestamps:true
    }
);

//associations
Profile.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate:'CASCADE'
});

User.hasOne(Profile, {foreignKey:'userId'});
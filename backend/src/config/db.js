import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config()

//modifying pool for specific system environment
const env = process.env.ENVIRONMENT;
let sequelize = null;

if(!env){
    const err = new Error("500: Failed to identify system environment")
    err.status = 500;
    throw err;
}

if(env === "development"){
    sequelize = new Sequelize(
        process.env.LOCAL_DB,
        process.env.LOCAL_USER,
        process.env.LOCAL_PASS,
        {
            host:process.env.LOCAL_HOST,
            port:process.env.LOCAL_DB_PORT,
            logging:console.log,
            dialect:'postgres'
        }
    )
}
/** 
else if(env === "production"){
    pool = new Pool({
        connectionString:process.env.HOSTED_DB,
        ssl:{
            rejectUnAuthorized:false
        }
    })
}
*/

//validating pool
if(!sequelize){
    throw new Error("500: Database connection failed")
}

export default sequelize;

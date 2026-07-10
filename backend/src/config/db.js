import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config()

//modifying pool for specific system environment
const env = process.env.ENVIRONMENT;
let sequelize = null;

if (!env) {
    const err = new Error("500: Failed to identify system environment")
    err.status = 500;
    throw err;
}

if (env === "development") {
    sequelize = new Sequelize(
        process.env.LOCAL_DB,
        process.env.LOCAL_USER,
        process.env.LOCAL_PASS,
        {
            host: process.env.LOCAL_HOST,
            port: process.env.LOCAL_DB_PORT,
            logging: console.log,
            dialect: 'postgres'
        }
    )
}
else if (env === "production") {
        sequelize = new Sequelize(SUPABASE_DB_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,                   // Enforces SSL connections
                rejectUnauthorized: false        // Necessary for direct pooler connections if you don't supply root certs
            }
        },
        logging: false                       // Set to true if you want to view SQL queries in logs
    });

    // Test the connection
    async function testConnection() {
        try {
            await sequelize.authenticate();
            console.log('Successfully connected to Supabase PostgreSQL via Sequelize! 🚀');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    testConnection();

}

//validating pool
if (!sequelize) {
    throw new Error("500: Database connection failed")
}

export default sequelize;

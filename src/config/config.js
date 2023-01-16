import dotenv from 'dotenv';

dotenv.config()

export default {
    mongo : {
        user : process.env.MONGO_USER,
        password : process.env.MONGO_PASSWORD,
        db : process.env.MONGO_DATABASE
    }
}
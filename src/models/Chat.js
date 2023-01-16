import mongoose from "mongoose";

const collection = 'chatHistorial'
const schema = new mongoose.Schema({
    author: {
        mail : {
            type: String,
            required: true
        },
        first_name : {
            type: String,
            required: true
        },
        last_name : {
            type: String,
            required: true
        },
        alias : {
            type: String,
            required: true
        },
        avatar : {
            type: String,
            required: true
        },
        age : {
            type: Number,
            require: true
        }
    },
    message: {
        timestamp : {
            type: String,
            required: true
        },
        text : {
            type: String,
            required: true
        }
    }
})

const chatModel = mongoose.model(collection, schema);

export default chatModel;
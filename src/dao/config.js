import mongoose from 'mongoose';
import ProductsFS from './product/ProductsFS.js';
import ProductsMongoDb from './product/ProductsMongoDb.js';
import CartFs from './cart/CartFS.js'
import CartMongoDb from './cart/CartMongoDb.js'
import chatHistorial from './messages/ChatMongoDb.js';
import UsersMongoDb from './users/UsersMongoDb.js'
import config from '../config/config.js';

let Products
let Carts
let Chat
let Users

const PERSISTENCIA = "MONGODB"

if (PERSISTENCIA === "FILESYSTEM") {
    Products = ProductsFS
    Carts = CartFs
} else if (PERSISTENCIA === "MONGODB") {
    Products = ProductsMongoDb
    Carts = CartMongoDb
    Chat = chatHistorial
    Users = UsersMongoDb
    const connection = mongoose.connect(`mongodb+srv://${config.mongo.user}:${config.mongo.password}@codercluster.h6dtsj6.mongodb.net/${config.mongo.db}?retryWrites=true&w=majority`, error => {
        if (error) console.log(`Error al conectar a ${config.mongo.db}` + error);
        else console.log(`Se conectó a ${config.mongo.db}`)
    })
} else {
    console.log(`Error al conectar con ${PERSISTENCIA}`)
}

export { Products, Carts, Chat, Users }
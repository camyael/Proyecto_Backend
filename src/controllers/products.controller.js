import { Products } from "../dao/config.js";
import generateProducts from "../config/faker.js";

const productos = new Products
const PORT = process.env.PORT || 8080;

const test = (req, res) => {
    const allProducts = []
    for (let i = 0; i < 7; i++) {
        allProducts.push(generateProducts())
    }
    res.send(allProducts)
}

const newProd = async (req, res) => {
    // incorporar productos al listado (disponible para administradores)
    const newProduct = req.body
    const date = new Date().toLocaleString()
    if (req.file) {
        const image = req.protocol+"://"+req.hostname+':'+PORT+'/images/products/'+req.file.filename;
        newProduct.image = image
        await productos.save(newProduct, date)
    } else {
        await productos.save(newProduct, date)
    }
    res.redirect('/products')
}

const prodById = async (req, res) => {
    // un producto por su id (disponible para usuarios y administradores)
    const id = req.params.pid
    const resultado = await productos.getById(req, id)
    res.render('products/itemDetail', {
        resultado
    })
}

const updateProd = async (req, res) => {
    // actualiza un producto por su id (disponible para administradores)
    const id = req.params.pid
    const updateData = req.body.price
    const resultado = await productos.getById(req, id)
    if(resultado) await productos.putById( id, updateData)
}

const deleteProd = async (req, res) => {
    // borra un producto por su id (disponible para administradores)
    if(req.params.pid) {
        const id = req.params.pid
        await productos.deleteById(id)
    } else if (req.body) {
        const del = req.body
        await productos.deleteById(del)
    }
}

export default {
    test,
    newProd,
    prodById,
    updateProd,
    deleteProd
}
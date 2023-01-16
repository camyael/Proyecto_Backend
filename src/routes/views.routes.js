import { Router } from "express";
import { Products, Carts } from "../dao/config.js";

const router = Router();

const administrator = true;
const productos = new Products;
const cart = new Carts;

router.get('/', (req, res) => {
    const session = req.session.user
    res.render('home', {
        session
    })
})

router.get('/products', async (req, res) => {
    // listar todos los productos disponibles
    const allProducts = await productos.getAll()
    res.render('products/products', {
        allProducts,
        administrator
    })
})

router.get('/carts', async (req, res) => {
    const allCarts = await cart.getAll()
    res.render('carts', {
        allCarts
    })
})

router.get('/chat', (req, res) => {
    res.render('chat')
})

export default router;
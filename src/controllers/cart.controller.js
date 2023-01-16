import { Carts } from "../dao/config.js";

const cart = new Carts;

const newCart = async (req, res) => {
    // Crea un carrito y devuelve su id.
    const timestamp = new Date().toLocaleString()
    await cart.newCart( timestamp )
}

const deleteCart = async (req, res) => {
    // Vacía un carrito y lo elimina.
    const id = req.params.cid
    await cart.deleteCart(id)
}

const prodCarts = async (req, res) => {
    // Me permite listar todos los productos guardados en el carrito
    const id = req.params.cid
    const findCart = await cart.getById(id)
    const cartProd = findCart.products
    res.render('cart',{
        cartProd
    })
}

const newprodCarts = async (req, res) => {
    // Para incorporar productos al carrito por su id de producto
    const id = req.params.cid
    const prodId = req.body.id
    const prodQntfy = req.body.quantify
    const prod = {
        "id" : prodId,
        "quantify" : prodQntfy
    }
    await cart.postInCart(id, prod)
}

const deleteprodCarts = async (req, res) => {
    // Eliminar un producto del carrito por su id de carrito y de producto
    const idCart = req.params.cid
    const idProd = req.params.pid
    await cart.deleteProducts(idCart, idProd)
}

export default {
    newCart,
    deleteCart,
    prodCarts,
    newprodCarts,
    deleteprodCarts
}
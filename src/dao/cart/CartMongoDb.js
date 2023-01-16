import ContainerMongoDb from '../../container/ContainerMongoDb.js'
import cartsModel from '../../models/Carts.js'

class CartMongoDb extends ContainerMongoDb {
    constructor() {
        super(cartsModel)
    }

    async newCart ( timestamp ) {
        const newCart = {
            "timestamp" : timestamp,
            "products" : []
        }
        await cartsModel.create(newCart)
    }

    async deleteCart ( id ) {
        const findCart = await cartsModel.find({_id: id})
        if (!findCart) console.log(`Carrito ${id} no encontrado`)
        else {
            const result = await cartsModel.deleteOne({_id: id})
            console.log(result)
        }
    }

    async postInCart ( id, prod ) {
        const findCart = await cartsModel.findById(id)
        let productos = findCart.products
        const idArray = productos.map( e => e.id)
        const indice = idArray.indexOf(prod.id)
        console.log(indice)

        if (indice != -1) {
            const update = productos.find(e => e.id == prod.id)
            let qntifyold = update.quantify
            const actualizado = productos.map(e => {
                return {
                    id: e.id,
                    quantify: e.quantify
                }
            })
            actualizado[indice].quantify = qntifyold + prod.quantify
            const result = await cartsModel.updateOne({_id: id}, {$set: {products: actualizado}})
            console.log(result)
        } else {
            const result = await cartsModel.updateOne({_id: id}, {$push: {products: prod}})
            console.log(result)
        }
    }

    async deleteProducts ( idCart, idProd ) {
        const cart = await cartsModel.findById(idCart)
        let prodArray = cart.products
        const delID = prodArray.map( e => e.id )
        const indice = delID.indexOf(idProd)
        prodArray.splice(indice, 1)
        const result = await cartsModel.updateOne({_id: idCart}, {$set: {products: prodArray}})
        console.log(result)
    }    
}
export default CartMongoDb;
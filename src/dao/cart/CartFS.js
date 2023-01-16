import fs from 'fs'
import ContainerFS from '../../container/ContainerFS.js'

class CartFS extends ContainerFS {
    constructor() {
        super('carts')
    }

    async newCart ( timestamp ) {
        const carts = await this.getAll()
        let id
        const newCart = {
            "id" : id,
            "timestamp" : timestamp,
            "products" : []
        }
        if (carts === 0) newCart.id = 1
        else {
            id = carts.length + 1
            newCart.id = id
        }
        carts.push(newCart)
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
        return newCart.id
    }

    async deleteCart ( id ) {
        const carts = await this.getAll()
        const idArray = carts.map(e => e.id)
        const indice = idArray.indexOf(parseInt(id))
        if (indice != -1) {
            carts.splice(indice, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
        }
    }

    async postInCart ( id, prod ) {
        const productos = await this.getAll()
        const prodArray = productos[id - 1].products
        const comprobarID = prodArray.some(e => e.id === prod.id)

        // comprobamos si el producto ya existe y si existe, solo suma la cantidad
        if(!comprobarID) {
            productos[id - 1].products.push(prod)
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2))
        } else {
            const idArray = productos[id - 1].products.map(e => e.id)
            const indice = idArray.indexOf(prod.id)
            const qntfyOld = productos[id - 1].products[indice].quantify
            productos[id - 1].products[indice].quantify = qntfyOld + prod.quantify
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2))
        }
    }

    async deleteProducts ( idCart, idProd ) {
        const carts = await this.getAll()
        let prodArray = carts[idCart - 1].products
        const delID = prodArray.map( e => e.id )
        const indice = delID.indexOf(parseInt(idProd))
        prodArray.splice(indice, 1)
        carts[idCart - 1].products = prodArray
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
    }
}

export default CartFS;
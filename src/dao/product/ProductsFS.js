import fs from 'fs'
import ContainerFS from '../../container/ContainerFS.js'

class ProductsFS extends ContainerFS {
    constructor(){
        super('products')
    }

    async save ( add , date ) {
        const all = await this.getAll()
        const code = Math.floor(Math.random() * 99999)
        if(all === 0) {
            add._id = 1
            add.timestamp = date
            add.code = code
            all.push(add)
            await fs.promises.writeFile(this.path, JSON.stringify(all, null, 2))
        } else {
            const id = all.length + 1
            add._id = id
            add.timestamp = date
            add.code = code
            all.push(add)
            await fs.promises.writeFile(this.path, JSON.stringify(all, null, 2))
        }
    }
    
    async putById ( id , datos, date ) {
        const data = await this.getAll()
        const idArray = data.map(e => e._id)
        const indice = idArray.indexOf(parseInt(id))
        if (indice != -1) {
            const newItem = datos
            newItem._id = indice + 1
            newItem.timestamp = date
            data[indice] = newItem
            await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2))
        } else {
            return {error: 'producto no encontrado'}
        }
    }

    async deleteById ( id ) {
        const datos = await this.getAll()
        const idArray = datos.map(e => e._id)
        const indice = idArray.indexOf(parseInt(id))
        if (indice != -1) {
            datos.splice(indice, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(datos, null, 2))
            return {message: "Producto borrado con éxito"}
        } else {
            return {message: "Producto no encontrado"}
        }
    }
}

export default ProductsFS
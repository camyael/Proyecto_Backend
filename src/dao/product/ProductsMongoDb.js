import ContainerMongoDb from "../../container/ContainerMongoDb.js";
import productsModel from "../../models/Products.js";

class ProductsMongoDb extends ContainerMongoDb {
    constructor() {
        super(productsModel)
    }

    async save ( add , date ) {
        const code = Math.floor(Math.random() * 99999)
        add.timestamp = date
        add.code = code
        await productsModel.create(add)
    }

    async putById ( id , datos) {
        const result = await productsModel.updateOne({_id: id}, {$set: {price: datos}})
        // console.log(result)
    }

    async deleteById ( id ) {
        await productsModel.deleteOne({_id: id})
    }
}

export default ProductsMongoDb


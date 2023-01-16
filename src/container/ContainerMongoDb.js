import mongoose from "mongoose";

class ContainerMongoDb {
    constructor(collection) {
        this.collection = collection
    }

    async getAll () {
        return await this.collection.find()
    }

    async getById ( req, id ) {
        try {
            const result = await this.collection.findById(id)
            return result
        } catch {
            return req.logger.error(`No existe ${id}`)
        }
    }

    async disconnect () {
        mongoose.connection.close()
    }
}

export default ContainerMongoDb;
import ContainerMongoDb from "../../container/ContainerMongoDb.js";
import chatModel from "../../models/Chat.js";

class chatHistorial extends ContainerMongoDb {
    constructor() {
        super(chatModel)
    }

    async save ( add ) {
        await chatModel.create(add)
    }
}

export default chatHistorial;
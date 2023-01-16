import ContainerMongoDb from '../../container/ContainerMongoDb.js';
import usersModel from '../../models/Users.js';

class UsersMongoDb extends ContainerMongoDb {
    constructor() {
        super(usersModel)
    }

    async save ( addUser ) {
        const result = await usersModel.create(addUser)
        return result
    }

    async findUser ( mail ) {
        const result = await usersModel.findOne({mail: mail})
        return result
    }
}

export default UsersMongoDb;
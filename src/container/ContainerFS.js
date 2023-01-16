import fs from 'fs';
import __dirname from '../utils.js';

class ContainerFS {
    constructor(path) {
        this.path = `${__dirname}/files/${path}.json`
        this.creat()
    }

    async creat () {
        if(!fs.existsSync(this.path)) {
            await fs.promises.writeFile(this.path, JSON.stringify([]))
        }
    }

    async getAll () {
        const getAll = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        return getAll
    }

    async getById ( id ) {
        const all = await this.getAll()
        const result = all.find(e => e.id == id)
        return result
    }
}

export default ContainerFS
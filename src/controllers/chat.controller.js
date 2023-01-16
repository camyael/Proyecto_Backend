import { Chat } from "../dao/config.js";
import { normalize, schema } from "normalizr";

const chat = new Chat;

const arrayChat = async () => {
    const all = await chat.getAll()
    return all.map(e => {
        const allModificado = {
            author: e.author,
            message: e.message,
            _id: e._id.valueOf()
        }
        return allModificado
    })
}

const all = await arrayChat()

const chatHistorial = {
    id: "mensajes",
    historial : all
}

const normalizr = () => {
    const messageEntity = new schema.Entity('message')
    const authorEntity = new schema.Entity('author')
    const mensaje = new schema.Entity('mensajeCompleto', {
        author: [authorEntity],
        message: [messageEntity]
    }, { idAttribute: "_id" }) // un compañero sugirio hacer esto para eliminar el _id, y esto me soluciono problemas con el id al normalizarlo
    const historial = new schema.Entity('historial', {
        historial: [mensaje]
    })

    const normalizedData = normalize(chatHistorial, historial)
    return normalizedData
    //console.log(JSON.stringify(normalizedData, null, '\t'))
}

const chatNormalizr = (req, res) => {
    res.send(normalizr())
}

export default {
    chatNormalizr
}
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import productsRoute from './routes/products.routes.js';
import cartRoute from './routes/cart.routes.js';
import loginRoute from './routes/users.routes.js';
import chatRoute from './routes/chat.routes.js';
import apiRandoms from './routes/numRandoms.routes.js';
import views from './routes/views.routes.js';
import { Server } from "socket.io";
import { Products, Chat } from './dao/config.js';
import __dirname from './utils.js';
import passport from 'passport';
import Strategy from './config/passport.js';
import config from './config/config.js';
import cluster from 'cluster';
import os from 'os'
import { addLogger } from './config/logger.js';

const app = express()
const PORT = process.env.PORT || 8080;
const CPUs = os.cpus().length;
const procArgv = process.argv[2];

if(procArgv == 'CLUSTER') {
    if(cluster.isPrimary) {
        console.log(`Proceso primario con PID ${process.pid} ejecutandose`)
        for (let i = 0; i < (CPUs/2); i++) {
            cluster.fork()
        }
    } else {
        console.log(`Proceso worker con PID ${process.pid} ejecutandose`)
        app.listen(PORT, () => console.log("Listening..."))
    }
} else {
    console.log(`Proceso PID ${process.pid} ejecutandose`)
    const server = app.listen(PORT, () => console.log("Listening..."))

    const io = new Server(server)

    const productos = new Products
    const chatMessage = new Chat

    io.on('connection', async socket => {
        console.log('Socket has been connected')

        io.emit('productos', await productos.getAll())

        socket.on('message', async data => {
            await chatMessage.save(data)
            const message = await chatMessage.getAll()
            socket.emit('logs', message)
            io.emit('logs', message)
        })

        socket.on('authenticated', data => {
            socket.broadcast.emit('newUserConnected', data)
        })
    })
}

// conecta con el logger
app.use(addLogger)

app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${config.mongo.user}:${config.mongo.password}@codercluster.h6dtsj6.mongodb.net/${config.mongo.db}?retryWrites=true&w=majority`,
        ttl: 600
    }),
    secret: 'Coder19827632',
    saveUninitialized: false,
    resave: false
}))

// inicio de estrategias
Strategy()
// inicio de passport
app.use(passport.initialize())
// conecta con nuestro session
app.use(passport.session())


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))

// <--- VISTAS --->
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use('/', views)

// <--- RUTAS --->
app.use('/products', productsRoute)
app.use('/carts', cartRoute)
app.use('/chat', chatRoute)
app.use('/api/randoms', apiRandoms)
app.use('/', loginRoute)

// * son rutas que no existen
app.get('*', (req, res) => {
    const warn = "No existe la ruta"
    req.logger.warning(`Método ${req.method} en ${req.url} - ${warn}`)
    res.status(400).send({status: "error", playload: warn})
})

app.get('/info', (req, res) => {
    const info = {
        argumentos_de_entrada : process.argv,
        sistema_operativo : process.platform,
        nodeJS_version : process.version,
        memoria_total_reservada : process.memoryUsage(),
        path_de_ejecucion : __dirname,
        process_id : process.pid,
        carpeta_del_proyecto : process.cwd()
    }
    res.send({info})
})
import winston from 'winston';

const logger = winston.createLogger({
    levels : {
        error: 0,
        warning: 1,
        info: 3
    },
    // transportes: diferentes medios que va a tomar el logger para poder llevar su trabajo
    transports: [
        new winston.transports.Console({level: 'info'}),
        new winston.transports.File({level: 'warning', filename: './src/log/warn.log'}),
        new winston.transports.File({level: 'error', filename: './src/log/error.log'})
    ]
})

export const addLogger = (req, res, next) => {
    // al mandarlo por req, no es necesario importar en cada ruta
    req.logger = logger;
    req.logger.info(`Método ${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}
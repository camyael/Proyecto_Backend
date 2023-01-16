import passport from 'passport';
import local from 'passport-local';
import { Users } from '../dao/config.js';
import { createHash, validatePassword } from './bcrypt.js';

const localStrategy = local.Strategy;

const users = new Users;

const Strategy = () => {
    // primer parametro: nombre de la estrategia, segundo: la estrategia
    // done(null) -> null: error en el callback 
    // usernameField indica si se pasa otro nombre como username

    passport.use('login', new localStrategy({usernameField: 'mail'}, async(mail, password, done) => {
        try {
            if (!mail || !password) return done(null, false, {message: "Los datos estan incompletos"});
            const userFind = await users.findUser(mail)
            const isValidPassword = await validatePassword(userFind, password);
            if (!userFind) return done(null, false, {message: "El usuario no existe"});
            if(!isValidPassword) return done(null, false, { message: "La contraseña es incorrecta"});
                
            done(null, userFind);
        
        }
        catch(error) {
            done(error)
        }
    }))

    passport.use('register', new localStrategy({passReqToCallback: true ,usernameField: 'mail'}, async(req, mail, password, done) => {
        try {
            const { first_name, last_name } = req.body;

            if(!first_name || !last_name) return done(null, false, {message: "Valores incompletos"})

            const exist = await users.findUser(mail)
            if(exist) return done(null, false, {message: "El usuario ya existe"})

            const hashedPassword = await createHash(password) // hashea la contra del usuario
            const user = {
                first_name,
                last_name,
                mail,
                password: hashedPassword
            }
            const result = await users.save(user)
            // sale todo bien
            done(null, result)
        }
        catch(error) {
            done(error)
        }
    }))

    // recibe el usuario, lo ejecuta y se guarda en su memoria
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    // recibe el id y devuelve el usuario
    passport.deserializeUser(async(id, done) => {
        const result = await users.findUser({_id: id});
        return done(null, result)
    })
}

export default Strategy;
// login
const login = (req, res) => {
    const session = req.session.user
    res.render('login/login', {
        session
    })
}

const loginPost = async (req, res) => {
    const user = req.user
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        mail: user.mail,
        role: user.role
    }
    res.send({status: "success", payload: "Logueado :)"})
}

const register = (req, res) => {
    res.render('login/signin')
}

const registerPost = async (req, res) => {
    const user = req.user;
    res.send({status: "success", payload: user._id})
}

// fallo en la contraseña
const failedpassport = (req, res) => {
    req.logger.error("Passport falló");
    res.send({status: error, payload: "Error con passport"});
}

// cerrar sesion
const logout = async (req, res) => {
    if(!req.session.user) return res.send(`No has iniciado sesion`)
    const name = req.session.user
    req.session.destroy(err => {
        if (!err) return res.send(`Cerraste sesion! Hasta luego, ${name.name}`)
        else return res.send({status: "error", error: err})
    })
}

export default {
    login,
    loginPost,
    register,
    registerPost,
    failedpassport,
    logout
}
import { Router } from "express";
import usersController from "../controllers/users.controller.js";
import passport from "passport";

const router = Router();

// inicio de sesion
router.get('/login', usersController.login)
router.post('/login', passport.authenticate('login', {failureRedirect: '/failedpassport'}), usersController.loginPost)

// registrarse
router.get('/register', usersController.register)
router.post('/register', passport.authenticate('register', {failureRedirect: '/failedregister'}), usersController.registerPost)

// error en passport
router.get('/failedpassport', usersController.failedpassport)

// cerrar sesion
router.get('/logout', usersController.logout)

export default router;
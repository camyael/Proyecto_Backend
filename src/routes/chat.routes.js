import { Router } from "express";
import chatController from "../controllers/chat.controller.js";

const router = Router()

// mensajes del chat normalizados
router.get('/normalize', chatController.chatNormalizr)

export default router;
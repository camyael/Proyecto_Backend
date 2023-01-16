import { Router } from "express";
import randomController from "../controllers/random.controller.js";

const router = Router();

router.get('/', randomController.numRandom)

export default router;
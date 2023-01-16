import { Router } from "express";
import { uploader } from "../utils.js";
import productsController from "../controllers/products.controller.js";

const router = Router()

router.get('/test', productsController.test)
router.post('/', uploader.single('image'), productsController.newProd)
router.get('/:pid', productsController.prodById)
router.put('/:pid', productsController.updateProd)
router.delete('/:pid', productsController.deleteProd)

export default router
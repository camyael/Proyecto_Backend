import { Router } from "express";
import cartController from "../controllers/cart.controller.js";

const router = Router()

router.post('/', cartController.newCart)
router.delete('/:cid', cartController.deleteCart)
router.get('/:cid/products', cartController.prodCarts)
router.post('/:cid/products', cartController.newprodCarts)
router.delete('/:cid/products/:pid', cartController.deleteprodCarts)

export default router
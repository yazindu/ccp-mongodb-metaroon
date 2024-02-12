import express from "express";
import {ItemController} from "../controllers/item-controller";

const router = express.Router()

router.post('/add-item', ItemController.createItem);
router.get('/get-item/:name', ItemController.getItem);
router.get('/get-items', ItemController.getAllItems);
router.put('/update-item/:name', ItemController.updateItem);

export default router
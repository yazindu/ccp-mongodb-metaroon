import express from "express";
import {ItemController} from "../controllers/item-controller";

const router = express.Router()

router.post('/add-item', ItemController.createItem);

export default router
import express from "express";
import {ItemController} from "../controllers/item-controller.js";

const router = express.Router()

router.post('/add-item', ItemController.createItem)
// TODO: Move the all routes from the server.ts to this

export default router
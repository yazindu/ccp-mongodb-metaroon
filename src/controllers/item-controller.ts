import {Request, Response} from "express";
import ItemsSchemaModel from "../models/item-model";
import {v4 as uuid} from 'uuid'

export class ItemController {
    public static async createItem(req: Request, res: Response) {
        const {name} = req.body
        if (!name) return res.status(400).json({message: 'Name is required!'})

        try {
            const newItem = new ItemsSchemaModel({
                name: name,
                id: uuid(),
            })

            const result = await newItem.save()

            // const result  = await itemsCollection.insertOne({name, id: uuid()})
            res.status(200).json({message: 'Item added successfully', result})
        } catch (ex) {
            res.status(400).json({message: 'Error occurred'})
        }
    }

    public static async getAllItems(req: Request, res: Response) {
        try {
            const result = await ItemsSchemaModel.find()
            res.status(200).json({message: 'Get all items successfully', result})
        } catch (ex) {
            res.status(400).json({message: 'Error occurred'})
        }
    }

    public static async getItem(req: Request, res: Response) {
        const {name} = req.params;
        try {
            const result = await ItemsSchemaModel.findOne({name: name})
            if (result) res.status(200).json({message: 'Get item successful', result})
            else res.status(200).json({message: 'Item not found'})
        } catch (ex) {
            res.status(400).json({message: 'Error occurred'})
        }
    }

    public static async updateItem(req: Request, res: Response) {
        const {name} = req.params;
        const {newName} = req.body
        try {
            const result = await ItemsSchemaModel.findOneAndUpdate(
                {name: name}, {name: newName}
            )
            res.status(200).json({message: 'Update item successful', result})
        } catch (ex) {
            res.status(400).json({message: 'Error occurred'})
        }
    }
}
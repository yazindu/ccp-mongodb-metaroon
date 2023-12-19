import {Request, Response} from "express";
import {db} from "../configs/db.js";

export class ItemController{

    // Create (POST METHOD)
    public static async createItem(req: Request, res: Response){
        const {name} = req.body
        if(!name) return res.status(400).json({message: 'Name is required!'})

        try{
            db.data.items.push({
                id: db.data.items.length + 1,
                name
            })
            await db.write()
            res.status(200).json({message: 'Item added successfully'})
        }catch(ex){
            res.status(400).json({message: 'Error occurred'})
        }
    }
}
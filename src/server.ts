import express, {Request, Response, NextFunction} from 'express'
import {db, initializeDb} from "./configs/db.js";
import itemRoutes from "./routes/item-routes.js";
// import {connectMongoDB} from "./configs/mongodb.js";
import {v4 as uuid} from 'uuid'
import * as mongoose from "mongoose";
import ItemsSchemaModel from "./models/item-model.js";

const PORT = 9000
const app = express()

// connect local mongoDB (RAW)
// const mongoClient = connectMongoDB('mongodb://localhost:27017')

// connect local MongoDB using mongoose
mongoose.connect('mongodb://localhost:27017/metaroon').then(()=> {
    console.log('✅ Mongodb Connected!')
}).catch((ex)=> {
    console.log('🔴 Connection failed with MongoDB!', ex)
})


// Initialize a Mock DB
// initializeDb().then(()=> {
//     console.log('db initialized ✅')
// })

// json serialize
app.use(express.json())

// Custom middleware
app.use((req, res,next: NextFunction)=> {
   console.log( "Metarooooooooooooooon !!!!")
    next()
})

// Check whether server run endpoint
app.get('/', (req: Request, res: Response) => {
    const numberOne = 1
    const numberTwo = 2
    const sum = numberOne + numberTwo
    res.json({message: 'Hello Metaroon 5!'})
})

// routes
app.use('/api/v1/items', itemRoutes)

///////////////////////////////////////////////////
/////////////  CRUD operations ////////////////////
///////////////////////////////////////////////////

// Create (POST METHOD) (RAW MongoDB)
// app.post('/add-item', async(req,res)=> {
//     const {name} = req.body
//     if(!name) return res.status(400).json({message: 'Name is required!'})
//
//     try{
//         // use a mongoDB client
//          const client = await mongoClient
//          const db = client.db('metaroon')
//         const itemsCollection  = db.collection('items')
//         const result  = await itemsCollection.insertOne({name, id: uuid() })
//         res.status(200).json({message: 'Item added successfully', result})
//     }catch(ex){
//         res.status(400).json({message: 'Error occurred'})
//     }
// })


// Create (POST METHOD) (Mongoose MongoDB)
app.post('/add-item', async(req,res)=> {
    const {name} = req.body
    if(!name) return res.status(400).json({message: 'Name is required!'})

    try{
        const newItem = new ItemsSchemaModel({
            name: name,
            id: uuid(),
        })

        const result = await newItem.save()

        // const result  = await itemsCollection.insertOne({name, id: uuid()})
        res.status(200).json({message: 'Item added successfully', result})
    }catch(ex){
        res.status(400).json({message: 'Error occurred'})
    }
})

// TODO: Move all below routes and controllers to appropriate files
// READ (GET METHOD)
app.get('/get-items',async(req, res)=> {
    try{
        await db.read()
        res.status(200).json({message: 'Items', items: db.data.items})
    }catch(ex){
        res.status(400).json({message: 'Error occurred'})
    }
})


// UPDATE (PUT METHOD)
app.put('/update-item/:id', async(req, res)=> {
    const {id} = req.params
    const {name} = req.body

    if(!id || !name) return res.status(400).json({message: 'id and name is required'})

    try{
        const itemIndex = db.data.items.findIndex((item) => item.id === parseInt(id))
        if(!itemIndex) throw new Error('Item index not found!')
        db.data.items[itemIndex] = {
            id: parseInt(id),
            name
        }
        await db.write()
        res.status(200).json({message: 'Item updated successfully!'})
    }catch(ex){
        res.status(400).json({message: 'Error occurred', error: ex})
    }
})

// DELETE (DELETE METHOD)
app.delete('/delete-item/:id', async(req, res)=> {
    const {id} = req.params

    if(!id) return res.status(400).json({message: 'id is required'})

    try{
        const itemIndex = db.data.items.findIndex((item) => item.id === parseInt(id))
        if(!itemIndex) throw new Error('Item index not found!')
        db.data.items.splice(itemIndex, 1)
        await db.write()
        res.status(200).json({message: 'Item deleted successfully!'})
    }catch(ex){
        res.status(400).json({message: 'Error occurred', error: ex})
    }
})

// Start the express app
app.listen(PORT, ()=> {
    console.log(`🚀 Server is running on port ${PORT}`)
})


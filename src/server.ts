import express, {Express} from 'express'
import itemRoutes from "./routes/item-routes";
import {connectToMongoDB} from "./configs/mongodb";
import dotenv from 'dotenv'
import path from "path";
import {Server} from "http";
dotenv.config()

const PORT = 5000
const app = express()
let server: Server

// json serialize
app.use(express.json())

// Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, 'public')));


// routes
app.get('/', (req, res)=> {
    res.status(200).json({message: 'Hello Metaroon 2024!'})
    // res.sendFile(path.join(__dirname, 'public/index.html'));
})
app.use('/api/v1/items', itemRoutes)

// Start the express app
if(process.env.MONGO_URL){
    connectToMongoDB(process.env.MONGO_URL).then(() => {
        console.log('✅ Mongodb Connected!')
        server = app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`)
        })
    }).catch((ex) => {
        console.log('🔴 Connection failed with MongoDB!', ex)
    })
} else console.error("🔴 MONGO_URL is undefined")

export {app,server}


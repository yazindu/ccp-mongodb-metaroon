import express from 'express'
import itemRoutes from "./routes/item-routes";
import {connectToMongoDB} from "./configs/mongodb";

const PORT = 9000
const app = express()
let server: any

// json serialize
app.use(express.json())

// routes
app.get('/', (req, res)=> {
    res.status(200).json({message: 'Hello World!'})
})
app.use('/api/v1/items', itemRoutes)

// Start the express app
connectToMongoDB('mongodb+srv://stoXmod:5VJbnUadD3lLZPJu@cluster0.avfm1yl.mongodb.net/test?retryWrites=true&w=majority').then(()=> {
    console.log('✅ Mongodb Connected!')
    server = app.listen(PORT, ()=> {
        console.log(`🚀 Server is running on port ${PORT}`)
    })
}).catch((ex)=> {
    console.log('🔴 Connection failed with MongoDB!', ex)
})

export {app,server}


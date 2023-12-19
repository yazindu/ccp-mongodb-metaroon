import {MongoClient} from "mongodb";

export async function connectMongoDB(uri: string){
    let mongoClient;

    try{
        if(!uri) {
            console.log('🔴 MongoDB URI is not defined!')
            throw new Error('🔴 MongoDB URI is not defined!')
        }
        mongoClient = new MongoClient(uri)
        console.log('Connecting to mongoDB...')
        console.log('✅ Connected to mongoDB!')
        await mongoClient.connect()
        return mongoClient
    }catch(ex){
        console.error('🔴 Error occurred while connecting to MongoDB!', ex)
        process.exit()
    }
}
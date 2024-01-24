import mongoose from "mongoose";

mongoose.Promise = Promise;
export const connectToMongoDB = (uri: string) => {
    return mongoose.connect(uri);
};
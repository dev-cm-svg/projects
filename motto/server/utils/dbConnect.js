import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI; // Use environment variable for the connection string
const MONGODB_URI="mongodb+srv://Space:GgatcmaAFi6ql9pB@cluster0.4n1zphr.mongodb.net/mottos?retryWrites=true&w=majority"

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}else{
    console.log('abcd...')
}

let cached = global.mongo;

if (!cached) {
    cached = global.mongo = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;

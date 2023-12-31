import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import usersRoute from './routes/users.js'; 
import cors from 'cors';


const app = express(); 
dotenv.config();


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connected!')
    } catch (error) {
        throw error
    }    
}

mongoose.connection.on('disconnected', () => {
    console.log("disconnected!")
})

// middlewares
var corsOptions = {
    origin: 'https://nasa-image-app-frontend.vercel.app', 
 }
 
// uncomment the below code when in development mode, comment it out in production
// var corsOptions = {
//     origin: "http://localhost:3000"
// }


app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/users/', usersRoute);

const PORT = process.env.PORT || 8800;

app.listen(PORT, () => {
    connect(); 
})
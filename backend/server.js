import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import {notFound, errorHandler} from './middleware/errorMiddleware.js';
import logger from './logger.js';
import path from 'path';

const app = express();
dotenv.config();


const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL

app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://flamezblog-1.onrender.com',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

//Bod parser middleware
app.use(logger);
app.use(express.json());

//Body Parser Middleware
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());


//Routes
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

// ✅ serve the uploads folder
app.use('/uploads', express.static(path.join(process.cwd(), '/uploads')));

// if(process.env.NODE_ENV === 'production') {
//     const __dirname = path.resolve();
//     app.use(express.static(path.join(__dirname, 'frontend/dist')));

//     app.use( (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')));
// } else {
//     app.get('/', (req, res) => res.send('Server is Ready'));
// };

//Error Middleware  
app.use(notFound);
app.use(errorHandler);


//Connect to MongoDB and start server
mongoose
.connect(MONGO_URL)
.then(()=> {
    console.log('MongoDB connected');

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})


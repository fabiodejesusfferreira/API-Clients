import express from "express";
import publicRoutes from "./routes/public.js"
import privateRoutes from "./routes/private.js"
import mongoose from 'mongoose';
import config from "../config.js"
import auth from './middlewares/auth.js';

const app = express();
app.use(express.json())
app.use('/', publicRoutes)
app.use('/', auth, privateRoutes)
const port = 8080;

await mongoose.connect(
    config.MongoDB_URL
)
.then(() => console.log(`MongoDB successfully connected`))
.catch((err) => console.error('An error occurred when connecting to the database', err))

app.listen(port, console.log(`Server running on port ${port}`)); 
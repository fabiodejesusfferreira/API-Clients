import express from "express";
import publicRoutes from "./routes/public.js"

const app = express();
app.use(express.json())
app.use('/', publicRoutes) 
const port = 8080;

app.listen(port, console.log(`Server running on port ${port}`)); 
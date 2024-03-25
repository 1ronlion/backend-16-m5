import express from "express";
import { moviesRouter } from "./routes/moviesRouter";
const app = express()
const PORT = 3000

//Middleware
app.use(express.json())

//Routes
app.use("/api/", moviesRouter)


app.listen(PORT, ()=> console.log("Server running on port:", PORT))






import express from "express";
import {randomUUID} from "node:crypto"
import db from "./database/movies.json" 
//assert {type: 'json'}
import { writeFile, readFile } from "jsonfile";



const app = express()
const PORT = 3000

app.use(express.json())

//GET info de la DB
app.get("/api", (req,res)=>{

    let info = db.info

    res.json(info)

})

//GET movies de la DB
app.get("/api/movies", (req,res)=>{})

//GET movies by ID
app.get("/api/movies/:id", (req,res)=>{})

//POST create movie
app.post("/api/movies", (req,res)=>{})

//PATCH edit movie
app.patch("/api/movies/:id", (req,res)=>{})


app.listen(PORT, ()=> console.log("Server running on port:", PORT))
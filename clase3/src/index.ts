import express from "express";
import {randomUUID} from "node:crypto"
import db from "./database/movies.json" 
//assert {type: 'json'}
import jsonfile from "jsonfile";

const PATH = "./src/database/movies.json" 
const app = express()
const PORT = 3000

app.use(express.json())


interface Movie {

    id: String,
    name: String,
    year: Number,
    director: String,
    cast: [String], 
    rating: Number

}


//GET info de la DB
app.get("/api", (req,res)=>{

    let info = db.info

    res.json(info)

})

//GET movies de la DB
app.get("/api/movies", (req,res)=>{

    let data = db.movies.map(movie => {
        return {
            ...movie,
            url: `/api/movies/${movie.id}`
        }
    })

    let info = {
        count: data.length,
        status: 200,
        message: "OK",
        url: "/api/movies"
    }
    res.json({info,data})

})

//GET movies by ID
app.get("/api/movies/:id", (req,res)=>{

    let id = req.params.id

    let data = db.movies.find(movie => movie.id == id)
    let info = {
        status: 200,
        message: "OK",
        url: `/api/movies/${id}`
    }

    res.json({info,data})

})

//POST create movie
app.post("/api/movies", (req,res)=>{

    let {name,year,director,cast,rating} = req.body
    
    let newMovie: Movie = {

            id: randomUUID(),
            name: name,
            year: year,
            director: director,
            cast: cast, 
            rating: rating

    }

    jsonfile.readFile(PATH)
    .then(data => {

            data.movies.push(newMovie)
            data.info.movies = data.movies.length

            jsonfile.writeFile(PATH, data)
            .then(() => {
                
                let info = {
                    status: 201,
                    message: "Created",
                    url: `/api/movies/${newMovie.id}`
                }

            res.json(info)

            })
            .catch(error => {
                
                console.error(error)
                res.json("Bad request").status(400)
            
            })

    })
    .catch(error => {
        
        console.error(error)
        res.json("Internal Server Error").status(500)
    
    })

})




//PATCH edit movie
app.patch("/api/movies/:id", (req,res)=>{})






app.listen(PORT, ()=> console.log("Server running on port:", PORT))
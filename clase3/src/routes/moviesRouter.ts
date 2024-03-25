import { Router } from "express"
import MovieController from "../controllers/moviesController";


import {randomUUID} from "node:crypto"
import db from "../database/movies.json" 
import jsonfile from "jsonfile";



const PATH = "./src/database/movies.json" 
export const moviesRouter = Router()



interface Movie {

    id: String,
    name: String,
    year: Number,
    director: String,
    cast: [String], 
    rating: Number
    
}


//GET info de la DB
moviesRouter.get("/", MovieController.getInfo)

//GET movies de la DB
moviesRouter.get("/movies", MovieController.getAll)

//GET movies by ID
moviesRouter.get("/movies/:id/",MovieController.getById)

//POST create movie
moviesRouter.post("/movies/create", MovieController.create)

//PATCH edit movie
moviesRouter.patch("/movies/:id", (req, res) => {
    
    let id = req.params.id
    let index = db.movies.findIndex(movie => movie.id == id)
    
    let { name, year, director, cast, rating } = req.body
    
    let updatedMovie: Movie = {
        
        id: id,
        name: name,
        year: year,
        director: director,
        cast: cast,
        rating: rating
        
    }
    
    if(index === -1){
        
        console.log("La pelicula no existe")
        res.json("Bad request").status(400)
        
    }
    
    jsonfile.readFile(PATH)
    .then(data => {
        
        data.movies[index] = updatedMovie
        
        jsonfile.writeFile(PATH, data)
        .then(() => {
            
            let info = {
                status: 200,
                message: "Updated",
                        url: `/api/movies/${updatedMovie.id}`
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
    
    
    
    
    
    
    
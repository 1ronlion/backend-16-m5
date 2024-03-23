import {randomUUID} from "node:crypto"
import db from "../database/movies.json" 
import jsonfile from "jsonfile";
import moment from "moment";

const date = moment().format()
const PATH = "./src/database/movies.json" 


interface Movie {

    id: string,
    name: string,
    year: number,
    director: string,
    cast: string[], 
    rating: number

}

export interface CreatedMovie {

    createdMovie: Movie,
    updatedAt: string,
    totalMovies: number

}


abstract class MovieModel {

    static getInfo(){
        return db.info
    }

    static getAll(limit: number){

        let data = []
        if(limit > db.info.movies){
            data = db.movies
        }

        data = db.movies.slice(0, limit)
        return data
    }

    static getById(id: string){


        let data = db.movies.find((movie) => movie.id == id)

        return data
        
    }

    static async create(data: any): Promise <CreatedMovie | Error>{
    try{

        const {name, year, director, cast, rating} = data
        
        let newMovie: Movie = {
            
            id: randomUUID(),
            name: name,
            year: year,
            director: director,
            cast: cast, 
            rating: rating
            
        }

        const fileData = await jsonfile.readFile(PATH)

            fileData.movies.push(newMovie)
            fileData.info.movies = fileData.movies.length
            
            //AÑADO LA FECHA A LA DB
            fileData.info.updatedAt = date
        

        await jsonfile.writeFile(PATH, fileData)

            let createdMovie: CreatedMovie = {

                createdMovie: newMovie,

                //ENVIO LA FECHA Y EL TOTAL DE PELICULAS
                updatedAt: fileData.info.updatedAt,
                totalMovies: fileData.info.movies

            }

            return createdMovie
            

    }catch (error){return new Error("Failed to create movie")}}

}


export default MovieModel
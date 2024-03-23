import MoviesModel from "../models/moviesModel"
import { CreatedMovie } from "../models/moviesModel"


abstract class MovieController {

    static getInfo(req:any, res:any){

        const infoData = MoviesModel.getInfo()

        let info = {
            status: 200,
            message: "OK",
            url: "/api"
        }

        res.json({ info, infoData}).status(200)

    }
    
    static getAll(req:any, res:any){

        let limit = req.query.limit

        let data = MoviesModel.getAll(limit)
    
        let info = {
            count: data.length,
            status: 200,
            message: "OK",
            url: "/api/movies"
        }

        res.json({info,data}).status(200)

    }

    static getById(req:any, res:any){

        let id = req.params.id

        let data = MoviesModel.getById(id)

        let info = {
            status: 200,
            message: "OK",
            url: `/api/movies/${id}`
        }

        if(!data){

            res.json({message: "Movie not found"}).status(404)

        }else{

            res.json({info, data}).status(200)

        }
    }

    static create(req:any, res:any){

        let data = req.body

        MoviesModel.create(data)
        .then((newMovie: CreatedMovie | Error) => {

            if (newMovie instanceof Error) {
                res.status(500).json({ error: newMovie.message });
            } else {
                let info = {
                    status: 201,
                    message: "Created",
                    url: `/api/movies/${newMovie.createdMovie.id}`
                };
                res.status(201).json({info, newMovie}); 
            }
        })
        // .catch((error: Error) => {
        //     res.status(500).json({ error: error.message })
        // })
}

}

export default MovieController

import express  from "express"
import jsonfile from "jsonfile"
//import corsMiddleware from "./middleware/cors.js"
import cors from 'cors'


const app = express()
const PORT = 3000
const PATH = './database/database.json'

const server = app.listen(PORT, ()=> console.log("Server running on:", PORT))


//Cors middleware
app.use(cors({ origin: 'http://localhost:3001', credentials: true}))


app.get("/api/all", async (req,res)=>{

    const data = await jsonfile.readFile(PATH)
    
    res.json(data)

})

app.get("/api/:brand", async (req,res)=>{

    const brand = req.params.brand

    const data = await jsonfile.readFile(PATH)

    const result = data.filter((product)=> product.brand.toLowerCase() === brand)
    
    res.json(result)

})
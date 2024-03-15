import express from "express";

const app = express()
const PORT = 3000

const server = app.listen(PORT, () => console.log("Server running on port:", PORT))

app.use(express.json())


//Ejemplo con params
app.get("/user/:id/",  (req,res) => {
    
    let id = req.params.id
    console.log("🚀 ~ app.get ~ id:", id)

    res.sendStatus(200)

})

//Ejemplo con query
app.get("/user/one",  (req,res) => {

    let id = req.query.id
    console.log("🚀 ~ app.get ~ id:", id)
    let name = req.query.name
    console.log("🚀 ~ app.get ~ name:", name)

    res.sendStatus(200)

})

app.post("/data", (req,res) => {

    let {name, birthday} = req.body
    console.log("🚀 ~ app.post ~ birthday:", birthday)
    console.log("🚀 ~ app.post ~ name:", name)
        
    res.sendStatus(200)
    
})

app.put("/user/edit", (req,res) => {

    let {id,name,type} = req.body

    let findUser = users.findIndex(user => user.id === id)

    if(findUser != -1){

        //let updatedUser = {...req.body}
        let updatedUser = {
            id: id,
            name: name,
            type: type
        }

    users[findUser] = updatedUser
    console.log("🚀 ~ users:", users)
    res.json(updatedUser)
    }else{
        res.json("Usuario no existente")
    }

})

app.delete("/user/delete/:id/", (req,res)=> {

    let id = req.params.id

    let findUser = users.findIndex(user => user.id == id)

    if(findUser != -1){

        users.splice(findUser, 1)
        console.log("🚀 ~ users:", users)
        res.json("Usuario eliminado")
        
    }else{
        res.json("Usuario no existente")
    }
})

app.get("/users/all", (req,res)=> {

    let count = users.length
    let data = users

    res.json({count: count, data})

})


const users = [
    {
    id: 1,
    name: "Leo",
    type: "Profe"
    },
    {
    id: 2,
    name: "Alana",
    type: "Profe"
    },
    {
    id: 3,
    name: "Valeria",
    type: "Student"
    }
]








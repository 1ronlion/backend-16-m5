import UserModel from "../model/user-model";
import { Request, Response } from 'express';

abstract class UserController{

    private static validateUser(data: any){

        const {name, email, password} = data

        if(typeof name === 'string' &&
           typeof email === 'string' && 
           typeof password === 'string' &&
           email.includes("@")
        ){
            return true

        }
            return false
    }


    static async getAll(req: Request, res: Response){

        const users = await UserModel.getAll()
        res.json(users)
    }

    static async getById(req: Request, res: Response){

        const userId = req.params.id
        const user = await UserModel.findUser(userId)

        if(!user){

            console.log("404 ERROR!")

            res.status(404).json({message: "Usuario no encotrado"})

        }else{

            res.json(user)

        }
    }

    static async login(req: Request, res: Response){

        const data = req.body
        const userLogged = await UserModel.login(data)

        if(userLogged === 404){
            return res.status(404).json({message: "Usuario no encontrado"})
        }

        if(userLogged === 400){
            return res.status(400).json({message: "Contraseña incorrecta"})
        }

        res.status(202).json({message: "Usuario loggeado"})

    }

    static async create(req: Request, res: Response){

        const data = req.body
        const validateData = UserController.validateUser(data)
        console.log("🚀 ~ UserController ~ create ~ validateData:", validateData)

        if (!validateData){
        //Cannot set headers after they are sent to the client
          return res.status(400).json({message: "Formato de informacion invalida"})

        }

        const newUser = await UserModel.createUser(data)

        if(newUser === 400){

            return res.status(400).json({message: "Usuario ya existente"})

        }

        res.status(201).json(newUser)

    }

    static async delete(req: Request, res: Response){

        const userId = req.params.id
        const userDeleted = await UserModel.delete(userId)

        if(userDeleted === 404){

            return res.json({message: "Usuario no encotrado"}).status(404)

        }else{

            return res.status(200).json({message: "Usuario eliminado", userDeleted})

        }

    }

    static error(req: Request, res: Response){

        console.log("404 ERROR!")

        res.status(404).json({message: "Not found!"})

    }
    

}

export default UserController
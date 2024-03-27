import UserModel from "../model/user-model";
import { Request, Response } from 'express';

abstract class UserController{

    static async getAll(req: Request, res: Response){

        const users = await UserModel.getAll()
        res.json(users)
    }

    static async getById(req: Request, res: Response){

        const userId = req.params.id
        const user = await UserModel.findUser(userId)

        res.json(user)

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

}

export default UserController
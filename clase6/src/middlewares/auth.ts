import { Request, Response, NextFunction } from 'express';
import UserModel from '../model/user-model';

async function isAuth(req: Request, res: Response, next: NextFunction) {
    
   let userId = req.params.id

   let userLogged = await UserModel.findUser(userId)

   if(userLogged?.token === ""){

       return res.status(401).json({message: "Unauthorized"})
       
    }


    next()
   
}

export default isAuth
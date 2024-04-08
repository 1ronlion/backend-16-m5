import { Request, Response, NextFunction } from 'express';
import UserModel from '../model/user-model';

async function isAdmin(req: Request, res: Response, next: NextFunction) {

    let userId = req.params.id

    let userLogged = await UserModel.findUser(userId)

    if (userLogged?.isAdmin === false) {

        return res.status(401).json({ message: "Unauthorized" })

    }


    next()

}

export default isAdmin
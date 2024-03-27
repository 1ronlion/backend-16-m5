import db from "../database/users.json"
import { writeFile } from "jsonfile"

const PATH = './src/database/users.json'

abstract class UserModel {


    private static async writeDB(){
        return writeFile(PATH, db)
    }

    private static async writeInfo(){

        const usersLength = db.users.length
        db.info.users = usersLength

        return this.writeDB()

    }
    
    static async getAll(){
        return db.users
    }

    static async findUser(id: string){
         return db.users.find((user) => user.id === id) 
     }
     


    static async create(){}
    static async update(){}

    static async delete(id:string){

        const findUser = db.users.findIndex((user)=> user.id === id)

        if(findUser === -1){ return 404 }

        const userDeleted = db.users[findUser]

        db.users.splice(findUser, 1)

        await this.writeDB()

        await this.writeInfo()

        return userDeleted

    }


}

export default UserModel
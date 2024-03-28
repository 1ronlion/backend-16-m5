import db from "../database/users.json"
import { writeFile } from "jsonfile"
import { randomUUID } from "node:crypto"
import bcrypt from "bcryptjs"

const PATH = './src/database/users.json'

abstract class UserModel {

    private static async encrypt(password: string){
        try{
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password.toString(), salt)
            return hash
        }
        catch(error){
            console.error(error)
            throw new Error
        }
    }

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
    
    private static async findUserByName(username: string){
        return db.users.find((user) => user.name === username) 
    }


    static async createUser(data: any){

        const {name, email, password} = data
        const id = randomUUID()
        //const hashPass = this.encrypt(password)

        const findUser = await this.findUserByName(name)

        if(findUser) return 400

        const newUser = { id, name, email, password, token: ""}

        db.users.push(newUser)
        
        await this.writeDB()

        return { name, email}

    }

    static async login(data: any){

        const { name, password } = data

        const findUser = await this.findUserByName(name)

        if(!findUser) return 404

        if(findUser.password !== password) return 400

        const token = randomUUID()
        findUser.token = token

        await this.writeDB()

        return 202

    }

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
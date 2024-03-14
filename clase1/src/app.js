import db from "./database/db.json" assert {type: 'json'}
import http from "node:http"
import fs from "node:fs"
import crypto from "node:crypto"


const PATH = "./src/database/db.json"
const PORT = 3000

const server = http.createServer((req, res) => {

    const {url, method} = req
    
    if(method === 'GET'){
        
            if(url === '/api'){
            
                  res.setHeader('Content-Type', 'application/json')      
                  res.statusCode = 200
            
              return res.end(JSON.stringify(db))

            }
        
        
        res.statusCode = 404
        return res.end('Not found')

        }
        
        if(method === 'POST'){
            
            let body = '';
            
            if(url === '/create'){
                req.on('data', (chunk) => {
                    body += chunk.toString()
                })
                req.on('end', () => {
                    
                    const data = JSON.parse(body)
                    const { name, birthday} = data
                    const id = crypto.randomUUID()

                    let newUser = {
                        id,
                        name,
                        birthday
                    }

                    db.push(newUser)

                    fs.writeFileSync(PATH, JSON.stringify(db))
                    
                    res.statusCode = 201 //CREATED!
                    return res.end(JSON.stringify(newUser))
                    
                })

                return
            }
            
        res.statusCode = 404
        return res.end('Not found')

        }

        res.statusCode = 404
        return res.end('Not found')
})

server.listen(PORT, () => console.log("Server running on port", PORT))



import { Router } from "express"
import UserController from "../controllers/user-controller"

export const UserRouter = Router()

// GET | 127.0.0.1/api/users --> Obtener todos los usuarios registrados.
UserRouter.get("/", UserController.getAll)

// GET | 127.0.0.1/api/users/:id --> Obtener un usuario por su id.
UserRouter.get("/:id", UserController.getById)

// POST | 127.0.0.1/login --> Login de usuario.
UserRouter.post("/login", UserController.login)

// PATCH | 127.0.0.1/api/users/:id --> Logoyt de usuario.
UserRouter.patch("/logout", UserController.logout)

// POST | 127.0.0.1/api/users --> Dar de alta nuevo usuario.
UserRouter.post("/", UserController.create)

// PATCH | 127.0.0.1/api/users/:id --> Actualizar un usuario.
UserRouter.patch("/:id")

// DELETE | 127.0.0.1/api/users/:id --> Eliminar un usuario.
UserRouter.delete("/:id", UserController.delete)

// NOT FOUND | 127.0.0.1/api/users/* --> Manejo de errores.
UserRouter.use("*", UserController.error)



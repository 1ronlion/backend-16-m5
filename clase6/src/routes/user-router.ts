import { Router } from "express"
import UserController from "../controllers/user-controller"

export const UserRouter = Router()

// GET | 127.0.0.1/api/users --> Obtener todos los usuarios registrados.
UserRouter.get("/", UserController.getAll)

// GET | 127.0.0.1/api/users/:id --> Obtener un usuario por su id.
UserRouter.get("/:id", UserController.getById)

// POST | 127.0.0.1/api/users --> Dar de alta nuevo usuario.
UserRouter.post("/")

// PATCH | 127.0.0.1/api/users/:id --> Actualizar un usuario.
UserRouter.patch("/:id")

// DELETE | 127.0.0.1/api/users/:id --> Eliminar un usuario.
UserRouter.delete("/:id", UserController.delete)

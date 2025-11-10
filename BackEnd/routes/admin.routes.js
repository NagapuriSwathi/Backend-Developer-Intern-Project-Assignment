import { Router } from "express";
import { getAllUsers, getUserById, addUser, updateUserById, deleteUserById } from "../controllers/admin.controller.js";
import { tokenMiddleware } from "../middlewares/access.middleware.js";

const adminRoutes = Router();


// Routes

adminRoutes.get("/getAllUsers" , tokenMiddleware, getAllUsers)
adminRoutes.get("/getUserById/:userId" , tokenMiddleware, getUserById)
adminRoutes.post("/addUser" , tokenMiddleware, addUser)
adminRoutes.put("/updateUserById/:userId" , tokenMiddleware, updateUserById)
adminRoutes.delete("/deleteUserById/:userId" , tokenMiddleware, deleteUserById)


export { adminRoutes }
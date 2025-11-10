import { Router } from "express";


import { userNotesValidator } from "../helpers/validators.helper.js";

import { getUserNotes, addUserNotesGet, addUserNotes, getUserNotesById, updateUserNotesById, deleteUserNotesById } from "../controllers/usernotes.controller.js";

const userNotesRoute = Router();

userNotesRoute.get("/getNotes", getUserNotes);
userNotesRoute.get("/getNotesById/:userNotesId", getUserNotesById);
userNotesRoute.get("/addNotes", addUserNotesGet);
userNotesRoute.post("/addNotes", userNotesValidator, addUserNotes);
userNotesRoute.put("/updateNotesById/:userNotesId", userNotesValidator, updateUserNotesById);
userNotesRoute.delete("/deleteNotesById/:userNotesId", deleteUserNotesById);


export { userNotesRoute }
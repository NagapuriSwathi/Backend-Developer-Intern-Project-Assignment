import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import ejs from "ejs";


import path from "path"


import { databaseConnection } from "./configuration/database.configuration.js";
import { authorizationRoutes } from "./routes/authorization.routes.js";
import { adminRoutes } from "./routes/admin.routes.js";
import { userNotesRoute } from "./routes/usernotes.routes.js";

// Configuring dotenv
dotenv.config();


// Rest Object 
const app = express();


// Connecting To Database
databaseConnection();


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));



app.use(express.static(path.join(import.meta.dirname, "public")))


// View Engine
app.set("view engine", "ejs");
app.set("views", "views");



// Routes

app.use("/api/v1/auth", authorizationRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/users", userNotesRoute);




// Listening

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})
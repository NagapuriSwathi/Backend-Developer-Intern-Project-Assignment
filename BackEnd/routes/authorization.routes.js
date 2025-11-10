import { Router } from "express";

import { registrationControllerGet, registrationController, loginControllerGet, loginController, logoutContoller } from "../controllers/authorization.controller.js";
import { registrationValidator, loginValidator } from "../helpers/validators.helper.js";



const authorizationRoutes = Router();




// Routes

authorizationRoutes.get("/register", registrationControllerGet);
authorizationRoutes.post("/register", registrationValidator, registrationController);
authorizationRoutes.get("/login", loginControllerGet);
authorizationRoutes.post("/login", loginValidator, loginController);
authorizationRoutes.get("/logout", logoutContoller);

export { authorizationRoutes }

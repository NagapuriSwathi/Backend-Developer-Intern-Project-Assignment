import { userModel } from "../models/users.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

import path from "path"


import { generateAccessToken } from "../middlewares/token.middleware.js";


// Registration

const registrationControllerGet = (request, response) => {
    response.sendFile(path.join(import.meta.dirname, "..","public", "html", "registration.html"));
}

const registrationController = async (request, response) => {
    try{
        const errors = validationResult(request);

        if(!errors.isEmpty()){
            return response.status(200).send({
                success : false,
                message : "Something went wrong",
                error : errors.array()
            });

        }

        let { name, email, password, role } = request.body;
        role = role || "user"

        const existingUser = await userModel.findOne({email : email});

        if(existingUser){
            return response.status(200).send({
                success : false,
                message : "Email already exists"
            });
        }


        // Hashing Password
        bcrypt.genSalt(10, (error, salt) => {
            if(!error){
                bcrypt.hash(password, salt, async (error, hashedPassword) => {
                    if(!error){
                        try{
                            password = hashedPassword;
                            let userDocument = await userModel.create({name, email, password, role});
                            response.status(201).send({
                                success : true,
                                message :"Registration of User is Successful"
                            });
                        }
                        catch(error){
                            console.log(error);
                            response.status(500).send({
                                success : false,
                                message : "Registration of User Failed"
                            });
                        }
                    }
                    else{
                        console.log(error);
                    }
                })
            }
            else{
                console.log(error);
            }
        });
    }
    catch(error){
        console.log(error);
        response.status(500).send({
            success : false,
            message : error.message
        });
    }
}


// Login

const loginControllerGet = (request, response) => {
    response.sendFile(path.join(import.meta.dirname, "..","public", "html", "login.html"));
}

const loginController = async (request, response) => {
    try{
        const errors = validationResult(request);

        if(!errors.isEmpty()){
            return response.status(200).send({
                success : false,
                message : "Something went wrong",
                error : errors.array()
            });

        }

        let { email, password } = request.body;

        const existingUser = await userModel.findOne({email : email});

        if(!existingUser){
            return response.status(400).send({
                success : false,
                message : "Please provide valid email and password"
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordMatch){
            return response.status(400).send({
                success : false,
                message : "Please provide valid email and password"
            });
        }

        // Token
        const accessToken = await generateAccessToken(existingUser);

         return response.status(200).send({
                success : true,
                message : `Login Successful, Welcome, ${email.split("@")[0]}`,
                accessToken : accessToken,
                tokenType : "Bearer"
        });

    }
    catch(error){
        console.log(error);
        response.status(500).send({
            success : false,
            message : error.message
        });
    }
}


const logoutContoller = async (request, response) => {
    try{
        response.status(200).send({
            success : true,
            message : "Logout Successful"
        })
    }
    catch(error){
        console.log(error);
        response.status(500).send({
            success : false,
            message : "Logout Failed"
        })
    }
}

export { registrationControllerGet, registrationController, loginControllerGet, loginController, logoutContoller}

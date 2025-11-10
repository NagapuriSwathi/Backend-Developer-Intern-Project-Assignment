import jsonwebtoken from "jsonwebtoken";
import { userModel } from "../models/users.model.js";

const tokenMiddleware = async (request, response, next) => {
    try{
        const generatedToken = request.headers.authorization || request.headers.authorization 
        if(!generatedToken){
            return response.status(401).send({
                success : false,
                message : "Please provide valid token"
            });
        }

        // Decoding token
        let token = request.headers.authorization.split(" ")[1];
        jsonwebtoken.verify(token, process.env.TOKEN_SECRET_KEY, async (error, decodedToken) => {
            if(!error){
                let userId = decodedToken.user._id;
                const user = await userModel.findById(userId);
                if(!user){
                    return  response.status(404).send({
                        success : false,
                        message : "User Not Found"
                    });
                }
                if(user.role !== "Admin"){
                    return  response.status(403).send({
                        success : false,
                        message : "Unauthorized : User is not an admin"
                    });
                }
                next()
            }   
            else{
                response.status(401).send({
                    success : false,
                    message : "Something Went Wrong"
                });
            }
        })

    }
    catch(error){
        response.send(error)
    }
}

export { tokenMiddleware }
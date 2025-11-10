import bcrypt from "bcryptjs";

import { userModel } from "../models/users.model.js";


// Get All Users

const getAllUsers = async (request, response) => {
    try{
        const users = await userModel.find();

        if(!users){
            return response.status(404).send({
                success : false,
                message : "No Users Found"
            });
        }

        response.status(200).send({
            success : true,
            users : users
        });
    }
    catch(error){
        console.log(error);
        response.status(500).send({
            success : false,
            message : "Failed Getting Users"
        });
    }
}



// Get User By Id

const getUserById = async (request, response) => {
     try{
        const user = await userModel.findById(request.params.userId);

        if(!user){
            return response.status(404).send({
                success : false,
                message : "No User Found"
            });
        }

        response.status(200).send({
            success : true,
            user : user
        });
    }
    catch(error){
        console.log(error);
        response.status(500).send({
            success : false,
            message : "Failed to get user"
        });
    }
}


// Add User

const addUser = async (request, response) => {
     try{
        let {name, email, password, role} = request.body
        
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
                                        message :"Registration of User is Successful - User Added By Admin"
                                    });
                                }
                                catch(error){
                                    console.log(error);
                                    response.status(500).send({
                                        success : false,
                                        message : "Registration of User By Admin Failed"
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
            message : "Failed to add user"
        });
    }
}


// Update User By Id

const updateUserById = async (request, response) => {
     try{
        const user = await userModel.findById(request.params.userId);

        if(!user){
            return response.status(404).send({
                success : false,
                message : "No User Found"
            });
        }

        let {name, email, role} = request.body

        const updatedUser = await userModel.updateOne({
            name : name,
            email : email,
            password : user.password,
            role : role
        })

        response.status(200).send({
            success : true,
            message : updatedUser
        });
    }
    catch(error){
        console.log(error);
        response.status(500).send({
            success : false,
            message : "Failed to update user"
        });
    }
}



// Delete User By Id

const deleteUserById = async (request, response) => {
     try{
        const user = await userModel.deleteOne({_id : request.params.userId});

        if(!user){
            return response.status(404).send({
                success : false,
                message : "No User Found"
            });
        }

        response.status(200).send({
            success : true,
            message : user
        });
    }
    catch(error){
        console.log(error);
        response.status(500).send({
            success : false,
            message : "Failed to delete user"
        });
    }
}




export { getAllUsers, getUserById, addUser, updateUserById, deleteUserById }
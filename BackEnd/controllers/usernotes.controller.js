import { validationResult } from "express-validator";

import { userNotesModel } from "../models/usersnotes.model.js";
import { response } from "express";



// Get User Notes
const getUserNotes = async (request, response) => {
    try{
        const userNotes = await userNotesModel.find();

            if(!userNotes || userNotes.length === 0){
                return response.status(200).send({
                    success : false,
                    message : "No Notes Found"
                })
            }

            response.status(200).send({
                success : true,
                notes : userNotes
            })
    }
    catch(error){
        response.status(500).send({
            success : false,
            message : "Something went wrong while getting notes, please try after sometime"
        });
    }
}


// Get UserNotesById

const getUserNotesById = async (request, response) => {
    try{
        const userNotes = await userNotesModel.findById(request.params.userNotesId);

            if(!userNotes || userNotes.length === 0){
                return response.status(200).send({
                    success : false,
                    message : "No Notes Found"
                });
            }

            response.status(200).send({
                success : true,
                notes : userNotes
            });
    }
    catch(error){
        response.status(500).send({
            success : false,
            message : "Something went wrong while getting notes, please try after sometime"
        });
    }
}

// Add User Notes

const addUserNotesGet = (request, response) => {
    response.sendFile(path.join(import.meta.dirname, "..","public", "html", "addNotes.html"));
}



const addUserNotes = async (request, response) => {

    try {
            const errors = validationResult(request);
            
            if(!errors.isEmpty()){
                return response.status(200).send({
                    success : false,
                    message : "Something went wrong",
                    error : errors.array()
                });

            }

            const userNotes = await userNotesModel.create({
                    title : request.body.title,
                    description : request.body.description
            })

            response.status(200).send({
                success : true,
                message : `${userNotes.title} added successful`
            });
        } 
    
    catch (error) {
        response.status(500).send({
            success : false,
            message : "Something went wrong while adding notes, please try after sometime"
        });
        
    }
}


// Update User Notes By Id

const updateUserNotesById = async (request, response) => {
    try{

        const errors = validationResult(request);
            
            if(!errors.isEmpty()){
                return response.status(200).send({
                    success : false,
                    message : "Something went wrong",
                    error : errors.array()
                });

            }

        const userNotes = await userNotesModel.findById(request.params.userNotesId);

            if(!userNotes || userNotes.length === 0){
                return response.status(200).send({
                    success : false,
                    message : "No Notes Found"
                });
            }

        let updateUserNotes = await userNotesModel.updateOne({
            title : request.body.title,
            decription : request.body.decription
        })

        response.status(200).send({
            success : true,
            notes : updateUserNotes
        });
    }
    catch(error){
        response.status(500).send({
            success : false,
            message : "Something went wrong while updating notes, please try after sometime"
        });
    }
}


// Get UserNotesById

const deleteUserNotesById = async (request, response) => {
    try{
        const userNotes = await userNotesModel.deleteOne({_id : request.params.userNotesId});
        response.status(200).send({
            success : true,
            message : "Notes deleted successfully"
        });
    }
    catch(error){
        response.status(500).send({
            success : false,
            message : "Something went wrong while getting notes, please try after sometime"
        });
    }
}


export { getUserNotes, getUserNotesById, addUserNotesGet, addUserNotes, updateUserNotesById, deleteUserNotesById }
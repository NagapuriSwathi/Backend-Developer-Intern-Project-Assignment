import mongoose from "mongoose";

const userNotesSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, "Title is required"]
    },
    description : {
        type : String,
        default : "Add your Notes..."
    }
},{
    timestamps : true
});

const userNotesModel = mongoose.model("UserNotes", userNotesSchema);

export { userNotesModel }
import mongoose, { mongo } from "mongoose";

const authorizationSchema = new mongoose.Schema({
    
    user_id : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : Users
    },
    permission_allowed : [{
        permission_role : String,
        permission_value : [String]
    }]
}, {
    timestamps : true
});

const authorizationModel = mongoose.model("Authorization", authorizationSchema);

export { authorizationModel }
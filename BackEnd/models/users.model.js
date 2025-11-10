import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Name is required"]
    },
    email : {
        type : String,
        required : [true, "Email is required"],
        unique : [true, "Email already exists"]
    },
    password : {
        type : String,
        required : [true, "Password is required"],
        minLength : [6, "Password Should be of minimum 6 characters"]
    },
    role : {
        type : String,
        required : [true, "Name is required"],
        enum : {
            values : ["Admin", "User"],
            message : "{VALUE} is not supported"
        }
    }
}, {
    timestamps : true
});

const userModel = mongoose.model("Users", userSchema);

export { userModel }
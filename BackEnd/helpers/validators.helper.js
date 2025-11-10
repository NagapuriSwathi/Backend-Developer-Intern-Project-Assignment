import { check } from "express-validator";

const registrationValidator = [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please provide a valid email").isEmail().normalizeEmail({
        gmail_remove_dots : true
    }),
    check("password", "Password is required").not().isEmpty(),
    check("role", "Role is required").not().isEmpty()
]


const loginValidator = [
    check("email", "Please provide a valid email").isEmail().normalizeEmail({
        gmail_remove_dots : true
    }),
    check("password", "Password is required").not().isEmpty(),
]

const userNotesValidator = [
     check("title", "Title is required").not().isEmpty()
]

export { registrationValidator, loginValidator, userNotesValidator }
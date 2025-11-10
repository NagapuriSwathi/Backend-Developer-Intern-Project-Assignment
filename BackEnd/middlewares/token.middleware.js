import jsonwebtoken from "jsonwebtoken";



const generateAccessToken = async (user) => {

    try{
        const token = jsonwebtoken.sign({user}, process.env.TOKEN_SECRET_KEY, {
            expiresIn : "2h",
        });
        return token;
    }
    catch(error){
        console.log(error);
    };
}



const verifyAccessToken = () => {

}

export { generateAccessToken, verifyAccessToken }




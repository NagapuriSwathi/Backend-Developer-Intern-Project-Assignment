const registrationFormElement = document.getElementById("form__registration");
const userNameElement = document.getElementById("name");
const userEmailElement = document.getElementById("email");
const userPasswordElement = document.getElementById("password");
const userRoleElement = document.getElementById("role");


const responseOutput = document.getElementById("response__output")


let baseUrl = "http://localhost:8000/api/v1";

registrationFormElement.addEventListener("submit", async (event) => {
    event.preventDefault();

    let formData = {
        name : userNameElement.value,
        email : userEmailElement.value,
        password : userPasswordElement.value,
        role : userRoleElement.value,
    }


    fetch(baseUrl+"/auth/register", {
        method : "POST",  
        headers: {
        "Content-Type": "application/json",
    },
        body : JSON.stringify(formData)
    }).then((response) =>{
        return response.json()
    })
    .then((info)=> {
        responseOutput.style.display = "block";
        responseOutput.innerHTML = info.message + ", Please Login";
    }).catch((error) =>{
        console.log(error);
    });

    userNameElement.value = ""
    userEmailElement.value="";
    userPasswordElement.value="";

});




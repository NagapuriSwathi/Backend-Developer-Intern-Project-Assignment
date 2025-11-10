const loginFormElement = document.getElementById("form__login");
const userEmailElement = document.getElementById("email");
const userPasswordElement = document.getElementById("password");

const responseOutputContainer = document.getElementById("response__output-container");
const formLoginContainer = document.getElementById("form__login-container");

const buttonDashboardElement = document.getElementById("button__dashboard");

const responseOutput = document.getElementById("response__output")


let baseUrl = "http://localhost:8000/api/v1";

loginFormElement.addEventListener("submit", async (event) => {
    event.preventDefault();

    let formData = {
        email : userEmailElement.value,
        password : userPasswordElement.value,
    }


    fetch(baseUrl+"/auth/login", {
        method : "POST",  
        headers: {
        "Content-Type": "application/json",
    },
        body : JSON.stringify(formData)
    }).then((response) =>{
        return response.json()
    })
    .then((info)=> {
        responseOutputContainer.style.display = "block";
        responseOutput.innerHTML = info.message;
        if(info.success===true){
            buttonDashboardElement.style.display = "block";
        }
        localStorage.setItem("accessToken", info.accessToken);
    }).catch((error) =>{
        console.log(error);
    });

    userEmailElement.value="";
    userPasswordElement.value="";

});





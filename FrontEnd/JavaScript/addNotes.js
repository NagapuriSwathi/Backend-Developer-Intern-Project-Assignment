const addNotesFormElement = document.getElementById("form__add-notes");
const notesTitleElement = document.getElementById("title");
const notesDescriptionElement = document.getElementById("description");


const responseOutput = document.getElementById("response__output")


let baseUrl = "http://localhost:8000/api/v1";

addNotesFormElement.addEventListener("submit", async (event) => {
    event.preventDefault();

    let formData = {
        title : notesTitleElement.value,
        description : notesDescriptionElement.value,
    }


    fetch(baseUrl+"/users/addNOtes", {
        method : "POST",  
        headers: {
        "Content-Type": "application/json",
    },
        body : JSON.stringify(formData)
    }).then((response) =>{
        return response.json()
    })
    .then((info)=> {
        window.location.href = "dashboard.html"
    }).catch((error) =>{
        console.log(error);
    });

    notesTitleElement.value = ""

});


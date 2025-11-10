const buttonUsers = document.getElementById("button__users");
const buttonAddUsers = document.getElementById("button__users-add");
const buttonNotes = document.getElementById("button__notes");
const buttonAddNotes = document.getElementById("button__notes-add");
const buttonLogout = document.getElementById("button__logout");


const displayUsersOutput = document.getElementById("display__users");
const displayUsersListOutput = document.getElementById("display__users-list");

const displayNotesOutput = document.getElementById("display__notes");
const displayNotesOutputList = document.getElementById("display__notes-list");



const baseUrl = "http://localhost:8000/api/v1"
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY5MTA2NGVmZDQ2NTRmN2YzNDc4Y2JlOSIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWJjLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGhNMVg2bXZZVlVIOXFGMENpWmpqSC5yZmRPTW02Z1NnUmQ4aEk2NmxJdmJGU0JLNUlISFdtIiwicm9sZSI6IkFkbWluIiwiY3JlYXRlZEF0IjoiMjAyNS0xMS0wOVQwOTo1NDo1NS42OTlaIiwidXBkYXRlZEF0IjoiMjAyNS0xMS0wOVQwOTo1NDo1NS42OTlaIiwiX192IjowfSwiaWF0IjoxNzYyNjgyMTM1LCJleHAiOjE3NjI2ODkzMzV9.ZElLH49o3DbSQM2N0gjjPID7e7UbvoozUGgWEy1OOCE"

const token = localStorage.getItem("accessToken");

const displayUsers = () => {
    fetch(baseUrl+"/admin/getAllUsers", {
        method : "GET",
        headers : {
            Authorization : "Bearer " + token
        }
        })
        .then((response) => {
            return response.json();
        })
        .then((usersList) => {
                if(usersList.success === false){
                    displayUsersOutput.style.display = "block";
                    displayUsersOutput.innerHTML = "Access Denied";
                }
                else{                
                displayNotesOutput.style.display = "none";
                displayUsersOutput.style.display = "block";
                displayUsersListOutput.innerHTML = "";
                (usersList.users).forEach((user) => {
                    
                    let userDisplayElement = document.createElement("div");
                    let userNameElement = document.createElement("p");
                    let userEmailElement = document.createElement("p");
                    let userRoleElement = document.createElement("p");
                    let userDeleteButtonElement = document.createElement("button");

                    userDisplayElement.classList.add("card", "m-2", "p-2");
                    userDeleteButtonElement.classList.add("btn", "btn-danger", "w-50");

                    userDeleteButtonElement.innerHTML = "Delete";

                    userNameElement.innerHTML = `<strong>Name : </strong><span>${user.name}</span>`;
                    userEmailElement.innerHTML = `<strong>Email : </strong><span>${user.email}</span>`;
                    userRoleElement.innerHTML = `<strong>Role : </strong><span>${user.role}</span>`;

                    userDisplayElement.appendChild(userNameElement);
                    userDisplayElement.appendChild(userEmailElement);
                    userDisplayElement.appendChild(userRoleElement);
                    userDisplayElement.appendChild(userDeleteButtonElement);


                    displayUsersListOutput.appendChild(userDisplayElement);
                    

                    userDeleteButtonElement.addEventListener("click", () => {

                        let id = user._id;

                        fetch(baseUrl+"/admin/deleteUserById/"+id,{
                            method : "DELETE",
                            headers : {
                                Authorization : "Bearer " + token
                            }
                        }).then((response) => {
                            return response.json();
                        }).then((info) => {
                            userDisplayElement.style.display = "none";
                        });
                    });

                });
            }
            })
            .catch((error) => {
                console.log(error);
            })

    }


const addUsers = () => {
    fetch(baseUrl+"/admin/addUser", {
        method : "POST",
        headers : {
            Authorization : "Bearer " + token
        }
    })
    .then((response => {
        return response.json();
    }))
    .then((info) => {
        console.log(info.message);
    })
    .catch((error) => {
        console.log(error);
    })
}

const displayNotes = () => {
        fetch(baseUrl+"/users/getNotes", {
            method : "GET",
            headers : {
                Authorization : "Bearer " + token
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((userNotes) => {
                if(userNotes.success === false){
                    displayUsersOutput.style.display = "none";
                    displayNotesOutput.style.display = "block";
                }

                else{
                    displayUsersOutput.style.display = "none";
                    displayNotesOutput.style.display = "block";
                    displayNotesOutputList.innerHTML = " ";

                    (userNotes.notes).forEach((note) => {

                    let notesDisplayElement = document.createElement("div");
                    let notesTitleElement = document.createElement("p");
                    let notesDescriptionElement = document.createElement("p");
                    let notesDeleteButtonElement = document.createElement("button");

                    notesDeleteButtonElement.classList.add("btn", "btn-danger", "w-50");
                    notesDisplayElement.classList.add("card", "m-2", "p-2");


                    notesDeleteButtonElement.innerHTML = "Delete";

                    notesTitleElement.innerHTML = `<strong>Title : </strong><span>${note.title}</span>`;
                    notesDescriptionElement.innerHTML = `<strong>Description : </strong><span>${note.description}</span>`;

                    notesDisplayElement.appendChild(notesTitleElement);
                    notesDisplayElement.appendChild(notesDescriptionElement);
                    notesDisplayElement.appendChild(notesDeleteButtonElement);

                    displayNotesOutputList.appendChild(notesDisplayElement);

                    notesDeleteButtonElement.addEventListener("click", () => {

                        let id = note._id;

                        fetch(baseUrl+"/users/deleteNotesById/"+id,{
                            method : "DELETE",
                        }).then((response) => {
                            return response.json();
                        }).then((info) => {
                            notesDisplayElement.innerHTML = info.message;
                            setTimeout(() => {
                                notesDisplayElement.style.display = "none";
                            }, 1000)                        
                        });
                    });
                });
                }
        })
        .catch((error) => {
            console.log(error);
        })

}


const logout = () => {
 fetch(baseUrl+"/auth/logout", {
        method : "GET",
    }).then((response) => {
        return response.json();
    }).then((info) => {
        let logoutMessage = document.createElement("h4");
        if(info.success === true){
            localStorage.removeItem("accessToken");
            window.location.href = "login.html";
        }
        else{
            logoutMessage.innerHTML = info.message;
        }
    })
}


buttonUsers.addEventListener("click", displayUsers);

buttonNotes.addEventListener("click", displayNotes);

buttonLogout.addEventListener("click", logout);


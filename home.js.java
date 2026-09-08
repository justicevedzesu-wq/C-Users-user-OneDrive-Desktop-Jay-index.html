function login() {

let username = document.getElementById("username").value;
let password = document.getElementById("password").value;

if(username === "Jay" && password === "101101#Jay"){

    window.location.href = "dashborad.html";

}
else{

    alert("Wrong username or password");

}

}
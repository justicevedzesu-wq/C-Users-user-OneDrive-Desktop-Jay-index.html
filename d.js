
const currentUser =
    JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {

    window.location.href = "home.html";

}function enter() {
    alert("OPENED SUCCESSFULL");
     window.location.href = "comp.sci.html";

}
function enter1() {
    alert("OPENED SUCCESSFULL");
     window.location.href = "math.html";

}
function enter2() {
    alert("OPENED SUCCESSFULL");
     window.location.href = "programming.html";

}

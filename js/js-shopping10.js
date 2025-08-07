//event bubbling
const button = document.querySelector("form button");

const div = document.querySelectorAll("form div")[1];
const form = document.querySelector("form");
button.addEventListener("click", (e) => {
    alert("button was clicked");
});

div.addEventListener("click", (e) => {
    alert("div was clicked");
});

form.addEventListener("click", (e) => {
    alert("formw clicked");
});

// window event - important
window.addEventListener("load", ()=> console.log("page loaded"));
window.addEventListener("DOMContentLoaded", () =>console.log ("DOM loaded"));
console.log("run me");

//resize window
window.addEventListener("resize", ()=>(
    document.querySelector("h1").innerText= `Resize to ${window.innerWidth} * ${window.innerHeight}`));
    

    // scroll
window.addEventListener("scroll", () => {
    document.querySelector("h1").innerText = `Scrolled to ${window.scrollX} x ${window.scrollY}`;
        if (window.scrollY > 70) {
            document.body.style.backgroundColor = "red";
            document132.body.style.color="white";
        } else {
            document.body.style.backgroundColor = "white";
            document.body.style.color="black";
        }
});
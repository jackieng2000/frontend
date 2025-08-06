// js update css
const text = document.querySelector("p");
const itemList = document.querySelector("#item-list");
const items = itemList.querySelectorAll("li");
function run() {
    console.log(itemList.className);
    text.className = "card dark";
}
document.querySelector("button").onclick = run;

// js update css
const text = document.querySelector("header");
const itemList = document.getElementById("item-list");
const items = itemList.querySelectorAll("li");
function run() {
    // method 1 : add css class to the element
    // text.className = "card text-red";
    text.classList.add ("card", "text-red");
    // method 2 : add css class into classList - DOMTokenList
    itemList.classList.add("card", "text-red");
    // classList.remove css class
    text.classList.remove("text-red");
    // classList replace css class
    text.classList.replace("card", "text-red");
    // toggle function to keep the css state value
    text.classList.toggle("hidden");
    // loop nodeList to update css by html style
    items.forEach((item, index) =>{
        if (index === 1) {item.style.outline = "2px solid red" 

        }
    })
}
document.getElementById("clear").onclick = run;

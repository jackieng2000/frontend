// events
const clearBtn = document.querySelector("#clear");
console.log(clearBtn.textContent);

function onClear() {
    const itemList = document.querySelector("ul");
    const items = document.querySelectorAll("li");
    // method 1 : simple update content
    items.forEach((item, index) => {
        console.log(item.textContent)
        if (index===1) { itemList.removeChild(item);
        }
    });
}
// direct adding callback to element's api
clearBtn.onclick = () => alert("clear items");
// clear callback by reassign api to null
clearBtn.onclick = null;
// method 2 : add event listener
// clearBtn.addEventListener("click", onClick);
// combine setTimeout with event listener, will execute after 2 seconds
function handleClear() {
    setTimeout(onClear, 2000);}

clearBtn.addEventListener("click", handleClear);
// Delete the listener
setTimeout(() => clearBtn.removeEventListener("click", handleClear), 7000);

//=========================================================
// mouse events
const logo =document.querySelector("img");
const onDoubleClick = () => {
    if (document.body.style.backgroundColor != "purple") {
        document.body.style.backgroundColor = "purple";
        document.body.style.color = "white";
    } else {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
    }
}

// logo.addEventListener("dblclick", onDoubleClick);   // double click
// logo.addEventListener("click", onDoubleClick);   // single click
logo.addEventListener("contextmenu", onDoubleClick);   //right click
// logo.addEventListener("mousedown", onDoubleClick);   // mouse down
logo.addEventListener("mouseup", onDoubleClick);   // 
logo.addEventListener("wheel", onDoubleClick);   // 
logo.addEventListener("mouseover", onDoubleClick);   // 
logo.addEventListener("mouseout", onDoubleClick);   // double click
// logo.addEventListener("dragstart", onDoubleClick);   // drag start
// logo.addEventListener("drag", onDoubleClick);   //
logo.addEventListener("dragend", onDoubleClick);   // double click



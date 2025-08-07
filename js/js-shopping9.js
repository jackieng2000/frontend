//event object's properties
const logo = document.querySelector("img");
logo.addEventListener("click",function(e) {
    console.log(e);
    console.log(e.currentTarget);
});

// target - the element that triggered the event
// currentTarget - the element that is currently handling the event
// type- event type
// timeStamp - timestamp of the event triggered
//clientX - x position of the mouse click relative to window
//clientY - y position of the mouse click relative to window
//offsetX - x position of the mouse click relative to element
//offsetX - y position of the mouse click relative to element
//pageX - x position of the mouse click relative to page
//pageY - y position of the mouse click relative to page
//screenX - x position of the mouse click relative to screen
//screenY - y position of the mouse click relative to screen
//prevent browser default behavior

document.querySelector('a').addEventListener("click", function(e) {
    e.preventDefault();
    console.log("a Link was clicked");
});

function onDrag(e) {
    document.querySelector("h1").textContent = `X:${e.clientX} Y:${e.clientY}`

};

logo.addEventListener("drag", onDrag);

//================================================================
// keyboard events
const itemInput = document.getElementById("item-input");
// key press
const onKeyPress = e=> console.log("keypress");
itemInput.addEventListener("keypress", onKeyPress);
// key up
const onKeyUp = (e) => console.log ("key up");
itemInput.addEventListener("keyup", onKeyUp);
// Key code table
// key down
const onKeyDown = e=> {
    if (e.key === "Enter"){
        // e.preventDefault();
        console.log("enter was pressed");
    }
    if (e.code ==="Digit1"){
        console.log("you pressed 1");
    }
    if (e.repeat) {
        console.log("you are holding down" + e.key);
    }
    console.log("Shift:" + e.shiftKey);
    console.log("Control:" + e.ctrlKey);
    console.log("Alt:" + e.altKey);
    if (e.shiftKey && e.key === "k")
     console.log("you pressed shift and K");
}
itemInput.addEventListener("keydown", onKeyDown);
//===============================================================
// input events can be used to update the DOM
const itemInput2 = document.getElementById("item-input");
const priorityInput = document.getElementById("priority-input");
const checkbox = document.getElementById("checkbox");
const heading = document.querySelector("h1");
function onInput(e) {
    heading.textContent = e.target.value;
}

itemInput2.addEventListener("input",onInput);

// checkbox 
function onChecked(e) {
    isChecked = e.target.Checked;
    console.log(isChecked);
    heading.textContent = isChecked ? "checked" : "not checked";
}
checkbox.addEventListener("input", onChecked);

// select the input field
function onFocus() {
    console.log("Input is focused");
    itemInput2.style.outlineStyle = "solid";
    itemInput2.style.outlineColor = "red";
    itemInput2.style.outlineWidth = "2px";

}
itemInput2.addEventListener("focus",onFocus);

// unsselect the input field
function onBlur() {
    console.log("Input is not focused");
    itemInput2.style.outlineStyle = "none";
}
itemInput2.addEventListener("blur", onBlur);

// react style onChange
priorityInput.addEventListener("change", onInput);

//======================================================
// form submit
// method 1 : normal input data 
const form =document.getElementById("item-form");
function onSubmit(e) {
    console.log("Form was submitted");
    priority = checkbox.value
    const item = document.getElementById("item-input").value;

    if (item==="" || priority === "0") {
        alert("Please enter an item and priority");
        return
    }
    console.log(item, priority);
}
form.addEventListener("submit", onSubmit);

//method 2 : FormData object
function onSubmit2(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const item = formData.get('item');
    const priority = formData.get("priority");
    console.log(item, priority);
    const entries = formData.entries();
    console.log(entries);
    for (const entry of entries) {
        console.log(entry[1]);
    }
}
form.addEventListener("submit", onSubmit2);







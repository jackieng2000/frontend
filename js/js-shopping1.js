let output;
//a.document.all -HTMLALLCollection, different with HTMLCollection
output = document.all;
console.log(output)

//b. document.documentElement - html tags in text form
output = document.documentElement;
console.log(output);

//c. document.head - head tag in text form
output = document.head;
console.log(output);

//d. HTMLCollection of head tag direct child
output = document.head.children;
console.log(output);

//e. document other properties
output = document.doctype;
output = document.domain;
output = document.URL;
output = document.characterSet;
output = document.contentType;
console.log(output);

//f. document.forms
output = document.forms;
output = document.forms[0];
output = document.forms[0].id;
output = document.forms[0].action;
output = document.forms[0].method;
console.log(output);
document.forms[0].id ="my-form"
output = document.forms[0].id;
console.log(output);

//g. document.links
output = document.links;
output = document.links[0];
output = document.links[0].href="https://www.google.com";
output = document.links[0].id="google-link";
output = document.links[0].className="google-link";
output = document.links[0].classList;
console.log(output);

//h. document.images
output = document.images;
output = document.images[0];
output = document.images[0].src;
output = document.images[0].alt;
output = document.images[0].id;
console.log(output);

//i. convert HTMLCollection to array
const forms = Array.from(document.forms);
forms.forEach((form) => {
    console.log(form);
    console.log(typeof form);
});

//==========================================
//select elements
//a. selector by element
const listItems = document.querySelectorAll(".item");
// select all the text content of li
console.log(listItems[0].innerText);
//return the html of li
console.log(listItems[0].innerHTML);
// apply css style into nodeList single item
listItems[0].style.color = "red"



// normal array high order function applied
listItems.forEach((item, index) => {
    item.style.color = "red";
    item.style.fontSize = "40px";
    item.style.fontWeight = "bold";
    item.style.textDecoration = "green;"
    if (index == 1){
        item.remove();
    }

    // can't simply modify the nodeList html structure
    // nodeList includes textNode and other Node structures
    if (index == 0){
        item.innerHTML = 
        'Milk <button class="remove-item btn-link text-red" ><i class="fa-solid fa-xmark"></i></button>';
    }
});
//===========================================================
//b. select bhy element class name - return HTMLCollection
// print the 3rd item innerText
const listItems2 = document.getElementsByClassName("item");
console.log(listItems2[0].innerText);
//convert htmlCollection to array
const listItemsArray = Array.from(listItems2);
listItemsArray.forEach((listItem, index) => {
    console.log(listItem.innerText)

});

//==========================================================
//c. select by element tag name
const listItems3 = document.getElementsByTagName("li");
console.log(listItems3);

//==========================================================
//d. select by element id
const listItems4 = document.getElementById("item-form");
console.log(listItems4);

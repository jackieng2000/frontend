// a. insert adjust element In Element mode
function insertElement(){
    const filter = document.querySelector(".filter");
    const h1 = document.createElement("h1");
    const h2 = document.createElement("h2");
    h1.textContent = "a. insert Adjust Element";
    h2.textContent = "a. insert Adjust Element";
    // paste h1 above the filter element -
    filter.insertAdjacentElement("beforebegin", h1);
    // paste h1 above the filter afterend -
    filter.insertAdjacentElement("afterend", h2);
}
insertElement();

//b. insert adjust text - In Element mode
function insertText(){
    const item = document.querySelector("li:first-child");
    // insert text before the "Apple" - after begin
    item.insertAdjacentText("afterbegin","b. insert adjust text ");
    //insert text before the end of li, before the font- before end
    item.insertAdjacentText("beforeend","b. insert adjust text ");
}
insertText();

//c. insert adjust html - In Element mode
function insertHtml(){
    const clearBtn = document.querySelector("#clear");
    clearBtn.insertAdjacentHTML("beforebegin", "<h2>c. insert adjust html</h2>");
    clearBtn.insertAdjacentHTML("afterend", "<h2>c. insert adjust html</h2>");
}
insertHtml();

//d. insertBefore(newItem, existing)      - In node mode
function insertBeforeItem() {
    const ul = document.querySelector("ul");
    const li = document.createElement('li');
    li.textContent = "d. insert before item";
    const thirdItem = document.querySelector("li:nth-child(3)");
    ul.insertBefore(li, thirdItem);
}
insertBeforeItem();

//e. custom made insertAfter() - Node mode
function insertAfter(newEl, existingEl) {
    existingEl.parentNode.insertBefore(newEl, existingEl.nextSibling);
}

const li = document.createElement("li");
li.textContent = "e. Insert Me after!";
const existingItem = document.querySelector("li:nth-child(5)");
insertAfter(li, existingItem);

//f. replaceWith()  - a node function
function replaceFirstItem() {
    const firstItem = document.querySelector("li:first-child");
    const newElement = document.createElement("li");
    newElement.textContent = "f. Replace First Item";
    firstItem.replaceWith(newElement);
}
replaceFirstItem();

//g. replaceChild() - node function
function replaceChildHeading() {
    const header = document.querySelector("header");
    const h1 = document.querySelector("header h1");
    const h2 = document.createElement("h2");
    h2.id = "app-title";
    h2.textContent = "g. Replace Shopping List";
    header.replaceChild(h2, h1);
}
replaceChildHeading();

//h. outerHTML - replace html component
function replaceALLitems(){
    const lis = document.querySelectorAll("li");
    lis.forEach((item,index) => {
        item.outerHTML = index === 1 ? "<li>h.Second Item</li>" : "<li>Item</li>";
    });
}
replaceALLitems();

//i. remove() - node function
function removeClearButton() {
    const clearBtn=document.querySelector("#clear");
    clearBtn.remove();
}

removeClearButton();

//j removeChild() - node function
function removeItem(itemNumber) {
    const ul = document.querySelector("ul");
    //string templae literal
    const li = document.querySelector(`li:nth-child(${itemNumber})`);
        ul.removeChild(li);
}
removeItem(2);

//h. node list index methods, index start from 0
function removeItem2(itemNumber) {
    const ul = document.querySelector("ul");
    const li = document.querySelectorAll("li")[itemNumber -1];
    ul.removeChild(li);
}
removeItem2(2);

//c. node list direct remove element
function removeItem3(itemNumber) {
    const li = document.querySelectorAll("li");
    li[itemNumber -1].remove();
}
removeItem3(1);

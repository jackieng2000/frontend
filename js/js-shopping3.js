// nodeList
// querySelector - return static data - snapshot data
// getElementsBxxx - return dynamic data
const parent = document.querySelector(".container");
output = parent.childNodes;
console.log(output);
// includes all text Node
// note test content
content  = output[1].textContent;
// note type and name
content = output[1].nodeName;
content = output[1].nodeType;
console.log(content);
// .inspect child node structure
content = output[3].textContent;
console.log(content);
// element
content = output[3].outerHTML;
console.log(content);
output[3].textContent = "google";
output[3].style.color = "red";
// container's first child
firstChild = parent.firstChild;
console.log(firstChild);
// container's last child
lastChild = parent.lastChild;
console.log(lastChild);

//from child to parent

const child = document.querySelector("form");
// same structure : HTML element
parent1 = child.parentNode;
parent2 = child.parentElement;
console.log(parent1, parent2);

// next sibling
const secondItem = document.querySelector('form div:nth-child(2)');
console.log(secondItem);
// next sibling
nextSibling = secondItem.nextSibling;
console.log(nextSibling);

// previous sibling
previousSibling = document.previousSibling;
previousElementSibling = secondItem.previousElementSibling;
console.log(previousElementSibling);





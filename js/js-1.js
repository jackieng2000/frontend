console.log(window);
console.log(window.document); // window.document only see the document
console.log(document.body);
console.log(document.links);
// document.body.innerHTML = "<h1>hello world from body</h1>";
console.log(document.links);
// console.log(document.body.innerText="a")
// document.writeln("hello from js - writeln")
console.log(document.body);
document.getElementById("h1").innerHTML = "<p> create first - getElementById</p>";
document.querySelector("#h1 p").innerHTML = "<p> updated to second - querySelector</p>";
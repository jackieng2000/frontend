const RChild = (props) => {     //props - standard for passing parameter
    console.log(props.v2);
    return React.createElement("p",{className:props.className, id:props.id}, props.v1);   // pass className as parameter
}


const SubComponent = () => {
    return React.createElement("div", null,[
        // call RChild to generate element. must use react.
        React.createElement(RChild, {className: "test", v1: "Hello World", v2: "world", }),
        React.createElement(RChild, {v1: "This is a paragraph", id: "testId", }),
    ]);
};

const App = () => {
    return React.createElement("div", null,React.createElement(SubComponent));
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
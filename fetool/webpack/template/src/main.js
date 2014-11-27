const css = require("css-loader!./index.css");
const h2 = document.createElement("h2");

h2.className = "test";
h2.innerText = "test";
document.body.append(h2)
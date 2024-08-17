const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  let path = url.parse(req.url, true);
  
  if (path.pathname == "/calculate") {
    let operation = path.query.operation;
    let num1 = parseFloat(path.query.num1);
    let num2 = parseFloat(path.query.num2);
    let result;

    switch (operation) {
      case 'add':
        result = num1 + num2;
        break;
      case 'subtract':
        result = num1 - num2;
        break;
      case 'multiply':
        result = num1 * num2;
        break;
      case 'divide':
        result = num2 !== 0 ? num1 / num2 : "Cannot divide by zero";
        break;
      case 'square':
        result = num1 * num1;
        break;
      case 'sqrt':
        result = Math.sqrt(num1);
        break;
      case 'evenodd':
        result = num1 % 2 === 0 ? "Even" : "Odd";
        break;
      default:
        result = "Invalid operation";
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ result: result }));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(9000, () => { console.log("Server ready @ 9000"); });
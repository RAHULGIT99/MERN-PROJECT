// //setTimeout(callback,delay time)
// // clearTimeout -- can clear a timeout before it appears
// // function add(){
// //     return 1+2;
// // }
// // setTimeout(add,1000);
// var t = {"name" : "ra","age":12}
// console.log(t.age)
// Load the HTTP module
const http = require('http');
// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set the response HTTP headers
  res.writeHead(200, { 'Content-Type': 'text/html' });
  
  // Write the response content
  res.end('<h1>Welcome to KMIT!</h1>');
});

// The server listens on port 3000
server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});

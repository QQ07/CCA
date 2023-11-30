const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  // Check if the request is for the root path
  if (req.url === "/") {
    // Read the content of the HTML file
    const filePath = path.join(__dirname, "index.html");

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading HTML file:", err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        // Set the content type to HTML
        res.writeHead(200, { "Content-Type": "text/html" });
        // Send the HTML content as the response
        res.end(data);
      }
    });
  } else {
    // Handle other paths (e.g., 404 Not Found)
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});

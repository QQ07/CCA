const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Root route
app.get("/", (req, res) => {
  // Read the content of the HTML file
  const filePath = path.join(__dirname, "index.html");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading HTML file:", err);
      res.status(500).send("Internal Server Error");
    } else {
      // Set the content type to HTML
      res.status(200).send(data);
    }
  });
});



// Simulated employee data store
const employeeData = {
  101: {
    baseSalary: 50000,
  },
  102: {
    baseSalary: 60000,
  },
};

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Endpoint to get employee salary by ID
app.get("/getSalary/:employeeId", (req, res) => {
  const employeeId = req.params.employeeId;
  const employee = employeeData[employeeId];

  if (employee) {
    res.json({ baseSalary: employee.baseSalary });
  } else {
    res.status(404).json({ error: "Employee not found" });
  }
});

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});

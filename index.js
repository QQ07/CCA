const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
const PORT = 3001;

// Root route
app.get("/", (req, res) => {
  // Read the content of the HTML file
  const filePath = path.join(__dirname, "index.html");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading HTML file:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.status(200).send(data);
    }
  });
});



const employeeData = {
  101: {
    baseSalary: 50000,
  },
  102: {
    baseSalary: 60000,
  },
  "103":{
    baseSalary: 5000,
  },
};


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

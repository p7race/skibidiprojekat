const express = require("express");
const fs = require("fs");
const path = require("path"); // Path module to manage file paths
const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/submit", (req, res) => {
  const { code, name } = req.body;

  let data = [];
  const filename = "podaci.json";
  if (fs.existsSync(filename)) {
    data = JSON.parse(fs.readFileSync(filename, "utf-8"));
  }

  data.push({ ime: code, lozinka: name });

  fs.writeFileSync(filename, JSON.stringify(data, null, 2));

  res.send("Form submission successful!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

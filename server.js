const express = require("express");
const { Pool } = require("pg");
const path = require("path");

const app = express();
let pool;

if (process.env.DB_HOST) {
  pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
}

app.use(express.static("build"));

app.get("/api/employees", async (req, res) => {
  try {
    // Local development
    if (!pool) {
      return res.json([
        {
          id: 1,
          name: "John",
          designation: "Developer",
          department: "Engineering",
        },
        {
          id: 2,
          name: "Emma",
          designation: "QA",
          department: "Testing",
        },
      ]);
    }
    //Kubernetes deployment
    const result = await pool.query("select * from employees");

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(5000, () => {
  console.log("Backend running on 5000");
});

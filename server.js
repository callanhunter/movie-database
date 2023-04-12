const express = require("express");
// Import and require mysql2
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL Username
    user: "root",
    // MySQL Password
    password: "password",
    database: "movies_db",
  },
  console.log(`Connected to the movies_db database.`)
);

app.use((req, res) => {
  res.status(404).end();
});

// Create a movie
app.post("/api/new-movie", ({ body }, res) => {
  const sql = `INSERT INTO movies (movie_name)
    VALUES (?)`;
  const params = [body.movie_name];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

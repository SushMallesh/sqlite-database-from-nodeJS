const express = require("express");
const { open } = require("sqlite");
const path = require("path");
const sqlite3 = require("sqlite3");
const app = express();

const dbPath = path.join(__dirname, "goodreads.db");

let db = null;
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running at http://localhost");
    });
  } catch (err) {
    console.log(`DB Error: ${err.message}`);
  }
};

initializeDBAndServer();

app.get("/books/", async (request, response) => {
  const getBooksDetails = `SELECT * FROM book ORDER BY book_id`;

  const booksArray = await db.all(getBooksDetails);
  response.send(booksArray);
});

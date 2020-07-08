const express = require("express");
const path = require("path");
const request = require("request");
const config = require("./config/keys");

const PORT = process.env.PORT || 3000;

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/results", (req, res) => {
  let query = req.query.search;

  request(
    `https://api.themoviedb.org/3/search/movie?api_key=${config.api}&query=` +
      query,
    (error, response, body) => {
      if (error) {
        console.log(error);
      }

      let data = JSON.parse(body);
      res.render("movies", { data: data, searchQuery: query });
    }
  );
});

app.get("/search", (req, res) => {
  res.render("search");
});

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});

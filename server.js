const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
mongoose.promise = global.promise;

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to easy notes application. Take notes quickly. orgnize and keep track of your notes",
  });
});

require("./app/routes/note.routes.js")(app);

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});

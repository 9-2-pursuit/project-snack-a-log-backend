// DEPENDENCIES
const express = require("express");
const cors = require("cors");
const welcome = require("./controllers/welcome")
const { snacks, singleSnack, deleteSnack, newSnack } = require("./controllers/snackController")

const app = express();




// CONFIGURATION


// MIDDLEWARE
app.use(express.json());
app.use(cors());

// ROUTES
app.get("/", welcome)
app.get("/snacks", snacks)
app.get("/snacks/:id", singleSnack)
app.delete("/snacks/:id", deleteSnack)
app.post("/snacks", newSnack)
app.put("/snacks/:id", updateSnack)
// EXPORT
module.exports = app;

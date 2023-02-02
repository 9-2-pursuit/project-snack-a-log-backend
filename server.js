// DEPENDENCIES
require("dotenv").config();
const app = require("./app")

// CONFIGURATION

// LISTEN
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`app is listening on port ${PORT}`))
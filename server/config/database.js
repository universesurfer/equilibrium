const mongoose = require("mongoose");
const dbName = "equilibrium";

//Connect to the database
mongoose.connect(`mongodb://localhost:27017/${dbName}`);

const database = mongoose.connection;

database.on("error", console.error.bind(console, 'connection error:'));
database.once("open", () => {
  console.log(`Connect to the ${dbName} database`);
});

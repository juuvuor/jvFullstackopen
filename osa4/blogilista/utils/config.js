require("dotenv").config();

let mongoUrl = process.env.mongoUrl;
let PORT = process.env.PORT;

module.exports = {
  mongoUrl,
  PORT,
};

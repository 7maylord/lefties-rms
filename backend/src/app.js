const express = require("express");
const roomRoute = require('./routes/roomRoute')
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", roomRoute);

// renders the home page
app.get('/', (req, res) => {
  res.status(200);
  res.json({
    message: "Welcome to Lefties API",
  });
});


//catch all route
app.all("*", (req, res) => {
  res.status(404);
  res.json({
    message: "Not found",
  });
});


module.exports = app;

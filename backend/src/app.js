const express = require("express");


const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
//app.use("/api", articleRoutes);

// renders the home page
app.get('/', (req, res) => {
  res.status(200);
  res.json({
    message: "Welcome to Olumide Like Button API",
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

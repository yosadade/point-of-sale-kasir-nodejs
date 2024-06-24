// app.js
const express = require("express");
const bodyParser = require("body-parser");
const salesRoutes = require("./routes/sales");
const itemsRoutes = require("./routes/items");
const usersRoutes = require("./routes/users");

const db = require("./models");

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/sales", salesRoutes);
app.use("/items", itemsRoutes);
app.use("/users", usersRoutes);

// Sync Database
db.sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.log("Error syncing database: " + err.message);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

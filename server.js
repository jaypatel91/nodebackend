const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB connection
mongoose.connect("mongodb+srv://compdev3038_db_user:cU3besLHYKyZX37B@cluster0.9fxsiqy.mongodb.net/ordersDB?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API running successfully on Vercel!");
});

// ✅ Export app (for Vercel)
module.exports = app;

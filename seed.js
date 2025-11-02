const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();
const connectDB = require("./config/db");

const data = [
  { name: "iPhone 15", category: "Electronics", price: 79999, quantity: 10 },
  { name: "T-Shirt", category: "Fashion", price: 599, quantity: 200 },
  { name: "Gaming Mouse", category: "Electronics", price: 2499, quantity: 50 },
  { name: "Blender", category: "Home", price: 3499, quantity: 30 }
];

async function seed() {
  await connectDB(process.env.MONGO_URI);
  await Product.deleteMany({});
  await Product.insertMany(data);
  console.log("Seeded DB");
  process.exit();
}
seed();

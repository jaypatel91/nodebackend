const Product = require("../models/Product");

// Create
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all with search / sort / pagination
exports.getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", sortBy = "dateAdded", order = "desc" } = req.query;

    const filter = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    const skip = (Number(page) - 1) * Number(limit);
    const sortOption = { [sortBy]: order === "desc" ? -1 : 1 };

    const [items, total] = await Promise.all([
      Product.find(filter).sort(sortOption).skip(skip).limit(Number(limit)),
      Product.countDocuments(filter)
    ]);

    res.json({ items, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read single
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update
exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

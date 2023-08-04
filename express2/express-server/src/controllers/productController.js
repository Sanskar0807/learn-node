const Product = require("../model/product");
const axios = require("axios");

exports.addProduct = async (req, res) => {
  const { productName, price } = req.body;

  try {
    const userId = req.userId;
    const newProduct = new Product({
      productName,
      price,
      addedBy: userId,
    });
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getProductFromExternalAPI = async (req, res) => {
  try {
    const response = await axios.get(
      "https://mocki.io/v1/24a804cd-8b5a-4f9c-ba40-d9aec9bbe6d4"
    );
    const products = response.data;
    res.json(products);
  } catch (error) {
    console.error("Error fetching product data from 3rd party API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

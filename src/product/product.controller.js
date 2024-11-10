// Layer untuk handle request dan response
// Biasanya juga handle validasi body

const express = require("express");
const prisma = require("../db");
const {
  getAllProducts,
  getProductsbyId,
  createProduct,
  deleteProductById,
  updateProductById,
} = require("./product.server");

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await getAllProducts();

  res.send(products);
});

router.get("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await getProductsbyId(productId);
    res.send(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newProductData = req.body;
    const product = await createProduct(newProductData);

    res.send({
      data: product,
      message: "Product created",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    await deleteProductById(parseInt(productId));

    res.send("Product deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  const productsData = req.body;
  const productId = req.params.id;

  if (
    !(
      productsData.name &&
      productsData.price &&
      productsData.description &&
      productsData.image
    )
  ) {
    return res.status(400).send({
      message: "All fields are required",
    });
  }

  const product = await updateProductById(parseInt(productId), productsData);

  res.send({
    data: product,
    message: "Product updated",
  });
});

router.patch("/:id", async (req, res) => {
  try {
    const productsData = req.body;
    const productId = req.params.id;
    const product = await updateProductById(parseInt(productId), productsData);

    res.send({
      data: product,
      message: "Product updated",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

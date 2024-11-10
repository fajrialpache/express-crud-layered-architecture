// Service layer bertujuan untuk handle business logic
// Kenapa dipisah? Supaya tanggung jawabnya ter-isolate, dan functions-nya
// reusable

const prisma = require("../db");
const {
  findProduct,
  findProductById,
  insertProduct,
  deleteProduct,
  updateProduct
} = require("./product.repository");

const getAllProducts = async () => {
  const products = await findProduct();

  return products;
};

const getProductsbyId = async (id) => {
  const product = await findProductById(id);

  if (!product) {
    throw Error("Product not found");
  }

  return product;
};

const createProduct = async (newProductData) => {
  const product = await insertProduct(newProductData);

  return product;
};

const deleteProductById = async (id) => {
  await getProductsbyId(id);

  await deleteProduct(id);
};

const updateProductById = async (id, productsData) => {
  await getProductsbyId(id);
  const product = await updateProduct(id, productsData);
  return product;
};

module.exports = {
  getAllProducts,
  getProductsbyId,
  createProduct,
  deleteProductById,
  updateProductById,
};

// Berkomunikasi dengan database
// Boleh pake ORM, boleh raw query
// Supaya apa? Supaya kalo mau ganti2 ORM tinggal edit di file ini aja

const prisma = require("../db");

const findProduct = async (id) => {
    const product = await prisma.product.findMany();

    return product;
}

const findProductById = async (id) => {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    return product;
}

const insertProduct = async (productData) =>{
     const product = await prisma.product.create({
       data: {
         name: productData.name,
         price: productData.price,
         description: productData.description,
         image: productData.image,
       },
     });

     return product;
}

const deleteProduct = async (id) => {
    await prisma.product.delete({
      where: {
        id,
      },
    });
}

const updateProduct = async (id, productData) => {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name: productData.name,
        price: productData.price,
        description: productData.description,
        image: productData.image,
      },
    });
    return product;
}

module.exports = {
    findProduct,
    findProductById,
    insertProduct,
    deleteProduct,
    updateProduct
}
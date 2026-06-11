const prisma = require("./prismaClient");

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

function resolverImagen(producto) {
  if (!producto) return producto;
  return {
    ...producto,
    imagen: producto.imagen ? `${BASE_URL}${producto.imagen}` : null
  };
}

async function findAll() {
  const productos = await prisma.producto.findMany({ orderBy: { id: "asc" } });
  return productos.map(resolverImagen);
}

async function findById(id) {
  const producto = await prisma.producto.findUnique({ where: { id } });
  return resolverImagen(producto);
}

async function createProducto(data) {
  const producto = await prisma.producto.create({ data });
  return resolverImagen(producto);
}

async function updateProducto(id, data) {
  const producto = await prisma.producto.update({ where: { id }, data });
  return resolverImagen(producto);
}

async function deleteProducto(id) {
  return prisma.producto.delete({ where: { id } });
}

async function decrementStock(productoId, cantidad) {
  return prisma.producto.update({
    where: { id: productoId },
    data: { stock: { decrement: cantidad } }
  });
}

module.exports = {
  findAll,
  findById,
  createProducto,
  updateProducto,
  deleteProducto,
  decrementStock
};

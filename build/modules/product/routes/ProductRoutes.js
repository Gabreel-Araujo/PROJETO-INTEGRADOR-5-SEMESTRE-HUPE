"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/modules/product/routes/ProductRoutes.ts
var ProductRoutes_exports = {};
__export(ProductRoutes_exports, {
  productRoutes: () => productRoutes
});
module.exports = __toCommonJS(ProductRoutes_exports);

// src/modules/product/repositories/ProductRepository.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var productRepository = {
  create: async (data) => {
    return prisma.product.create({
      data
    });
  },
  findMany: async (entrepreneurId) => {
    return prisma.product.findMany({
      where: {
        entrepreneurId
      }
    });
  },
  update: async (id, data) => {
    return prisma.product.update({
      where: { id },
      data
    });
  },
  delete: async (id) => {
    return prisma.product.delete({
      where: { id }
    });
  },
  findUnique: async (id) => {
    return prisma.product.findUnique({
      where: { id }
    });
  }
};

// src/modules/product/services/ProductService.ts
var productService = {
  createProduct: async (data) => {
    return productRepository.create(data);
  },
  getProducts: async (entrepreneurId) => {
    return productRepository.findMany(entrepreneurId);
  },
  updateProduct: async (id, data) => {
    return productRepository.update(id, data);
  },
  deleteProduct: async (id) => {
    await productRepository.delete(id);
  },
  getProductById: async (id) => {
    return productRepository.findUnique(id);
  }
};

// src/modules/product/controllers/ProductController.ts
var productController = {
  create: async (request, reply) => {
    const { name, description, price, available, entrepreneurId } = request.body;
    try {
      const newProduct = await productService.createProduct({
        name,
        description,
        price,
        available,
        entrepreneurId
      });
      return reply.status(201).send(newProduct);
    } catch (error) {
      return reply.status(500).send({ message: "Error creating product", error });
    }
  },
  getAll: async (request, reply) => {
    const { entrepreneurId } = request.query;
    try {
      const products = await productService.getProducts(entrepreneurId);
      return reply.status(200).send(products);
    } catch (error) {
      return reply.status(500).send({ message: "Error retrieving products", error });
    }
  },
  update: async (request, reply) => {
    const { id } = request.params;
    const { name, description, price, available } = request.body;
    try {
      const updatedProduct = await productService.updateProduct(id, {
        name,
        description,
        price,
        available
      });
      return reply.status(200).send(updatedProduct);
    } catch (error) {
      return reply.status(500).send({ message: "Error updating product", error });
    }
  },
  delete: async (request, reply) => {
    const { id } = request.params;
    try {
      await productService.deleteProduct(id);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(500).send({ message: "Error deleting product", error });
    }
  }
};

// src/modules/product/routes/ProductRoutes.ts
var productRoutes = async (fastify) => {
  fastify.post("/products", productController.create);
  fastify.get("/products", productController.getAll);
  fastify.put("/products/:id", productController.update);
  fastify.delete("/products/:id", productController.delete);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  productRoutes
});

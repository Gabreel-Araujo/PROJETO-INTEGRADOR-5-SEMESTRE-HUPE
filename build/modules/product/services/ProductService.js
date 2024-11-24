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

// src/modules/product/services/ProductService.ts
var ProductService_exports = {};
__export(ProductService_exports, {
  productService: () => productService
});
module.exports = __toCommonJS(ProductService_exports);

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  productService
});

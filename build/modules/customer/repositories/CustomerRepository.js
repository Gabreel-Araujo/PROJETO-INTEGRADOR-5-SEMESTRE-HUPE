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

// src/modules/customer/repositories/CustomerRepository.ts
var CustomerRepository_exports = {};
__export(CustomerRepository_exports, {
  CustomerRepository: () => CustomerRepository
});
module.exports = __toCommonJS(CustomerRepository_exports);
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var CustomerRepository = class {
  async create(data) {
    return await prisma.customer.create({
      data: {
        user: { connect: { id: data.userId } },
        orders: {
          connect: data.orders?.map((id) => ({ id })) || []
        }
      },
      include: {
        user: true,
        orders: true
      }
    });
  }
  async findAll() {
    return await prisma.customer.findMany({
      include: {
        user: true,
        orders: true
      }
    });
  }
  async findById(id) {
    return await prisma.customer.findUnique({
      where: { id },
      include: {
        user: true,
        orders: true
      }
    });
  }
  async update(id, data) {
    return await prisma.customer.update({
      where: { id },
      data: {
        user: data.userId ? { connect: { id: data.userId } } : void 0,
        orders: {
          connect: data.orders?.map((id2) => ({ id: id2 })) || []
        }
      },
      include: {
        user: true,
        orders: true
      }
    });
  }
  async delete(id) {
    return await prisma.customer.delete({
      where: { id },
      include: {
        user: true,
        orders: true
      }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CustomerRepository
});

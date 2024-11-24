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

// src/modules/user/repositories/UserRepository.ts
var UserRepository_exports = {};
__export(UserRepository_exports, {
  UserRepository: () => UserRepository
});
module.exports = __toCommonJS(UserRepository_exports);
var import_client = require("@prisma/client");
var import_bcrypt = require("bcrypt");
var prisma = new import_client.PrismaClient();
var UserRepository = class {
  async createUser(data) {
    const hashedPassword = await (0, import_bcrypt.hash)(data.password, 10);
    return await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword
      }
    });
  }
  async getAllUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        customerId: true,
        createdAt: true,
        updatedAt: true,
        password: false
      }
    });
  }
  async getUserById(id) {
    return await prisma.user.findUnique({
      where: { id }
    });
  }
  async findUserByEmail(email) {
    return await prisma.user.findUnique({
      where: { email }
    });
  }
  async updateUser(id, data) {
    if (data.password) {
      data.password = await (0, import_bcrypt.hash)(data.password, 10);
    }
    return await prisma.user.update({
      where: { id },
      data
    });
  }
  async deleteUser(id) {
    return await prisma.user.delete({
      where: { id }
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserRepository
});

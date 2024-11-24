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

// src/modules/menu/services/MenuService.ts
var MenuService_exports = {};
__export(MenuService_exports, {
  default: () => MenuService_default
});
module.exports = __toCommonJS(MenuService_exports);

// prisma/client.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var client_default = prisma;

// src/modules/menu/services/MenuService.ts
var MenuService = class {
  // Criar um menu
  async createMenu(menuData) {
    const { name, entrepreneurId } = menuData;
    const menu = await client_default.menu.create({
      data: {
        name,
        entrepreneurId
      }
    });
    const products = await client_default.product.findMany({
      where: {
        entrepreneurId
      }
    });
    if (products.length > 0) {
      await client_default.menu.update({
        where: { id: menu.id },
        data: {
          products: {
            connect: products.map((product) => ({ id: product.id }))
          }
        }
      });
    }
    return client_default.menu.findUnique({
      where: { id: menu.id },
      include: { products: true }
      // Incluir produtos agora
    });
  }
  // Obter todos os menus
  async getAllMenus() {
    return await client_default.menu.findMany({
      include: {
        products: true
        // Incluir produtos associados aos menus
      }
    });
  }
  // Obter um menu por ID
  async getMenuById(id) {
    return await client_default.menu.findUnique({
      where: { id },
      include: { products: true }
      // Incluir produtos ao buscar o menu
    });
  }
  // Atualizar um menu
  async updateMenu(id, data) {
    return await client_default.menu.update({
      where: { id },
      data,
      include: {
        products: true
        // Incluir produtos ao atualizar
      }
    });
  }
  // Deletar um menu
  async deleteMenu(id) {
    await client_default.menu.delete({
      where: { id }
    });
  }
};
var MenuService_default = new MenuService();

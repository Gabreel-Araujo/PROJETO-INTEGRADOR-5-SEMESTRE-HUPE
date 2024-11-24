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

// src/modules/menu/repositories/MenuRepository.ts
var MenuRepository_exports = {};
__export(MenuRepository_exports, {
  default: () => MenuRepository_default
});
module.exports = __toCommonJS(MenuRepository_exports);

// prisma/client.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var client_default = prisma;

// src/modules/menu/repositories/MenuRepository.ts
var MenuRepository = class {
  // Criar um menu
  async createMenu(menuData) {
    return await client_default.menu.create({
      data: menuData
    });
  }
  // Obter todos os menus
  async getAllMenus() {
    return await client_default.menu.findMany();
  }
  // Obter um menu por ID
  async getMenuById(id) {
    return await client_default.menu.findUnique({
      where: { id }
    });
  }
  // Atualizar um menu
  async updateMenu(id, data) {
    return await client_default.menu.update({
      where: { id },
      data
    });
  }
  // Deletar um menu
  async deleteMenu(id) {
    return await client_default.menu.delete({
      where: { id }
    });
  }
};
var MenuRepository_default = new MenuRepository();

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

// src/modules/menu/controllers/MenuController.ts
var MenuController_exports = {};
__export(MenuController_exports, {
  default: () => MenuController_default
});
module.exports = __toCommonJS(MenuController_exports);

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

// src/modules/menu/controllers/MenuController.ts
var MenuController = class {
  // Criar um menu
  async createMenu(request, reply) {
    const { name, entrepreneurId } = request.body;
    const menu = await MenuService_default.createMenu({ name, entrepreneurId });
    reply.status(201).send(menu);
  }
  // Obter todos os menus
  async getAllMenus(request, reply) {
    const menus = await MenuService_default.getAllMenus();
    reply.send(menus);
  }
  // Obter um menu por ID
  async getMenuById(request, reply) {
    const { id } = request.params;
    const menu = await MenuService_default.getMenuById(id);
    if (!menu) {
      return reply.status(404).send({ message: "Menu n\xE3o encontrado" });
    }
    reply.send(menu);
  }
  // Atualizar um menu
  async updateMenu(request, reply) {
    const { id } = request.params;
    const { name } = request.body;
    const updatedMenu = await MenuService_default.updateMenu(id, { name });
    reply.send(updatedMenu);
  }
  // Deletar um menu
  async deleteMenu(request, reply) {
    const { id } = request.params;
    await MenuService_default.deleteMenu(id);
    reply.status(204).send();
  }
};
var MenuController_default = new MenuController();

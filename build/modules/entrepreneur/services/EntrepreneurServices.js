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

// src/modules/entrepreneur/services/EntrepreneurServices.ts
var EntrepreneurServices_exports = {};
__export(EntrepreneurServices_exports, {
  EntrepreneurService: () => EntrepreneurService
});
module.exports = __toCommonJS(EntrepreneurServices_exports);

// src/modules/entrepreneur/repositories/EntrepreneurRepository.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var EntrepreneurRepository = class {
  async createEntrepreneur(data) {
    return await prisma.entrepreneur.create({
      data
    });
  }
  async getAllEntrepreneurs() {
    return await prisma.entrepreneur.findMany({
      include: {
        user: true
        // Inclui os dados do usuário relacionado
      }
    });
  }
  async getEntrepreneurById(id) {
    return await prisma.entrepreneur.findUnique({
      where: { id },
      include: {
        user: true
        // Inclui os dados do usuário relacionado
      }
    });
  }
  async updateEntrepreneur(id, data) {
    return await prisma.entrepreneur.update({
      where: { id },
      data
    });
  }
  async deleteEntrepreneur(id) {
    return await prisma.entrepreneur.delete({
      where: { id }
    });
  }
};

// src/modules/entrepreneur/services/EntrepreneurServices.ts
var EntrepreneurService = class {
  constructor() {
    this.entrepreneurRepository = new EntrepreneurRepository();
  }
  async createEntrepreneur(data) {
    return await this.entrepreneurRepository.createEntrepreneur(data);
  }
  async getAllEntrepreneurs() {
    return await this.entrepreneurRepository.getAllEntrepreneurs();
  }
  async getEntrepreneurById(id) {
    const entrepreneur = await this.entrepreneurRepository.getEntrepreneurById(id);
    if (!entrepreneur) {
      throw new Error("Entrepreneur not found");
    }
    return entrepreneur;
  }
  async updateEntrepreneur(id, data) {
    const updatedEntrepreneur = await this.entrepreneurRepository.updateEntrepreneur(id, data);
    if (!updatedEntrepreneur) {
      throw new Error("Entrepreneur not found");
    }
    return updatedEntrepreneur;
  }
  async deleteEntrepreneur(id) {
    const deletedEntrepreneur = await this.entrepreneurRepository.deleteEntrepreneur(id);
    if (!deletedEntrepreneur) {
      throw new Error("Entrepreneur not found");
    }
    return deletedEntrepreneur;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EntrepreneurService
});

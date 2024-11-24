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

// src/modules/entrepreneur/controllers/EntrepreneurController.ts
var EntrepreneurController_exports = {};
__export(EntrepreneurController_exports, {
  EntrepreneurController: () => EntrepreneurController
});
module.exports = __toCommonJS(EntrepreneurController_exports);

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

// src/modules/entrepreneur/controllers/EntrepreneurController.ts
var import_zod = require("zod");
var EntrepreneurController = class {
  constructor() {
    this.entrepreneurService = new EntrepreneurService();
  }
  async create(request, reply) {
    const createEntrepreneurSchema = import_zod.z.object({
      userId: import_zod.z.string().uuid()
    });
    const entrepreneurData = createEntrepreneurSchema.parse(request.body);
    try {
      const newEntrepreneur = await this.entrepreneurService.createEntrepreneur(entrepreneurData);
      return reply.status(201).send(newEntrepreneur);
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({ error: error.message });
      }
      return reply.status(400).send({ error: "An unknown error occurred" });
    }
  }
  async getAll(request, reply) {
    try {
      const entrepreneurs = await this.entrepreneurService.getAllEntrepreneurs();
      return reply.status(200).send(entrepreneurs);
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(500).send({ error: error.message });
      }
      return reply.status(500).send({ error: "An unknown error occurred" });
    }
  }
  async getById(request, reply) {
    const id = request.params.id;
    try {
      const entrepreneur = await this.entrepreneurService.getEntrepreneurById(id);
      if (!entrepreneur) {
        return reply.status(404).send({ error: "Entrepreneur not found with the provided ID" });
      }
      return reply.status(200).send(entrepreneur);
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(500).send({ error: error.message });
      }
      return reply.status(500).send({ error: "An unknown error occurred" });
    }
  }
  async update(request, reply) {
    const id = request.params.id;
    const updateEntrepreneurSchema = import_zod.z.object({
      userId: import_zod.z.string().uuid().optional()
    });
    const entrepreneurData = updateEntrepreneurSchema.parse(request.body);
    try {
      const updatedEntrepreneur = await this.entrepreneurService.updateEntrepreneur(id, entrepreneurData);
      return reply.status(200).send(updatedEntrepreneur);
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({ error: error.message });
      }
      return reply.status(400).send({ error: "An unknown error occurred" });
    }
  }
  async delete(request, reply) {
    const id = request.params.id;
    try {
      const deletedEntrepreneur = await this.entrepreneurService.deleteEntrepreneur(id);
      return reply.status(200).send(deletedEntrepreneur);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Entrepreneur not found") {
          return reply.status(404).send({ error: error.message });
        }
        return reply.status(400).send({ error: error.message });
      }
      return reply.status(400).send({ error: "An unknown error occurred" });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EntrepreneurController
});

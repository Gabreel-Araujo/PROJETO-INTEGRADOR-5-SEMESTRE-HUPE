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

// src/modules/order/repositories/OrderRepository.ts
var OrderRepository_exports = {};
__export(OrderRepository_exports, {
  OrderRepository: () => OrderRepository
});
module.exports = __toCommonJS(OrderRepository_exports);
var import_client = require("@prisma/client");
var OrderRepository = class {
  constructor() {
    this.prisma = new import_client.PrismaClient();
  }
  // Método para criar o pedido com os itens
  async createOrder(customerId, entrepreneurId, items) {
    const totalPrice = await this.calculateTotalPrice(items);
    const order = await this.prisma.order.create({
      data: {
        customerId,
        entrepreneurId,
        totalPrice,
        status: import_client.OrderStatus.PENDING,
        // Definindo o status como PENDING
        orderItems: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        orderItems: true
        // Incluindo os itens no retorno
      }
    });
    return order;
  }
  // Método para calcular o preço total do pedido com base nos itens
  async calculateTotalPrice(items) {
    let total = 0;
    for (const item of items) {
      const product = await this.prisma.product.findUnique({
        where: { id: item.productId }
      });
      if (product) {
        total += product.price * item.quantity;
      }
    }
    return total;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OrderRepository
});

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

// src/modules/customer/controller/CustomerController.ts
var CustomerController_exports = {};
__export(CustomerController_exports, {
  CustomerController: () => CustomerController
});
module.exports = __toCommonJS(CustomerController_exports);
var CustomerController = class {
  constructor(customerService) {
    this.customerService = customerService;
  }
  async createCustomer(req, reply) {
    const { userId, orders } = req.body;
    const newCustomer = await this.customerService.createCustomer(
      userId,
      orders
    );
    return reply.status(201).send(newCustomer);
  }
  async getAllCustomers(req, reply) {
    const customers = await this.customerService.getAllCustomers();
    return reply.send(customers);
  }
  async getCustomerById(req, reply) {
    const { id } = req.params;
    const customer = await this.customerService.getCustomerById(id);
    if (!customer) {
      return reply.status(404).send({ message: "Customer not found" });
    }
    return reply.send(customer);
  }
  async updateCustomer(req, reply) {
    const { id } = req.params;
    const updatedCustomer = await this.customerService.updateCustomer(
      id,
      req.body
    );
    return reply.send(updatedCustomer);
  }
  async deleteCustomer(req, reply) {
    const { id } = req.params;
    await this.customerService.deleteCustomer(id);
    return reply.status(204).send();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CustomerController
});

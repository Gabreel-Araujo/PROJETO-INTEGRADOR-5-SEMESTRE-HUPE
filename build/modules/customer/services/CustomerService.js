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

// src/modules/customer/services/CustomerService.ts
var CustomerService_exports = {};
__export(CustomerService_exports, {
  CustomerService: () => CustomerService
});
module.exports = __toCommonJS(CustomerService_exports);
var CustomerService = class {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }
  async createCustomer(userId, orderIds) {
    return await this.customerRepository.create({ userId, orders: orderIds });
  }
  async getAllCustomers() {
    return await this.customerRepository.findAll();
  }
  async getCustomerById(id) {
    return await this.customerRepository.findById(id);
  }
  async updateCustomer(id, data) {
    return await this.customerRepository.update(id, data);
  }
  async deleteCustomer(id) {
    return await this.customerRepository.delete(id);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CustomerService
});

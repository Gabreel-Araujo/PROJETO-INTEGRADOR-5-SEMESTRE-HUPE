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

// src/modules/customer/routes/CustomerRoute.ts
var CustomerRoute_exports = {};
__export(CustomerRoute_exports, {
  customerRoutes: () => customerRoutes
});
module.exports = __toCommonJS(CustomerRoute_exports);

// src/modules/customer/controller/CustomerController.ts
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

// src/modules/customer/services/CustomerService.ts
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

// src/modules/customer/repositories/CustomerRepository.ts
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

// src/modules/customer/routes/CustomerRoute.ts
async function customerRoutes(app) {
  const customerRepository = new CustomerRepository();
  const customerService = new CustomerService(customerRepository);
  const customerController = new CustomerController(customerService);
  app.post(
    "/customers",
    customerController.createCustomer.bind(customerController)
  );
  app.get(
    "/customers",
    customerController.getAllCustomers.bind(customerController)
  );
  app.get(
    "/customers/:id",
    customerController.getCustomerById.bind(customerController)
  );
  app.put(
    "/customers/:id",
    customerController.updateCustomer.bind(customerController)
  );
  app.delete(
    "/customers/:id",
    customerController.deleteCustomer.bind(customerController)
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  customerRoutes
});

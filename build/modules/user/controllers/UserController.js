"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/modules/user/controllers/UserController.ts
var UserController_exports = {};
__export(UserController_exports, {
  UserController: () => UserController
});
module.exports = __toCommonJS(UserController_exports);

// src/modules/user/repositories/UserRepository.ts
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

// src/modules/user/services/UserService.ts
var import_bcrypt2 = require("bcrypt");

// src/app.ts
var import_fastify = __toESM(require("fastify"));
var import_cors = __toESM(require("@fastify/cors"));
var import_jwt = __toESM(require("@fastify/jwt"));
var import_client8 = require("@prisma/client");

// src/modules/user/routes/UserRoutes.ts
async function appRoutes(app2) {
  const userController = new UserController();
  app2.post("/users/login", userController.login.bind(userController));
  app2.post("/users", userController.register.bind(userController));
  app2.get("/users", userController.getAll.bind(userController));
  app2.get("/users/:id", userController.getById.bind(userController));
  app2.put("/users/:id", userController.update.bind(userController));
  app2.delete("/users/:id", userController.delete.bind(userController));
}

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
var import_client2 = require("@prisma/client");
var prisma2 = new import_client2.PrismaClient();
var CustomerRepository = class {
  async create(data) {
    return await prisma2.customer.create({
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
    return await prisma2.customer.findMany({
      include: {
        user: true,
        orders: true
      }
    });
  }
  async findById(id) {
    return await prisma2.customer.findUnique({
      where: { id },
      include: {
        user: true,
        orders: true
      }
    });
  }
  async update(id, data) {
    return await prisma2.customer.update({
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
    return await prisma2.customer.delete({
      where: { id },
      include: {
        user: true,
        orders: true
      }
    });
  }
};

// src/modules/customer/routes/CustomerRoute.ts
async function customerRoutes(app2) {
  const customerRepository = new CustomerRepository();
  const customerService = new CustomerService(customerRepository);
  const customerController = new CustomerController(customerService);
  app2.post(
    "/customers",
    customerController.createCustomer.bind(customerController)
  );
  app2.get(
    "/customers",
    customerController.getAllCustomers.bind(customerController)
  );
  app2.get(
    "/customers/:id",
    customerController.getCustomerById.bind(customerController)
  );
  app2.put(
    "/customers/:id",
    customerController.updateCustomer.bind(customerController)
  );
  app2.delete(
    "/customers/:id",
    customerController.deleteCustomer.bind(customerController)
  );
}

// src/modules/entrepreneur/repositories/EntrepreneurRepository.ts
var import_client3 = require("@prisma/client");
var prisma3 = new import_client3.PrismaClient();
var EntrepreneurRepository = class {
  async createEntrepreneur(data) {
    return await prisma3.entrepreneur.create({
      data
    });
  }
  async getAllEntrepreneurs() {
    return await prisma3.entrepreneur.findMany({
      include: {
        user: true
        // Inclui os dados do usuário relacionado
      }
    });
  }
  async getEntrepreneurById(id) {
    return await prisma3.entrepreneur.findUnique({
      where: { id },
      include: {
        user: true
        // Inclui os dados do usuário relacionado
      }
    });
  }
  async updateEntrepreneur(id, data) {
    return await prisma3.entrepreneur.update({
      where: { id },
      data
    });
  }
  async deleteEntrepreneur(id) {
    return await prisma3.entrepreneur.delete({
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

// src/modules/entrepreneur/routes/EntrepreneurRoutes.ts
var entrepreneurController = new EntrepreneurController();
async function entrepreneurRoutes(fastify2) {
  fastify2.post(
    "/entrepreneurs",
    entrepreneurController.create.bind(entrepreneurController)
  );
  fastify2.get(
    "/entrepreneurs",
    entrepreneurController.getAll.bind(entrepreneurController)
  );
  fastify2.get(
    "/entrepreneurs/:id",
    entrepreneurController.getById.bind(entrepreneurController)
  );
  fastify2.put(
    "/entrepreneurs/:id",
    entrepreneurController.update.bind(entrepreneurController)
  );
  fastify2.delete(
    "/entrepreneurs/:id",
    entrepreneurController.delete.bind(entrepreneurController)
  );
}

// src/modules/order/repositories/OrderRepository.ts
var import_client4 = require("@prisma/client");
var OrderRepository = class {
  constructor() {
    this.prisma = new import_client4.PrismaClient();
  }
  // Método para criar o pedido com os itens
  async createOrder(customerId, entrepreneurId, items) {
    const totalPrice = await this.calculateTotalPrice(items);
    const order = await this.prisma.order.create({
      data: {
        customerId,
        entrepreneurId,
        totalPrice,
        status: import_client4.OrderStatus.PENDING,
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

// src/modules/order/services/OrderService.ts
var OrderService = class {
  constructor() {
    this.orderRepository = new OrderRepository();
  }
  async createOrder(customerId, entrepreneurId, items) {
    return this.orderRepository.createOrder(customerId, entrepreneurId, items);
  }
};

// src/modules/order/controllers/OrderController.ts
var OrderController = class {
  constructor() {
    this.orderService = new OrderService();
  }
  async createOrder(request, reply) {
    const { customerId, entrepreneurId, items } = request.body;
    try {
      const order = await this.orderService.createOrder(
        customerId,
        entrepreneurId,
        items
      );
      reply.status(201).send(order);
    } catch (error) {
      reply.status(400).send({ error });
    }
  }
};

// src/modules/order/routes/OrderRoutes.ts
async function orderRoutes(fastify2) {
  const orderController = new OrderController();
  fastify2.post("/orders", orderController.createOrder.bind(orderController));
}

// src/modules/product/repositories/ProductRepository.ts
var import_client5 = require("@prisma/client");
var prisma4 = new import_client5.PrismaClient();
var productRepository = {
  create: async (data) => {
    return prisma4.product.create({
      data
    });
  },
  findMany: async (entrepreneurId) => {
    return prisma4.product.findMany({
      where: {
        entrepreneurId
      }
    });
  },
  update: async (id, data) => {
    return prisma4.product.update({
      where: { id },
      data
    });
  },
  delete: async (id) => {
    return prisma4.product.delete({
      where: { id }
    });
  },
  findUnique: async (id) => {
    return prisma4.product.findUnique({
      where: { id }
    });
  }
};

// src/modules/product/services/ProductService.ts
var productService = {
  createProduct: async (data) => {
    return productRepository.create(data);
  },
  getProducts: async (entrepreneurId) => {
    return productRepository.findMany(entrepreneurId);
  },
  updateProduct: async (id, data) => {
    return productRepository.update(id, data);
  },
  deleteProduct: async (id) => {
    await productRepository.delete(id);
  },
  getProductById: async (id) => {
    return productRepository.findUnique(id);
  }
};

// src/modules/product/controllers/ProductController.ts
var productController = {
  create: async (request, reply) => {
    const { name, description, price, available, entrepreneurId } = request.body;
    try {
      const newProduct = await productService.createProduct({
        name,
        description,
        price,
        available,
        entrepreneurId
      });
      return reply.status(201).send(newProduct);
    } catch (error) {
      return reply.status(500).send({ message: "Error creating product", error });
    }
  },
  getAll: async (request, reply) => {
    const { entrepreneurId } = request.query;
    try {
      const products = await productService.getProducts(entrepreneurId);
      return reply.status(200).send(products);
    } catch (error) {
      return reply.status(500).send({ message: "Error retrieving products", error });
    }
  },
  update: async (request, reply) => {
    const { id } = request.params;
    const { name, description, price, available } = request.body;
    try {
      const updatedProduct = await productService.updateProduct(id, {
        name,
        description,
        price,
        available
      });
      return reply.status(200).send(updatedProduct);
    } catch (error) {
      return reply.status(500).send({ message: "Error updating product", error });
    }
  },
  delete: async (request, reply) => {
    const { id } = request.params;
    try {
      await productService.deleteProduct(id);
      return reply.status(204).send();
    } catch (error) {
      return reply.status(500).send({ message: "Error deleting product", error });
    }
  }
};

// src/modules/product/routes/ProductRoutes.ts
var productRoutes = async (fastify2) => {
  fastify2.post("/products", productController.create);
  fastify2.get("/products", productController.getAll);
  fastify2.put("/products/:id", productController.update);
  fastify2.delete("/products/:id", productController.delete);
};

// prisma/client.ts
var import_client6 = require("@prisma/client");
var prisma5 = new import_client6.PrismaClient();
var client_default = prisma5;

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

// src/modules/menu/routes/MenuRoutes.ts
async function menuRoutes(fastify2) {
  fastify2.post("/menu", MenuController_default.createMenu);
  fastify2.get("/menu", MenuController_default.getAllMenus);
  fastify2.get("/:id", MenuController_default.getMenuById);
  fastify2.put("/:id", MenuController_default.updateMenu);
  fastify2.delete("/:id", MenuController_default.deleteMenu);
}

// src/app.ts
var app = (0, import_fastify.default)({
  logger: true
});
app.register(import_cors.default, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
});
app.register(import_jwt.default, {
  secret: process.env.JWT_SECRET || "your-secret-key"
});
app.setErrorHandler((error, request, reply) => {
  app.log.error(error);
  reply.status(error.statusCode || 500).send({
    error: {
      message: error.message || "Internal Server Error",
      code: error.code || "INTERNAL_ERROR"
    }
  });
});
app.addHook("onRequest", async (request, reply) => {
  try {
    const publicPaths = ["/api/users/login", "/api/users"];
    const isPublicPath = publicPaths.some((path) => request.url === path);
    const isOptionsRequest = request.method === "OPTIONS";
    if (isPublicPath || isOptionsRequest) {
      return;
    }
    await request.jwtVerify();
  } catch (err) {
    app.log.error("Authentication error:", err);
    reply.code(403).send({ error: "Authentication required" });
  }
});
app.get("/health", async () => {
  return { status: "ok" };
});
var prisma6 = new import_client8.PrismaClient();
app.register(appRoutes, { prefix: "/api" });
app.register(customerRoutes, { prefix: "/api" });
app.register(entrepreneurRoutes, { prefix: "/api" });
app.register(orderRoutes, { prefix: "/api" });
app.register(productRoutes, { prefix: "/api" });
app.register(menuRoutes, { prefix: "/api" });
app.setNotFoundHandler((request, reply) => {
  app.log.error(`Route not found: ${request.method} ${request.url}`);
  reply.status(404).send({
    error: {
      message: "Route not found",
      code: "NOT_FOUND"
    }
  });
});

// src/modules/user/services/UserService.ts
var UserService = class {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async login(email, password) {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const passwordMatch = await (0, import_bcrypt2.compare)(password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }
    const token = app.jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      { expiresIn: "1d" }
    );
    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token
    };
  }
  async registerUser(data) {
    const existingUser = await this.userRepository.findUserByEmail(data.email);
    if (existingUser) {
      throw new Error("Email already in use");
    }
    const newUser = await this.userRepository.createUser(data);
    return newUser;
  }
  async getAllUsers() {
    return await this.userRepository.getAllUsers();
  }
  async getUserById(id) {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new Error("User ID Not found ");
    }
    return user;
  }
  async updateUser(id, data) {
    const existingUser = await this.userRepository.getUserById(id);
    if (!existingUser) {
      throw new Error("User not found");
    }
    return await this.userRepository.updateUser(id, data);
  }
  async deleteUser(id) {
    const existingUser = await this.userRepository.getUserById(id);
    if (!existingUser) {
      throw new Error("User not found");
    }
    return await this.userRepository.deleteUser(id);
  }
};

// src/modules/user/controllers/UserController.ts
var import_zod2 = require("zod");
var UserController = class {
  constructor() {
    this.userService = new UserService();
  }
  async login(request, reply) {
    const loginSchema = import_zod2.z.object({
      email: import_zod2.z.string().email(),
      password: import_zod2.z.string()
    });
    try {
      const { email, password } = loginSchema.parse(request.body);
      const { user, token } = await this.userService.login(email, password);
      return reply.status(200).send({ user, token });
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(401).send({ error: error.message });
      }
      return reply.status(401).send({ error: "Invalid credentials" });
    }
  }
  async register(request, reply) {
    const createUserSchema = import_zod2.z.object({
      name: import_zod2.z.string(),
      email: import_zod2.z.string().email(),
      password: import_zod2.z.string(),
      role: import_zod2.z.enum(["ADMIN", "ENTREPRENEUR", "CUSTOMER"]).default("CUSTOMER"),
      customerId: import_zod2.z.string().nullable().optional()
    });
    const userData = createUserSchema.parse(request.body);
    try {
      const newUser = await this.userService.registerUser(userData);
      return reply.status(201).send(newUser);
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({ error: error.message });
      }
      return reply.status(400).send({ error: "An unknown error occurred" });
    }
  }
  async getAll(request, reply) {
    try {
      const users = await this.userService.getAllUsers();
      return reply.status(200).send(users);
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
      const user = await this.userService.getUserById(id);
      if (!user) {
        return reply.status(404).send({ error: "User not found with the provided ID" });
      }
      return reply.status(200).send(user);
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(500).send({ error: error.message });
      }
      return reply.status(500).send({ error: "An unknown error occurred" });
    }
  }
  async update(request, reply) {
    const id = request.params.id;
    const updateUserSchema = import_zod2.z.object({
      name: import_zod2.z.string().optional(),
      email: import_zod2.z.string().email().optional(),
      password: import_zod2.z.string().optional(),
      role: import_zod2.z.enum(["ADMIN", "ENTREPRENEUR", "CUSTOMER"]).optional(),
      customerId: import_zod2.z.string().nullable().optional()
    });
    const userData = updateUserSchema.parse(request.body);
    try {
      const updatedUser = await this.userService.updateUser(id, userData);
      return reply.status(200).send(updatedUser);
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
      const deletedUser = await this.userService.deleteUser(id);
      return reply.status(200).send(deletedUser);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "User not found") {
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
  UserController
});

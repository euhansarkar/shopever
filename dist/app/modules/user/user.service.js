"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const user_utils_1 = require("./user.utils");
const config_1 = __importDefault(require("../../../config"));
const createCustomer = (nameData, customerData, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transectionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // set role
        userData.role = `customer`;
        // default password
        if (!userData.password) {
            userData.password = config_1.default.default_admin_pass;
        }
        // generate user id
        const id = yield (0, user_utils_1.generateCustomerId)();
        customerData.id = id;
        // name creation
        const name = yield transectionClient.name.create({
            data: nameData,
        });
        // push name id to admin table
        customerData.name_id = name.id;
        console.log(`customer data`, customerData);
        const customerCreation = yield transectionClient.customer.create({
            data: customerData
        });
        // if failed to create user
        if (!customerCreation) {
            throw new ApiError_1.default(http_status_1.default.OK, `failed to create new customer`);
        }
        // admin id passs to the user table
        userData.customer_id = customerCreation.uid;
        userData.id = customerCreation.id;
        const userCreation = yield transectionClient.user.create({
            data: userData,
            include: {
                admin: {
                    include: {
                        name: true,
                    },
                },
            },
        });
        if (!userCreation) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `user creation failed`);
        }
        return userCreation;
    }));
    const get = yield prisma_1.default.user.findUnique({ where: { id: result.id } });
    return get;
});
const createAdmin = (nameData, adminData, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transectionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // set role
        userData.role = `admin`;
        // default password
        if (!userData.password) {
            userData.password = config_1.default.default_admin_pass;
        }
        // generate user id
        const id = yield (0, user_utils_1.generateAdminId)();
        adminData.id = id;
        // name creation
        const name = yield transectionClient.name.create({
            data: nameData,
        });
        // push name id to admin table
        adminData.name_id = name.id;
        const adminCreation = yield transectionClient.admin.create({
            data: adminData,
        });
        // if failed to create user
        if (!adminCreation) {
            throw new ApiError_1.default(http_status_1.default.OK, `failed to create new admin`);
        }
        // admin id passs to the user table
        userData.admin_id = adminCreation.uid;
        userData.id = adminCreation.id;
        const userCreation = yield transectionClient.user.create({
            data: userData,
            include: {
                admin: {
                    include: {
                        name: true,
                    },
                },
            },
        });
        if (!userCreation) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `user creation failed`);
        }
        return userCreation;
    }));
    const get = yield prisma_1.default.user.findUnique({ where: { id: result.id }, include: { admin: true } });
    return get;
});
exports.UserService = { createAdmin, createCustomer };

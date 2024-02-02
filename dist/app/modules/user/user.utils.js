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
exports.generateAdminId = exports.findLastAdminId = exports.generateCustomerId = exports.findLastCustomerId = exports.generateUserId = exports.findLastUserId = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
//User ID
const findLastUserId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastUser = yield prisma_1.default.user.findFirst({
        select: { id: true },
        orderBy: { created_at: "desc" },
    });
    return lastUser === null || lastUser === void 0 ? void 0 : lastUser.id.toString();
});
exports.findLastUserId = findLastUserId;
const generateUserId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastUserId)()) || '0'.padStart(5, '0'); // '00000'
    const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    return incrementedId;
});
exports.generateUserId = generateUserId;
// Customer ID
const findLastCustomerId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastCustomer = yield prisma_1.default.user.findFirst({
        where: {
            role: 'customer',
        },
        select: {
            id: true,
        },
        orderBy: {
            created_at: "desc"
        },
    });
    return (lastCustomer === null || lastCustomer === void 0 ? void 0 : lastCustomer.id) ? lastCustomer.id.substring(2) : undefined;
});
exports.findLastCustomerId = findLastCustomerId;
const generateCustomerId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastCustomerId)()) || '00000';
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `C-${incrementedId}`;
    return incrementedId;
});
exports.generateCustomerId = generateCustomerId;
// Admin ID
const findLastAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastAdmin = yield prisma_1.default.user.findFirst({
        where: {
            role: 'admin',
        },
        select: {
            id: true,
        },
        orderBy: {
            created_at: "desc"
        },
    });
    return (lastAdmin === null || lastAdmin === void 0 ? void 0 : lastAdmin.id) ? lastAdmin.id.substring(2) : undefined;
});
exports.findLastAdminId = findLastAdminId;
const generateAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastAdminId)()) || '00000';
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `A-${incrementedId}`;
    return incrementedId;
});
exports.generateAdminId = generateAdminId;

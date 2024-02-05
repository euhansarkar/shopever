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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const order_constant_1 = require("./order.constant");
const utils_1 = require("../../../shared/utils");
const createOne = (shipping_address, billing_address, products, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const orderCreation = yield prisma_1.default.$transaction((transectionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // shipping address creation
        const shippingAddrCreation = yield transectionClient.shippingAddress.create({ data: shipping_address });
        // billing address creation
        const billingAddrCreation = yield transectionClient.billingAddress.create({ data: billing_address });
        // order creation
        const orderCreation = yield transectionClient.order.create({
            data: Object.assign(Object.assign({}, orderData), { shippingAddressId: shippingAddrCreation === null || shippingAddrCreation === void 0 ? void 0 : shippingAddrCreation.id, billingAddressId: billingAddrCreation === null || billingAddrCreation === void 0 ? void 0 : billingAddrCreation.id }), include: { shipping_address: true, billing_address: true, shipping_method: true, payment_method: true }
        });
        yield (0, utils_1.asyncForEach)(products, (product) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            try {
                const data = { product_id: product === null || product === void 0 ? void 0 : product.product_id, order_id: orderCreation === null || orderCreation === void 0 ? void 0 : orderCreation.id };
                // product creation
                const createOrderedProduct = yield transectionClient.orderedProduct.create({ data });
                // variants
                const variants = (_a = product === null || product === void 0 ? void 0 : product.varients) === null || _a === void 0 ? void 0 : _a.map((varient) => (Object.assign(Object.assign({}, varient), { ordered_product_id: createOrderedProduct === null || createOrderedProduct === void 0 ? void 0 : createOrderedProduct.id })));
                const createVarientProduct = yield transectionClient.varientProduct.createMany({ data: variants });
            }
            catch (error) {
                console.error(error);
            }
        }));
        return orderCreation;
    }));
    const result = yield prisma_1.default.order.findUnique({ where: { id: orderCreation.id }, include: { shipping_address: true, shipping_method: true, billing_address: true, payment_method: true, products: { include: { varients: true } } } });
    return result;
});
const getAll = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: order_constant_1.OrderSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive"
                }
            }))
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key]
                }
            }))
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.order.findMany({
        where: whereConditions,
        skip,
        take: limit,
        include: { shipping_address: true, shipping_method: true, billing_address: true, payment_method: true, products: { include: { varients: true } } },
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                created_at: "desc"
            }
    });
    const total = yield prisma_1.default.order.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    };
});
const getOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.findUnique({ where: { id }, include: { shipping_address: true, shipping_method: true, billing_address: true, payment_method: true, products: { include: { varients: true } } } });
    return result;
});
const updateOne = (id, shipping_address, billing_address, products, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const getOrder = yield prisma_1.default.order.findUnique({ where: { id }, include: { shipping_address: true, shipping_method: true, billing_address: true, payment_method: true, products: { include: { varients: { include: { orderedProduct: true } } } } } });
    const orderUpdation = yield prisma_1.default.$transaction((transectionClient) => __awaiter(void 0, void 0, void 0, function* () {
        var _b, _c;
        // shipping address creation
        const shippingAddrUpdation = yield transectionClient.shippingAddress.update({ where: { id: (_b = getOrder === null || getOrder === void 0 ? void 0 : getOrder.shipping_address) === null || _b === void 0 ? void 0 : _b.id }, data: shipping_address });
        // billing address creation
        const billingAddrUpdation = yield transectionClient.billingAddress.update({ where: { id: (_c = getOrder === null || getOrder === void 0 ? void 0 : getOrder.billing_address) === null || _c === void 0 ? void 0 : _c.id }, data: billing_address });
        // order creation
        const orderUpdation = yield transectionClient.order.update({
            where: { id: getOrder === null || getOrder === void 0 ? void 0 : getOrder.id },
            data: Object.assign(Object.assign({}, orderData), { shippingAddressId: shippingAddrUpdation === null || shippingAddrUpdation === void 0 ? void 0 : shippingAddrUpdation.id, billingAddressId: billingAddrUpdation === null || billingAddrUpdation === void 0 ? void 0 : billingAddrUpdation.id }), include: { shipping_address: true, billing_address: true, shipping_method: true, payment_method: true }
        });
        for (const product of products) {
            const data = { product_id: product === null || product === void 0 ? void 0 : product.product_id, order_id: orderUpdation === null || orderUpdation === void 0 ? void 0 : orderUpdation.id };
            // product creation
            const createOrderedProduct = yield transectionClient.orderedProduct.create({ data });
            // varients
            const varients = product === null || product === void 0 ? void 0 : product.varients;
            // const create ordered varients
            for (const varient of varients) {
                const createVarient = yield transectionClient.varientProduct.create({ data: Object.assign(Object.assign({}, varient), { ordered_product_id: createOrderedProduct === null || createOrderedProduct === void 0 ? void 0 : createOrderedProduct.id }) });
                console.log(`varient`, createVarient);
            }
        }
        return orderUpdation;
    }));
    const get = yield prisma_1.default.order.findUnique({ where: { id } });
    return get;
});
const deleteOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transectionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield transectionClient.order.delete({ where: { id }, include: { shipping_address: true, billing_address: true, payment_method: true, shipping_method: true, products: { include: { varients: { include: { orderedProduct: true } } } } } });
        return result;
    }));
    return result;
});
exports.OrderService = { createOne, getAll, getOne, deleteOne, updateOne };

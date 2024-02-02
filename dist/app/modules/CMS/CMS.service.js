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
exports.CMSService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const CMS_constant_1 = require("./CMS.constant");
const createOne = (CMSData, metaSEO) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transectionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const metaSEOCreation = yield transectionClient.metaSEO.create({ data: metaSEO });
        const CMSCreation = yield transectionClient.cMS.create({ data: Object.assign(Object.assign({}, CMSData), { metaSEOId: metaSEOCreation.id }) });
        return CMSCreation;
    }));
    const get = yield prisma_1.default.cMS.findUnique({ where: { id: result.id }, include: { MetaSEO: true } });
    return get;
});
const getAll = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: CMS_constant_1.CMSSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
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
    const result = yield prisma_1.default.cMS.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                created_at: 'desc'
            },
        include: { MetaSEO: true }
    });
    const total = yield prisma_1.default.cMS.count({
        where: whereConditions
    });
    return {
        meta: { total, page, limit },
        data: result
    };
});
const getOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cMS.findUnique({
        where: { id },
        include: { MetaSEO: true }
    });
    return result;
});
const updateOne = (id, CMSData, metaSEO) => __awaiter(void 0, void 0, void 0, function* () {
    let get = yield prisma_1.default.cMS.findUnique({ where: { id } });
    const result = yield prisma_1.default.$transaction((transectionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const metaSEOCreation = yield transectionClient.metaSEO.update({ where: { id: get === null || get === void 0 ? void 0 : get.metaSEOId }, data: metaSEO });
        const CMSCreation = yield transectionClient.cMS.update({ where: { id }, data: CMSData });
        return CMSCreation;
    }));
    get = yield prisma_1.default.cMS.findUnique({
        where: { id: result.id },
        include: { MetaSEO: true }
    });
    return get;
});
const deleteOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.cMS.delete({
        where: { id },
        include: { MetaSEO: true }
    });
    return result;
});
exports.CMSService = { createOne, getAll, getOne, updateOne, deleteOne };

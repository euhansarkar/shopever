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
exports.AttributeService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const attribute_constant_1 = require("./attribute.constant");
const utils_1 = require("../../../shared/utils");
const createOne = (attributeData, attribute_options) => __awaiter(void 0, void 0, void 0, function* () {
    const attCreation = yield prisma_1.default.$transaction((transectionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const attResult = yield transectionClient.attribute.create({ data: attributeData });
        for (const attOption of attribute_options) {
            const data = Object.assign({ attribute_id: attResult.id }, attOption);
            const myRes = yield transectionClient.attributeOption.create({ data });
        }
        return attResult;
    }));
    const result = yield prisma_1.default.attribute.findUnique({ where: { id: attCreation.id }, include: { attribute_options: true } });
    return result;
});
const getAll = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: attribute_constant_1.AttributeSearchableFields.map(field => ({
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
    const result = yield prisma_1.default.attribute.findMany({
        where: whereConditions,
        skip,
        take: limit,
        include: { attribute_group: true, attribute_options: true, },
        orderBy: options.sortBy && options.sortOrder
            ? { [options.sortBy]: options.sortOrder }
            : {
                created_at: "desc"
            }
    });
    const total = yield prisma_1.default.attribute.count({
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
    const result = yield prisma_1.default.attribute.findUnique({
        where: {
            id
        },
        include: { attribute_options: true }
    });
    return result;
});
const updateOne = (id, attributeData, attribute_options) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transectionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const attResult = yield transectionClient.attribute.update({ where: { id }, data: attributeData });
        if (attribute_options && attribute_options.length > 0) {
            const deleteOptions = attribute_options.filter(option => option.option_text && option.is_deleted);
            const newOptions = attribute_options.filter(option => option.option_text && !option.is_deleted);
            // ready for update 
            const readyForUpdate = newOptions.filter(option => option.id && option.option_text && !option.is_deleted);
            // ready for create
            const readyForCreate = newOptions.filter(option => !option.id && option.option_text && !option.is_deleted);
            yield (0, utils_1.asyncForEach)(readyForUpdate, (option) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield transectionClient.attributeOption.update({
                        where: { id: option.id },
                        data: { option_text: option.option_text }
                    });
                }
                catch (error) {
                    console.error(error);
                }
            }));
            yield (0, utils_1.asyncForEach)(deleteOptions, (option) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield transectionClient.attributeOption.delete({ where: { id: option.id } });
                }
                catch (error) {
                    console.error(`error`, error);
                }
            }));
            yield (0, utils_1.asyncForEach)(readyForCreate, (option) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    yield transectionClient.attributeOption.create({
                        data: Object.assign(Object.assign({}, option), { attribute_id: attResult.id })
                    });
                }
                catch (error) {
                    console.error(`error`, error);
                }
            }));
        }
        return attResult;
    }));
    const get = yield prisma_1.default.attribute.findUnique({ where: { id: result.id }, include: { attribute_options: true } });
    return get;
});
const deleteOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transectionClient) => __awaiter(void 0, void 0, void 0, function* () {
        yield transectionClient.attributeOption.deleteMany({ where: { attribute_id: id } });
        const result = yield transectionClient.attribute.delete({ where: { id }, include: { attribute_options: true } });
        return result;
    }));
    return result;
});
exports.AttributeService = { createOne, getAll, getOne, deleteOne, updateOne };

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
exports.VarientService = void 0;
const fileUploadHelper_1 = require("../../../helpers/fileUploadHelper");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const varient_constant_1 = require("./varient.constant");
const createOne = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.file;
    console.log(`from varient creation`, files);
    //! now it files getting an object you have to conevert to array here
    // if files will be an array 
    const images = [];
    yield Promise.all([files].map((file) => __awaiter(void 0, void 0, void 0, function* () {
        const uploadedImage = yield fileUploadHelper_1.FileUploadHeler.uploadToCloudinary(file);
        images.push(uploadedImage);
    })));
    const _a = req.body, { varient_options } = _a, varientData = __rest(_a, ["varient_options"]);
    const result = yield prisma_1.default.$transaction((transectionClient) => __awaiter(void 0, void 0, void 0, function* () {
        //Varient creation
        const varientCreation = yield transectionClient.varient.create({ data: varientData });
        //Varient Option Creation
        for (const varient of varient_options) {
            const data = Object.assign(Object.assign({}, varient), { varient_id: varientCreation.id });
            const myRes = yield transectionClient.varientOption.create({ data });
        }
        //images creation 
        for (const img of images) {
            console.log(`this is image`, img);
            const data = { image_url: img.secure_url, varient_id: varientCreation.id };
            yield transectionClient.image.create({ data });
        }
        return varientCreation;
    }));
    const get = yield prisma_1.default.varient.findUnique({ where: { id: result.id }, include: { product: true, images: true } });
    return get;
});
const getAll = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: varient_constant_1.VarientSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: "insensitive"
                }
            }))
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                if (varient_constant_1.VarientRelationalFields.includes(key)) {
                    console.log(`from varient service`, key);
                    return {
                        [varient_constant_1.VarientRelationalFieldsMapper[key]]: {
                            id: filterData[key]
                        }
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filterData[key]
                        }
                    };
                }
            })
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.varient.findMany({
        include: { images: true, product: true, varient_options: true },
        where: whereConditions, skip, take: limit, orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { created_at: "desc" }
    });
    const total = yield prisma_1.default.varient.count({
        where: whereConditions
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
    const result = yield prisma_1.default.varient.findUnique({
        where: { id },
        include: { images: true, product: true, varient_options: true },
    });
    return result;
});
const updateOne = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const files = req.file;
    console.log(`getting the file`, files);
    console.log(`getting body`, req.body);
    const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
    // if files will be an array 
    const images = [];
    yield Promise.all([files].map((file) => __awaiter(void 0, void 0, void 0, function* () {
        const uploadedImage = yield fileUploadHelper_1.FileUploadHeler.uploadToCloudinary(file);
        images.push(uploadedImage);
    })));
    const _c = req.body, { varient_options } = _c, varientData = __rest(_c, ["varient_options"]);
    const result = yield prisma_1.default.$transaction((transectionClient) => __awaiter(void 0, void 0, void 0, function* () {
        var _d;
        // Varient updation
        const varientUpdation = yield transectionClient.varient.update({ where: { id: (_d = req === null || req === void 0 ? void 0 : req.params) === null || _d === void 0 ? void 0 : _d.id }, data: varientData });
        //Varient Option updation
        const getVarientOptions = yield transectionClient.varientOption.findMany({ where: { varient_id: id } });
        for (const varientOption of getVarientOptions) {
            yield transectionClient.varientOption.delete({ where: { id: varientOption.id } });
        }
        for (const varient of varient_options) {
            const data = Object.assign(Object.assign({}, varient), { varient_id: id });
            const myRes = yield transectionClient.varientOption.create({ data });
        }
        // const getImages = await transectionClient.image.findMany({ where: { varient_id: id } })
        // for (const img of getImages) {
        //     await transectionClient.image.delete({ where: { id: img.id } });
        // }
        // for (const img of images) {
        //     console.log(`this is image`, img);
        //     const data = { image_url: img.secure_url, varient_id: id }
        //     await transectionClient.image.create({ data });
        // }
        //images updation 
        const getImages = yield transectionClient.image.findMany({ where: { varient_id: id } });
        for (const img of getImages) {
            yield transectionClient.image.delete({ where: { id: img.id } });
        }
        for (const img of images) {
            console.log(`this is image`, img);
            const data = { image_url: img.secure_url, varient_id: id };
            yield transectionClient.image.create({ data });
        }
        return varientUpdation;
    }));
    const get = yield prisma_1.default.varient.findUnique({ where: { id: result.id }, include: { product: true, images: true } });
    return get;
});
const deleteOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.varient.delete({ where: { id } });
    return result;
});
exports.VarientService = { createOne, getOne, getAll, updateOne, deleteOne };

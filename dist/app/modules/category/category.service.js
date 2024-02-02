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
exports.CategoryService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const category_constant_1 = require("./category.constant");
const utils_1 = require("../../../shared/utils");
const fileUploadHelper_1 = require("../../../helpers/fileUploadHelper");
const createOne = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const uploadedImage = yield fileUploadHelper_1.FileUploadHeler.uploadToCloudinary(file);
    if (uploadedImage) {
        req.body.images = [{ image_url: uploadedImage.secure_url }];
    }
    const _a = req.body, { images, metaSEO, keywords } = _a, categoryData = __rest(_a, ["images", "metaSEO", "keywords"]);
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // meta SEO creation 
        const metaSEOCreation = yield transactionClient.metaSEO.create({ data: metaSEO });
        for (const keyword of keywords) {
            //@ts-ignore
            const data = Object.assign({ meta_SEO_id: metaSEOCreation.id }, keyword);
            const keywordCreation = yield transactionClient.keyword.create({ data });
        }
        //@ts-ignore
        const data = Object.assign({ meta_SEO_id: metaSEOCreation.id }, categoryData);
        const categoryCreation = yield transactionClient.category.create({ data, include: { Meta_SEO: true, images: true } });
        for (const img of images) {
            //@ts-ignore
            const data = Object.assign({ category_id: categoryCreation.id }, img);
            const imageCreation = yield transactionClient.image.create({ data });
        }
        return categoryCreation;
    }));
    const get = yield prisma_1.default.category.findUnique({ where: { id: result.id }, include: { images: true, Meta_SEO: true } });
    return get;
});
const getAll = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: category_constant_1.categorySearchableFields.map(field => ({
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
                if (category_constant_1.categoryRelationalFields.includes(key)) {
                    return {
                        [category_constant_1.categoryRelationalFieldsMapper[key]]: {
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
    const result = yield prisma_1.default.category.findMany({
        include: {
            Meta_SEO: true,
            images: true
        },
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { created_at: "desc" },
    });
    const total = yield prisma_1.default.category.count({
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
    const result = yield prisma_1.default.category.findUnique({ where: { id }, include: { images: true, Meta_SEO: true } });
    return result;
});
const updateOne = (id, categoryData, keywords, images, metaSEO) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // get seo
        const getCategory = yield transactionClient.category.findUnique({ where: { id } });
        // meta SEO creation 
        const metaSEOCreation = yield transactionClient.metaSEO.update({ where: { id: getCategory === null || getCategory === void 0 ? void 0 : getCategory.meta_SEO_id }, data: metaSEO });
        if (keywords && keywords.length > 0) {
            const deleteKeywords = keywords.filter(keyword => (keyword === null || keyword === void 0 ? void 0 : keyword.name) && keyword.isDeleted);
            const newKeywords = keywords.filter(keyword => (keyword === null || keyword === void 0 ? void 0 : keyword.name) && !keyword.isDeleted);
            yield (0, utils_1.asyncForEach)(deleteKeywords, (keyword) => __awaiter(void 0, void 0, void 0, function* () {
                yield transactionClient.keyword.deleteMany({ where: { meta_SEO_id: keyword.meta_SEO_id } });
            }));
            yield (0, utils_1.asyncForEach)(newKeywords, (keyword) => __awaiter(void 0, void 0, void 0, function* () {
                yield transactionClient.keyword.create({ data: keyword });
            }));
        }
        const categoryCreation = yield transactionClient.category.update({ where: { id }, data: categoryData });
        if (images && images.length > 0) {
            const deletedImages = images.filter(image => (image === null || image === void 0 ? void 0 : image.image_url) && image.isDeleted);
            const newImages = images.filter(image => (image === null || image === void 0 ? void 0 : image.image_url) && !image.isDeleted);
            yield (0, utils_1.asyncForEach)(deletedImages, (image) => __awaiter(void 0, void 0, void 0, function* () {
                yield transactionClient.image.deleteMany({ where: { category_id: image.category_id } });
            }));
            yield (0, utils_1.asyncForEach)(newImages, (image) => __awaiter(void 0, void 0, void 0, function* () {
                yield transactionClient.image.create({ data: Object.assign(Object.assign({}, image), { category_id: getCategory === null || getCategory === void 0 ? void 0 : getCategory.id }) });
            }));
        }
        return categoryCreation;
    }));
    const get = yield prisma_1.default.category.findUnique({ where: { id }, include: { images: true, Meta_SEO: true } });
    return get;
});
const deleteOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getCategory = yield prisma_1.default.category.findUnique({ where: { id } });
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // meta SEO 
        //@ts-ignore
        const metaSEODeletion = yield transactionClient.metaSEO.delete({ where: { id: getCategory === null || getCategory === void 0 ? void 0 : getCategory.meta_SEO_id } });
        // image deletion
        const imageDeletion = yield transactionClient.image.deleteMany({ where: { category_id: getCategory === null || getCategory === void 0 ? void 0 : getCategory.id } });
        // keyword deletion
        const keywordDeletion = yield transactionClient.keyword.deleteMany({ where: { meta_SEO_id: metaSEODeletion.id } });
        const categoryDeletion = yield transactionClient.category.delete({ where: { id } });
        return categoryDeletion;
    }));
    return result;
});
exports.CategoryService = { createOne, getAll, getOne, updateOne, deleteOne };

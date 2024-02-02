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
exports.CouponService = void 0;
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const utils_1 = require("../../../shared/utils");
const coupon_constant_1 = require("./coupon.constant");
const createOne = (CouponData, keywords, images, metaSEO) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // meta SEO creation 
        const metaSEOCreation = yield transactionClient.metaSEO.create({ data: metaSEO });
        for (const keyword of keywords) {
            //@ts-ignore
            const data = Object.assign({ meta_SEO_id: metaSEOCreation.id }, keyword);
            const keywordCreation = yield transactionClient.keyword.create({ data });
        }
        //@ts-ignore
        const data = Object.assign({ meta_SEO_id: metaSEOCreation.id }, CouponData);
        const CouponCreation = yield transactionClient.coupon.create({ data,
            // include: { Meta_SEO: true, images: true } 
        });
        for (const img of images) {
            //@ts-ignore
            const data = Object.assign({ Coupon_id: CouponCreation.id }, img);
            const imageCreation = yield transactionClient.image.create({ data });
        }
        return CouponCreation;
    }));
    const get = yield prisma_1.default.coupon.findUnique({ where: { id: result.id },
        // include: { images: true, Meta_SEO: true } 
    });
    return result;
});
const getAll = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, page, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: coupon_constant_1.CouponSearchableFields.map(field => ({
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
                if (coupon_constant_1.CouponRelationalFields.includes(key)) {
                    return {
                        [coupon_constant_1.CouponRelationalFieldsMapper[key]]: {
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
    const result = yield prisma_1.default.coupon.findMany({
        // include: {Meta_SEO: true,images: true},
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { created_at: "desc" },
    });
    const total = yield prisma_1.default.coupon.count({
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
    const result = yield prisma_1.default.coupon.findUnique({ where: { id }, // include: { images: true, Meta_SEO: true } 
    });
    return result;
});
const updateOne = (id, CouponData, keywords, images, metaSEO) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // get seo
        const getCoupon = yield transactionClient.coupon.findUnique({ where: { id } });
        // meta SEO creation 
        // const metaSEOCreation = await transactionClient.metaSEO.update({ where: { id: getCoupon?.meta_SEO_id! }, data: metaSEO });
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
        const CouponCreation = yield transactionClient.coupon.update({ where: { id }, data: CouponData });
        if (images && images.length > 0) {
            const deletedImages = images.filter(image => (image === null || image === void 0 ? void 0 : image.image_url) && image.isDeleted);
            const newImages = images.filter(image => (image === null || image === void 0 ? void 0 : image.image_url) && !image.isDeleted);
            yield (0, utils_1.asyncForEach)(deletedImages, (image) => __awaiter(void 0, void 0, void 0, function* () {
                // await transactionClient.image.deleteMany({ where: { Coupon_id: image.Coupon_id } })
            }));
            yield (0, utils_1.asyncForEach)(newImages, (image) => __awaiter(void 0, void 0, void 0, function* () {
                yield transactionClient.image.create({ data: Object.assign({}, image) });
            }));
        }
        return CouponCreation;
    }));
    const get = yield prisma_1.default.coupon.findUnique({ where: { id }, /// include: { images: true, Meta_SEO: true } 
    });
    return get;
});
const deleteOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const getCoupon = yield prisma_1.default.coupon.findUnique({ where: { id } });
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        // meta SEO 
        //@ts-ignore
        const metaSEODeletion = yield transactionClient.metaSEO.delete({ where: { id: getCoupon === null || getCoupon === void 0 ? void 0 : getCoupon.meta_SEO_id } });
        // image deletion
        // const imageDeletion = await transactionClient.image.deleteMany({ where: { Coupon_id: getCoupon?.id } });
        // keyword deletion
        const keywordDeletion = yield transactionClient.keyword.deleteMany({ where: { meta_SEO_id: metaSEODeletion.id } });
        const CouponDeletion = yield transactionClient.coupon.delete({ where: { id } });
        return CouponDeletion;
    }));
    return result;
});
exports.CouponService = { createOne, getAll, getOne, updateOne, deleteOne };

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponRelationalFieldsMapper = exports.CouponRelationalFields = exports.CouponFilterableFields = exports.CouponSearchableFields = void 0;
exports.CouponSearchableFields = [`name`, `description`];
exports.CouponFilterableFields = [`searchTerm`, `id`, `parent_id`, `position`, `meta_SEO_id`, `attribute_group_id`, `Coupon_id`];
exports.CouponRelationalFields = [`meta_SEO_id`, `attribute_group_id`, `Coupon_id`];
exports.CouponRelationalFieldsMapper = { meta_SEO_id: `meta_SEO_id`, attribute_group_id: `attribute_group_id`, Coupon_id: `Coupon_id` };

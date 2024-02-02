"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRelationalFieldsMapper = exports.categoryRelationalFields = exports.categoryFilterableFields = exports.categorySearchableFields = void 0;
exports.categorySearchableFields = [`name`, `description`];
exports.categoryFilterableFields = [`searchTerm`, `id`, `parent_id`, `position`, `meta_SEO_id`, `attribute_group_id`, `category_id`];
exports.categoryRelationalFields = [`meta_SEO_id`, `attribute_group_id`, `category_id`];
exports.categoryRelationalFieldsMapper = { meta_SEO_id: `meta_SEO_id`, attribute_group_id: `attribute_group_id`, category_id: `category_id` };

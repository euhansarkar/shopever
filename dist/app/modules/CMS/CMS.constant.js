"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CMSRelationalFieldsMapper = exports.CMSRelationalFields = exports.CMSFilterableFields = exports.CMSSearchableFields = void 0;
exports.CMSSearchableFields = [`name`, `layout`, `content`];
exports.CMSFilterableFields = [`searchTerm`, `id`, `content`, `name`, `metaSEOId`, `layout`];
exports.CMSRelationalFields = [`metaSEOId`, `CMS_id`];
exports.CMSRelationalFieldsMapper = { metaSEOId: `metaSEOId`, CMS_id: `CMS_id` };

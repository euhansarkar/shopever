"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bloodGroup = exports.gender = exports.userFilterableFields = exports.userSearchableFields = exports.CustomerFilterableFields = exports.CustomerRelationalFieldsMapper = exports.CustomerRelationalFields = exports.CustomerSearchableFields = void 0;
exports.CustomerSearchableFields = [];
exports.CustomerRelationalFields = [`managementDepartmentId`];
exports.CustomerRelationalFieldsMapper = {
    managementDepartment: `managementDepartmentId`,
};
exports.CustomerFilterableFields = [`searchTerm`, `gender`, `contactNo`];
exports.userSearchableFields = [`role`];
exports.userFilterableFields = [`searchTerm`, `id`, `role`];
exports.gender = ['male', 'female'];
exports.bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

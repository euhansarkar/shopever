"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidator = void 0;
const zod_1 = require("zod");
const admin_constant_1 = require("./admin.constant");
const updateAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            first_name: zod_1.z.string().optional(),
            middle_name: zod_1.z.string().optional(),
            last_name: zod_1.z.string().optional(),
        }).optional(),
        admin: zod_1.z.object({
            gender: zod_1.z.enum([...admin_constant_1.gender]).optional(),
            date_of_birth: zod_1.z.string().optional(),
            contact_no: zod_1.z.string().optional(),
            emergency_contact_no: zod_1.z.string().min(10, 'Emergency contact number is required').optional(),
            blood_group: zod_1.z.enum([...admin_constant_1.bloodGroup]).optional(),
            present_address: zod_1.z.string().min(1, 'Present address is required').optional(),
            permanent_address: zod_1.z.string().min(1, 'Permanent address is required').optional(),
            designation: zod_1.z.string().optional(),
            management_department_id: zod_1.z.string().optional(),
        }).optional(),
    }).optional(),
});
exports.AdminValidator = { updateAdminZodSchema };

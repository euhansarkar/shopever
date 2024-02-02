"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const createCustomerZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        email: zod_1.z.string().email('Invalid email address'),
        name: zod_1.z.object({
            first_name: zod_1.z.string({
                required_error: 'First name is required',
            }),
            middle_name: zod_1.z.string().optional(),
            last_name: zod_1.z.string({
                required_error: 'Last name is required',
            }),
        }),
        customer: zod_1.z.object({
            country: zod_1.z.string({ required_error: `country is required` }),
        }),
    }),
});
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        name: zod_1.z.object({
            first_name: zod_1.z.string({
                required_error: 'First name is required',
            }),
            middle_name: zod_1.z.string().optional(),
            last_name: zod_1.z.string({
                required_error: 'Last name is required',
            }),
        }),
        admin: zod_1.z.object({
            gender: zod_1.z.enum([...user_constant_1.gender], {
                required_error: 'Gender is required',
            }),
            date_of_birth: zod_1.z.string({
                required_error: `date fo birth is required`,
            }),
            contact_no: zod_1.z.string({
                required_error: `contact is required`,
            }),
            emergency_contact_no: zod_1.z
                .string()
                .min(10, 'Emergency contact number is required'),
            blood_group: zod_1.z.enum([...user_constant_1.bloodGroup]).optional(),
            present_address: zod_1.z.string().min(1, 'Present address is required'),
            permanent_address: zod_1.z.string().min(1, 'Permanent address is required'),
            designation: zod_1.z.string({
                required_error: `designation is required`,
            }),
            management_department_id: zod_1.z.string({
                required_error: `management department id is required`,
            }),
        }),
    }),
});
exports.UserValidation = {
    createCustomerZodSchema,
    createAdminZodSchema,
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const hash_1 = require("../app/prismaMiddlwares/hash");
const prisma = new client_1.PrismaClient({
    errorFormat: 'minimal',
});
prisma.$use(hash_1.encryptPassword);
exports.default = prisma;

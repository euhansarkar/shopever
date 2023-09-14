import { PrismaClient } from '@prisma/client';
import { encryptPassword } from '../app/prismaMiddlwares/hash';
import { sameYearTimePretend } from '../app/prismaMiddlwares/academicSemesterCreationValidation';

const prisma = new PrismaClient({
  errorFormat: 'minimal',
});

prisma.$use(encryptPassword);
prisma.$use(sameYearTimePretend);

export default prisma;

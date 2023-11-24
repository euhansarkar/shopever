
import prisma from '../../../shared/prisma';

//User ID
export const findLastUserId = async (): Promise<string | undefined> => {
  const lastUser = await prisma.user.findFirst({
    select: { id: true },
    orderBy: { created_at: "desc" },
  });
  return lastUser?.id.toString();
};

export const generateUserId = async () => {
  const currentId = (await findLastUserId()) || '0'.padStart(5, '0'); // '00000'
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  return incrementedId;
};


// Customer ID
export const findLastCustomerId = async (): Promise<string | undefined> => {
  const lastCustomer = await prisma.user.findFirst({
    where: {
      role: 'customer',
    },
    select: {
      id: true,
    },
    orderBy: {
      created_at: "desc"
    },
  });

  return lastCustomer?.id ? lastCustomer.id.substring(2) : undefined;
};

export const generateCustomerId = async (): Promise<string> => {
  const currentId = (await findLastCustomerId()) || '00000';

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `C-${incrementedId}`;

  return incrementedId;
};


// Admin ID
export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastAdmin = await prisma.user.findFirst({
    where: {
      role: 'admin',
    },
    select: {
      id: true,
    },
    orderBy: {
      created_at: "desc"
    },
  });

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId = (await findLastAdminId()) || '00000';

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `A-${incrementedId}`;

  return incrementedId;
};

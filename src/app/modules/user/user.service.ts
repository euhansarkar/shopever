import {
  Admin,
  Customer,
  Name,
  User,
} from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { generateAdminId, generateCustomerId } from './user.utils';
import config from '../../../config';




const createCustomer = async (
  nameData: Name,
  customerData: Customer,
  userData: User
): Promise<{ message: string }> => {

  await prisma.$transaction(async transectionClient => {
    // set role
    userData.role = `customer`;

    // default password
    if (!userData.password) {
      userData.password = config.default_admin_pass as string;
    }


    // generate user id
    const id = await generateCustomerId();
    customerData.id = id;

    // name creation
    const name = await transectionClient.name.create({
      data: nameData,
    });

    // push name id to admin table
    customerData.name_id = name.id;

    const customerCreation = await transectionClient.customer.create({
      data: customerData
    });

    // if failed to create user
    if (!customerCreation) {
      throw new ApiError(httpStatus.OK, `failed to create new admin`);
    }

    console.log(customerCreation);
    // admin id passs to the user table
    userData.customer_id = customerCreation.uid;
    userData.id = customerCreation.id;


    const userCreation = await transectionClient.user.create({
      data: userData,
      include: {
        admin: {
          include: {
            name: true,
          },
        },
      },
    });
    console.log(`user created`, userCreation);

    if (!userCreation) {
      throw new ApiError(httpStatus.BAD_REQUEST, `user creation failed`);
    }
  });

  return { message: `user created successfully` };
};

const createAdmin = async (
  nameData: Name,
  adminData: Admin,
  userData: User
): Promise<{ message: string }> => {

  await prisma.$transaction(async transectionClient => {
    // set role
    userData.role = `admin`;

    // default password
    if (!userData.password) {
      userData.password = config.default_admin_pass as string;
    }

    console.log(`from line 32`, userData);

    // generate user id
    const id = await generateAdminId();
    adminData.id = id;

    // name creation
    const name = await transectionClient.name.create({
      data: nameData,
    });

    // push name id to admin table
    adminData.name_id = name.id;

    const adminCreation = await transectionClient.admin.create({
      data: adminData,
    });

    // if failed to create user
    if (!adminCreation) {
      throw new ApiError(httpStatus.OK, `failed to create new admin`);
    }

    console.log(adminCreation);
    // admin id passs to the user table
    userData.admin_id = adminCreation.uid;
    userData.id = adminCreation.id;

    console.log(userData);

    const userCreation = await transectionClient.user.create({
      data: userData,
      include: {
        admin: {
          include: {
            name: true,
          },
        },
      },
    });

    if (!userCreation) {
      throw new ApiError(httpStatus.BAD_REQUEST, `user creation failed`);
    }
  });

  return { message: `user created successfully` };
};


export const UserService = { createAdmin, createCustomer };

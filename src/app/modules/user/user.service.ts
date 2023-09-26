import {
  Admin,
  Faculty,
  Guardian,
  LocalGuardian,
  Name,
  Student,
  User,
} from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { generateAdminId, generateFacultyId, generateStudentId } from './user.utils';
import config from '../../../config';

const createStudent = async (
  nameData: Name,
  studentData: Student,
  guardianData: Guardian,
  localGuardianData: LocalGuardian,
  userData: User
): Promise<{ message: string }> => {
  await prisma.$transaction(async transectionClient => {
    // set role
    userData.role = `student`;

    // default password
    if (!userData.password) {
      userData.password = config.default_student_pass as string;
    }

    //academic semester find
    const academicSemester =
      await transectionClient.academicSemester.findUnique({
        where: {
          id: studentData.academicSemesterId,
        },
      });

    // generate user id
    const id = await generateStudentId(academicSemester);
    studentData.id = id;

    // name creation
    const name = await transectionClient.name.create({
      data: nameData,
    });

    // guardian creation
    const guardian = await transectionClient.guardian.create({
      data: guardianData,
    });

    // local guardian creation
    const localGuardian = await transectionClient.localGuardian.create({
      data: localGuardianData,
    });

    // push name, guardian, local guardian id to student table
    studentData.nameId = name.id;
    studentData.guardianId = guardian.id;
    studentData.localGuardianId = localGuardian.id;

    const studentCreation = await transectionClient.student.create({
      data: studentData,
    });

    // if failed to create user
    if (!studentCreation) {
      throw new ApiError(httpStatus.OK, `failed to create new student`);
    }

    // student id passs to the user table
    userData.studentId = studentCreation.uid;
    userData.id = studentCreation.id;

    const userCreation = await transectionClient.user.create({
      data: userData,
      include: {
        student: {
          include: {
            name: true,
            guardian: true,
            localGuardian: true,
            academicDepartment: true,
            academicSemester: true,
            academicFaculty: true,
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

const createFaculty = async (
  nameData: Name,
  facultyData: Faculty,
  userData: User
): Promise<{ message: string }> => {
  console.log(`name data`, nameData);
  console.log(`faculty data`, facultyData);
  console.log(`user data`, userData);

  await prisma.$transaction(async transectionClient => {
    // set role
    userData.role = `faculty`;

    // default password
    if (!userData.password) {
      userData.password = config.default_student_pass as string;
    }

    // generate user id
    const id = await generateFacultyId();
    facultyData.id = id;

    // name creation
    const name = await transectionClient.name.create({
      data: nameData,
    });

    // push name, guardian, local guardian id to student table
    facultyData.nameId = name.id;

    const facultyCreation = await transectionClient.faculty.create({
      data: facultyData,
    });

    // if failed to create user
    if (!facultyCreation) {
      throw new ApiError(httpStatus.OK, `failed to create new faculty`);
    }

    console.log(facultyCreation);
    // student id passs to the user table
    userData.facultyId = facultyCreation.uid;
    userData.id = facultyCreation.id;

    console.log(userData);

    const userCreation = await transectionClient.user.create({
      data: userData,
      include: {
        student: {
          include: {
            name: true,
            academicDepartment: true,
            academicFaculty: true,
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



const createAdmin = async (
  nameData: Name,
  adminData: Admin,
  userData: User
): Promise<{ message: string }> => {
  console.log(`name data`, nameData);
  console.log(`admin data`, adminData);
  console.log(`user data`, userData);

  await prisma.$transaction(async transectionClient => {
    // set role
    userData.role = `admin`;

    // default password
    if (!userData.password) {
      userData.password = config.default_student_pass as string;
    }

    // generate user id
    const id = await generateAdminId();
    adminData.id = id;

    // name creation
    const name = await transectionClient.name.create({
      data: nameData,
    });

    // push name, guardian, local guardian id to student table
    adminData.nameId = name.id;

    const adminCreation = await transectionClient.admin.create({
      data: adminData,
    });

    // if failed to create user
    if (!adminCreation) {
      throw new ApiError(httpStatus.OK, `failed to create new admin`);
    }

    console.log(adminCreation);
    // admin id passs to the user table
    userData.adminId = adminCreation.uid;
    userData.id = adminCreation.id;

    console.log(userData);

    const userCreation = await transectionClient.user.create({
      data: userData,
      include: {
        student: {
          include: {
            name: true,
            academicDepartment: true,
            academicFaculty: true,
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


export const UserService = { createStudent, createFaculty, createAdmin };

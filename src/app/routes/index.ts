import express from 'express';
import { UserRouter } from '../modules/user/user.route';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.router';
import { AcademicFacultyRouter } from '../modules/academicFaculty/academicFaculty.router';
import { AcademicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.router';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRouter,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRouter,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;

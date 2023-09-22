import express from 'express';
import { UserRouter } from '../modules/user/user.route';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.router';
import { AcademicFacultyRouter } from '../modules/academicFaculty/academicFaculty.router';
import { AcademicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.router';
import { ListingStatusRouter } from '../modules/listingStatus/listingStatus.router';
import { StudentRouter } from '../modules/student/student.router';
import { PropertyTypeRouter } from '../modules/propertyType/propertyType.router';
import { countryRouter } from '../modules/country/country.router';
import { CityRouter } from '../modules/city/city.router';
import { CoordinateRouter } from '../modules/coordinate/coordinate.router';
import { RentPropertyRouter } from '../modules/rentProperty/rentProperty.router';
import { propertyAddressRouter } from '../modules/propertyAddress/propertyAddress.router';
import { ApartmentRouter } from '../modules/apartment/apartment.router';
import { StructureRouter } from '../modules/structure/structure.router';
import { PropertyFeatureRouter } from '../modules/propertyFeature/propertyFeature.router';
import { UnitRouter } from '../modules/unit/unit.router';
import { FloorPlanImageRouter } from '../modules/floorPlanImage/floorPlanImage.router';
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
  {
    path: '/listing-statuses',
    route: ListingStatusRouter,
  },
  {
    path: '/students',
    route: StudentRouter,
  },
  {
    path: '/property-types',
    route: PropertyTypeRouter,
  },
  {
    path: '/countries',
    route: countryRouter,
  },
  {
    path: '/cities',
    route: CityRouter,
  },
  {
    path: '/coordinates',
    route: CoordinateRouter,
  },
  {
    path: '/rent-properties',
    route: RentPropertyRouter,
  },
  {
    path: '/property-addresses',
    route: propertyAddressRouter,
  },
  {
    path: '/apartments',
    route: ApartmentRouter,
  },
  {
    path: '/structures',
    route: StructureRouter,
  },
  {
    path: '/property-features',
    route: PropertyFeatureRouter,
  },
  {
    path: '/units',
    route: UnitRouter,
  },l
  {
    path: '/floor-plan-images',
    route: FloorPlanImageRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;

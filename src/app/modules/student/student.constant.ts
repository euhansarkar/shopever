export const studentSearchableFields = [];

export const studentRelationalFields = [
  `guardianId`,
  `localGuardianId`,
  `academicFacultyId`,
  `academicDepartmentId`,
  `academicSemesterId`,
];

export const studentRelationalFieldsMapper: { [key: string]: string } = {
  guardianId: `guardian`,
  localGuardianId: `localGuardian`,
  academicFacultyId: `academicFaculty`,
  academicDepartment: `academicDepartment`,
  academicSemester: `academicSemester`,
};

export const studentFilterableFields = [`searchTerm`, `gender`, `contactNo`];

export const userSearchableFields: Array<string> = [`role`];
export const userFilterableFields: Array<string> = [`searchTerm`, `id`, `role`];

export const gender = ['male', 'female'];
export const bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

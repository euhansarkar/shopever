export const FacultySearchableFields = [];

export const FacultyRelationalFields = [
  `academicFacultyId`,
  `academicDepartmentId`,
];

export const FacultyRelationalFieldsMapper: { [key: string]: string } = {
  academicFacultyId: `academicFaculty`,
  academicDepartment: `academicDepartment`,
};

export const FacultyFilterableFields = [`searchTerm`, `gender`, `contactNo`];

export const userSearchableFields: Array<string> = [`role`];
export const userFilterableFields: Array<string> = [`searchTerm`, `id`, `role`];

export const gender = ['male', 'female'];
export const bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

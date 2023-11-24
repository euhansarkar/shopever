export const CustomerSearchableFields = [];

export const CustomerRelationalFields = [`managementDepartmentId`];

export const CustomerRelationalFieldsMapper: { [key: string]: string } = {
  managementDepartment: `managementDepartmentId`,
};

export const CustomerFilterableFields = [`searchTerm`, `gender`, `contactNo`];

export const userSearchableFields: Array<string> = [`role`];
export const userFilterableFields: Array<string> = [`searchTerm`, `id`, `role`];

export const gender = ['male', 'female'];
export const bloodGroup = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

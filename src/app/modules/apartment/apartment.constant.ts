export const ApartmentSearchableFields = [`title`, `propertyId`];

export const ApartmentFilterableFields = [`searchTerm`, `title`];

export const ApartmentRelationalFields = [`propertyId`];

export const ApartmentRelationalFieldsMapper: { [key: string]: string } = {
  propertyId: `property`,
};

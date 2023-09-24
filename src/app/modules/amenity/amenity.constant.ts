export const AmenitySearchableFields = [`title`, `propertyId`];

export const AmenityFilterableFields = [`searchTerm`, `title`];

export const AmenityRelationalFields = [`propertyId`];

export const AmenityRelationalFieldsMapper: { [key: string]: string } = {
  propertyId: `property`,
};

export const UnitSearchableFields = [`title`, `propertyId`];

export const UnitFilterableFields = [`searchTerm`, `title`];

export const UnitRelationalFields = [`propertyId`];

export const UnitRelationalFieldsMapper: { [key: string]: string } = {
  propertyId: `property`,
};

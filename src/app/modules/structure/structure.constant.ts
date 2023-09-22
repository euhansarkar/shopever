export const StructureSearchableFields = [`title`, `propertyId`];

export const StructureFilterableFields = [`searchTerm`, `title`];

export const StructureRelationalFields = [`propertyId`];

export const StructureRelationalFieldsMapper: { [key: string]: string } = {
  propertyId: `property`,
};

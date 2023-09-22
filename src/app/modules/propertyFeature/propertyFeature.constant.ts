export const PropertyFeatureSearchableFields = [`title`, `propertyId`];

export const PropertyFeatureFilterableFields = [`searchTerm`, `title`];

export const PropertyFeatureRelationalFields = [`propertyId`];

export const PropertyFeatureRelationalFieldsMapper: { [key: string]: string } = {
  propertyId: `property`,
};

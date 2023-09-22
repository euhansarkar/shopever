export const PropertyAddressSearchableFields = [`title`, `countryId`];

export const PropertyAddressFilterableFields = [`searchTerm`, `title`];

export const PropertyAddressRelationalFields = [`countryId`];

export const PropertyAddressRelationalFieldsMapper: { [key: string]: string } = {
  countryId: `country`,
};

export const CitySearchableFields = [`title`, `countryId`];

export const CityFilterableFields = [`searchTerm`, `title`];

export const CityRelationalFields = [`countryId`];

export const CityRelationalFieldsMapper: { [key: string]: string } = {
  countryId: `country`,
};

export const FloorPlanImageSearchableFields = [`title`, `propertyId`];

export const FloorPlanImageFilterableFields = [`searchTerm`, `title`];

export const FloorPlanImageRelationalFields = [`propertyId`];

export const FloorPlanImageRelationalFieldsMapper: { [key: string]: string } = {
  propertyId: `property`,
};

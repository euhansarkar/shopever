export type IProductFilterRequest = {
    searchTerm?: string | undefined;
    name?: string | undefined;
    shortDescription?: string | undefined;
    sku?: string | undefined;
    price?: string | undefined;
    weight?: string | undefined;
    qty?: string | undefined;
    manage_stock?: string | undefined;
    stock_availability?: string | undefined;
    attribute_group_id?: string | undefined;
    category_id?: string | undefined;
}
export type IProductFilterRequest = {
    searchTerm?: string | undefined;
    name?: string | undefined;
    shortDescription?: string | undefined;
    sku?: string | undefined;
    attribute_group_id?: string | undefined;
    category_id?: string | undefined;
}


type IProductAttributeValue = {
    attribute_option_id: string;
    extra_price: number;
    is_deleted?: boolean;
};

export type IProductAttribute = {
    attribute_id: string;
    product_attribute_values: IProductAttributeValue[];
    is_deleted?: boolean
};



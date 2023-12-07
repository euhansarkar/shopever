export type IVarientFilterRequest = {
    searchTerm?: string | undefined;
    name?: string | undefined;
    shortDescription?: string | undefined;
    sku?: string | undefined;
    attribute_group_id?: string | undefined;
    category_id?: string | undefined;
}


type IVarientAttributeValue = {
    attribute_option_id: string;
    extra_price: number;
    is_deleted?: boolean;
};

export type IVarientAttribute = {
    attribute_id: string;
    Varient_attribute_values: IVarientAttributeValue[];
    is_deleted?: boolean
};



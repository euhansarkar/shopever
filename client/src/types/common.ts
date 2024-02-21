export interface IMeta {
    limit: number;
    page: number;
    size: number;
    total: number;
}

export interface ResponseSuccessType {
    data: any;
    meta?: IMeta
}


export interface IGenericErrorMessage {
    path: string | number;
    message: string;
};



export interface IGenericErrorResponse {
    statusCode: number;
    message: string;
    errorMessages: IGenericErrorMessage[];
}

export interface IAttributeGroup {
    id: string,
    group_name: string,
    created_at: string,
    updated_at: string,
}

export interface IAttributeOption {

    id: string,
    option_text: string,
    attribute_id: string,
    is_deleted: null,
    created_at: string,
    updated_at: string

}

export interface IAttribute {
    id: string,
    attribute_name: string,
    attribute_code: string,
    type: string,
    is_required: boolean,
    display_on_frontend: boolean,
    is_filterable: boolean,
    sort_order: number,
    created_at: string,
    updated_at: string,
    attribute_group_id: string,
    attribute_options: [
        IAttributeOption
    ]
}

interface IImage {
    id: string;
    image_url: string;
    category_id: string;
    product_id: string | null;
    isDeleted: boolean | null;
    created_at: string;
    updated_at: string;
}

interface IMetaSEO {
    id: string;
    parent_id: string;
    meta_title: string;
    meta_description: string;
    url_key: string;
    created_at: string;
    updated_at: string;
}

export interface ICategory {
    id: string;
    name: string;
    description: string;
    status: boolean;
    include_in_nav: boolean;
    parent_id: number;
    position: number;
    meta_SEO_id: string;
    created_at: string;
    updated_at: string;
    images: IImage[];
    Meta_SEO: IMetaSEO;
}

export interface IVarientOption {
    id: string;
    attribute_name: string;
    varient_id: string;
    option_id: string;
}

export type IVariant = {
    id: string;
    sku: string;
    qty: number;
    price: number;
    weight: number;
    status: boolean;
    visibility: boolean;
    product_id: string;
    created_at: string;
    updated_at: string;
    varient_options: IVarientOption[];
    images: IImage[];
}

export type IProduct = {
    id: string;
    name: string;
    description: string;
    sku: string;
    manage_stock: boolean;
    stock_availability: boolean;
    tax_class: boolean;
    attribute_group_id: string;
    category_id: string;
    meta_SEO_id: string;
    created_at: string;
    updated_at: string;
    attribute_group: IAttributeGroup;
    category: ICategory;
    meta_SEO: IMetaSEO;
    varients: IVariant[];
};

export interface IVarientOptionCore extends IVarientOption {
    options: {
        id: string;
        option_text: string;
        attribute_id: string;
        is_deleted: boolean;
        created_at: string;
        updated_at: string;
    }
}


export type ISelectSlice = {
    [key: string]: {
        id: string;
        attribute_name: string;
        option_id: string;
        varient_id: string;
        options: {
            id: string;
            option_text: string;
            attribute_id: string;
            is_deleted: boolean;
            created_at: string;
            updated_at: string;
        };
    };
};



export interface ICartProduct {
    id: string;
    name: string;
    sku: string;
    meta_SEO_id: string;
    attribute_group_id: string;
    category_id: string;
    varients: ISelectSlice;
    quantity?: number;
    price: number;
    img: string;
}


export interface IShippingMethod {
    id: string;
    method_name: string;
    method_code: string;
    cost: number;
}

export interface IPaymentMethod {
    id: string;
    method_name: string;
    method_code: string;
}


type IAddress = {
    phone_number_1: string;
    phone_number_2: string;
    country: string;
    state: string;
    city: string;
    location: string;
}



export interface IOrder {
    shipping_address: IAddress,
    billing_address: IAddress,
    paymentMethodId: string;
    shippingMethodApiId: string;
}

interface IName {
    first_name: string;
    last_name: string;
    middle_name: string;
}

export interface ICustomer {
    uid: string;
    country: string;
    name: IName,
    gender: null | string;
    date_of_birth: null | string;
    contact_no: null | string;
    profile_image: null | string;
    address_Id: null | string;
}
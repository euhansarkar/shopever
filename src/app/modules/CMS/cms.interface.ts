export type ICMSFilterRequest = {
    searchTerm?: string | undefined;
    meta_SEO_id?: string | undefined;
    layout?: string | undefined;
    name?: string | undefined;
    content?: string | undefined;
}


export enum CMSLayout {
    onColumn,
    twoColumnsLeft,
    twoColumnsRight,
    threeColumns
}
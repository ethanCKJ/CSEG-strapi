import type { UID } from '@strapi/types';
declare const mockHistoryVersionsData: {
    readonly historyVersions: {
        data: ({
            id: number;
            documentId: string;
            contentType: UID.ContentType;
            relatedDocumentId: string;
            locale: null;
            status: "draft";
            data: {
                short_text: string;
                long_text: string;
                rich_text: string;
                integer: number;
                biginteger: string;
                decimal: number;
                float: number;
                date: string;
                datetime: string;
                time: string;
                timestamp: null;
                boolean: boolean;
                email: string;
                enumeration: string;
                json: {
                    marsu: string;
                };
                custom_field: null;
                custom_field_with_default_options: null;
                blocks: ({
                    type: string;
                    children: {
                        type: string;
                        text: string;
                    }[];
                    level: number;
                    format?: undefined;
                } | {
                    type: string;
                    children: {
                        type: string;
                        text: string;
                    }[];
                    level?: undefined;
                    format?: undefined;
                } | {
                    type: string;
                    format: string;
                    children: {
                        type: string;
                        children: {
                            type: string;
                            text: string;
                        }[];
                    }[];
                    level?: undefined;
                })[];
                single_media: number;
                multiple_media: ({
                    id: number;
                    name: string;
                    alternativeText: null;
                    caption: null;
                    width: number;
                    height: number;
                    formats: {
                        thumbnail: {
                            name: string;
                            hash: string;
                            ext: string;
                            mime: string;
                            path: null;
                            width: number;
                            height: number;
                            size: number;
                            url: string;
                        };
                        small?: undefined;
                        medium?: undefined;
                    };
                    hash: string;
                    ext: string;
                    mime: string;
                    size: number;
                    url: string;
                    previewUrl: null;
                    provider: string;
                    provider_metadata: null;
                    folderPath: string;
                    createdAt: string;
                    updatedAt: string;
                    documentId: null;
                    publishedAt: null;
                    locale: null;
                    folder: null;
                } | {
                    id: number;
                    name: string;
                    alternativeText: null;
                    caption: null;
                    width: number;
                    height: number;
                    formats: {
                        thumbnail: {
                            name: string;
                            hash: string;
                            ext: string;
                            mime: string;
                            path: null;
                            width: number;
                            height: number;
                            size: number;
                            url: string;
                        };
                        small: {
                            name: string;
                            hash: string;
                            ext: string;
                            mime: string;
                            path: null;
                            width: number;
                            height: number;
                            size: number;
                            url: string;
                        };
                        medium: {
                            name: string;
                            hash: string;
                            ext: string;
                            mime: string;
                            path: null;
                            width: number;
                            height: number;
                            size: number;
                            url: string;
                        };
                    };
                    hash: string;
                    ext: string;
                    mime: string;
                    size: number;
                    url: string;
                    previewUrl: null;
                    provider: string;
                    provider_metadata: null;
                    folderPath: string;
                    createdAt: string;
                    updatedAt: string;
                    documentId: null;
                    publishedAt: null;
                    locale: null;
                    folder: null;
                })[];
                single_compo: {
                    id: number;
                    name: string;
                    test: string;
                    __temp_key__: number;
                };
                repeatable_compo: never[];
                dynamiczone: never[];
                one_way_tag: {
                    disconnect: never[];
                    connect: never[];
                };
                one_to_one_tag: {
                    disconnect: never[];
                    connect: never[];
                };
                one_to_many_tags: {
                    disconnect: never[];
                    connect: never[];
                };
                many_to_one_tag: {
                    disconnect: never[];
                    connect: never[];
                };
                many_to_many_tags: {
                    disconnect: never[];
                    connect: never[];
                };
                many_way_tags: {
                    disconnect: never[];
                    connect: never[];
                };
                morph_to_one: null;
                morph_to_many: never[];
                cats: {
                    __component: string;
                    id: number;
                    name: string;
                    test: string;
                    __temp_key__: number;
                }[];
            };
            schema: {
                short_text: {
                    type: string;
                };
                long_text: {
                    type: string;
                };
                rich_text: {
                    type: string;
                };
                blocks: {
                    type: string;
                };
                integer: {
                    type: string;
                };
                biginteger: {
                    type: string;
                };
                decimal: {
                    type: string;
                };
                float: {
                    type: string;
                };
                date: {
                    type: string;
                };
                datetime: {
                    type: string;
                };
                time: {
                    type: string;
                };
                timestamp: {
                    type: string;
                };
                boolean: {
                    type: string;
                };
                email: {
                    type: string;
                };
                password: {
                    type: string;
                };
                enumeration: {
                    type: string;
                    enum: string[];
                };
                single_media: {
                    type: string;
                    multiple: boolean;
                    required: boolean;
                    allowedTypes: string[];
                };
                multiple_media: {
                    type: string;
                    multiple: boolean;
                    required: boolean;
                    allowedTypes: string[];
                };
                json: {
                    type: string;
                };
                single_compo: {
                    type: string;
                    repeatable: boolean;
                    component: string;
                };
                repeatable_compo: {
                    type: string;
                    repeatable: boolean;
                    component: string;
                };
                dynamiczone: {
                    type: string;
                    components: string[];
                };
                one_way_tag: {
                    type: string;
                    relation: string;
                    target: string;
                };
                one_to_one_tag: {
                    type: string;
                    relation: string;
                    target: string;
                    private: boolean;
                    inversedBy: string;
                };
                one_to_many_tags: {
                    type: string;
                    relation: string;
                    target: string;
                    mappedBy: string;
                };
                many_to_one_tag: {
                    type: string;
                    relation: string;
                    target: string;
                    inversedBy: string;
                };
                many_to_many_tags: {
                    type: string;
                    relation: string;
                    target: string;
                    inversedBy: string;
                };
                many_way_tags: {
                    type: string;
                    relation: string;
                    target: string;
                };
                morph_to_one: {
                    type: string;
                    relation: string;
                };
                morph_to_many: {
                    type: string;
                    relation: string;
                };
                custom_field: {
                    type: string;
                    customField: string;
                };
                custom_field_with_default_options: {
                    type: string;
                    regex: string;
                    customField: string;
                };
                cats: {
                    type: string;
                    components: string[];
                };
            };
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
            createdBy: {
                id: number;
                firstname: string;
                lastname: string;
                username: string;
                email: string;
            };
        } | {
            id: number;
            documentId: string;
            contentType: UID.ContentType;
            relatedDocumentId: string;
            locale: null;
            status: "draft";
            data: {
                short_text: string;
                long_text: string;
                rich_text: string;
                integer: number;
                biginteger: string;
                decimal: number;
                float: number;
                date: string;
                datetime: string;
                time: string;
                timestamp: null;
                boolean: boolean;
                email: string;
                enumeration: string;
                json: {
                    marsu: string;
                };
                custom_field: null;
                custom_field_with_default_options: null;
                blocks: ({
                    type: string;
                    children: {
                        type: string;
                        text: string;
                    }[];
                    level: number;
                    format?: undefined;
                } | {
                    type: string;
                    children: {
                        type: string;
                        text: string;
                    }[];
                    level?: undefined;
                    format?: undefined;
                } | {
                    type: string;
                    format: string;
                    children: {
                        type: string;
                        children: {
                            type: string;
                            text: string;
                        }[];
                    }[];
                    level?: undefined;
                })[];
                single_media: number;
                multiple_media: ({
                    id: number;
                    name: string;
                    alternativeText: null;
                    caption: null;
                    width: number;
                    height: number;
                    formats: {
                        thumbnail: {
                            name: string;
                            hash: string;
                            ext: string;
                            mime: string;
                            path: null;
                            width: number;
                            height: number;
                            size: number;
                            url: string;
                        };
                        small?: undefined;
                        medium?: undefined;
                    };
                    hash: string;
                    ext: string;
                    mime: string;
                    size: number;
                    url: string;
                    previewUrl: null;
                    provider: string;
                    provider_metadata: null;
                    folderPath: string;
                    createdAt: string;
                    updatedAt: string;
                    documentId: null;
                    publishedAt: null;
                    locale: null;
                    folder: null;
                } | {
                    id: number;
                    name: string;
                    alternativeText: null;
                    caption: null;
                    width: number;
                    height: number;
                    formats: {
                        thumbnail: {
                            name: string;
                            hash: string;
                            ext: string;
                            mime: string;
                            path: null;
                            width: number;
                            height: number;
                            size: number;
                            url: string;
                        };
                        small: {
                            name: string;
                            hash: string;
                            ext: string;
                            mime: string;
                            path: null;
                            width: number;
                            height: number;
                            size: number;
                            url: string;
                        };
                        medium: {
                            name: string;
                            hash: string;
                            ext: string;
                            mime: string;
                            path: null;
                            width: number;
                            height: number;
                            size: number;
                            url: string;
                        };
                    };
                    hash: string;
                    ext: string;
                    mime: string;
                    size: number;
                    url: string;
                    previewUrl: null;
                    provider: string;
                    provider_metadata: null;
                    folderPath: string;
                    createdAt: string;
                    updatedAt: string;
                    documentId: null;
                    publishedAt: null;
                    locale: null;
                    folder: null;
                })[];
                single_compo: {
                    id: number;
                    name: string;
                    test: string;
                    __temp_key__: number;
                };
                repeatable_compo: never[];
                dynamiczone: never[];
                one_way_tag: {
                    disconnect: never[];
                    connect: never[];
                };
                one_to_one_tag: {
                    disconnect: never[];
                    connect: never[];
                };
                one_to_many_tags: {
                    disconnect: never[];
                    connect: never[];
                };
                many_to_one_tag: {
                    disconnect: never[];
                    connect: never[];
                };
                many_to_many_tags: {
                    disconnect: never[];
                    connect: never[];
                };
                many_way_tags: {
                    disconnect: never[];
                    connect: never[];
                };
                morph_to_one: null;
                morph_to_many: never[];
                cats: {
                    __component: string;
                    id: number;
                    name: string;
                    test: string;
                    __temp_key__: number;
                }[];
            };
            schema: {
                short_text: {
                    type: string;
                };
                long_text: {
                    type: string;
                };
                rich_text: {
                    type: string;
                };
                blocks: {
                    type: string;
                };
                integer: {
                    type: string;
                };
                biginteger: {
                    type: string;
                };
                decimal: {
                    type: string;
                };
                float: {
                    type: string;
                };
                date: {
                    type: string;
                };
                datetime: {
                    type: string;
                };
                time: {
                    type: string;
                };
                timestamp: {
                    type: string;
                };
                boolean: {
                    type: string;
                };
                email: {
                    type: string;
                };
                password: {
                    type: string;
                };
                enumeration: {
                    type: string;
                    enum: string[];
                };
                single_media: {
                    type: string;
                    multiple: boolean;
                    required: boolean;
                    allowedTypes: string[];
                };
                multiple_media: {
                    type: string;
                    multiple: boolean;
                    required: boolean;
                    allowedTypes: string[];
                };
                json: {
                    type: string;
                };
                single_compo: {
                    type: string;
                    repeatable: boolean;
                    component: string;
                };
                repeatable_compo: {
                    type: string;
                    repeatable: boolean;
                    component: string;
                };
                dynamiczone: {
                    type: string;
                    components: string[];
                };
                one_way_tag: {
                    type: string;
                    relation: string;
                    target: string;
                };
                one_to_one_tag: {
                    type: string;
                    relation: string;
                    target: string;
                    private: boolean;
                    inversedBy: string;
                };
                one_to_many_tags: {
                    type: string;
                    relation: string;
                    target: string;
                    mappedBy: string;
                };
                many_to_one_tag: {
                    type: string;
                    relation: string;
                    target: string;
                    inversedBy: string;
                };
                many_to_many_tags: {
                    type: string;
                    relation: string;
                    target: string;
                    inversedBy: string;
                };
                many_way_tags: {
                    type: string;
                    relation: string;
                    target: string;
                };
                morph_to_one: {
                    type: string;
                    relation: string;
                };
                morph_to_many: {
                    type: string;
                    relation: string;
                };
                custom_field: {
                    type: string;
                    customField: string;
                };
                custom_field_with_default_options: {
                    type: string;
                    regex: string;
                    customField: string;
                };
                cats: {
                    type: string;
                    components: string[];
                };
            };
            createdAt: string;
            updatedAt: string;
            publishedAt: string;
            createdBy: {
                id: number;
                firstname: string;
                lastname: string;
                email: string;
                username?: undefined;
            };
        })[];
        meta: {
            pagination: {
                page: number;
                pageSize: number;
                pageCount: number;
                total: number;
            };
        };
    };
};
export { mockHistoryVersionsData };

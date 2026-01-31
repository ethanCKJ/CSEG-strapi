declare const testData: {
    contentType: {
        uid: "api::test.test";
        apiID: string;
        isDisplayed: true;
        kind: "collectionType";
        modelName: string;
        globalId: string;
        modelType: "contentType";
        info: {
            displayName: string;
            singularName: string;
            pluralName: string;
        };
        attributes: {
            createdAt: {
                type: "timestamp";
            };
            dz: {
                type: "dynamiczone";
                components: ("compos.test-compo" | "compos.sub-compo")[];
            };
            id: {
                type: "integer";
            };
            documentId: {
                type: "string";
            };
            name: {
                type: "string";
            };
            notrepeatable: {
                type: "component";
                repeatable: false;
                component: "compos.test-compo";
            };
            password: {
                type: "password";
            };
            repeatable: {
                type: "component";
                repeatable: true;
                component: "compos.test-compo";
            };
            updatedAt: {
                type: "timestamp";
            };
        };
    };
    components: {
        'compos.sub-compo': {
            uid: "compos.sub-compo";
            isDisplayed: true;
            category: string;
            modelType: "component";
            apiID: string;
            modelName: string;
            globalId: string;
            info: {
                displayName: string;
            };
            attributes: {
                id: {
                    type: "integer";
                };
                documentId: {
                    type: "string";
                };
                name: {
                    type: "string";
                };
                password: {
                    type: "password";
                };
            };
        };
        'compos.test-compo': {
            uid: "compos.test-compo";
            category: string;
            isDisplayed: true;
            modelType: "component";
            apiID: string;
            modelName: string;
            globalId: string;
            info: {
                displayName: string;
            };
            attributes: {
                id: {
                    type: "integer";
                };
                documentId: {
                    type: "string";
                };
                name: {
                    type: "string";
                };
                password: {
                    type: "password";
                };
                subcomponotrepeatable: {
                    type: "component";
                    repeatable: false;
                    component: "compos.sub-compo";
                };
                subrepeatable: {
                    type: "component";
                    repeatable: true;
                    component: "compos.sub-compo";
                };
            };
        };
    };
    modifiedData: {
        createdAt: string;
        dz: ({
            __component: string;
            id: number;
            name: string;
            password: string;
            documentId?: undefined;
            subcomponotrepeatable?: undefined;
            subrepeatable?: undefined;
        } | {
            id: number;
            documentId: string;
            name: string;
            password: string;
            subcomponotrepeatable: null;
            subrepeatable: never[];
            __component: string;
        } | {
            id: number;
            documentId: string;
            name: string;
            password: string;
            subcomponotrepeatable: {
                id: number;
                name: string;
                password: string;
            };
            subrepeatable: {
                id: number;
                name: string;
                password: string;
            }[];
            __component: string;
        } | {
            id: number;
            documentId: string;
            name: null;
            password: null;
            subcomponotrepeatable: null;
            subrepeatable: never[];
            __component: string;
        })[];
        id: number;
        name: string;
        notrepeatable: {
            id: number;
            documentId: string;
            name: string;
            password: string;
            subcomponotrepeatable: {
                id: number;
                name: string;
                password: string;
            };
            subrepeatable: {
                id: number;
                name: string;
                password: string;
            }[];
        };
        password: string;
        repeatable: ({
            id: number;
            documentId: string;
            name: string;
            password: string;
            subrepeatable: {
                id: number;
                name: string;
                password: string;
            }[];
            subcomponotrepeatable: {
                id: number;
                name: string;
                password: string;
            };
        } | {
            id: number;
            documentId: string;
            name: string;
            password: string;
            subrepeatable: never[];
            subcomponotrepeatable: null;
        })[];
        updatedAt: string;
    };
};
declare const permissions: ({
    id: number;
    action: string;
    subject: string;
    properties: {
        fields: string[];
    };
    conditions: string[];
} | {
    id: number;
    action: string;
    subject: null;
    properties: {
        fields?: undefined;
    };
    conditions: never[];
})[];
export { testData, permissions };

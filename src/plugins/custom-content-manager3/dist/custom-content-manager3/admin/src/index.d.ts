import 'prismjs';
declare const _default: {
    register(app: any): void;
    registerTrads({ locales }: {
        locales: string[];
    }): Promise<{
        data: {
            [x: string]: string;
        };
        locale: string;
    }[]>;
};
export default _default;

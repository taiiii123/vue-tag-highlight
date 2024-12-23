interface ExtensionConfigType {
    color: {
        script: string,
        template: string,
        style: string,
    },
    isShowOnScrollbar: boolean,
}

export type ExtensionConfig = Readonly<ExtensionConfigType>;
interface ExtensionConfigType {
    color: {
        script: string,
        template: string,
        style: string,
    },
    isShowOnTextEditor: boolean,
    isShowOnScrollbar: boolean,
}

export type ExtensionConfig = Readonly<ExtensionConfigType>;
import * as vscode from 'vscode';

// Define types for the extension.
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

// Define types for the decoration.
interface DecorationType { [key: string]: vscode.TextEditorDecorationType | null }

export type Decoration = DecorationType;

// Define types for the ranges.
interface RangesType { [key: string]: { start: vscode.Range | null, end: vscode.Range | null } }

export type Ranges = RangesType;
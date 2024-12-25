import * as vscode from 'vscode';
import { type ExtensionConfig, type Decoration, type Ranges } from './types';

export function activate(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration('vue-tag-highlight');
    const color = config.get<ExtensionConfig['color']>('color')!;
    const isShowOnScrollbar = config.get<ExtensionConfig['isShowOnScrollbar']>('isShowOnScrollbar', false);
    const isShowOnTextEditor = config.get<ExtensionConfig['isShowOnTextEditor']>('isShowOnTextEditor', false);

    const tagPatterns = {
        script: {
            start: /<script.*>/g,
            end: /<\/script>/g,
        },
        template: {
            start: /<template.*>/g,
            end: /<\/template>/g,
        },
        style: {
            start: /<style.*>/g,
            end: /<\/style>/g,
        },
    };

    let decorations: Decoration = {
        script: null,
        template: null,
        style: null,
    };

    function updateDecorations(editor: vscode.TextEditor): void {
        if (editor.document.languageId !== 'vue') {
            return;
        }

        const text = editor.document.getText();

        const ranges: Ranges = {
            script: { start: null, end: null },
            template: { start: null, end: null },
            style: { start: null, end: null },
        };

        for (const [tagName, pattern] of Object.entries(tagPatterns)) {
            const startMatches = text.matchAll(pattern.start);
            const endMatches = text.matchAll(pattern.end);

            let startRange: vscode.Range | null = null;
            let endRange: vscode.Range | null = null;

            for (const match of startMatches) {
                if (!startRange) {
                    const startPos = editor.document.positionAt(match.index!);
                    const endPos = editor.document.positionAt(match.index! + match[0].length);
                    startRange = new vscode.Range(startPos, endPos);
                }
            }

            for (const match of endMatches) {
                const startPos = editor.document.positionAt(match.index!);
                const endPos = editor.document.positionAt(match.index! + match[0].length);
                endRange = new vscode.Range(startPos, endPos);
            }

            ranges[tagName] = { start: startRange, end: endRange };
        }

        for (const [tagName, range] of Object.entries(ranges)) {
            if (range.start && range.end) {
                if (decorations[tagName]) {
                    decorations[tagName]!.dispose();
                }

                const decorationOptions: vscode.DecorationRenderOptions = {};

                if (isShowOnTextEditor) {
                    decorationOptions.backgroundColor = color[tagName as keyof ExtensionConfig['color']];
                    decorationOptions.rangeBehavior = vscode.DecorationRangeBehavior.ClosedClosed;
                    decorationOptions.isWholeLine = true;
                }

                if (isShowOnScrollbar) {
                    decorationOptions.overviewRulerColor = color[tagName as keyof ExtensionConfig['color']];
                    decorationOptions.overviewRulerLane = vscode.OverviewRulerLane.Full;
                }

                decorations[tagName] = vscode.window.createTextEditorDecorationType(decorationOptions);
                editor.setDecorations(decorations[tagName]!, [range.start, range.end]);
            } else if (decorations[tagName]) {
                decorations[tagName]!.dispose();
                decorations[tagName] = null;
            }
        }
    }

    vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor) {
            updateDecorations(editor);
        }
    });

    vscode.workspace.onDidChangeTextDocument(event => {
        const editor = vscode.window.activeTextEditor;
        if (editor && event.document === editor.document) {
            updateDecorations(editor);
        }
    });

    if (vscode.window.activeTextEditor) {
        updateDecorations(vscode.window.activeTextEditor);
    }
}

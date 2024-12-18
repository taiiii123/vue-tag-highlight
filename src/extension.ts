import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration('vue-tag-highlight.color');

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
    
    let decorations: { [key: string]: vscode.TextEditorDecorationType | null } = {
        script: null,
        template: null,
        style: null,
    };
    
    function updateDecorations(editor: vscode.TextEditor) {
        const text = editor.document.getText();
    
        const ranges: { [key: string]: { start: vscode.Range | null, end: vscode.Range | null } } = {
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
                decorations[tagName] = vscode.window.createTextEditorDecorationType({
                    backgroundColor: config.get(tagName),
                    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
                    isWholeLine: true,
                    overviewRulerColor: config.get(tagName),
                    overviewRulerLane: vscode.OverviewRulerLane.Full,
                });
                editor.setDecorations(decorations[tagName]!, [range.start, range.end]);
            } else if (decorations[tagName]) {
                decorations[tagName]!.dispose();
                decorations[tagName] = null;
            }
        }
    }

    const updateDecorationsIfPossible = (): void => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            updateDecorations(editor);
        }
    };

    let timeout: NodeJS.Timer | undefined = undefined;
    function triggerUpdateDecorations(throttle = false) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = undefined;
        }
        if (throttle) {
            timeout = setTimeout(updateDecorationsIfPossible, 500);
        } else {
            updateDecorationsIfPossible();
        }
    }

    triggerUpdateDecorations();

    vscode.window.onDidChangeActiveTextEditor(_editor => {
        triggerUpdateDecorations();
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument(event => {
        if (event.document === vscode.window.activeTextEditor?.document) {
            triggerUpdateDecorations(true);
        }
    }, null, context.subscriptions);
}

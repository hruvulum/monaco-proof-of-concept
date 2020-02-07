import * as monaco from "monaco-editor";
export class Editor {
    private editor: monaco.editor.IStandaloneCodeEditor;
    private textFile: string | undefined;

    constructor(el: HTMLElement, template: string, storageKey: string, safeDelay: number = 5000) {
        this.editor = monaco.editor.create(el, {
            language: "text/plain",
            scrollBeyondLastLine: true,
            value: window.localStorage.getItem(storageKey) || template,
            // tslint:disable-next-line: object-literal-sort-keys
            fontFamily: "Helvetica",
            wordWrap: "wordWrapColumn",
            wordWrapColumn: 70,
            wrappingIndent: "indent",
            disableMonospaceOptimizations: true,
            codeLens: false,
            cursorBlinking: "solid",
            quickSuggestions: false,
            minimap: {enabled: false},
            occurrencesHighlight: false,
            selectionHighlight: false,
            highlightActiveIndentGuide: false,
            // I personally am not bothered by line numbers, but I have vague dreams of using Monaco as part of a generalized interface to information attractive to non-programmers.
            lineNumbers: ((lineNumber: number) => "¶")
        });
        let safeTimeout: number;
        this.editor.onDidChangeModelContent(() => {
            if (safeTimeout) {
                clearTimeout(safeTimeout);
            }
            safeTimeout = window.setTimeout(
                () => window.localStorage.setItem(storageKey, this.editor.getValue()),
                safeDelay);
        });
    }
}
(self as any).MonacoEnvironment = {
    getWorkerUrl(moduleId: string, label: string) {
        return "./editor.worker.js";
    },
};
const editorElement = document.getElementById("editor")!;
const editor = new Editor(editorElement, "new document", "phaser/source");

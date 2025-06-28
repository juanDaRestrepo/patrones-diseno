/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

// copilot haz un ejemplo de este patron con el estado que tiene el editor de codigo que tenga los metodos de redo y undo no olvides el metodo para copiar el el objeto para que sea inmutable
class CodeEditor {
    private content: string;
    private history: string[];
    private redoStack: string[];

    constructor(initialContent: string) {
        this.content = initialContent;
        this.history = [initialContent];
        this.redoStack = [];
    }

    // Método para modificar el contenido del editor
    edit(newContent: string): void {
        this.history.push(this.content); // Guardar el estado actual en el historial
        this.content = newContent;
        this.redoStack = []; // Limpiar la pila de rehacer al hacer una nueva edición
    }

    // Método para deshacer la última edición
    undo(): void {
        if (this.history.length > 1) {
            this.redoStack.push(this.content); // Guardar el estado actual en la pila de rehacer
            this.history.pop(); // Eliminar el último estado del historial
            this.content = this.history[this.history.length - 1]; // Volver al estado anterior
        }
    }

    // Método para rehacer la última edición deshecha
    redo(): void {
        if (this.redoStack.length > 0) {
            this.history.push(this.content); // Guardar el estado actual en el historial
            this.content = this.redoStack.pop()!; // Recuperar el último estado de la pila de rehacer
        }
    }

    // Método para clonar el editor y su estado actual
    clone(): CodeEditor {
        const clonedEditor = new CodeEditor(this.content);
        clonedEditor.history = [...this.history]; // Copiar el historial
        clonedEditor.redoStack = [...this.redoStack]; // Copiar la pila de rehacer
        return clonedEditor;
    }
    // Método para mostrar el contenido actual del editor
    displayContent(): void {
        console.log(`Contenido del editor:\n${this.content}`);
    }
}


// Ejemplo de uso
const editor = new CodeEditor("Hola, mundo!");
editor.displayContent(); // Contenido del editor: Hola, mundo!
editor.edit("Hola, TypeScript!");
editor.displayContent(); // Contenido del editor: Hola, TypeScript!

const clonedEditor = editor.clone();
clonedEditor.edit("Hola, clon!");
editor.displayContent(); // Contenido del editor: Hola, TypeScript!
clonedEditor.displayContent(); // Contenido del editor: Hola, clon!
editor.undo();
editor.displayContent(); // Contenido del editor: Hola, TypeScript!     
clonedEditor.redo();
clonedEditor.displayContent(); // Contenido del editor: Hola, clon!
// editor.undo();


/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */

class Document {
    constructor(public content: string, public title: string, public author: string) {}
    
    clone(): Document {
        return new Document(this.content, this.title, this.author);
    }
    
    display(): void {
        console.log(`Título: ${this.title}`);
        console.log(`Contenido: ${this.content}`);
        console.log(`Autor: ${this.author}`);
    }
}

function main() {
    const originalDocument = new Document("Este es el contenido del documento.", "Documento Original", "Autor Original");
    
    // Clonando el documento
    const clonedDocument = originalDocument.clone();
    
    // Modificando el documento clonado
    clonedDocument.title = "Documento Clonado";
    clonedDocument.author = "Autor Clonado";
    
    // Mostrando ambos documentos
    console.log("Documento Original:");
    originalDocument.display();
    
    console.log("\nDocumento Clonado:");
    clonedDocument.display();
}

main();
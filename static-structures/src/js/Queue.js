class Queue {

    constructor() {
        this.items = [];
    }

    // * Métodos de Inserção

    //Insere o elemento especificado no final desta fila
    enqueue(element) {
        this.items.push(element);
    }

    // * Métodos de Consulta

    //Recupera, mas não remove, o cabeçalho desta fila ou retorna undefined se esta fila estiver vazia.
    peek() {
        return this.items[0];
    }

    //Retorna o número de elementos nesta lista.
    size() {
        return this.items.length;
    }

    //Retorna verdadeiro se esta lista não contiver elementos.
    isEmpty() {
        return this.items.length === 0;
    }

    //Retorna uma representação string do objeto
    toString() {
        return this.items.toString();
    }

    // * Métodos de Remoção

    //Recupera e remove o cabeçalho desta fila ou retorna undefined, se esta fila estiver vazia.
    dequeue() {
        return this.items.shift();
    }

    //Remove todos os elementos desta lista.
    clear() {
        this.items = [];
    }

}
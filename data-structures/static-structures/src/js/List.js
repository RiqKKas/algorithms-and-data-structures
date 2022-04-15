//Valor Symbol para método privado (checkIndex) da classe List
const checkIndex = Symbol('checkIndex');

class List {

    constructor() {
        this.items = [];
    }

    // * Métodos de Controle Interno

    //Verifica se o índice é válido
    [checkIndex](index) {
        if (index < 0 || index > this.items.length) throw new Error("Index out of bounds");
    }

    // * Métodos de Inserção

    //Acrescenta o elemento especificado ao final desta lista.
    append(element) {
        this.items.push(element);
    }

    //Insere o elemento especificado na posição especificada nesta lista.
    add(index, element) {
        this[checkIndex](index);
        for (let i = this.items.length; i > index; i--) this.items[i] = this.items[i - 1];
        this.items[index] = element;
    }

    // * Métodos de Substituição

    //Substitui o elemento na posição especificada nesta lista pelo elemento especificado
    set(index, element) {
        this[checkIndex](index);
        this.items[index] = element;
    }

    // * Métodos de Consulta

    //Retorna o elemento na posição especificada nesta lista.
    get(index) {
        this[checkIndex](index);
        return this.items[index];
    }

    /* Retorna o índice da primeira ocorrência do elemento especificado nesta lista, ou -1 se esta lista não
    contiver o elemento. */
    indexOf(element) {
        return this.items.indexOf(element);
    }

    /* Retorna o índice da última ocorrência do elemento especificado nesta lista, ou -1 se esta lista não
    contiver o elemento. */
    lastIndexOf(element) {
        return this.items.lastIndexOf(element);
    }

    //Retorna verdadeiro se esta lista contiver o elemento especificado.
    contains(element) {
        return this.items.includes(element);
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

    //Remove o elemento na posição especificada nesta lista.
    removeAt(index) {
        this[checkIndex](index);
        for (let i = index; i < this.items.length - 1; i++) this.items[i] = this.items[i + 1];
    }

    //Remove a primeira ocorrência do elemento especificado desta lista, se estiver presente.
    remove(element) {
        const index = this.indexOf(element);
        this.removeAt(index);
    }

    //Remove todos os elementos desta lista.
    clear() {
        this.items = [];
    }

}
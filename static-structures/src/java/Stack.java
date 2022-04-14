public class Stack<T> {

    // * Atributos

    private T[] elements;
    private int size;

    // * Construtores

    public Stack(int capacity) {
        this.elements = (T[]) new Object[capacity];
        this.size = 0;
    }

    public Stack() {
        this(10);
    }

    // * Métodos de Controle Interno

    //Aumenta a capacidade do array interno dessa instância List, se necessário, dinamicamente
    private void ensureCapacity() {
        if (this.size == this.elements.length) {
            T[] newElements = (T[]) new Object[this.size * 2];

            for (int i = 0; i < this.size; i++) newElements[i] = this.elements[i];

            this.elements = newElements;
        }
    }

    // * Métodos de Inserção

    //Empurra um item para o topo desta pilha.
    public T push(T element) {
        this.ensureCapacity();

        if (this.size < this.elements.length) {
            this.elements[this.size] = element;
            this.size++;
        }

        return element;
    }

    // * Métodos de Consulta

    //Retorna o número de elementos nesta lista.
    public int size() {
        return this.size;
    }

    //Retorna verdadeiro se esta lista não contiver elementos.
    public boolean isEmpty() {
        return this.size == 0;
    }

    //Olha para o objeto no topo desta pilha sem removê-lo da pilha.
    public T peek() {
        if (this.isEmpty()) return null;
        return this.elements[this.size - 1];
    }

    //Retorna uma representação string do objeto
    public String toString() {
        StringBuilder stack = new StringBuilder();

        stack.append("[");

        for (int i = 0; i < this.size - 1; i++) {
            stack.append(this.elements[i]);
            stack.append(", ");
        }

        if (this.size > 0) stack.append(this.elements[this.size - 1]);

        stack.append("]");

        return stack.toString();
    }

    // * Métodos de Remoção

    //Remove o objeto no topo desta pilha e retorna esse objeto como o valor desta função.
    public T pop() {
        if (this.isEmpty()) return null;
        return this.elements[--this.size];
    }

    //Remove todos os elementos desta lista.
    public void clear() {
        for (int i = 0; i < this.size; i++) this.elements[i] = null;
        this.size = 0;
    }

}

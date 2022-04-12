public class List<T> {

    // * Atributos

    private T[] elements;
    private int size;

    // * Construtores

    public List(int capacity) {
        this.elements = (T[]) new Object[capacity];
        this.size = 0;
    }

    public List() {
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

    //Verifica se o índice é válido
    private void checkIndex(int index) {
        if (index < 0 || index > this.size) throw new IllegalArgumentException("Posição Inválida");
    }

    // * Métodos de Inserção

    //Acrescenta o elemento especificado ao final desta lista.
    public void add(T element) {
        this.ensureCapacity();

        if (this.size < this.elements.length) {
            this.elements[this.size] = element;
            this.size++;
        }
    }

    //Insere o elemento especificado na posição especificada nesta lista.
    public void add(int index, T element) {
        this.checkIndex(index);
        this.ensureCapacity();

        for (int i = this.size; i > index; i--) this.elements[i] = this.elements[i - 1];

        this.elements[index] = element;
        this.size++;
    }

    // * Métodos de Substituição

    //Substitui o elemento na posição especificada nesta lista pelo elemento especificado
    public void set(int index, T element) {
        this.checkIndex(index);
        this.elements[index] = element;
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

    //Retorna o elemento na posição especificada nesta lista.
    public T get(int index) {
        if (this.isEmpty()) return null;
        return this.elements[index];
    }

    /* Retorna o índice da primeira ocorrência do elemento especificado nesta lista, ou -1 se esta lista não
    contiver o elemento. */
    public int indexOf(T element) {
        for (int i = 0; i < this.size; i++) if (this.elements[i].equals(element)) return i;
        return -1;
    }

    /* Retorna o índice da última ocorrência do elemento especificado nesta lista, ou -1 se esta lista não
    contiver o elemento. */
    public int lastIndexOf(T element) {
        for (int i = this.size - 1; i >= 0; i++) if (this.elements[i].equals(element)) return i;
        return -1;
    }

    //Retorna verdadeiro se esta lista contiver o elemento especificado.
    public boolean contains(T element) {
        return this.indexOf(element) > -1;
    }

    //Retorna uma representação string do objeto
    public String toString() {
        StringBuilder list = new StringBuilder();

        list.append("[");

        for (int i = 0; i < this.size - 1; i++) {
            list.append(this.elements[i]);
            list.append(", ");
        }

        if (this.size > 0) list.append(this.elements[this.size - 1]);

        list.append("]");

        return list.toString();
    }

    // * Métodos de Remoção

    //Remove o elemento na posição especificada nesta lista.
    public void remove(int index) {
        this.checkIndex(index);
        for (int i = index; i < this.size - 1; i++) this.elements[i] = this.elements[i + 1];
        this.size--;
    }

    //Remove a primeira ocorrência do elemento especificado desta lista, se estiver presente.
    public void remove(T element) {
        int index = this.indexOf(element);
        this.remove(index);
    }

    //Remove todos os elementos desta lista.
    public void clear() {
        for (int i = 0; i < this.size; i++) this.elements[i] = null;
        this.size = 0;
    }

}

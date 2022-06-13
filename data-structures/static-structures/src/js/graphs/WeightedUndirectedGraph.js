//Grafo Não Direcionado Ponderado

class WeightedUndirectedGraph {

    constructor() {
        this.vertices = [];
        this.currentCapacity = 0;
        this.adjacencyMatrix = this.startAdjacencyMatrix(10);
    }

    //metodo que gera uma matriz a partir de um tamanho especifico
    startAdjacencyMatrix(size) {
        this.currentCapacity = size;
        const newAdjacencyMatrix = [];

        for (let lineIndex = 0; lineIndex < this.currentCapacity; lineIndex++) {
            newAdjacencyMatrix[lineIndex] = [];
            for (let columnIndex = 0; columnIndex < this.currentCapacity; columnIndex++) {
                newAdjacencyMatrix[lineIndex][columnIndex] = 0; //inicia como arestas inexistentes
            }
        }

        return newAdjacencyMatrix;
    }

    //metodo que adiciona um vertice no grafo, se o mesmo ainda nao existir
    addVertex(data) {
        if (!this.contains(data)) {
            if (this.size() === this.currentCapacity) this.increaseCapacity();
            this.vertices.push(data);
        }
    }

    //metodo que aumenta dinamicamente o tamanho da matriz adjacencia
    increaseCapacity() {
        //dobra o tamanho da matriz
        const newAdjacencyMatrix = this.startAdjacencyMatrix(this.currentCapacity * 2);

        //copia os valores para a nova matriz, posicao por posicao
        for (let lineIndex = 0; lineIndex < this.currentCapacity; lineIndex++) {
            for (let columnIndex = 0; columnIndex < this.currentCapacity; columnIndex++) {
                if (this.adjacencyMatrix.length > lineIndex && this.adjacencyMatrix[lineIndex].length > columnIndex) {
                    newAdjacencyMatrix[lineIndex][columnIndex] = this.adjacencyMatrix[lineIndex][columnIndex];
                }
            }
        }

        //referencia nova a matriz adjacencia do grafo
        this.adjacencyMatrix = newAdjacencyMatrix;
    }


    //metodo que remove um vertice determinado, assim como suas ligacoes com outros vertices, se ele existir no grafo
    removeVertex(data) {
        if (!this.contains(data)) return;

        //remove as ligacoes com outros vertices
        for (let index = 0; index < this.size(); index++) {
            const endVertex = this.vertices[index];
            this.removeEdge(data, endVertex);
            this.removeEdge(endVertex, data);
        }

        //ajusta as linhas da matriz adjacencia com a remocao
        const lineToRemove = this.vertices.indexOf(data);
        for (let line = lineToRemove; line < this.size() - 1; line++) {
            for (let column = 0; column < this.size(); column++) {
                this.adjacencyMatrix[line][column] = this.adjacencyMatrix[line + 1][column];
            }
        }

        //ajusta as colunas da matriz adjacencia com a remocao
        for (let line = 0; line < this.size(); line++) {
            for (let column = lineToRemove; column < this.size() - 1; column++) {
                this.adjacencyMatrix[line][column] = this.adjacencyMatrix[line][column + 1];
            }
        }

        //remove o dado determinado do grafo
        this.vertices = this.vertices.filter((currentVertex) => currentVertex !== data);
    }

    //metodo que adiciona uma aresta (ligacao entre vertices) no grafo
    addEdge(weight, startVertex, endVertex) {
        //recupera os indices dos dados determinados
        const startIndex = this.vertices.indexOf(startVertex);
        const endIndex = this.vertices.indexOf(endVertex);

        //verifica se os indices sao validos
        if (!this.isValidIndex(startIndex, endIndex)) return;

        //define a distancia dos vertices, assim formando a aresta
        this.adjacencyMatrix[startIndex][endIndex] = weight;
        this.adjacencyMatrix[endIndex][startIndex] = weight;
    }

    //metodo que remove uma aresta (ligacao entre vertices) do grafo
    removeEdge(startVertex, endVertex) {
        //recupera os indices dos dados determinados
        const startIndex = this.vertices.indexOf(startVertex);
        const endIndex = this.vertices.indexOf(endVertex);

        //verifica se os indices sao validos
        if (!this.isValidIndex(startIndex, endIndex)) return;

        //remove a distancia dos vertices, assim apagando a aresta
        this.adjacencyMatrix[startIndex][endIndex] = 0;
        this.adjacencyMatrix[endIndex][startIndex] = 0;
    }


    size() {
        return this.vertices.length;
    }

    //metodo que verifica se um elemento existe no grafo
    contains(vertex) {
        return this.vertices.includes(vertex);
    }

    //metodo que faz um busca em profundidade no grafo, a partir de uma origem
    depthSearch(origin) {
        //recupera o indice do dado determinado
        const originIndex = this.vertices.indexOf(origin);
        //verifica se o indice e valido
        if (!this.isValidIndex(originIndex)) return;

        console.log("### Busca em Profundidade: ");

        //vetor que guarda a resposta de que se um vertice ja foi visitado
        const visited = [];

        this.supplementalDFS(originIndex, visited);
    }

    //metodo complementar ao de mesmo nome
    supplementalDFS(currentVertex, visited) {
        visited[currentVertex] = true; //vertice atual visitado

        //verifica se o vertice atual tem ligacao com cada um dos outros vertices
        for (let adjacentVertexIndex = 0; adjacentVertexIndex < this.size(); adjacentVertexIndex++) {
            //passa pelo vertice adjacente ainda nao visitado
            if (!visited[adjacentVertexIndex] && this.adjacencyMatrix[currentVertex][adjacentVertexIndex] !== 0) {
                console.log("Veio de " + this.vertices[currentVertex] + " para " + this.vertices[adjacentVertexIndex]);
                //recursao, agora com o vertice adjacente como vertice atual
                this.supplementalDFS(adjacentVertexIndex, visited);
            }
        }
    }

    //metodo que faz um busca em largura no grafo, a partir de uma origem
    breadthSearch(origin) {
        //recupera o indice do dado determinado
        const originIndex = this.vertices.indexOf(origin);
        //verifica se o indice e valido
        if (!this.isValidIndex(originIndex)) return;

        console.log("### Busca em Largura: ");

        //fila de vertices a serem visitados
        const verticesToProcess = [];
        //vetor que guarda a resposta de que se um vertice ja foi visitado
        const verticesVisited = [];

        verticesToProcess.push(originIndex);
        verticesVisited[originIndex] = true;

        while (verticesToProcess.length !== 0) {
            //retira o primeiro vertice da fila
            const currentVertex = verticesToProcess.shift();

            //verifica se o vertice atual tem ligacao com cada um dos outros vertices
            for (let adjacentVertexIndex = 0; adjacentVertexIndex < this.size(); adjacentVertexIndex++) {
                //passa pelo vertice adjacente ainda nao visitado
                if (!verticesVisited[adjacentVertexIndex] && this.adjacencyMatrix[currentVertex][adjacentVertexIndex] != 0) {
                    console.log("Veio de " + this.vertices[currentVertex] + " para " + this.vertices[adjacentVertexIndex]);
                    //adicinona o vertice adjacente na fila para processar suas ligacoes
                    verticesToProcess.push(adjacentVertexIndex);
                    verticesVisited[adjacentVertexIndex] = true; //vertice adjacente visitado
                }
            }
        }
    }

    //metodo que calcula o menor caminho de uma origem ate todos os vertices que consegue alcancar
    dijkstra(src) {
        const srcIndex = this.vertices.indexOf(src);
        if (!this.isValidIndex(srcIndex)) return;

        //shorterDistance[i] armazena a distancia mais curta de src ao vertice i
        const shorterDistance = [];

        //fila que guarda agrupa os vertices visitados
        const closedVertices = [];

        //inicializa todas as distâncias
        for (let i = 0; i < this.size(); i++) shorterDistance[i] = Number.MAX_VALUE;
        //a distancia do vertice de origem ao mesmo e sempre 0
        shorterDistance[srcIndex] = 0;

        //procura o caminho mais curto para todos os vertices
        for (let count = 0; count < this.size() - 1; count++) {
            //pega o vertice com a distancia minima do conjunto de vertices ainda nao visitados
            //na primeira iteracao, src e sempre retornado.

            let minDistance = Number.MAX_VALUE;
            let currentElementIndex = 0;

            //busca o vertice com a distancia minima do conjunto de vertices ainda nao incluidos no caminho mais curto
            for (let currentVertex = 0; currentVertex < this.size(); currentVertex++) {
                if (!closedVertices.includes(currentVertex) && shorterDistance[currentVertex] <= minDistance) {
                    minDistance = shorterDistance[currentVertex];
                    currentElementIndex = currentVertex;
                }
            }

            //marca como ja visitado
            closedVertices.push(currentElementIndex);

            //atualiza o valor shorterDistance dos vertices adjacentes do vertice atual.
            for (let adjacentVertexIndex = 0; adjacentVertexIndex < this.size(); adjacentVertexIndex++) {
                /*
                    * o shorterDistance[adjacentVertexIndex] e atualizado somente se nao estiver fechado, existir uma aresta de
                    * currentElementIndex para adjacentVertexIndex e o peso total do caminho de src para adjacentVertexIndex
                    * atraves de currentElementIndex e menor que o valor atual de shorterDistance[adjacentVertexIndex]
                    */
                let distance = shorterDistance[currentElementIndex]
                    + this.adjacencyMatrix[currentElementIndex][adjacentVertexIndex];

                if (!closedVertices.includes(adjacentVertexIndex)
                    && this.adjacencyMatrix[currentElementIndex][adjacentVertexIndex] !== 0
                    && shorterDistance[currentElementIndex] !== Number.MAX_VALUE
                    && distance < shorterDistance[adjacentVertexIndex]) {
                        shorterDistance[adjacentVertexIndex] = distance;
                }
            }
        }

        //imprime a matriz de distancias calculadas
        console.log("Distancia de " + src + " a:");
        for (let index = 0; index < this.size(); index++) {
            let distance = "Nao existe caminho!";
            if (shorterDistance[index] < Number.MAX_VALUE) distance = shorterDistance[index] + "Km";

            console.log(this.vertices[index] + " -> " + distance);
        }
    }

    //metodo que verifica a validade de um indice
    isValidIndex(...indexes) {
        for (let index of indexes) {
            if (index === -1) {
                return false;
            }
        }
        return true;
    }

}
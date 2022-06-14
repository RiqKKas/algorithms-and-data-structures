//classe cujo os objetos representam os vertices do grafo
class Vertex {
    constructor(data) {
        this.data = data;
        this.edges = [];
    }
}

//classe cujo os objetos representam as arestas do grafo
class Edge {
    constructor(startVertex, endVertex) {
        this.startVertex = startVertex;
        this.endVertex = endVertex;
    }
}

//Grafo Não Direcionado Não Ponderado
class UndirectedUnweightedGraph {
    constructor() {
        this.vertices = [];
        this.edges = [];
    }

    //metodo que adiciona um vertice no grafo, se o mesmo ainda nao existir
    addVertex(data) {
        if (!this.contains(data)) {
            const newVertex = new Vertex(data);
            this.vertices.push(newVertex);
        }
    }

    //metodo que remove um vertice determinado, assim como suas ligacoes com outros vertices, se ele existir
    removeVertex(data) {
        if (this.contains(data)) {
            const vertexToRemove = this.getVertex(data);

            //remove as ligacoes com outros vertices
            for (let currentVertex of this.vertices) {
                this.removeEdge(vertexToRemove.data, currentVertex.data);
                this.removeEdge(currentVertex.data, vertexToRemove.data);
            }

            //remove o vertice determinado do grafo
            this.vertices = this.vertices.filter(
                (currentVertex) => currentVertex !== vertexToRemove
            );
        }
    }

    //metodo que adiciona uma aresta (ligacao entre vertices) no grafo
    addEdge(startData, endData) {
        //verifica se os dados(vertices) existem no grafo
        if (!this.contains(startData) || !this.contains(endData)) return;

        //recupera os objetos
        const startVertex = this.getVertex(startData);
        const endVertex = this.getVertex(endData);

        //forma as arestas
        const newEdge1 = new Edge(startVertex, endVertex);
        const newEdge2 = new Edge(endVertex, startVertex);

        //adiciona cada aresta no seu devido lugar nos vertices
        startVertex.edges.push(newEdge1);
        endVertex.edges.push(newEdge2);

        //adiciona cada aresta no grafo
        this.edges.push(newEdge1);
        this.edges.push(newEdge2);
    }

    //metodo que remove uma aresta (ligacao entre vertices) do grafo
    removeEdge(startData, endData) {
        //recupera os objetos
        const startVertex = this.getVertex(startData);
        const endVertex = this.getVertex(endData);
        const edge1 = this.getEdge(startVertex, endVertex);
        const edge2 = this.getEdge(startVertex, endVertex);

        //verifica se os dados(vertices e arestas) existem no grafo
        if (
            !this.contains(startData) ||
            !this.contains(endData) ||
            edge1 === null ||
            edge2 === null
        ) {
            return;
        }

        //remove cada aresta do seu devido lugar nos vertices
        startVertex.edges = startVertex.edges.filter(
            (currentEdge) => currentEdge !== edge1
        );
        endVertex.edges = endVertex.edges.filter(
            (currentEdge) => currentEdge !== edge2
        );

        //remove cada aresta do grafo
        this.edges = this.edges.filter(
            (currentEdge) => currentEdge !== edge1 && currentEdge !== edge2
        );
    }

    //metodo que retorna um determinado vertice presente no grafo
    getVertex(dado) {
        for (let currentVertex of this.vertices) {
            if (currentVertex.data === dado) {
                return currentVertex;
            }
        }
        return null;
    }

    //metodo que retorna uma determinada aresta presente no grafo
    getEdge(startVertex, endVertex) {
        for (let currentEdge of this.edges) {
            if (
                currentEdge.startVertex === startVertex &&
                currentEdge.endVertex === endVertex
            ) {
                return currentEdge;
            }
        }
        return null;
    }

    //metodo que retorna o tamanho do grafo
    size() {
        return this.vertices.length;
    }

    //metodo que verifica se um elemento existe no grafo
    contains(data) {
        const vertex = this.getVertex(data);
        if (vertex != null) return this.vertices.includes(vertex);
        else return false;
    }

    //metodo que faz um busca em profundidade no grafo, a partir de uma origem
    depthSearch(origin) {
        if (!this.contains(origin)) return;
        const originVertex = this.getVertex(origin);

        //recupera o indice do dado determinado
        const originIndex = this.vertices.indexOf(originVertex);

        console.log("### Busca em Profundidade: ");

        //vetor que guarda a resposta de que se um vertice ja foi visitado
        const visited = [];

        this.supplementalDFS(originIndex, visited);
    }

    //metodo complementar ao de mesmo nome
    supplementalDFS(currentVertexIndex, visited) {
        visited[currentVertexIndex] = true; //vertice atual visitado
        const currentVertex = this.vertices[currentVertexIndex];

        //verifica se o vertice atual tem ligacao com cada um dos outros vertices
        for (let adjacentVertexIndex = 0; adjacentVertexIndex < this.size(); adjacentVertexIndex++) {
            const adjacentVertex = this.vertices[adjacentVertexIndex];
            const edge = this.getEdge(currentVertex, adjacentVertex);

            //passa pelo vertice adjacente ainda nao visitado
            if (!visited[adjacentVertexIndex] && edge != null) {
                console.log("Veio de " + currentVertex.data + " para " + adjacentVertex.data);
                //recursao, agora com o vertice adjacente como vertice atual
                this.supplementalDFS(adjacentVertexIndex, visited);
            }
        }
    }

    //metodo que faz um busca em largura no grafo, a partir de uma origem
    breadthSearch(origin) {
        if (!this.contains(origin)) return;
        const originVertex = this.getVertex(origin);

        //recupera o indice do dado determinado
        const originIndex = this.vertices.indexOf(originVertex);

        console.log("### Busca em Largura: ");

        //fila de vertices a serem visitados
        const verticesToProcess = [];
        //vetor que guarda a resposta de que se um vertice ja foi visitado
        const verticesVisited = [];

        verticesToProcess.push(originIndex);
        verticesVisited[originIndex] = true;

        while (verticesToProcess.length !== 0) {
            //retira o primeiro vertice da fila
            const currentVertexIndex = verticesToProcess.shift();
            const currentVertex = this.vertices[currentVertexIndex];

            //verifica se o vertice atual tem ligacao com cada um dos outros vertices
            for (let adjacentVertexIndex = 0; adjacentVertexIndex < this.size(); adjacentVertexIndex++) {
                const adjacentVertex = this.vertices[adjacentVertexIndex];
                const edge = this.getEdge(currentVertex, adjacentVertex);

                //passa pelo vertice adjacente ainda nao visitado
                if (!verticesVisited[adjacentVertexIndex] && edge !== null) {
                    console.log("Veio de " + currentVertex.data + " para " + adjacentVertex.data);
                    //adicinona o vertice adjacente na fila para processar suas ligacoes
                    verticesToProcess.push(adjacentVertexIndex);
                    verticesVisited[adjacentVertexIndex] = true; //vertice adjacente visitado
                }
            }
        }
    }

    //metodo que calcula o menor caminho de uma origem ate todos os vertices que consegue alcancar
    dijkstra(src) {
        if (!this.contains(src)) return;
        const srcVertex = this.getVertex(src);
        const srcIndex = this.vertices.indexOf(srcVertex);

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
            const currentVertex = this.vertices[currentElementIndex];

            //atualiza o valor shorterDistance dos vertices adjacentes do vertice atual.
            for (let adjacentVertexIndex = 0; adjacentVertexIndex < this.size(); adjacentVertexIndex++) {
                const adjacentVertex = this.vertices[adjacentVertexIndex];
                const edge = this.getEdge(currentVertex, adjacentVertex);

                /*
                 * o shorterDistance[adjacentVertexIndex] e atualizado somente se nao estiver fechado, existir uma aresta de
                 * currentElementIndex para adjacentVertexIndex e o peso total do caminho de src para adjacentVertexIndex
                 * atraves de currentElementIndex e menor que o valor atual de shorterDistance[adjacentVertexIndex]
                 */

                if (edge != null) {
                    const distance = shorterDistance[currentElementIndex] + 1;

                    if (!closedVertices.includes(adjacentVertexIndex)
                        && shorterDistance[currentElementIndex] !== Number.MAX_VALUE
                        && distance < shorterDistance[adjacentVertexIndex]) {
                        shorterDistance[adjacentVertexIndex] = distance;
                    }
                }
            }
        }

        //imprime a matriz de distancias calculadas
        console.log("Distancia de " + src + " a:");
        for (let index = 0; index < this.size(); index++) {
            let distance = "Nao existe caminho!";
            if (shorterDistance[index] < Number.MAX_VALUE) distance = shorterDistance[index] + " vertice(s)";

            console.log(this.vertices[index].data + " -> " + distance);
        }
    }

}
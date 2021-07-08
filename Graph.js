/** Class representing a Graph, containing nodes and edges. */
class Graph {
    /**
     * Create a Graph.
     */
    constructor() {
        this.edges = [];
        this.nodes = [];
    }

    /**
     * Add a node to the Graph.
     * @param {Node} node 
     */
    addNode(node) {
        var n = new Node(node)
        this.nodes.push(n);
    }

    /**
     * Add an edge to the Graph.
     * @param {string} node1 - the name of the first node 
     * @param {string} node2 - the name of the second node
     * @param {number} weight - the weight of the edge
     */
    addEdge(node1, node2, weight = 1) {
        this.edges.push({ node1: node1, node2: node2, weight: weight});
    }

    /**
     * Displays the Graph in the console, showing the nodes and all nodes connected to them.
     */
    display() {
        let graph = "";
        console.log(this.edges);
        console.log(this.nodes)
        this.nodes.forEach(node => {
            let nodeEdges = this.edges.filter(edge => edge.node1 === node.name).map(edge => edge.node2).concat(this.edges.filter(edge => edge.node2 === node.name).map(edge => edge.node1));
            graph += node.name + "->" + nodeEdges.join(", ") + "\n";
        });
        console.log(graph)
    }

    /**
     * Displays the graph onto the canvas using p5.js, with nodes represented as dots and edges as lines.
     */
    p5display() {
        this.nodes.forEach(node => {
            node.draw();
        })

        strokeWeight(1)

        this.edges.forEach(edge => {
            let realNode1 = this.nodes.find(node => node.name === edge.node1);
            let realNode2 = this.nodes.find(node => node.name === edge.node2);

            line(realNode1.x, realNode1.y, realNode2.x, realNode2.y);
        })
    }

    /**
     * Creates a minimum spanning tree (MST) for the graph using the Prim's algorithm.
     * @returns {Graph} A graph object containing the minimum spanning tree of the graph.
     */
    prims() {
       const MST = new Graph();
       
        if (this.nodes.length === 0) {
            return MST;
        }

        MST.nodes.push(this.nodes[0])

        while (MST.edges.length < this.nodes.length - 1) {
            let edgesToConsider = this.edges.filter(edge => myXor(MST.nodes.includes(this.nodes.find(node => node.name === edge.node1)), MST.nodes.includes(this.nodes.find(node => node.name === edge.node2))));
            edgesToConsider.sort((a, b) => a.weight - b.weight)
            console.log("Nodes:", MST.nodes)
            console.log("Edges to consider:", edgesToConsider)
            if (MST.nodes.includes(this.nodes.find(node => node.name === edgesToConsider[0].node1))) {
                MST.nodes.push(this.nodes.find(node => node.name === edgesToConsider[0].node2));
            } else if (MST.nodes.includes(this.nodes.find(node => node.name === edgesToConsider[0].node2))) {
                MST.nodes.push(this.nodes.find(node => node.name === edgesToConsider[0].node1));
            }
            MST.edges.push(edgesToConsider[0]);
        }


        // console.log(MST.edges)
        // console.log(MST.nodes)

        return MST;
    }

    /**
     * Creates a graph as a Graph object containing the nodes and edges specified in the given text.
     * @param {string[]} data - the string array containing information taken from a graph in resources.
     * @returns {Graph} the graph created from the given data
     */
    static fromText(data) {
        console.log(data)
        let graph = new Graph;

        data.forEach(line => {
            var lineCut = line.split(" ");
            if (lineCut.length == 1) {
                graph.addNode(lineCut[0])
            } else if (lineCut.length == 3) {
                graph.addEdge(lineCut[0], lineCut[1], lineCut[2]);
            }
        })

        return graph;
    }
}

/**
 * Class representing a Node, contained within a Graph object. Each node stores an x and y position, as well as a name.
 */
class Node {
    /**
     * Create a Node
     * @param {string} name - the intended name for the node.
     */
    constructor(name) {
        this.name = name
        this.x = random(0, width - 20) + 10;
        this.y = random(0, height - 20) + 10;
    }

    /**
     * Displays the node on the canvas using p5.js, as well as the name of the node.
     */
    draw() {
        strokeWeight(10);
        point(this.x, this.y);
        text(this.name, this.x + 10, this.y + 10)
    }
}

/**
 * Applies an exclusive or operation on two booleans. 
 * @param {boolean} a - The first boolean for the XOR.
 * @param {boolean} b - The second boolean for the XOR.
 * @returns {boolean} The result of a XOR b
 */
function myXor(a, b) {
    return (a || b) && !(a && b)
}
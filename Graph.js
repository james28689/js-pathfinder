class Graph {
    constructor() {
        this.edges = [];
        this.nodes = [];
    }

    addNode(node) {
        var n = new Node(node)
        this.nodes.push(n);
    }

    addEdge(node1, node2, weight = 1) {
        this.edges.push({ node1: node1, node2: node2, weight: weight});
    }

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

    prims() {
       const MST = new Graph();
       
        if (this.nodes.length === 0) {
            return MST;
        }

        MST.nodes.push(this.nodes[0])

        let unvisited = this.nodes.slice(1).map(n => n.name);

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


        console.log(MST.edges)
        console.log(MST.nodes)

        return MST;
    }
}

class Node {
    constructor(name) {
        this.name = name
        this.x = random(0, width - 20) + 10;
        this.y = random(0, height - 20) + 10;
    }

    draw() {
        strokeWeight(10);
        point(this.x, this.y);
        text(this.name, this.x + 10, this.y + 10)
    }
}

function myXor(a, b) {
    return (a || b) && !(a && b)
}
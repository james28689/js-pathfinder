function preload() {
  data = loadStrings("resources/small-graph.txt");
}

function setup() {
  createCanvas(800, 800);
  pixelDensity(1);
  background(255);
  console.log(data);

  var graph = new Graph;
  data.forEach(line => {
    let lineCut = line.split(" ");
    if (lineCut.length == 1) {
      graph.addNode(lineCut[0])
    } else if (lineCut.length == 3) {
      graph.addEdge(lineCut[0], lineCut[1], lineCut[2]);
    }
  })

  graph.p5display()
  console.log(graph.edges)
  console.log(graph.nodes)
  graph.display()
}

function draw() {
}
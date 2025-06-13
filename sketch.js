let tractor;
let buildings = [];
let trees = [];
let roadY;
let skyColor;
let isDay = true; // Determina se é dia ou noite
let transitionPos = 0; // Posição para transição de campo para cidade
let sunPos, moonPos;
let cars = [];

function setup() {
  createCanvas(900, 600);
  
  // Posições da estrada
  roadY = height - 100;
  
  // Definir as posições do sol e da lua
  sunPos = createVector(width / 2, 100);
  moonPos = createVector(width / 2, 100);

  // Criar árvores para o campo
  for (let i = 0; i < 6; i++) {
    trees.push(createTree(random(50, width - 200), height - 250));
  }

  // Criar prédios para a cidade
  for (let i = 0; i < 6; i++) {
    buildings.push(createBuilding(i * 180 + 100, height - 300));
  }

  // Criar carros que se movem na cidade
  cars.push(createCar(100, height - 150));
  cars.push(createCar(300, height - 150));
  cars.push(createCar(500, height - 150));
  cars.push(createCar(700, height - 150));

  // Criar o trator
  tractor = createTractor(50, roadY - 30);
}

function draw() {
  // Transição entre o campo e a cidade
  if (tractor.x < width / 2) {
    skyColor = lerpColor(color(135, 206, 235), color(255, 223, 0), tractor.x / (width / 2)); // Céu azul claro para o campo
  } else {
    skyColor = lerpColor(color(135, 206, 235), color(25, 25, 112), (tractor.x - width / 2) / (width / 2)); // Céu escuro para a cidade
    isDay = false;
  }
  background(skyColor);

  // Desenhar elementos do campo
  if (tractor.x < width / 2) {
    drawField();
  } else {
    drawCity();
  }

  // Desenhar a estrada
  drawRoad();

  // Movimentação do trator
  tractor.x += 2;
  if (tractor.x > width) {
    tractor.x = -tractor.width; // Voltar ao início
  }

  // Desenhar o trator
  drawTractor(tractor.x, tractor.y);

  // Desenhar o sol ou lua
  drawSunMoon();

  // Desenhar carros em movimento
  moveCars();
  
  // Texto explicativo
  fill(255);
  textSize(24);
  textAlign(CENTER);
  text("Trator indo da cidade para o campo", width / 2, 40);
  textSize(16);
  text("Clique para reiniciar", width / 2, 570);
}

// Funções para criar e desenhar os objetos

function createBuilding(x, y) {
  return {
    x: x,
    y: y,
    width: 100,
    height: random(150, 300),
    color: color(random(100, 200), random(100, 200), random(150, 255))
  };
}

function createTree(x, y) {
  return {
    x: x,
    y: y,
    size: random(30, 50),
    color: color(random(50, 120), random(150, 255), random(50, 120))
  };
}

function createTractor(x, y) {
  return {
    x: x,
    y: y,
    width: 60,
    height: 30,
    color: color(255, 0, 0)
  };
}

function createCar(x, y) {
  return {
    x: x,
    y: y,
    width: 50,
    height: 25,
    color: color(random(150, 255), random(0, 150), random(0, 150))
  };
}

function createCloud(x, y) {
  return {
    x: x,
    y: y,
    size: random(80, 120),
    speed: random(0.2, 0.5)
  };
}

// Função para desenhar os objetos

function drawCity() {
  // Desenhando os prédios
  for (let building of buildings) {
    fill(building.color);
    rect(building.x, building.y - building.height, building.width, building.height);
    
    // Janelas iluminadas (no escuro)
    if (!isDay) {
      fill(255, 223, 0, 180);
      for (let i = 0; i < building.height / 30; i++) {
        let windowX = building.x + random(5, building.width - 15);
        let windowY = building.y - random(10, building.height - 20);
        rect(windowX, windowY, 10, 10);
      }
    }
  }
}

function drawField() {
  // Desenhando o céu de dia
  for (let tree of trees) {
    fill(tree.color);
    ellipse(tree.x, tree.y, tree.size, tree.size);
  }
}

function drawRoad() {
  // Desenhando a estrada
  fill(50, 50, 50);
  rect(0, roadY, width, 100);

  // Linhas da estrada
  stroke(255);
  strokeWeight(4);
  for (let i = 0; i < width; i += 40) {
    line(i, roadY + 40, i + 20, roadY + 40);
  }
}

function drawTractor(x, y) {
  // Corpo do trator
  fill(tractor.color);
  rect(x, y, tractor.width, tractor.height);

  // Roda esquerda
  fill(0);
  ellipse(x + 10, y + tractor.height, 20, 20);

  // Roda direita
  fill(0);
  ellipse(x + tractor.width - 10, y + tractor.height, 20, 20);

  // Parte traseira do trator (chassis)
  fill(150, 75, 0);
  rect(x - 20, y - 10, 20, 20);
}

function drawSunMoon() {
  let sunMoonX = width / 2;
  let sunMoonY = 100;
  let sunMoonSize = 80;

  if (isDay) {
    // Sol durante o dia
    fill(255, 223, 0);
    ellipse(sunMoonX, sunMoonY, sunMoonSize, sunMoonSize);
  } else {
    // Lua durante a noite
    fill(255, 255, 255, 200);
    ellipse(sunMoonX, sunMoonY, sunMoonSize, sunMoonSize);
  }
}

// Desenha carros em movimento
function moveCars() {
  for (let car of cars) {
    fill(car.color);
    rect(car.x, car.y, car.width, car.height);
    car.x += 2;
    if (car.x > width) {
      car.x = -car.width;
    }
  }
}

// Função para reiniciar o movimento do trator
function mousePressed() {
  tractor.x = -tractor.width; // Reseta a posição do trator
}

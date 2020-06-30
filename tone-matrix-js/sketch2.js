
const notas = [96, 93, 91, 89, 86, 84, 81, 79, 77, 74, 72, 69, 67, 65, 62, 60];
const num_notas = notas.length;
const num_pasos = 16;
const matriz = new Matriz(num_notas, num_pasos);

let tamanoPantalla = 1000;
let espacioEntreCeldas = tamanoPantalla / (4 * num_notas);
let tamanoCelda = (tamanoPantalla / num_notas) - (espacioEntreCeldas);

var cuadradoBrillante;
var tamanoBrillo = tamanoCelda + (espacioEntreCeldas * 4);
var tamanoCuadradoBrillante = (tamanoCelda + espacioEntreCeldas) / 1.1;

let beat = 0;
function setup()
{
  let canvas = createCanvas(tamanoPantalla + espacioEntreCeldas, tamanoPantalla + espacioEntreCeldas);
  let x = (windowWidth - width) / 2;
  canvas.position(x, 50);
  background(0);
  cuadradoBrillante = createGraphics(tamanoBrillo, tamanoBrillo);
  cuadradoBrillante.background(0, 0);
  cuadradoBrillante.fill(255, 255);
  cuadradoBrillante.rectMode(CENTER);
  cuadradoBrillante.rect(tamanoBrillo / 2, tamanoBrillo / 2, tamanoCuadradoBrillante, tamanoCuadradoBrillante);
  cuadradoBrillante.filter(BLUR, 4);
  cuadradoBrillante.loadPixels();
  cuadradoBrillante.updatePixels();
  cuadradoBrillante.filter(DILATE);
  matriz.inicializar();
}

function draw()
{
  background(0);
  matriz.pintar(beat);
  if((frameCount % 8) == 0) {
    beat++;
    beat %= num_pasos;
  }
}



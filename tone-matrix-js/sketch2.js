
const notas = [96, 93, 91, 89, 86, 84, 81, 79, 77, 74, 72, 69, 67, 65, 62, 60];
const numNotas = notas.length;
const numPasos = 16;

let tamanoPantalla = 1000;
let espacioEntreCeldas = tamanoPantalla / (4 * numNotas);
let tamanoCelda = (tamanoPantalla / numNotas) - (espacioEntreCeldas);

let matriz;
let beat = 0;
const numeroDeIteracionesPorBeat = 8;

let osciladores = [];
// constantes de audio
const gain = 0.3;
const attack = 0.001;
const decay = 0.002;
const sustain = 0.707;
const release = 0.2;
const eco = new p5.Delay();

function setup() {
  let canvas = createCanvas(tamanoPantalla + espacioEntreCeldas, tamanoPantalla + espacioEntreCeldas);
  let x = (windowWidth - width) / 2;
  canvas.position(x, 50);
  background(0);
  matriz = new Matriz(numNotas, numPasos, tamanoPantalla, espacioEntreCeldas, tamanoCelda);
  matriz.inicializar();
  inicializarOsciladores();
}

function draw() {
  background(0);
  matriz.pintar(beat);
  if(iteracionEsUnBeat()) {
      cadaBeat();
      if(esNuevaGeneracion()) {
          cadaGeneracion();
      }
      beat++;
      beat %= numPasos;
  }
}

function cadaBeat() {
    for (let nota = 0; nota < numNotas; nota++){
      if (matriz.estaVivaEnPosicion(beat, nota)) {
        reproducirNota(beat, nota);
      }
    }
}

function cadaGeneracion() {
    juegoDeLaVida();
}

function juegoDeLaVida() {
    const celdas = matriz.obtenerCeldas();
    for(let paso=0; paso<numPasos; paso++) {
      for(let nota=0; nota<numNotas; nota++) {
        //1. Toda celda con menos de 2 vecinos vivos se muere por soledad
        //2. Toda celda con 2 o 3 vecinos sobrevive
        //3. Toda celda con mas de 3 vecinos muere por sobrepoblacion
        //4. Toda celda muerta con exactamente 3 vecinos nace por reproduccion

        const numVecinos = matriz.calcularVecinos(paso, nota);

        if(matriz.valorEn(paso,nota) && (numVecinos == 2 || numVecinos == 3) ) {
            celdas[paso][nota].marcarViva();
        }
        else if(!matriz.valorEn(paso,nota) && numVecinos == 3) {
            celdas[paso][nota].marcarViva();
        }
        else {
            celdas[paso][nota].matar();
        }
      }
    }
    matriz.actualizar(celdas);
  }

function esNuevaGeneracion() {
    return beat == 0;
}

function reproducirNota(paso, nota) {
    osciladores[paso][nota].amp(gain, attack);
    osciladores[paso][nota].amp(gain * sustain, decay);
    osciladores[paso][nota].amp(0.0, release);
}

function inicializarOsciladores() {
    for (let paso = 0; paso < numNotas; paso++)
    {
      osciladores.push([]);
      for (let nota = 0; nota < numNotas; nota++)
      {
        osciladores[paso].push(new p5.Oscillator());
        osciladores[paso][nota].setType('sine');
        osciladores[paso][nota].freq(convertirDeMidiAFrecuencia(notas[nota]));
        osciladores[paso][nota].amp(0);
        osciladores[paso][nota].start();
        eco.process(osciladores[paso][nota], 0.2, 0.2, 2300);
      }
    }
}

function convertirDeMidiAFrecuencia(numeroDeNotaMidi) {
    return Math.pow(2, (numeroDeNotaMidi - 69) / 12.0) * 440.0;
}

function iteracionEsUnBeat() {
    return (frameCount % numeroDeIteracionesPorBeat) == 0
}



class Matriz {
    cuadradoBrillante;

    constructor(numPasos, numNotas, tamanoPantalla, espacioEntreCeldas, tamanoCelda){
        this.numPasos = numPasos;
        this.numNotas = numNotas;

        this.tamanoPantalla = tamanoPantalla;
        this.espacioEntreCeldas = espacioEntreCeldas;
        this.tamanoCelda = tamanoCelda;
        this.tamanoBrillo = this.tamanoCelda + (this.espacioEntreCeldas * 4);
        this.tamanoCuadradoBrillante = (this.tamanoCelda + this.espacioEntreCeldas) / 1.1;

        this.celdas = crearCeldas(numPasos, numNotas);
    }
    inicializar() {
        for(let paso = 0; paso < this.numPasos; paso++) {
            for(let nota = 0; nota< this.numNotas; nota++) {
                fill(40);
                rect((paso * (this.tamanoPantalla / this.numPasos)) + this.espacioEntreCeldas, (nota * (this.tamanoPantalla / this.numNotas)) + this.espacioEntreCeldas, this.tamanoCelda, this.tamanoCelda);
            }
        }
        this.cuadradoBrillante = createGraphics(this.tamanoBrillo, this.tamanoBrillo);
        this.cuadradoBrillante.background(0, 0);
        this.cuadradoBrillante.fill(255, 255);
        this.cuadradoBrillante.rectMode(CENTER);
        this.cuadradoBrillante.rect(this.tamanoBrillo / 2, this.tamanoBrillo / 2, this.tamanoCuadradoBrillante, this.tamanoCuadradoBrillante);
        this.cuadradoBrillante.filter(BLUR, 4);
        this.cuadradoBrillante.loadPixels();
        this.cuadradoBrillante.updatePixels();
        this.cuadradoBrillante.filter(DILATE);
    }
    pintar(beat) {
        for (let paso = 0; paso < this.numPasos; ++paso) {
            let colorPaso = (paso == beat) ? 55 : 0;
            for (let nota = 0; nota < this.numNotas; ++nota) {
                if (this.estaVivaEnPosicion(paso, nota)){
                    fill(180 + colorPaso);
                }
                else{
                    fill(40);
                }
                rect((paso * (this.tamanoPantalla / this.numPasos)) + this.espacioEntreCeldas, (nota * (this.tamanoPantalla / this.numNotas)) + this.espacioEntreCeldas, this.tamanoCelda, this.tamanoCelda);
                if (this.estaVivaEnPosicion(paso, nota) && (paso == beat)){
                    this.pintarCuadradoBrillante(paso, nota);
                }
            }
        }

    }

    pintarCuadradoBrillante(paso, nota) {
        image(this.cuadradoBrillante, (paso * (this.tamanoPantalla / this.numPasos)) - this.espacioEntreCeldas, (nota * (this.tamanoPantalla / this.numNotas)) - this.espacioEntreCeldas);
    }

    estaVivaEnPosicion(x, y){
        return this.obtenerCelda(x,y).estaViva();
    }
    valorEn(x, y) {
        return this.obtenerCelda(x,y).obtenerValor();
    }
    obtenerCelda(x, y) {
        return this.celdas[x][y];
    }

    voltear(x, y) {
        let celda = this.obtenerCelda(x,y);
        if (celda.estaViva()) {
            celda.matar();
        }
        else {
            celda.marcarViva();
        }
    }

    reset() {
        for(let y=0; y<this.numNotas; y++) {
            for(let x=0; x<this.numPasos; x++) {
                this.obtenerCelda(x,y).matar();
            }
        }
    }

    obtenerCeldas() {
        let celdas = crearCeldas(this.numPasos, this.numNotas);
        for (var i = 0; i < this.numPasos; i++) {
          for (var j = 0; j < this.numNotas; j++) {
            celdas[i][j].actualizar(this.valorEn(i, j));
          }
        }
        return celdas;
    }

    calcularVecinos(paso, nota) {
        const numPasos = this.numPasos;
        const numNotas = this.numNotas;
        return 0 +
           this.valorEn((paso - 1 + numPasos)%numPasos, (nota - 1 + numNotas)%numNotas) +
           this.valorEn((paso - 0 + numPasos)%numPasos, (nota - 1 + numNotas)%numNotas) +
           this.valorEn((paso + 1 + numPasos)%numPasos, (nota - 1 + numNotas)%numNotas) +

           this.valorEn((paso - 1 + numPasos)%numPasos, (nota - 0 + numNotas)%numNotas) +
          //  this.valorEn((paso - 0 + numPasos)%numPasos, (y-0+num_notes)%num_notes) +
           this.valorEn((paso + 1 + numPasos)%numPasos, (nota - 0 + numNotas)%numNotas) +

           this.valorEn((paso - 1 + numPasos)%numPasos, (nota + 1 + numNotas)%numNotas) +
           this.valorEn((paso - 0 + numPasos)%numPasos, (nota + 1 + numNotas)%numNotas) +
           this.valorEn((paso + 1 + numPasos)%numPasos, (nota + 1 + numNotas )%numNotas);
    }

    actualizar(nuevaMatriz){
        this.celdas = nuevaMatriz;
    }
}

function crearCeldas(columnas, filas) {
    let arr = crearArreglo2D(columnas, filas);
    for (let c = 0; c < columnas; c++) {
        for (let f = 0; f < filas; f++) {
            arr[c][f] = new Celda(0);
        }
    }
    return arr;
}

function crearArreglo2D(columnas, filas) {
    let arr = new Array(columnas);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(filas);
    }
    return arr
}
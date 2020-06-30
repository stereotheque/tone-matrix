class Matriz {
    constructor(num_pasos, num_notas){
        this.num_pasos = num_pasos;
        this.num_notas = num_notas;
        this.celdas = crearCeldas(num_pasos, num_notas);
    }
    inicializar() {
        for(let paso = 0; paso < this.num_pasos; paso++) {
            for(let nota = 0; nota< this.num_notas; nota++) {
                fill(40);
                rect((paso * (tamanoPantalla / this.num_pasos)) + espacioEntreCeldas, (nota * (tamanoPantalla / this.num_notas)) + espacioEntreCeldas, tamanoCelda, tamanoCelda);
            }
        }
    }
    pintar(beat) {
        for (let paso = 0; paso < this.num_pasos; ++paso) {
            let colorPaso = (paso == beat) ? 55 : 0;
            for (let nota = 0; nota < this.num_notas; ++nota) {
                if (this.estaVivaEnPosicion(paso, nota)){
                    fill(180 + colorPaso);
                }
                else{
                    fill(40);
                }
                rect((paso * (tamanoPantalla / this.num_pasos)) + espacioEntreCeldas, (nota * (tamanoPantalla / this.num_notas)) + espacioEntreCeldas, tamanoCelda, tamanoCelda);
                if (this.estaVivaEnPosicion(paso, nota) && (paso == beat)){
                    this.pintarCuadradoBrillante(paso, nota);
                }
            }
        }

    }

    pintarCuadradoBrillante(paso, nota) {
        image(cuadradoBrillante, (paso * (tamanoPantalla / this.num_pasos)) - espacioEntreCeldas, (nota * (tamanoPantalla / this.num_notas)) - espacioEntreCeldas);
    }

    estaVivaEnPosicion(x, y){
        return this.obtenerCelda(x,y).estaViva();
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
        for(let y=0; y<this.num_notas; y++) {
            for(let x=0; x<this.num_pasos; x++) {
                this.obtenerCelda(x,y).matar();
            }
        }
    }
}

class Celda {
    constructor(valor) {
        this.valor = valor;
    }
    obtenerValor() {
        return this.valor;
    }
    estaViva() {
        return this.valor == 1 ? true:false;
    }
    marcarViva() {
        this.valor = 1;
    }
    matar() {
        this.valor = 0;
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
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
    actualizar(valor) {
        this.valor = valor;
    }
}
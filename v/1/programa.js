
function setup()
{
  canvas = createCanvas(500, 0);  // tamano x, y
  canvas.position(500, 0);        // posicion x, y


  cuadradoBrillante = createGraphics(tamanoBrillo, tamanoBrillo);
  cuadradoBrillante.background(0, 0);
  cuadradoBrillante.fill(255, 255);
  cuadradoBrillante.rectMode(CENTER);
  cuadradoBrillante.rect(tamanoBrillo / 2, tamanoBrillo / 2, tamanoCuadradoBrillante, tamanoCuadradoBrillante);
  cuadradoBrillante.filter(BLUR, 4);
  cuadradoBrillante.loadPixels();
  cuadradoBrillante.updatePixels();
  cuadradoBrillante.filter(DILATE);

  background(0);

  for (var j = 0; j < num_notas; j++)
  {
    osciladores.push([]);
    for (var i = 0; i < num_notas; i++)
    {
      osciladores[j].push(new p5.Oscillator());
      osciladores[j][i].setType('sine');
      osciladores[j][i].freq(midi2Hz(notas[i]));
      osciladores[j][i].amp(0);
      osciladores[j][i].start();
      delay.process(osciladores[j][i], 0.2, 0.2, 2300);
    }
  }
}

//------------------------------------------------------------------------------

function draw()
{
  background(0);
}
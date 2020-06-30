
function setup()
{
  canvas = createCanvas(500, 0);
  canvas.position(500, 0);


  glow_rect = createGraphics(glow_size, glow_size);
  glow_rect.background(0, 0);
  glow_rect.fill(255, 255);
  glow_rect.rectMode(CENTER);
  glow_rect.rect(glow_size / 2, glow_size / 2, glow_rect_size, glow_rect_size);
  glow_rect.filter(BLUR, 4);
  glow_rect.loadPixels();
  glow_rect.updatePixels();
  glow_rect.filter(DILATE);

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
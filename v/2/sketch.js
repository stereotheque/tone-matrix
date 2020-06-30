
let notas = [96, 93, 91, 89, 86, 84, 81, 79, 77, 74, 72, 69, 67, 65, 62, 60];
var gain = 0.3;
var attack = 0.001;
var decay = 0.002;
var sustain = 0.707;
var release = 0.2;
var osciladores = [];
var delay = new p5.Delay();
var canvas;
//------------------------------------------------------------------------------
var num_notas = notas.length;
const screensize = 1000;


//------------------------------------------------------------------------------
// Grid Vars
var spacer = screensize / (4 * num_notas);
var dotSize = (screensize / num_notas) - (spacer);
//------------------------------------------------------------------------------
// beat vars
var beat = 0;
let framesPerBeat = 8;
//------------------------------------------------------------------------------
var pat = new Pattern(num_notas);
var glow_rect;
var glow_size = dotSize + (spacer * 4);
var glow_rect_size = (dotSize + spacer) / 1.1;
var drawLock = false;
var drawStyle;

function midi2Hz(midiNoteNumber)
{
  return Math.pow(2, (midiNoteNumber - 69) / 12.0) * 440.0;
}

//------------------------------------------------------------------------------
function playNote(step, note)
{
  osciladores[step][note].amp(gain, attack);
  osciladores[step][note].amp(gain * sustain, decay);
  osciladores[step][note].amp(0.0, release);
}

function playSound()
{
  if (beat == 0)
  {
    // do something on every sequence loop
  }

  for (var i = 0; i < num_notas; i++)
  {
    if (pat.getStep(beat, i))
    {
      playNote(beat, i);
    }
  }
}
//------------------------------------------------------------------------------
function setup()
{
  canvas = createCanvas(screensize + spacer, screensize + spacer);
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
  pat.draw();
  if ((frameCount % framesPerBeat) == 0)
  {
    playSound();
    beat++;
    beat %= notas.length;
  }
}
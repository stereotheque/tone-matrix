
//------------------------------------------------------------------------------
var drawLock = false;
function mousePressed()
{
  if (
    mouseX > 0 &&
    mouseX < width &&
    mouseY > 0 &&
    mouseY < height
  )
  {
    if (getAudioContext().state !== 'running'){
      getAudioContext().resume();
    }
    let nota = Math.floor(constrain((mouseY * numPasos) / height, 0, numPasos - 1));
    let paso = Math.floor(constrain((mouseX * numNotas) / width, 0, numNotas - 1));
    if (!drawLock)
    {
      drawLock = true;
    }

    matriz.voltear(paso, nota);
  }
}

function touchStarted()
{
  this.mousePressed();
}
//------------------------------------------------------------------------------
function mouseDragged()
{
  if (
    mouseX > 0 &&
    mouseX < width &&
    mouseY > 0 &&
    mouseY < height
  )
  {
    let nota = Math.floor(constrain((mouseY * numPasos) / height, 0, numPasos - 1));
    let paso = Math.floor(constrain((mouseX * numNotas) / width, 0, numNotas - 1));

    matriz.voltear(paso, nota);
  }
}
//------------------------------------------------------------------------------

function mouseReleased()
{
  drawLock = false;
}

//------------------------------------------------------------------------------
function keyPressed()
{
  switch (key)
  {
    case ' ':
      matriz.reset();
      break;
    default:
      return false;
  }
}
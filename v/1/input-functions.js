
//------------------------------------------------------------------------------
function mousePressed()
{
  if (
    mouseX > 0 &&
    mouseX < width &&
    mouseY > 0 &&
    mouseY < height
  )
  {
    if (getAudioContext().state !== 'running')
    {
      getAudioContext().resume();
    }
    var note = Math.floor(constrain((mouseX * num_notas) / width, 0, num_notas - 1));
    var beat = Math.floor(constrain((mouseY * num_notas) / height, 0, num_notas - 1));

    if (!drawLock)
    {
      drawStyle = !pat.getStep(note, beat);
      drawLock = true;
    }

    pat.setStepNote(note, beat, drawStyle);
  }
}

function touchStarted()
{
  if (getAudioContext().state !== 'running')
  {
    getAudioContext().resume();
  }
  if (
    mouseX > 0 &&
    mouseX < width &&
    mouseY > 0 &&
    mouseY < height
  )
  {
    var note = Math.floor(constrain((mouseX * num_notas) / width, 0, num_notas - 1));
    var beat = Math.floor(constrain((mouseY * num_notas) / height, 0, num_notas - 1));

    if (!drawLock)
    {
      drawStyle = !pat.getStep(note, beat);
      drawLock = true;
    }

    pat.setStepNote(note, beat, drawStyle);
  }
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
    var note = Math.floor(constrain((mouseX * num_notas) / width, 0, num_notas - 1));
    var beat = Math.floor(constrain((mouseY * num_notas) / height, 0, num_notas - 1));

    pat.setStepNote(note, beat, drawStyle);
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
      pat.clear();
      break;
    default:
      return false;
  }
}
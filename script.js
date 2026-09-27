const btn = document.getElementById('sewingBtn');

const playGif = () => {
  btn.style.backgroundImage = "url('images/sewing-machine.gif')";
};

const stopGif = () => {
  btn.style.backgroundImage = "url('images/sewing-machine.png')";
};

// mouse
btn.addEventListener('mousedown', playGif);
btn.addEventListener('mouseup', stopGif);
btn.addEventListener('mouseleave', stopGif);
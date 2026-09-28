const btn = document.getElementById('sewingBtn');

const playGif = () => {
  btn.style.backgroundImage = "url('images/sewing-machine.gif')";
};

const stopGif = () => {
  btn.style.backgroundImage = "url('images/sewing-machine.png')";
};

btn.addEventListener('mousedown', playGif);
btn.addEventListener('mouseup', stopGif);
btn.addEventListener('mouseleave', stopGif);


// Weightlifter

const weightBtn = document.getElementById('weightBtn');
const weightVideo = document.getElementById('weightVideo');

weightVideo.playbackRate = 1.7;

const playWeightAnimation = () => {
  weightVideo.currentTime = 0;
  weightVideo.play();
};

const stopWeightAnimation = () => {
  weightVideo.pause();
  weightVideo.currentTime = 0;
};

weightBtn.addEventListener('mousedown', playWeightAnimation);
weightBtn.addEventListener('mouseup', stopWeightAnimation);
weightBtn.addEventListener('mouseleave', stopWeightAnimation);
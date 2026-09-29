const btn = document.getElementById('sewingBtn');

const playGif = () => {
  btn.style.backgroundImage = "url('images/sewing-machine.gif')";
};

const stopGif = () => {
  btn.style.backgroundImage = "url('images/sewing-machine.png')";
};

const playFastGif = () => {
  btn.style.backgroundImage = "url('images/sewing-machine-faster.gif')";
};

btn.addEventListener('mousedown', playGif);
btn.addEventListener('mouseup', stopGif);
btn.addEventListener('mouseleave', stopGif);


// Weightlifter

const weightBtn = document.getElementById('weightBtn');
const weightVideo = document.getElementById('weightVideo');

const IDLE_SRC = 'images/weightlifter1.mp4';
const DROP_SRC = 'images/WeightDropAnimation.mp4';
const HAPPY_SRC = 'images/HappyAnimation.mp4';
const SPEED = 1.7;

const DROP_TIME = 2.12; // seconds into animation when the weight lands
let hasDropped = false;
let isDropping = false;

const setWeightVideo = (src, loop) => {
  weightVideo.src = src;
  weightVideo.loop = loop;
  weightVideo.playbackRate = SPEED; // loading a new src resets speed to 1x
};

const startHover = () => {
  isDropping = false;
  setWeightVideo(IDLE_SRC, true);
  weightVideo.play();
};

const playWeightAnimation = () => {
  isDropping = true;
  hasDropped = false;
  setWeightVideo(DROP_SRC, false);
  weightVideo.play();
};

const releaseDrop = () => {
  if (!isDropping) return;
  landLamp();
  startHover();
};

const stopWeightAnimation = () => {
  isDropping = false;
  setWeightVideo(IDLE_SRC, false);
  landLamp();
};

const playHappyAnimation = () => {
  isDropping = false;
  setWeightVideo(HAPPY_SRC, false);
  weightVideo.play();
};

const stopHappyAnimation = () => {
  setWeightVideo(IDLE_SRC, false);
};

weightVideo.addEventListener('timeupdate', () => {
  if (isDropping && !hasDropped && weightVideo.currentTime >= DROP_TIME) {
    hasDropped = true;
    jumpLamp();
  }
});

weightBtn.addEventListener('mouseenter', startHover);
weightBtn.addEventListener('mousedown', playWeightAnimation);
weightBtn.addEventListener('mouseup', releaseDrop);
weightBtn.addEventListener('mouseleave', stopWeightAnimation);


// Lamp

const lampBtn = document.getElementById('lampBtn');
const lampImg = document.getElementById('lampImg');

const LEVELS = [100, 50, 25, 0];
const BROKEN_INDEX = LEVELS.length - 1;
const BROKEN_TIME = 60000; // 1 minute "repair time"

let levelIndex = 0;
let isOn = false;

const resetLamp = () => {
  levelIndex = 0;
  lampImg.src = `images/lamp-${LEVELS[levelIndex]}-off.png`;
}

const turnOnLamp = () => {
  if (levelIndex === BROKEN_INDEX) return; // ignore press when broken
  isOn = true;
  lampImg.src = `images/lamp-${LEVELS[levelIndex]}-on.png`;
  playHappyAnimation();
  playFastGif();
};

const turnOffLamp = () => {
  if (!isOn) return; // only react if lamp is on
  isOn = false;
  stopHappyAnimation();
  stopGif();
  levelIndex++;
  lampImg.src = `images/lamp-${LEVELS[levelIndex]}-off.png`;

  if (levelIndex === BROKEN_INDEX) {
      setTimeout(resetLamp, BROKEN_TIME);
  }
};

const jumpLamp = () => {
  if (levelIndex === BROKEN_INDEX) return; // no jump when broken
  lampImg.src = `images/lamp-${LEVELS[levelIndex]}-jump.png`;
};

const landLamp = () => {
  if (levelIndex === BROKEN_INDEX) return;
  lampImg.src = `images/lamp-${LEVELS[levelIndex]}-off.png`;
};

lampBtn.addEventListener('mousedown', turnOnLamp);
lampBtn.addEventListener('mouseup', turnOffLamp);
lampBtn.addEventListener('mouseleave', turnOffLamp);

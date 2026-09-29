const sewingBtn = document.getElementById('sewingBtn');

const playSewing = () => {
  sewingBtn.style.backgroundImage = "url('images/sewing-machine.gif')";
};

const stopSewing = () => {
  sewingBtn.style.backgroundImage = "url('images/sewing-machine.png')";
};

const playFastSewing = () => {
  sewingBtn.style.backgroundImage = "url('images/sewing-machine-faster.gif')";
};

sewingBtn.addEventListener('mouseenter', playSewing);
sewingBtn.addEventListener('mouseleave', stopSewing);

const weightBtn = document.getElementById('weightBtn');
const weightVideo = document.getElementById('weightVideo');
const turbanDrop = document.getElementById('turbanDrop');

const IDLE_SRC = 'images/weightlifter1.mp4';
const DROP_SRC = 'images/WeightDropAnimation.mp4';
const HAPPY_SRC = 'images/HappyAnimation.mp4';

const SPEED = 1.7;
const DROP_TIME = 2.55;

let hasDropped = false;
let isDropping = false;
let isWeightHovered = false;
let isLampHovered = false;

const setWeightVideo = (src, loop) => {
  weightVideo.src = src;
  weightVideo.loop = loop;
  weightVideo.playbackRate = SPEED;
  weightVideo.play();
};

const startWeightHover = () => {
  if (isDropping) return;

  setWeightVideo(IDLE_SRC, true);
};

const stopWeightHover = () => {
  if (isDropping) return;

  weightVideo.pause();
  weightVideo.src = IDLE_SRC;
  weightVideo.loop = false;
  weightVideo.currentTime = 0;
};

const playWeightDrop = () => {
  if (isDropping) return;

  isDropping = true;
  hasDropped = false;
  setWeightVideo(DROP_SRC, false);
};

const playHappyAnimation = () => {
  if (isDropping) return;

  setWeightVideo(HAPPY_SRC, true);
};

const stopHappyAnimation = () => {
  if (isDropping) return;

  if (isWeightHovered) {
    startWeightHover();
    return;
  }

  stopWeightHover();
};

const jumpSewingMachine = () => {
  sewingBtn.classList.remove('sewing-jump');
  void sewingBtn.offsetWidth;
  sewingBtn.classList.add('sewing-jump');
};

weightVideo.addEventListener('timeupdate', () => {
  if (!isDropping) return;
  if (hasDropped) return;
  if (weightVideo.currentTime < DROP_TIME) return;

  hasDropped = true;
  jumpLamp();
  jumpSewingMachine();
});

weightVideo.addEventListener('ended', () => {
  if (!isDropping) return;

  isDropping = false;
  hasDropped = false;

  if (isLampHovered) {
    playHappyAnimation();
    return;
  }

  if (isWeightHovered) {
    startWeightHover();
    return;
  }

  stopWeightHover();
});

weightBtn.addEventListener('mouseenter', () => {
  isWeightHovered = true;
  startWeightHover();
});

weightBtn.addEventListener('mouseleave', () => {
  isWeightHovered = false;
  stopWeightHover();
});

weightBtn.addEventListener('click', playWeightDrop);

const lampBtn = document.getElementById('lampBtn');
const lampImg = document.getElementById('lampImg');
const lampLight = document.getElementById('lampLight');
const threadWrap = document.getElementById('threadWrap');

const LEVELS = [100, 50, 25, 0];
const BROKEN_INDEX = LEVELS.length - 1;
const BROKEN_TIME = 60000;

let levelIndex = 0;
let isOn = false;
let lampLightSuppressed = false;

const resetLamp = () => {
  levelIndex = 0;
  isOn = false;
  lampImg.src = `images/lamp-${LEVELS[levelIndex]}-off.png`;
};

const showLampLight = () => {
  isLampHovered = true;

  if (levelIndex === BROKEN_INDEX) return;
  if (lampLightSuppressed) return;

  lampLight.classList.add('visible');
  playHappyAnimation();
};

const hideLampLight = () => {
  lampLight.classList.remove('visible');
};

const leaveLamp = () => {
  isLampHovered = false;
  lampLightSuppressed = false;
  hideLampLight();
  stopHappyAnimation();
  turnOffLamp();
};

const turnOnLamp = () => {
  if (levelIndex === BROKEN_INDEX) return;

  lampLightSuppressed = true;
  hideLampLight();
  stopHappyAnimation();

  isOn = true;
  lampImg.src = `images/lamp-${LEVELS[levelIndex]}-on.png`;
};

const turnOffLamp = () => {
  if (!isOn) return;

  isOn = false;
  levelIndex++;

  lampImg.src = `images/lamp-${LEVELS[levelIndex]}-off.png`;

  if (levelIndex === BROKEN_INDEX) {
    hideLampLight();
    stopHappyAnimation();
    setTimeout(resetLamp, BROKEN_TIME);
  }
};

const jumpLamp = () => {
  if (levelIndex === BROKEN_INDEX) return;

  lampImg.src = `images/lamp-${LEVELS[levelIndex]}-jump.png`;
  setTimeout(landLamp, 220);
};

const landLamp = () => {
  if (levelIndex === BROKEN_INDEX) return;

  const state = isOn ? 'on' : 'off';
  lampImg.src = `images/lamp-${LEVELS[levelIndex]}-${state}.png`;
};

lampBtn.addEventListener('mouseenter', showLampLight);
lampBtn.addEventListener('mouseleave', leaveLamp);
lampBtn.addEventListener('mousedown', turnOnLamp);
lampBtn.addEventListener('mouseup', turnOffLamp);

const restartThreadAnimation = () => {
  threadWrap.classList.remove('active');
  void threadWrap.offsetWidth;
  threadWrap.classList.add('active');
};

const playTurbanDrop = () => {
  turbanDrop.style.display = 'block';
  turbanDrop.src = '';

  requestAnimationFrame(() => {
    turbanDrop.src = 'images/turban-drop.gif';
  });

  setTimeout(() => {
    turbanDrop.style.display = 'none';
  }, 1100);
};

const sewingClick = () => {
  playFastSewing();
  restartThreadAnimation();

  setTimeout(playTurbanDrop, 650);

  setTimeout(() => {
    if (sewingBtn.matches(':hover')) {
      playSewing();
      return;
    }

    stopSewing();
  }, 1300);
};

sewingBtn.addEventListener('click', sewingClick);
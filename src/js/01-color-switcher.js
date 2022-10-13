const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let timerId = null;
btnStopEl.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

btnStartEl.addEventListener('click', e => {
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  e.currentTarget.disabled = true;
  btnStopEl.disabled = false;
});

btnStopEl.addEventListener('click', e => {
  clearInterval(timerId);
  btnStartEl.disabled = false;
  e.currentTarget.disabled = true;
});

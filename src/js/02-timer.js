import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

import 'flatpickr/dist/flatpickr.min.css';
// import 'notiflix/dist/notiflix-3.2.5.min.css';

const daysVal = document.querySelector('span[data-days]');
const hoursVal = document.querySelector('span[data-hours]');
const minutesVal = document.querySelector('span[data-minutes]');
const secondsVal = document.querySelector('span[data-seconds]');
let time = 0;
let timerId = null;

const btnEl = document.querySelector('button[data-start]');
btnEl.disabled = true;

btnEl.addEventListener('click', () => {
  onButtonClick();
  timerId = setInterval(onButtonClick, 1000);
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    btnEl.disabled = false;
    time = selectedDates[0].getTime();
  },
};

flatpickr('#datetime-picker', options);

function onButtonClick() {
  let leftUntil = time - Date.now();
  if (leftUntil < 1000) {
    clearInterval(timerId);
  }
  btnEl.disabled = true;
  setValue(convertMs(leftUntil));
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function setValue({ days, hours, minutes, seconds }) {
  daysVal.textContent = addLeadingZero(days);
  hoursVal.textContent = addLeadingZero(hours);
  minutesVal.textContent = addLeadingZero(minutes);
  secondsVal.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

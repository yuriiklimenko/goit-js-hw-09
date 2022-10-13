import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name="delay"]');
const inputStep = document.querySelector('input[name="step"]');
const inputAmount = document.querySelector('input[name="amount"]');

form.addEventListener('submit', onButtonSubmit);

function onButtonSubmit(e) {
  e.preventDefault();

  for (let i = 0; i < inputAmount.value; i++) {
    let step = inputStep.value * i;
    let delay = Number.parseInt(inputDelay.value) + step;

    createPromise(i + 1, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);

        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);

        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

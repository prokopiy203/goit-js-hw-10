import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onButtonCreate);

function onButtonCreate(event) {
  event.preventDefault();
  const delay = +form.elements.delay.value;
  const state = form.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else if (state === 'rejected') {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(value =>
      iziToast.success({
        position: 'topRight',
        title: 'Success!',
        message: `✅ Fulfilled promise in ${delay}ms`,
      })
    )
    .catch(error =>
      iziToast.error({
        position: 'topRight',
        title: 'Error!',
        message: `❌ Rejected promise in ${error}ms`,
      })
    )
    .finally(() => form.reset());
}

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dataInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timeDays = document.querySelector('[data-days]');
const timeHours = document.querySelector('[data-hours]');
const timeMinutes = document.querySelector('[data-minutes]');
const timeSeconds = document.querySelector('[data-seconds]');

startBtn.setAttribute('disabled', '');

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      iziToast.error({
        position: 'topRight',
        title: 'Caution',
        message: 'Please choose a date in the future',
      });
      if (!startBtn.hasAttribute('disabled')) {
        startBtn.setAttribute('disabled', '');
      }
    } else startBtn.removeAttribute('disabled');
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
  },
};

flatpickr(dataInput, options);

startBtn.addEventListener('click', () => {
  OnButtonTime();
  dataInput.setAttribute('disabled', '');
  startBtn.setAttribute('disabled', '');
});

function OnButtonTime() {
  const setIntervalId = setInterval(() => {
    const diff = userSelectedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(diff);
    timeDays.textContent = addLeadingZero(days);
    timeHours.textContent = addLeadingZero(hours);
    timeMinutes.textContent = addLeadingZero(minutes);
    timeSeconds.textContent = addLeadingZero(seconds);

    if (diff < 1000) {
      clearInterval(setIntervalId);
      dataInput.removeAttribute('disabled');
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
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

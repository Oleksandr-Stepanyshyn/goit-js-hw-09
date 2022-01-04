import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    start: document.querySelector('button[data-start]'),
    inputField: document.querySelector('input#datetime-picker'),
    timer: document.querySelector('.timer'),
    fields: document.querySelectorAll('.field'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]')
}

refs.timer.style.display = "flex";
const allFields = [...refs.fields];
allFields.map(el => {
  el.style.display = "flex";
  el.style.flexDirection = "column";
  el.style.alignItems = "center";
  el.style.margin = "10px";
});
refs.start.addEventListener('click', onBtnStartClick );
refs.start.setAttribute('disabled', true);

let currentData = new Date();
let enteredTime = 0;
let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      // console.log(selectedDates[0]);
      enteredTime = selectedDates[0];
      if (currentData >= selectedDates[0]){
        Notify.failure("Please choose a date in the future");
        refs.start.setAttribute('disabled', true);
        return;
      }
      refs.start.removeAttribute('disabled');
    },
  };

flatpickr(refs.inputField, options);

function onBtnStartClick(){
  timerId = setInterval(updatesTime, 1000)
}

function updatesTime(){
  currentData = new Date();
  const endTime = enteredTime - currentData;
  // console.log(endTime);
  if(endTime < 0){
    clearInterval(timerId);
    return;
  }
  const counter = convertMs(endTime);
  renderMarkup(counter);
}

function addLeadingZero(value){
  return String(value).padStart(2, '0');
}

function renderMarkup ({days, hours, minutes, seconds}){
  refs.days.textContent = days;
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
}
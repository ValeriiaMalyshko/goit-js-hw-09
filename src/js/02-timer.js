// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const btnStart = document.querySelector('button');
const input = document.querySelector('#datetime-picker');
const daysValue = document.querySelector('span[data-days]');
const hoursValue =  document.querySelector('span[data-hours]');
const minutesValue = document.querySelector('span[data-minutes]');
const secondsValue = document.querySelector('span[data-seconds]');

btnStart.disabled = true; 
let intervalId = null ;
let deltaTime = 0;
let choseDate = 0;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      choseDate = selectedDates[0];

      if (choseDate>new Date()) {
        // clearInterval(intervalId);
        btnStart.disabled = false;      
    } else {
        alert('Please choose a date in the future');
    }
  },
};

flatpickr(input, options);  

btnStart.addEventListener('click',() => {
  intervalId = setInterval(() => {
  let nowDate = Date.now();
  deltaTime = choseDate - nowDate;

if(deltaTime < 1000) {
  clearInterval(intervalId);
}
else {
  updateClockFace(convertMs(deltaTime));
}
    }, 1000);
  });

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = pad(Math.floor(ms / day));
    const hours = pad(Math.floor((ms % day) / hour));
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }

function updateClockFace({ days, hours, minutes, seconds }) {
    daysValue.textContent = `${days}`;
    hoursValue.textContent = `${hours}`;
    minutesValue.textContent = `${minutes}`;
    secondsValue.textContent = `${seconds}`;
}
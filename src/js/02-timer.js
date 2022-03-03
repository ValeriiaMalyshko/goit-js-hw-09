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

let intervalId = null ;
btnStart.disabled = true; 

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);

      if (selectedDates[0]>new Date()) {
        // clearInterval(intervalId);
        btnStart.disabled = false;      
    } else {
        alert('Please choose a date in the future');
    }

btnStart.addEventListener('click',() => {
  intervalId = setInterval(() => {
const deltaTime = selectedDates[0] - new Date();

if(deltaTime < 1000) {
  clearInterval(intervalId);
}
else {
  const time = convertMs(deltaTime);
  updateClockFace(time);
}
    }, 1000);
  });
},
};    

flatpickr(input, options);

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

  function pad(value) {
    return String(value).padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) {
    daysValue.textContent = `${days}`;
    hoursValue.textContent = `${hours}`;
    minutesValue.textContent = `${minutes}`;
    secondsValue.textContent = `${seconds}`;
}
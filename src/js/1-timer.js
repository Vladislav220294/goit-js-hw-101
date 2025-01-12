import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


let userSelectedDate = null; 
const startButtonEl = document.querySelector('button[data-start]');
const InputEl = document.querySelector('#datetime-picker');
const elements = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
startButtonEl.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      
      if (selectedDates[0] <= Date.now()) {
        iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButtonEl.disabled = true; 
      } else {
          userSelectedDate = selectedDates[0];
          startButtonEl.disabled = false;
          
        };
  },
};

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
};
flatpickr(InputEl, options);
startButtonEl.addEventListener('click', () => { 
    if (userSelectedDate<= Date.now()) return;

  startButtonEl.disabled = true;
    InputEl.disabled = true;
    const intervalId = setInterval(() => {
        const timeLeft = userSelectedDate - Date.now();
        
        if (timeLeft <= 0) { 
            clearInterval(intervalId);
            InputEl.disabled = false;
            time(0);

            return
        };
        time(timeLeft)
}, 1000); 
});
function time(ms) {
    const timeComponents = convertMs(ms); 
    elements.days.textContent = pad(timeComponents.days);
        elements.hours.textContent = pad(timeComponents.hours);
        elements.minutes.textContent = pad(timeComponents.minutes);
        elements.seconds.textContent = pad(timeComponents.seconds);
}
function pad(value) {
    return String(value).padStart(2, '0');
}
console.dir(InputEl)

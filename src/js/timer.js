
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



let userSelectedData = null;
let timerId = null;
const input = document.querySelector("#datetime-picker");
const btnStart = document.querySelector("[data-start]");
const daysEl = document.querySelector("[data-days]");
const hoyrsEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

btnStart.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selected = selectedDates[0];
        if (selected <= new Date()) {
            iziToast.error({
                title: "Warning",
                message: "Please choose a date in the future",
                position: "topRight",
            });
            btnStart.disabled = true;
        } else {
            userSelectedData = selected;
            btnStart.disabled = false;
        }
        console.log(selectedDates[0]);

    },
};

flatpickr(input, options);
btnStart.addEventListener("click", () => {
    if (!userSelectedData) return;

    btnStart.disabled = true;
    input.disabled = true;

    timerId = setInterval(() => {
        const delta = userSelectedData - new Date();
        if (delta <= 0) {
            clearInterval(timerId);
            updateTimerUI({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            input.disabled = false;
            return;
        }
        const time = conertMs(delta);

        // console.log(conertMs(delta));
        updateTimerUI(time);
    }, 1000);

});


function updateTimerUI({ days, hours, minutes, seconds }) {
    daysEl.textContent = addLeadingZero(days);
    hoyrsEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

function conertMs(ms) {
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
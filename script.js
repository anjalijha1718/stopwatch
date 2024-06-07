let startTime, updatedTime, difference, tInterval, savedTime;
let running = false;
let lapCounter = 1;

const timeDisplay = document.getElementById('time-display');
const startButton = document.getElementById('start-btn');
const pauseButton = document.getElementById('pause-btn');
const resetButton = document.getElementById('reset-btn');
const lapButton = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps-list');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - (savedTime || 0);
        tInterval = setInterval(updateTime, 1);
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        savedTime = difference;
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    running = false;
    lapCounter = 1;
    timeDisplay.textContent = "00:00:00";
    lapsList.innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = timeDisplay.textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
        lapsList.appendChild(lapItem);
        lapCounter++;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    timeDisplay.textContent = hours + ":" + minutes + ":" + seconds;
}

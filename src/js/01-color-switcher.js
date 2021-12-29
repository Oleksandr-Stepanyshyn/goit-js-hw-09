const refs = {
    btnStart: document.querySelector("button[data-start]"),
    btnStop: document.querySelector("button[data-stop]")
}

refs.btnStop.setAttribute('disabled', true);
let timerId = null;

refs.btnStart.addEventListener('click', onButtonStartClick);
refs.btnStop.addEventListener('click', onButtonStopClick);

function onButtonStartClick() {
    refs.btnStart.setAttribute('disabled', true);
    refs.btnStop.removeAttribute('disabled');
    timerId = setInterval(renderBackColorBody, 1000);
}

function onButtonStopClick() {
    refs.btnStop.setAttribute('disabled', true);
    refs.btnStart.removeAttribute('disabled');
    clearInterval(timerId);
}

function renderBackColorBody() {
    document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

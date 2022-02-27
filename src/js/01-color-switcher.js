const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let timerId = null;
startBtn.disabled = false;
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

startBtn.addEventListener("click", () => {
  timerId = setInterval(() => {
  let color = getRandomHexColor() ;
  document.body.style.backgroundColor = `${color}`;
  }, 1000);
  startBtn.disabled = true;
});


stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
  startBtn.disabled = false;
});

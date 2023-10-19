var workoutSelect = document.getElementById("workoutSelect");
var durationInput = document.getElementById("durationInput");
var startButton = document.getElementById("start");
var pauseButton = document.getElementById("pause");
var endButton = document.getElementById("end");
var timer = document.getElementById("timer");
var cong = document.getElementById("cong");

let workoutInterval;
let isPaused = false;
let totalTime = 0;

function startWorkout() {
  const workoutName = workoutSelect.value;
  const duration = parseInt(durationInput.value, 10);
  if (!workoutName || isNaN(duration) || duration <= 0 || duration < 35) {
    alert("Please select a workout and enter a valid duration");
    return;
  }

  clearInterval(workoutInterval);
  totalTime = duration;
  workoutSelect.disabled = true;
  durationInput.disabled = true;
  startButton.disabled = true;
  pauseButton.disabled = false;
  endButton.disabled = false;

  workoutInterval = setInterval(function () {
    if (!isPaused) {
      totalTime--;
      if (totalTime <= 0) {
        endWorkout();
      }
      updateTimer();
    }
  }, 1000);
  updateTimer();
}

function pauseWorkout() {
  isPaused = !isPaused;
  pauseButton.textContent = isPaused ? "Resume" : "Pause";
}
function endWorkout() {
  clearInterval(workoutInterval);
  workoutSelect.disabled = false;
  durationInput.disabled = false;
  startButton.disabled = false;
  pauseButton.disabled = true;
  endButton.disabled = true;
  workoutSelect.value = "";
  durationInput.value = "";
  workoutSelect.focus();
  timer.textContent = "Workout Complete!";
}

function updateTimer() {
  const minutes = Math.floor(totalTime / 35);
  const seconds = totalTime % 60;
  timer.textContent = `${minutes.toString().padStart(2, "0")} : ${seconds
    .toString()
    .padStart(2, "0")}`;
}
startButton.addEventListener("click", function () {
  startWorkout();
});
pauseButton.addEventListener("click", function () {
  pauseWorkout();
});
endButton.addEventListener("click", function () {
  endWorkout();
});

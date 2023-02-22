import clock from "clock";
import document from "document";
import { min } from "scientific";

// Tick every second
clock.granularity = "seconds";

let hourHand = document.getElementById("hours") as GroupElement;
let minHand = document.getElementById("mins") as GroupElement;
let secHand = document.getElementById("secs") as GroupElement;

let hourText = document.getElementById("d_hours") as TextElement;
let minText = document.getElementById("d_mins") as TextElement;
let secText = document.getElementById("d_secs") as TextElement;

// Returns an angle (0-360) for the current hour in the day, including minutes
function hoursToAngle(hours, minutes) {
  let hourAngle = (360 / 12) * hours;
  let minAngle = (360 / 12 / 60) * minutes;
  return hourAngle + minAngle;
}

// Returns an angle (0-360) for minutes
function minutesToAngle(minutes, seconds) {
  let minAngle = (360 / 60) * minutes;
  // let secAngle = (360 / 60 / 60) * seconds;
  // return minAngle + secAngle;
  return minAngle;
}

// Returns an angle (0-360) for seconds
function secondsToAngle(seconds) {
  return (360 / 60) * seconds;
}

function padLeft(str, digit, padStr) {
  let cnt = 0;
  let pad = "";
  while (cnt < digit) {
    pad += padStr;
    cnt++;
  }
  return (pad + str).slice(digit * -1);
}

// Rotate the hands every tick
function updateClock() {
  let today = new Date();
  let hours = today.getHours() % 12;
  let hours24 = today.getHours();
  let mins = today.getMinutes();
  let secs = today.getSeconds();

  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, mins);
  minHand.groupTransform.rotate.angle = minutesToAngle(mins, secs);
  secHand.groupTransform.rotate.angle = secondsToAngle(secs);

  hourText.text = padLeft(hours24.toString(), 2, "0");
  minText.text = padLeft(mins.toString(), 2, "0");
  secText.text = padLeft(secs.toString(), 2, "0");
}

// Update the clock every tick event
clock.addEventListener("tick", updateClock);

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
let dayText = document.getElementById("day_text") as TextElement;
let weekText = document.getElementById("week_text") as TextElement;
let monthText = document.getElementById("month_text") as TextElement;

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

function getWeek(week) {
  // const weekList = ["日", "月", "火", "水", "木", "金", "土"];
  const weekList = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return weekList[week];
}

function getMonth(month) {
  // const  monthList = [" 1月", " 2月", " 3月", " 4月", " 5月", " 6月", " 7月", " 8月", " 9月", "10月", "11月", "12月"];
  const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return monthList[month];
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
  let month = today.getMonth();
  let day = today.getDate();
  let week = today.getDay();

  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, mins);
  minHand.groupTransform.rotate.angle = minutesToAngle(mins, secs);
  secHand.groupTransform.rotate.angle = secondsToAngle(secs);

  hourText.text = padLeft(hours24.toString(), 2, "0");
  minText.text = padLeft(mins.toString(), 2, "0");
  secText.text = padLeft(secs.toString(), 2, "0");

  monthText.text = getMonth(month);
  dayText.text = padLeft(day.toString(), 2, "0");
  weekText.text = getWeek(week);
}

// Update the clock every tick event
clock.addEventListener("tick", updateClock);

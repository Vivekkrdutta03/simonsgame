var title = $("#level-title")[0];
var green = [$("#green"), new song("green")];
var red = [$("#red"), new song("red")];
var yellow = [$("#yellow"), new song("yellow")];
var blue = [$("#blue"), new song("blue")];
var started = false;
var currentLevel = 2;
var array = [];
var userinteraction = false;
var buttons = document.querySelectorAll(".btn");
function song(string) {
  this.address = "./sounds/" + string + ".mp3";
  var audio = new Audio(this.address);
  this.playit = function () {
    audio.play();
  };
}

$(document.body).on("keypress", function () {
  if (started) return;
  started = true;
  console.log("started");
  beginRecording();
  $("body").css("background-color", "#011F3F");
});

function start() {
  if (started) return;
  started = true;
  console.log("started");
  beginRecording();
}

var currentButton = 0;

$(".btn").on("click", function () {
  if (!userinteraction) return;
  pressed = this.getAttribute("id");
  console.log(pressed);

  if (array[currentButton] == pressed) {
    $("#" + pressed).addClass("pressed");
    playsong(pressed);
    $("#" + pressed)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100)
      .removeClass("pressed");
    currentButton++;
  } else {
    $("body").fadeIn(100).fadeOut(100).fadeIn(100);
    document.body.style.backgroundColor = "red";
    $("h1").text(
      "Score: " + currentLevel + "\nPress Any Key to restart"
    );
    started = false;
    currentButton = 0;
    currentLevel = 2;
    array.length = 0;
    return;
  }
  if (currentButton >= array.length) {
    array = [];
    userinteraction = false;
    currentButton = 0;
    $("body").css("background-color", "green");
    $("h1").text("Great Job!");
    setTimeout(function () {
      started = false;
      start();
      $("body").css("background-color", "#011F3F");
    }, 200);
  }
});

function beginRecording() {
  array.length = 0;
  title.textContent = "Level " + currentLevel;
  currentLevel++;
  generaterandom(0);
  setInterval(console.log(array), 1000);
  return array;
}

function generaterandom(i) {
  if (i >= currentLevel - 1) {
    console.log("end");
    userinteraction = true;
    return;
  }
  i++;
  setTimeout(function () {
    var x = Math.floor(Math.random() * 4);
    var idd = buttons[x].getAttribute("id");
    array.push(idd);
    buttons[x].classList.add("pressed");
    $("#" + idd)
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
    playsong(idd);
    setTimeout(function () {
      buttons[x].classList.remove("pressed");
      generaterandom(i);
    }, 300);
  }, 600);
}

function playsong(string) {
  switch (string) {
    case "red":
      red[1].playit();
      break;
    case "yellow":
      yellow[1].playit();
      break;
    case "blue":
      blue[1].playit();
      break;
    case "green":
      green[1].playit();
  }
}

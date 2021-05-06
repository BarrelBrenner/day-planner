//List of let statements
let workDayScheduler = [];
let currentDate = getCurrentDate();
let saveIcon = $("<i class='far fa-save fa-lg'></i>");
let saveEnd = $("<button>").addClass("col-md-1 saveBtn");

//This function shows the current date & time of last refresh
function getCurrentDate() {
  let currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");
  $("#currentDay").text(currentDate);
}

//Function for determination of time & an if/else statement to signify the current time
for (time = 00; time <= 23; time++) {
  let now = time - 00;
  let yourTask = "";
  let currentHour = 0;
  let midDay = "";

  if (time === 12) {
    currentHour = 12;
    midDay = "pm";
  } else if (time > 12) {
    currentHour = time - 12;
    midDay = "pm";
  } else if (time < 12) {
    currentHour = time;
    midDay = "am";
  }
  currentHour = currentHour.toString();

  //List of how current tasks are categorized & broken down in parts
  yourTask = {
    now: now,
    currentHour: currentHour,
    time: time,
    midDay: midDay,
    yourTask: yourTask,
  };
  workDayScheduler.push(yourTask);
}

//Functions to store & display data into/from Local Storage.
function storeTaskData() {
  localStorage.setItem("currentDate", JSON.stringify(workDayScheduler));
}
function taskDataShow() {
  workDayScheduler.forEach(function (hour) {
    $("#currentDay" + hour.now).val(hour.yourTask);
  });
}

//Function to load data in question
function dataSetLoad() {
  let dataSetLoad = JSON.parse(localStorage.getItem("currentDate"));
  if (dataSetLoad) {
    workDayScheduler = dataSetLoad;
  }
  storeTaskData();
  taskDataShow();
}

//List of how scheduler handles and displays input
workDayScheduler.forEach(function (hour) {
  let textRow = $("<form>");
  textRow.addClass("row");
  $(".container").append(textRow);

  let textField = $("<div>");
  textField.addClass("col-md-2 hour");
  textField.text(hour.currentHour + hour.midDay);

  let haveInput = $("<div>");
  haveInput.addClass("col-md-9 description p-0");

  let haveData = $("<textarea>");
  haveData.attr("now", hour.now);

//If/else statement that color codes current timestamp.
  if (hour.time == moment().format("HH")) {
    haveData.addClass("today");
  } else if (hour.time < moment().format("HH")) {
    haveData.addClass("history");
  } else if (hour.time > moment().format("HH")) {
    haveData.addClass("mystery");
  }
  haveInput.append(haveData);

// This set of let commands create save button at end of row
  let saveIcon = $("<i class='far fa-save fa-lg'></i>");
  let saveEnd = $("<button>").addClass("col-md-1 saveBtn");

//This set of text append elements to row
  saveEnd.append(saveIcon);
  textRow.append(textField, haveInput, saveEnd);
});

//save button functions appropriately
$(".saveBtn").on("click", function (event) {
 event.preventDefault();
  //saving information into array
  let saveIndex = $(this).siblings(".description").children().attr("now");
  workDayScheduler[saveIndex].yourTask = $(this).siblings(".description").children().val();

  storeTaskData();
  taskDataShow();
});

//get current date on page load
getCurrentDate();
//load data for page load
dataSetLoad();

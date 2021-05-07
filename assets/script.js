//List of let statements.
let workDayScheduler = [];
let currentDate = getCurrentDate();

//This function shows the current date & time of last refresh.
function getCurrentDate() {
  let currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");
  $("#currentDay").text(currentDate);
}

//This function determines time, let statements categorize, & an if/else statements to signify current time.
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
  
//List of how current tasks are categorized & broken down in parts.
  yourTask = {
    now: now,
    currentHour: currentHour,
    time: time,
    midDay: midDay,
    yourTask: yourTask,
  };
  workDayScheduler.push(yourTask);
}

//These functions stores & display data into/from Local Storage.
function storeTaskData() {
  localStorage.setItem("currentDate", JSON.stringify(workDayScheduler));
}
function taskDataShow() {
  workDayScheduler.forEach(function (hour) {
    $(`#${hour.now}`).val(hour.yourTask);
  });
}

//This function loads data in question.
function dataSetLoad() {
  let dataSetLoad = JSON.parse(localStorage.getItem("currentDate"));
  if (dataSetLoad) {
    workDayScheduler = dataSetLoad;
  }
  storeTaskData();
  taskDataShow();
}

//List of let statements shows how scheduler handles and displays input.
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
  haveData.attr("id", hour.now);
  haveData.attr("now", hour.now);

//These If/else statements color codes current timestamp.
  if (hour.time == moment().format("HH")) {
    haveData.addClass("today");
  
  } else if (hour.time < moment().format("HH")) {
    haveData.addClass("history");
  
  } else if (hour.time > moment().format("HH")) {
    haveData.addClass("mystery");
  }
  haveInput.append(haveData);
  
//This set of let commands create save button at end of row.
  let saveIcon = $("<i class='far fa-save fa-lg'></i>");
  let saveEnd = $("<button>").addClass("col-md-1 saveBtn");

//This set of text append elements to row.
  saveEnd.append(saveIcon);
  textRow.append(textField, haveInput, saveEnd);
});

//Save button process to confirm functionality.
$(".saveBtn").on("click", function (event) {
  event.preventDefault();

//This let statement saves information in question into array.
  let saveIndex = $(this).siblings(".description").children().attr("now");
  workDayScheduler[saveIndex].yourTask = $(this).siblings(".description").children().val();
  
  storeTaskData();
  taskDataShow();
});

//This command gets current date on page load/refresh.
getCurrentDate();

//This command loads data on page load/refresh.
dataSetLoad();
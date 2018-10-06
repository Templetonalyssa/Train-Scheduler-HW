// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyBZaiFStauQdLX5Y3be0FJFaq_Q8aiihJI",
    authDomain: "test-2fe1d.firebaseapp.com",
    databaseURL: "https://test-2fe1d.firebaseio.com",
    projectId: "test-2fe1d",
    storageBucket: "test-2fe1d.appspot.com",
    messagingSenderId: "921341673841"
  };

  firebase.initializeApp(config);
// var config = {
//     apiKey: "AIzaSyBW8UeCZwlLjI_O334LUz5Uum_re6DG51A",
//     authDomain: "q-timesheet.firebaseapp.com",
//     databaseURL: "https://q-timesheet.firebaseio.com",
//     projectId: "q-timesheet",
//     storageBucket: "q-timesheet.appspot.com",
//     messagingSenderId: "1055234541865"
//   };
  
//   firebase.initializeApp(config);
  
  var database = firebase.database();

  
  var currentTimeShow = moment().format("hh:mm a");
  var currentMilitaryTime = moment().format("HH:mm");
  console.log("CURRENT TIME: " + moment(currentTimeShow).format("hh:mm"));


  // Button for adding Employees
  $("#add-employee-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainFirstTime = $("#first-train-input").val().trim();
    var trainFreq = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      role: trainDest,
      start: trainFirstTime,
      rate: trainFreq
    };
  

    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.role);
    console.log(newTrain.start);
    console.log(newTrain.rate);
  
   // alert("Employee successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().role;
    var trainFirstTime = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().rate;
  
    // Employee Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainFirstTime);
    console.log(trainFreq);
  
    // Prettify the employee start
   // var trainFirstTimePretty = moment.unix(trainFirstTime).format("mm");

   var tFrequency = 3;

    // Time is 3:30 AM
    var firstTime = "03:30";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  
    var displayTime = $("#time").text(currentTimeShow);
    var displayMilitaryTime = $("#military-time").text(currentMilitaryTime);

  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFreq),
      //$("<td>").text(empMonths),
      $("<td>").text(trainFirstTime),
    );
  
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  
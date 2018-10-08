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
  
  var database = firebase.database();

   var audioElement = document.createElement("audio");
         audioElement.setAttribute("src", "assets/javascript/The Beatles - Magical Mystery Tour (Remastered 2009).mp3");

         // Theme Button
       $(".theme-button").on("click", function() {
        audioElement.play(); 
        });
        $(".pause-button").on("click", function() {
           audioElement.pause();
        });

  
  var currentTimeShow = moment().format("hh:mm a");
  var currentMilitaryTime = moment().format("HH:mm");
  console.log("CURRENT TIME: " + moment(currentTimeShow).format("hh:mm"));


  // Button for adding trains
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


    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trainFirstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    var arrival= moment().add(tMinutesTillTrain, "m").format("hh:mm A");

  
    var displayTime = $("#time").text(currentTimeShow);
    var displayMilitaryTime = $("#military-time").text(currentMilitaryTime);

  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFreq),
      $("<td>").text(arrival),
      $("<td>").text(tMinutesTillTrain)
    );
  
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  });
  
  
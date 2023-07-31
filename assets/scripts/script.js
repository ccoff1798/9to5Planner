
// This function makes sure the whole dom loads before the scripts run
$(document).ready(function () {

  //variables I will need globally
  const saveBtn = $('.saveBtn');

  //update hours consistently
  function updateHours() {
    var now = dayjs();
    var currentHour = now.hour();
    var nowFormatted = dayjs().format('HH:mm:ss');

    // Create a new paragraph element to display the time
    var timeParagraph = $("<p>").text(nowFormatted);
    // If the time paragraph doesn't exist, append it. Otherwise, just update the text.
    if ($("#currentTime").length === 0) {
      timeParagraph.attr("id", "currentTime");
      $("#currentDay").after(timeParagraph);
    } else {
      $("#currentTime").text(nowFormatted);
    }

    // Iterate over each time-block div
    $(".time-block").each(function () {
      // Get the block hour
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      // adjusts for 24 hour clock, makes math easier. (Im sure this would cause issues if it was a whole day instead of 9-5)
      var comparisonHour = blockHour;
      if (blockHour < 6) {
        comparisonHour = blockHour + 12;
      }

      // Check if the block is in the past, present, or future
      if (comparisonHour < currentHour) {
        // Time block is in the past
        $(this).removeClass("future");
        $(this).removeClass("present");
        $(this).addClass("past");
      } else if (comparisonHour === currentHour) {
        // Time block is in the present
        $(this).removeClass("past");
        $(this).removeClass("future");
        $(this).addClass("present");
      } else {
        // Time block is in the future
        $(this).removeClass("past");
        $(this).removeClass("present");
        $(this).addClass("future");
      }
    });
  }

  // load any saved events from local storage
  $(".time-block").each(function () {
    // Get the hour
    var hour = $(this).attr('id').split("-")[1];

    // get the saved text from local storage
    var savedText = localStorage.getItem(hour);

    if (savedText !== null) {
      // if there is saved text, set the textarea value
      $(this).children('.description').val(savedText);
    }
  });

  // show current day
  var now = dayjs();
  var formattedDate = now.format('MMMM D, YYYY');
  $("#currentDay").text(formattedDate);

  // update hour blocks every second
  setInterval(updateHours, 1000);


  //handles the save click
  function saveClick() {
    //saving getting the hour to know when it was
    var hour = $(this).parent().attr('id').split("-")[1];
    //getting the text to know what was typed
    var text = $(this).siblings('.description').val();
    // save the text to local storage and the accurate hour marker
    localStorage.setItem(hour, text);
  }

  //save button event listner
  saveBtn.on('click', saveClick);
  //this runs it all
  updateHours();
});



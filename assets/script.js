
// This function makes sure the whole dom loads before the scripts run
$(document).ready(function () {

  //variables I will need globally
  const saveBtn = document.querySelector('.saveBtn');

   //handles the save click
   function saveClick(){
    //saving getting the hour to know when it was
    var hour = $(this).parent().attr('id').split("-")[1];
    //getting the text to know what was typed
    var text = $(this).siblings('.description').val();
      // save the text to local storage and the accurate hour marker
    localStorage.setItem(hour, text);
  }

    //save button event listner
    saveBtn.addEventListener('click', saveClick)

  //update hours consistantly
 //setting variables to get current time
 function updateHours() {
  var now = dayjs();
  var currentHour = now.hour();
  
  // Iterate over each time-block div
  $(".time-block").each(function() {
    // Get the block hour
    var blockHour = parseInt($(this).attr("id").split("-")[1]);

    // make it so it is in army time,
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
})





  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.


console.log("App running");
var linkClicked = ""

hideMultiEmailDiv()

function hideMultiEmailDiv() {
  $("#mEDiv").hide();
};

function showMultiEmailDiv() {
  $("#mEDiv").show();
};

function showSingleEmailDiv() {
  $("#eDiv").show();
}

function hideSingleEmailDiv() {
  $("#eDiv").hide();
};

$("#multiEmailLink").on("click", function (event) {
  event.preventDefault();
  showMultiEmailDiv();
  hideSingleEmailDiv();
  //To determine if one or multiple emails are entered
  linkClicked = $("#multiEmails");
})

$("#singleEmailLink").on("click", function (event) {
  event.preventDefault();
  hideMultiEmailDiv();
  showSingleEmailDiv();
  //To determine if one or multiple emails are entered
  linkClicked = $("#email");
})


$("#submit").on("click", function (event) {
  event.preventDefault();

  if (linkClicked.selector === "#multiEmails") {
    var emailAddresses = $("#multiEmails").val().trim().toLowerCase().split(";")
    var trimmedEmailsArray = [];
    var emailTest = [];

    emailAddresses.forEach(address => {
      var trimmedEmail = address.trim();
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(trimmedEmail)) {
        trimmedEmailsArray.push(trimmedEmail)
        emailTest.push(true)
        return
      } else {
        emailTest.push(false)
        alert("Message not sent please check all the email addresses")
        return
      }
    });

    var allPassed = emailTest.every(test => {
      return test === true;
    })

    if (allPassed) {
      var message = {
        email: trimmedEmailsArray,
        text: $("#emailMessage").val().trim()
      };
      postMessage(message)
    }
  }
  else {
    // Here we grab the form elements
    var message = {
      email: $("#email").val().trim(),
      text: $("#emailMessage").val().trim()
    };
    postMessage(message)
  }
});


  function postMessage(object) {
      $.post("/api/email", object,
        function (data) {
          if (data) {
            alert("Message Sent");
          }
          else {
            alert("Message was not sent");
          }
          $("#email").val("");
          $("#multiEmails").val("")
          $("#emailMessage").val("");
          location.reload()
        });
    }
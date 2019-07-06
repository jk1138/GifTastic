// array of topics -----------> emotions <-----------
var emotionsArray = ["happy", "sad", "angry", "stressed", "fear", "excited", "crying","confused"];

// Don't render page until done
$(document).ready(function() {
  for (var i = 0; i < emotionsArray.length; i++) {
    $("#emotion-buttons").append("<button type='button' onclick='searchGif(\"" + emotionsArray[i] + "\")' class='btn btn-primary' value=' " + emotionsArray[i] + "'> " + emotionsArray[i] + " </button>");
}
});

function clickMe() {
var userInput = $('#additional-input').val();
searchGif(userInput);
}

function clickSearch() {
var userInput = $('#additional-input').val();

if (userInput) {
    $('#emotion-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
}
}

function searchGif(gifName) {
$.ajax({
        url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=JAenPKR6CVqXxCY2GvjrhzIYzY4Eq2m8',
        type: 'GET',
    })
    .done(function(response) {
        displayGif(response);
    })
}

function displayGif(response) {
$('#showResults').empty();
for (var i = 0; i < response.data.length; i++) {
    var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
    var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
        '" data-still=" ' + response.data[i].images.fixed_height_still.url +
        ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movingImage" style= "width:250px; height:250px">';

    image = '<div class="col-md-4">' + image + "</div>";
    $('#showResults').append(image);
}

$('.movingImage').on('click', function() {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).attr("data-animate"));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).attr("data-still"));
        $(this).attr('data-state', 'still');
    }

});
}
// These are my topics, I chose emotions for my theme
var topics = ["confused", "excited", "tired", "hungry", "hangry", "melancholy", "fear", "surprise", "disgust", "envy"];
// Just a simple for loop to make a button for each item in the topics array
for (var i=0; i < topics.length; i++) {
    $("#buttons").append(`<button id=${i}> ${topics[i]}</button>`)
};
// When each button is clicked,
$("button").on("click", function(){
// Get the title of the button and save as a variable
    var emotion = $(this).text();
// Console log to test if its working
    console.log(topics)
    $("#gifs-appear-here").empty();
// URL to search Giphy for the emotion clicked and limit the gifs to 10
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" 
    +
    emotion + "&api_key=iRVA38nA3Y83zvWygPUp3jiY2d73n4OW&limit=10";
// Performing AJAX GET 
    $.ajax({
        url: queryURL,
        method: "GET"
    })
// Get data back from the API
.then(function myfunction(response){
    response.data.forEach(function(element){
// Save the results in a variable (results)
    var results = response.data;
// I put i < 10 to try and bring back only 10 images, and it was working in the beginning, but it stopped working and it appears to be repeating the same 10 images over and over 
    for(var i=0; i < 10; i++){
// Add a div for the gif
    var gifDiv = $("<div>");
// Save the results rating
    var rating = results[i].rating;
// Create a p-tag for the rating
    var r = $("<p>").text("Rating: " + rating);
// Create an image tag
    var emotionImage = $("<img>")
// Give the image tag a source attribute based on the results    
    emotionImage.attr("src", results[i].images.fixed_height_still.url);
// Add image class
    emotionImage.addClass("gif-image");
// Add attribute to make image state still
    emotionImage.attr("state", "still");
// Get the image data for when the image is still
    emotionImage.attr("still-data", results[i].images.fixed_height_still.url);
// Get the image data for when the image is animated
    emotionImage.attr("animated-data", results[i].images.fixed_height.url);
// Append the paragraph and image to the gifDiv
    gifDiv.append(r);
    gifDiv.append(emotionImage)
// Prepend the gifDiv to the #gifs-appear-here div
$("#gifs-appear-here").prepend(gifDiv);
// When the image is clicked,
$(".gif-image").on("click", function(){
// If the state is still,
    if($(this).attr("state")=== "still"){
// Then change state to animated
        $(this).attr("state", "animated");
// Source for the animated data
        $(this).attr("src", $(this).attr("animated-data"));
    }else{
// Else change the state from animated to still
        $(this).attr("state", "still");
// Source for the still data
        $(this).attr("src", $(this).attr("still-data"));
    }
})
}}
);
});
})
// When the user inputs a new emotion,
$("#submit-button").on("click", function(){
// New variable to hold the user input
    var emotionInput = "";
// Get the user input from the form
    emotionInput = $("#emotion-input").val().trim();
// Pushes the new topic into the topics array
    topics.push(emotionInput)
// Make a new button based on the user input
    $("#buttons").append(`<button id=${i}> ${emotionInput}</button>`)
    myfunction();
});

$(document).ready(function(){
    // Initial topics array
    var topics = ["Canada", "Cuba", "China", "Cambodia", "Colombia", "Cyprus"];
    var favorites = [];
    // Function for pulling the Gifs for each button
    function showGiphy(){
        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=FH40z8RM9VJhyEk0ML5R4TFfhpuV7uPV&q="+ topic +"&limit=10"
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            let results = response.data;
            $('#giphy-show').empty();
            for (let i=0; i<results.length; i++){
                // Creating a div for the Giphy
                var giphyDiv = $("<div>");
                giphyDiv.addClass('gClass float-left');
                // Creating a ptag with the rating
                var ptag = $("<div>").text("Rating: " + results[i].rating);

                // Creating an image tag for the Giphy
                var topicImage = $("<img>");

                topicImage.addClass("col-md-12 giphy");

                topicImage.attr("still",results[i].images.fixed_height_still.url);
                
                topicImage.attr("animate", results[i].images.fixed_height.url);
                
                topicImage.attr("src", $(topicImage).attr("still"));

                topicImage.attr("img-state", "still");
                giphyDiv.append(ptag);
                giphyDiv.append(topicImage);

                $('#giphy-show').append(giphyDiv);
            }
        });
    }

    $(document).on("click", ".giphy", function() {
        var state = $(this).attr('img-state');
        console.log("state: ", state);
        if (state === "still"){
            $(this).attr("src", $(this).attr("animate"));
            $(this).attr("img-state", "animate");
        } 
        else if (state === "animate"){
            $(this).attr("src", $(this).attr("still"));
            $(this).attr("img-state", "still");
        }
        else {
            console.log('neither');
        }
    });

    // Function for displaying the buttons
    function loadButtons(){
        // Delete the buttons before adding the new button
        $('#displayButton').empty();
        // Loop through the array
        for (var i=0; i < topics.length; i++){
            // Add the $("<button>")
            var q = $("<button>");
            // Add the topic class to button
            q.addClass('topic btn');
            // Add a data-attribute
            q.attr("data-name", topics[i]);
            // Adds the text to the button
            q.text(topics[i]);
            // Add the button to the displayButton div
            $('#displayButton').append(q);
        }
    }

    // Adding a new button 
    $('#add-button').on("click", function(event){
        event.preventDefault();

        var topic = $('#topic-input').val().trim();
        if(topic !== ""){
        topics.push(topic);
        console.log("Topics are: ",topics)

        loadButtons();
        }
        $("#topic-input").val("");
    });
    
    $(document).on("click", ".topic", showGiphy);
    loadButtons();
});
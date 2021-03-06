var topics = ["Big Bang Theory", "The Grand Tour", "House of Cards", "House MD", "Master of None", "Seinfeld", "Sesame Street", "Silicon Valley", "Top Gear"];

var firstTime = true;

$(document).ready(function(){

	function showInstructions() {
		$("#gifView").html("<p class='instructions'>Press any pre-loaded button at the top to display gifs from that show or type in your own show!<br><br>Then, click a gif to start playing it and click it again to stop playing.</p>")		
	}

	function createButtons() {
		$("#buttonArea").empty();
		for(i=0; i < topics.length; i++) {
			var button = $("<button class='topicButton'>");
			button.attr("data-topic", topics[i]).text(topics[i]);
			$("#buttonArea").append(button);
		}
	};


	$("#addButton").on("click", function(event) {
		event.preventDefault();
		var newTopic = $("#input").val().trim();
		topics.push(newTopic);
		createButtons();
	});

	$(".instructionsButton").on("click", function() {
		showInstructions();
	});

	$(document).on("click", ".topicButton", function() {
		if (firstTime == true) {
			$("#gifView").empty();
		}
		firstTime = false;

		topic =$(this).data("topic");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10";
		$.ajax( { url:queryURL, method: "GET" }).done(function(response) {
			console.log(response);
			var results = response.data;
			$("#gifView").empty();
			for(i=0; i < results.length; i++) {
				var gifDiv = $("<div class='gifDiv'>");
				var ratingDiv = $("<p class='rating'>");
				var rating = results[i].rating;
				rating = rating.toUpperCase();
				$(ratingDiv).text("Rating: " + rating);
				var gifImage = $("<img class='gifImage'>");
				gifImage.attr("data-still", results[i].images.fixed_height_still.url).attr("data-animate", results[i].images.fixed_height.url).attr("data-state", "still");
				gifImage.attr("src", gifImage.attr("data-still"));
				$(gifDiv).append(ratingDiv).append(gifImage);
				$("#gifView").append(gifDiv);
			}
		})
	});

	$(document).on("click", ".gifImage", function() {
		if ($(this).attr("data-state") == "still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		}
	});

	createButtons();
	showInstructions();
})
$(document).on("pagebeforeshow", "#singlePage", function () {
	$("#commentFormDish").attr("value", storeObject.DishID);
	$("#dishInfo").text("");
	$("#dishStar").text("");
	$("#dishComment").text("");
	$.post("includes/readdish.php",
	{
		DishID: storeObject.DishID
	},
	function(data) {
		$.each(JSON.parse(data), function(i, field){	
        	$("#dishInfo").append("<p>Name: "        + field.DishName        + "</p>");
        	$("#dishInfo").append("<p>Type: "        + field.DishType        + "</p>");
        	$("#dishInfo").append("<p>Composition: " + field.DishComposition + "</p>");
        	$("#dishInfo").append("<p>Price: "       + field.Price           + "</p>");
        });
	});
	$.post("includes/readdishstar.php",
	{
		DishID: storeObject.DishID
	},
	function(data) {
		$("#dishStar").append("<p>Star: " + data + "</p>");
	});
	$.post("includes/readdishcomment.php",
	{
		DishID: storeObject.DishID
	},
	function(data) {
		$.each(JSON.parse(data), function(i, field){	
        	//$("#dishComment").append("<p>" + field.Time    + "</p>");
        	//$("#dishComment").append("<p>" + field.Comment + "</p>");
        	$("#dishComment").append(listComment(field.Time, field.Comment));
        });
	});
});

$(document).on('pageinit', "#singlePage", function () {
	// have issue if I put form submission into "pagebeforeshow"
	// because each time I open the menu page, the form submission has one more chance
	// to submit
	// also have issue if I put this into a seperate file (outside "pagebeforeshow")
	// because the following code won't execute (this page cannot load)
	$('#commentForm').submit(function(event) {
		var form = $(this);
		//if(this.beenSubmitted) {
		//	return false;
		//} else {
		//	this.beenSubmitted = true;
		//}
		$.ajax({
      		type: form.attr('method'),
      		url: form.attr('action'),
      		data: form.serialize()
    	}).done(function() {
      		// Optionally alert the user of success here...
      		time = getTime();
      		$("#dishComment").append(listComment(curTime(), $("#dishCommentInput").val()));
      		$("#commentForm").trigger("reset");
      		$('#dialogComment').popup('open', {
      			history: false,
      			transition: "slideup",
      			positionTo: "#commentSubmitButton",
      			dismissible: false
      		});
      		setTimeout(function() {
      			$('#dialogComment').popup('close', {
      				history: false,
      				transition: "slidedown"
      			});
      		}, 800);
    	}).fail(function() {
      		// Optionally alert the user of an error here...
      		alert("Submission Comment Form Fail");
    	});
    	//event.stopPropagation();
		event.preventDefault(); // Prevent the form from submitting via the browser.
	});
});

function listComment(time, comment) {
	var list = "<p>"  + time    + "</p>"
			 + "<h2>" + comment + "</h2>";
	return list;
}
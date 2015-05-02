$(document).on("pagebeforeshow", "#singlePage", function () {
	var id = storeObject.DishID;
	$("#singleDishImg").attr("src", "images/menu/dish" + id + ".jpg");
	$("#singleDishImg").attr("alt", "dish" + id);
	



	$("#dishInfo").text("");
	$("#dishInfo").append("<p>Name: "        + dishInfo[id].name        + "</p>");
    $("#dishInfo").append("<p>Type: "        + dishInfo[id].type        + "</p>");
    $("#dishInfo").append("<p>Composition: " + dishInfo[id].composition + "</p>");
    $("#dishInfo").append("<p>Price: "       + dishInfo[id].price       + "</p>");
	//$("#dishStar").text("");
	$("#showComment").text("");
	/*$.post("includes/readdish.php",
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
	});*/
	/*
	$.post("includes/readdishstar.php",
	{
		DishID: storeObject.DishID
	},
	function(data) {
		var starStatus = JSON.parse(data);
		var id = storeObject.DishID;
		dishInfo[id].star = starStatus.Star;
		dishInfo[id].starnum = starStatus.Num;
		//alert(starStatus.Star + starStatus.Num);
		//$("#dishStar").append("<p>Star: " + data + "</p>");
		$("#dishStar .star-front").attr("style", "width:" + parseInt(12*parseFloat(starStatus.Star)) + "px");
		$("#dishStar #star-num").text(starStatus.Num);
	});
	*/
	$("#dishStar .star-front").css("width", parseInt(12*parseFloat(dishInfo[id].star)) + "px");
	$("#dishStar #star-num").text(parseFloat(dishInfo[id].star).toFixed(2) + ", " + dishInfo[id].starnum);

	$("#dishStar .star-background").children("img").eq(0).on("vmousedown", function () {
		$("#dishStar .star-front").css("width", "12px");
		storeObject.curStar = 1;
	});
	$("#dishStar .star-background").children("img").eq(1).on("vmousedown", function () {
		$("#dishStar .star-front").css("width", "24px");
		storeObject.curStar = 2;
	});
	$("#dishStar .star-background").children("img").eq(2).on("vmousedown", function () {
		$("#dishStar .star-front").css("width", "36px");
		storeObject.curStar = 3;
	});
	$("#dishStar .star-background").children("img").eq(3).on("vmousedown", function () {
		$("#dishStar .star-front").css("width", "48px");
		storeObject.curStar = 4;
	});
	$("#dishStar .star-background").children("img").eq(4).on("vmousedown", function () {
		$("#dishStar .star-front").css("width", "60px");
		storeObject.curStar = 5;
	});
	$("#dishStar .star-background").children("img").on("vmouseup", function () {
		$("#dishStar .star-front").css("width", parseInt(12*parseFloat(dishInfo[id].star)) + "px");
		$("#starSelect p span").text(storeObject.curStar);
		$('#starSelect').popup('open', {
			transition: "slideup",
			positionTo: "#dishStar"
		});
	});

	$.post("includes/readdishcomment.php",
	{
		DishID: storeObject.DishID
	},
	function(data) {
		if (data != "no comment") {
			$.each(JSON.parse(data), function(i, field){
        		//$("#dishComment").append("<p>" + field.Time    + "</p>");
        		//$("#dishComment").append("<p>" + field.Comment + "</p>");
        		$("#showComment").append(listComment(field.Time, field.Comment));
        	});
		}
	});
});

$(document).on('pageinit', "#singlePage", function () {
	// have issue if I put form submission into "pagebeforeshow"
	// because each time I open the menu page, the form submission has one more chance
	// to submit
	// also have issue if I put this into a seperate file (outside "pagebeforeshow")
	// because the following code won't execute (this page cannot load)
	$("#dishCommentInput").removeClass("ui-corner-all");
	$("#dishCommentInput").textinput({
		autogrow: false
	});
	$("#dishCommentInput").autogrow();
	$('#starForm').submit(function(event) {
		var form = $(this);
      	var id = storeObject.DishID;
      	var star = dishInfo[id].star;
      	var starnum = dishInfo[id].starnum;
      	var curStar = storeObject.curStar;
      		
      	star = (star*starnum + curStar)/(+starnum+1);

		$("#starForm").children("input").eq(0).attr("value", id);
		$("#starForm").children("input").eq(1).attr("value", star);
		$("#starForm").children("input").eq(2).attr("value", starnum+1);
		$.ajax({
      		type: form.attr('method'),
      		url:  form.attr('action'),
      		data: form.serialize()
    	}).done(function() {
      		// Optionally alert the user of success here...
      		dishInfo[id].star = star;
      		dishInfo[id].starnum++;

      		$("#dishBlock"+id+" .star-front").attr("style", "width:" + parseInt(12*parseFloat(dishInfo[id].star)) + "px");
      		$("#dishBlock"+id+" .star-num").text(dishInfo[id].starnum);

      		$("#dishStar .star-front").css("width", parseInt(12*parseFloat(dishInfo[id].star)) + "px");
      		$("#dishStar #star-num").text(dishInfo[id].star.toFixed(2) + ", " + dishInfo[id].starnum);
      		$('#starSelect').popup('close', {
      			history: false,
      			transition: "slidedown"
      		});

      		//all the input content in this form would be clear
      		$("#starForm").trigger("reset");

    	}).fail(function() {
      		// Optionally alert the user of an error here...
      		alert("Submit Comment Form Fail");
    	});
    	//event.stopPropagation();
		event.preventDefault(); // Prevent the form from submitting via the browser.
	});
	$('#commentForm').submit(function(event) {
		var form = $(this);
		$("#commentForm").children("input").eq(0).attr("value", storeObject.DishID);
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
      		$("#showComment").append(listComment(curTime(), $("#dishCommentInput").val()));
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
      		//all the input content in this form would be clear
      		$("#commentForm").trigger("reset");
    	}).fail(function() {
      		// Optionally alert the user of an error here...
      		alert("Submit Comment Form Fail");
    	});
    	//event.stopPropagation();
		event.preventDefault(); // Prevent the form from submitting via the browser.
	});
});

function listComment(time, comment) {
	var list = "<li>"
			+    "<a class='ui-btn'>"
			+      "<p>"  + time    + "</p>"
			+      "<h2>" + comment + "</h2>"
			+    "</a>"
			+  "</li>";
	return list;
}
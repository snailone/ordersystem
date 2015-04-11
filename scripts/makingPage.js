$(document).on("pagebeforeshow", "#makingPage", function() {
	var state = 0;
	getMakingList();
	longpolling(state);
});

function getMakingList() {
	var id;
	var dishid;
	$.post("includes/readallordered.php", { orderNum: getCookie("orderNum") }, function(data) {
	//$.getJSON("includes/readallordered.php", function(data){
		$("#showMaking").text("");
		$.each(JSON.parse(data), function(i, field){
			id = field.OrderNum + field.DishID;
			dishid = (+field.DishID-field.DishID%100)/100;
			$("#showMaking").append(listMaking(id, field.DishName, field.DishComposition));
			if (field.OrderNum == getCookie("orderNum")) {
				$("#making" + id).addClass("ui-btn-active");
			}
			$("#making" + id).click(function() {
				storeObject.DishID = dishid;
			});
			$("#makingButton" + id).text(field.TableNum);
        });
	});
}

function longpolling(state) {
	$.ajax({
		url: "includes/monitorchange.php",
		type: "POST",
		data: { laststate: state },
		success: function(data) {
			if (state != data) {
				getMakingList();
			}
			state = data;
			setTimeout( function(){
				longpolling(state);
			}, 5000);
		},
		error: function() {
			alert("fail");
		}
	});
}

function listMaking(id, name, composition) {
	var list = "<li class='ui-li-has-alt' id='makingBlock" + id + "'>";
	list += "<a class='ui-btn' id='making" + id + "' href='#singlePage'>";
	list += "<h2>"+ name + "</h2>";
	list += "<p>" + composition + "</p>";
	list += "</a>";
    list += "<a href='#' class='ui-btn' id='makingButton" + id + "'></a>";
    list += "</li>";
	return list;
}
$(document).on("pagebeforeshow", "#orderPage", function() {
	//setCookie("tableNum", "", -1);
	//setCookie("ordered", "", -1);
	//setCookie("orderNum", "", -1);
	var totalPrice = 0;
	$("#showSelected").text("");
	$("#showCancel").text("");
	$("#showOrdered").text("");
	if(getCookie("ordered") == "yes") {
		$("#orderForm").hide();
		$("#orderSuccess").show();
		$("#orderedList").show();
		$.post("includes/readordered.php",
		{
			tableNum: getCookie("tableNum"),
			orderNum: getCookie("orderNum")
		},
		function(data) {
			var dishid;
			$.each(JSON.parse(data), function(i, field){
				$("#showOrdered").append(listOrdered(field.DishID, field.DishName, field.DishComposition, field.Price));
				$("#orderedNum" + field.DishID).html("&times; " + field.DishNum);
				$("#ordered" + field.DishID).click(function() {
					storeObject.DishID = field.DishID;
				});
				totalPrice = + totalPrice + field.Price * parseInt(field.DishNum);
			});
			totalPrice = totalPrice.toFixed(2);
			$("#totalPrice").text("Total Price: " + totalPrice);
		});
	} else {
		$("#orderForm").show();
		$("#orderSuccess").hide();
		$("#orderedList").hide();
	}

	$.getJSON("includes/readselected.php", function(data){
		$.each(data, function(i, field){
			totalPrice = + totalPrice + field.Price * parseInt(field.DishNum);
			if (field.DishNum == 0) {
				$("#showCancel").append(listSelected(field.DishID, field.DishName, field.DishComposition, field.Price));
			} else {
				$("#showSelected").append(listSelected(field.DishID, field.DishName, field.DishComposition, field.Price));
			}
			$("#selectedNum" + field.DishID).html("&times; " + field.DishNum);
			$("#selected" + field.DishID).click(function() {
				storeObject.DishID = field.DishID;
			});
			$("#selectedPlus" + field.DishID).click(function() {
				plusMinusSelected(field.DishID, "plus", "no", "no");
				totalPrice = + totalPrice + parseFloat(field.Price);
				totalPrice = totalPrice.toFixed(2);
				$("#totalPrice").text("Total Price: " + totalPrice);
			});
			$("#selectedMinus" + field.DishID).click(function() {
				plusMinusSelected(field.DishID, "minus", "no", "no");
				totalPrice = + totalPrice - field.Price;
				totalPrice = totalPrice.toFixed(2);
				$("#totalPrice").text("Total Price: " + totalPrice);
			});
		});
		totalPrice = totalPrice.toFixed(2);
		$("#totalPrice").text("Total Price: " + totalPrice);
	});
});

$(document).on("pageinit", "#orderPage", function() {
	// have issue if I put code into "pagebeforeshow"
	// also have issue if I put this into a seperate file
	$('#orderForm').submit(function(event) {
		var form = $(this);
		$.ajax({
			type: form.attr('method'),
			url: form.attr('action'),
			data: form.serialize()
		}).done(function(data) {
			// Optionally alert the user of success here...
			var orderNum = data;
			$('#showSelected').text("");
			$('#dialogOrder').popup('open', {
				transition: "slideup",
				positionTo: "#orderButton"
			});
			setTimeout(function() {
				$('#dialogOrder').popup('close', {
					transition: "slidedown"
				});
			}, 800);
			$("#orderForm").hide();
			$("#orderSuccess").show();
			//$.mobile.changePage("#indexPage");
			setCookie("tableNum", $("#tableNum").val(), 5);
			setCookie("ordered", "yes", 5);
			setCookie("orderNum", orderNum, 5);
			$("#showOrdered").text("");
			$("#orderedList").show();
			$.post("includes/readordered.php",
			{
				tableNum: getCookie("tableNum"),
				orderNum: getCookie("orderNum")
			}, 
			function(data) {
				$.each(JSON.parse(data), function(i, field){
					$("#showOrdered").append(listOrdered(field.DishID, field.DishName, field.DishComposition, field.Price));
					$("#orderedNum" + field.DishID).html("&times; " + field.DishNum);
					$("#ordered" + field.DishID).click(function() {
						storeObject.DishID = field.DishID;
					});
				});
			});
		}).fail(function() {
			// Optionally alert the user of an error here...
			alert("fail");
		});
		event.preventDefault(); // Prevent the form from submitting via the browser.
	});
});

function listSelected(id, name, composition, price) {
	var list = "<li class='ui-li-has-alt' id='selectedBlock" + id + "'>"
		+   "<div class='ui-grid-a my-breakpoint'>"
		+     "<div class='ui-block-a'>"
		+       "<a id='selected" + id + "' href='#singlePage' class='ui-btn ui-mini' style='text-align:left; margin:0 0 0 0;' >"
		+         "<h2>"+ name + "</h2>"
		+         "<p>Price: " + price + " <span style='color:red' id='selectedNum" + id + "'></span></p>"
		+       "</a>"
		+     "</div>"
		+     "<div class='ui-block-b' >"
		+       "<div style='float:right;'>"
		+         "<a id='selectedMinus" + id + "' href='#' class='ui-btn ui-mini ui-btn-inline ui-btn-icon-notext ui-icon-minus ui-corner-all'>Minus</a>"
		+         "<a id='selectedPlus" + id + "' href='#' class='ui-btn ui-mini ui-btn-inline ui-btn-icon-notext ui-icon-plus ui-corner-all'>Plus</a>"
		+       "</div>"
		+     "</div>"
		+   "</div>"
		+ "</li>";
	return list;
}

function listOrdered(id, name, composition, price) {
	var list = "<li id='orderedBlock" + id + "'>"
		+   "<a id='ordered" + id + "' href='#singlePage' class='ui-btn'>"
		+     "<h2>"+ name + "</h2>"
		+     "<p>Price: &pound; " + price + " <span style='color:red' id='orderedNum" + id + "'></span></p>"
		+   "</a>"
		+ "</li>";
	return list;
}

function plusMinusSelected(id, act, remove, del) {
	$.post("includes/plusminusdish.php",
	{
		DishID: id,
		action: act,
		remove: remove,
		del: del
	},
	function(data) {
		var element;
		$("#selectedNum" + id).html("&times; " + data);
		if (data == 0 && act =="minus") {
			element = $("#selectedBlock" + id).detach();
			$("#showCancel").append(element);
			$("#selectedMinus" + id).hide();
			$("#selectedNum" + id).hide();
		} else if (data == 1 && act == "plus") {
			element = $("#selectedBlock" + id).detach();
			$("#showSelected").append(element);
			$("#selectedMinus" + id).show();
			$("#selectedNum" + id).show();
		}
	});
}
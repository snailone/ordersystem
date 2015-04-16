$(document).on("pagebeforeshow", "#menuPage", function() {
	/*$.each(dishType, function(type, dishes) {
    	$("#showType").append("<li><a class='ui-btn' id='dishType" + type + "'>" + type + "</a></li>");
        $("#dishType" + type).click(function() {
        	$("#showMenu").text("");
        	$.each(dishes, function(i, num) {
        		$("#showMenu").append(dishInfo[num].element());
        		if (i%2 == 0) {
        			$("#dishBlock" + dishInfo[num].id).addClass("ui-block-a");
        			//addMenuDish(allDishID[key1], allDishName[key1], allPrice[key1], "left");
        		} else {
        			$("#dishBlock" + dishInfo[num].id).addClass("ui-block-b");
        			//addMenuDish(allDishID[key1], allDishName[key1], allPrice[key1], "right");
        		}
        		$("#dish" + dishInfo[num].id).click(function() {
					storeObject.DishID = dishInfo[num].id;
				});
        	});
        	/*
        	var count = 0;
        	$.each(dishInfo, function(i, eachDish) {
        		if (eachDish.type == value) {
        			$("#showMenu").append(eachDish.element());
        			if (count%2 == 0) {
        				$("#dishBlock" + eachDish.id).addClass("ui-block-a");
        				//addMenuDish(allDishID[key1], allDishName[key1], allPrice[key1], "left");
        			} else {
        				$("#dishBlock" + eachDish.id).addClass("ui-block-b");
        				//addMenuDish(allDishID[key1], allDishName[key1], allPrice[key1], "right");
        			}
        			$("#dish" + eachDish.id).click(function() {
						storeObject.DishID = id;
					});
        			count++;
        		}
        	});
        });
    });*/
});

function addMenuDish(id, name, price, position) {
	$('#showMenu').append(listMenu(id, name, price, position));
	dishState(id);

	$("#dishPlus" + id).click(function() {
		plusMinusDish(id, "plus", "yes", "no");
	});
	$("#dishMinus" + id).click(function() {
		plusMinusDish(id, "minus", "yes", "no");
	});
}

function dishState(id) {
	$("#dish" + id).removeClass("ui-btn-active");
	$("#dishNum" + id).hide();
	$("#dishMinus" + id).hide();
	$.getJSON("includes/readselected.php", function(data) {
		$.each(data, function(i, field){
			if (field.DishID == id) {
				$("#dishNum" + id).show();
				$("#dishMinus" + id).show();
				$("#dishNum" + id).html("&times; " + field.DishNum);
				$("#dish" + id).addClass("ui-btn-active");
			}
		});
	});
}

function plusMinusDish(id, act, remove, del) {
	$.post("includes/plusminusdish.php",
	{
		DishID: id,
		action: act,
		remove: remove,
		del:    del
	},
	function(data) {
		$("#dishNum" + id).html("&times; " + data);
		if (data == 0) {
			$("#dish" + id).removeClass("ui-btn-active");
			$("#dishNum" + id).hide();
			$("#dishMinus" + id).hide();
		} else {
			$("#dish" + id).addClass("ui-btn-active");
			$("#dishNum" + id).show();
			$("#dishMinus" + id).show();
		}
	});
}
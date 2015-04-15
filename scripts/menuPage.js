$(document).on("pageinit", "#menuPage", function() {
	$.getJSON("includes/readmenu.php", function(data){
		var dishType = [];
		var i;
		$.each(data, function(i, field){
			allDishType[i] = field.DishType;
			allPrice[i] = field.Price;
			allDishName[i] = field.DishName;
			allDishID[i] = field.DishID;
			allDishComposition[i] = field.DishComposition;
        });
        // here the logic is not right
        i = 0;
        prevalue = null;
        $.each(allDishType, function(key, value) {
        	if (key == 0 || prevalue != value) {
        		dishType[i] = value;
        		i = i + 1;
        	}
        	prevalue = value;
        });
        $.each(dishType, function(key, value) {
        	$("#showType").append("<li><a class='ui-btn' id='dishType" + key + "'>" + value + "</a></li>");
        	$("#dishType" + key).click(function() {
        		$("#showMenu").text("");
        		var i = 0;
        		$.each(allDishType, function(key1, value1) {
        			if (value1 == value) {
        				if (i%2 == 0) {
        					addMenuDish(allDishID[key1], allDishName[key1], allPrice[key1], "left");
        				} else {
        					addMenuDish(allDishID[key1], allDishName[key1], allPrice[key1], "right");
        				}
        				i = i + 1;
        			}
        		});
        	});
        });
	});
});

function addMenuDish(id, name, price, position) {
	$('#showMenu').append(listMenu(id, name, price, position));
	dishState(id);
	$("#dish" + id).click(function() {
		storeObject.DishID = id;
	});
	$("#dishPlus" + id).click(function() {
		plusMinusDish(id, "plus", "yes", "no");
	});
	$("#dishMinus" + id).click(function() {
		plusMinusDish(id, "minus", "yes", "no");
	});
}

function listMenu(id, name, price, position) {
	var list;
	if (position == "left") {
		list = "<div class='ui-block-a' id='dishBlock" + id + "'>";
	} else {
		list = "<div class='ui-block-b' id='dishBlock" + id + "'>";
	}
	list +=    "<a id='dish" + id + "' href='#singlePage' class='ui-btn ui-mini' style='text-align:left; margin:0 0 0 0;' >"
			 +       "<img src='images/menu/dish"+id+".jpg' alt='dish' style='max-width:100%'>"
			 +       "<h2>"+ name + "</h2>"
			 +       "<p>Price: &pound;" + price + " <span style='color:red' id='dishNum" + id + "'></span></p>"
			 +     "</a>"
			 +     "<div style='text-align:right'>"
			 +       "<a id='dishMinus" + id + "' href='#' class='ui-btn ui-mini ui-btn-inline ui-btn-icon-notext ui-icon-minus ui-corner-all'>Minus</a>"
			 +       "<a id='dishPlus" + id + "' href='#' class='ui-btn ui-mini ui-btn-inline ui-btn-icon-notext ui-icon-plus ui-corner-all'>Plus</a>"
			 +     "</div>"
			 +   "</div>";
	return list;
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
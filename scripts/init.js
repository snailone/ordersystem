$(document).on("pagebeforecreate", "#indexPage", function() {
	$.getJSON("includes/readmenu.php", function(data){

		$.each(data, function(i, field){
			dishInfo[i] = new dishInfoCollect(field.DishID, field.DishName, field.DishType, field.Price, field.DishComposition);
			if(typeof dishType[dishInfo[i].type] == "undefined") {
				dishType[dishInfo[i].type] = [i];
			} else {
				dishType[dishInfo[i].type].push(i);
			}
			$("#showSelected").append(dishInfo[i].getSelected());
			$("#selectedBlock" + dishInfo[i].id).hide();
			$("#selected" + dishInfo[i].id).click(function() {
				storeObject.DishID = dishInfo[i].id;
			});
			storeObject.totalPrice = + storeObject.totalPrice + dishInfo[i].price * dishInfo[i].num;

			$("#selectedPlus" + dishInfo[i].id).click(function() {
				if (dishInfo[i].plusNum() == 1) {
					$("#dish" + dishInfo[i].id).addClass("ui-btn-active");

					$("#dishMinus" + dishInfo[i].id).show();
					$("#dishNum"   + dishInfo[i].id).show();

					$("#selectedBlock" + dishInfo[i].id).show();
					$("#selectedMinus" + dishInfo[i].id).show();
					$("#selectedNum"   + dishInfo[i].id).show();
				}
				$("#dishNum" + dishInfo[i].id).html("&times; " + dishInfo[num].num);
				$("#selectedNum" + dishInfo[i].id).html("&times; " + dishInfo[num].num);

				storeObject.totalPrice = + storeObject.totalPrice + parseFloat(dishInfo[i].price);
				$("#totalPrice").text("Total Price: " + storeObject.totalPrice.toFixed(2));
			});
			$("#selectedMinus" + dishInfo[i].id).click(function() {
				if (dishInfo[i].minusNum() == 0) {
					$("#dish" + dishInfo[i].id).removeClass("ui-btn-active");

					$("#dishMinus" + dishInfo[i].id).hide();
					$("#dishNum"   + dishInfo[i].id).hide();

					$("#selectedBlock" + dishInfo[i].id).hide();
					$("#selectedMinus" + dishInfo[i].id).hide();
					$("#selectedNum"   + dishInfo[i].id).hide();
				}
				$("#dishNum" + dishInfo[i].id).html("&times; " + dishInfo[i].num);
				$("#selectedNum" + dishInfo[i].id).html("&times; " + dishInfo[i].num);

				storeObject.totalPrice = + storeObject.totalPrice - parseFloat(dishInfo[i].price);
				$("#totalPrice").text("Total Price: " + storeObject.totalPrice.toFixed(2));
			});
        });
		$("#totalPrice").text("Total Price: " + storeObject.totalPrice.toFixed(2));

		$.each(dishType, function(type, dishes) {
    		$("#showType").append("<li><a class='ui-btn' id='dishType" + type + "'>" + type + "</a></li>");
        	$("#dishType" + type).click(function() {
        		$("#showMenu").text("");
        		$.each(dishes, function(i, num) {
        			$("#showMenu").append(dishInfo[num].getMenu());
        			if (i%2 == 0) {
        				dishInfo[num].position("left");
        			} else {
        				dishInfo[num].position("right");
        			}
        			$("#dish" + dishInfo[num].id).click(function() {
						storeObject.DishID = dishInfo[num].id;
					});
					
					if (dishInfo[num].num == 0) {
						$("#dishMinus" + dishInfo[num].id).hide();
						$("#dishBlock" + dishInfo[num].id).removeClass("ui-btn-active");
						$("#dishNum"   + dishInfo[num].id).hide();
					} else {
						$("#dishMinus" + dishInfo[num].id).show();
						$("#dishBlock" + dishInfo[num].id).addClass("ui-btn-active");
						$("#dishNum"   + dishInfo[num].id).show();
						$("#dishNum"   + dishInfo[num].id).html("&times; " + field.DishNum);
					}

					$("#dishPlus" + dishInfo[num].id).click(function() {
						if (dishInfo[num].plusNum() == 1) {
							$("#dish" + dishInfo[num].id).addClass("ui-btn-active");

							$("#dishMinus" + dishInfo[num].id).show();
							$("#dishNum"   + dishInfo[num].id).show();

							$("#selectedBlock" + dishInfo[num].id).show();
							$("#selectedMinus" + dishInfo[num].id).show();
							$("#selectedNum"   + dishInfo[num].id).show();
						}
						$("#dishNum" + dishInfo[num].id).html("&times; " + dishInfo[num].num);
						$("#selectedNum" + dishInfo[num].id).html("&times; " + dishInfo[num].num);

						storeObject.totalPrice = + storeObject.totalPrice + parseFloat(dishInfo[num].price);
						$("#totalPrice").text("Total Price: " + storeObject.totalPrice.toFixed(2));
					});
					$("#dishMinus" + dishInfo[num].id).click(function() {
						if (dishInfo[num].minusNum() == 0) {
							$("#dish" + dishInfo[num].id).removeClass("ui-btn-active");

							$("#dishMinus" + dishInfo[num].id).hide();
							$("#dishNum"   + dishInfo[num].id).hide();

							$("#selectedBlock" + dishInfo[num].id).hide();
							$("#selectedMinus" + dishInfo[num].id).hide();
							$("#selectedNum"   + dishInfo[num].id).hide();
						}
						$("#dishNum" + dishInfo[num].id).html("&times; " + dishInfo[num].num);
						$("#selectedNum" + dishInfo[num].id).html("&times; " + dishInfo[num].num);

						storeObject.totalPrice = + storeObject.totalPrice - parseFloat(dishInfo[num].price);
						$("#totalPrice").text("Total Price: " + storeObject.totalPrice.toFixed(2));
					});
        		});
        	});
    	});
	});
});
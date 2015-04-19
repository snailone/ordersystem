$(document).on("pagebeforecreate", "#indexPage", function() {
	$.getJSON("includes/readmenu.php", function(data){

		$.each(data, function(i, field){
			var id = field.DishID;
			dishInfo[id] = new dishInfoCollect(field.DishID, field.DishName, field.DishType, field.Price, field.DishComposition);
			if(typeof dishType[dishInfo[id].type] == "undefined") {
				dishType[dishInfo[id].type] = [id];
			} else {
				dishType[dishInfo[id].type].push(id);
			}
			$("#showMenu").append(dishInfo[id].getElement("menu"));
			$("#dishBlock" + id).hide();
			$("#dishMinus" + id).hide();
			$("#dishNum"   + id).hide();
			$("#dish" + id).removeClass("ui-btn-active");

			$("#dish" + id).click(function() {
				storeObject.DishID = id;
			});
			$("#dishPlus" + id).click(function() {
				if (dishInfo[id].plusNum() == 1) {
					$("#dish" + id).addClass("ui-btn-active");

					$("#dishMinus" + id).show();
					$("#dishNum"   + id).show();

					$("#selectedBlock" + id).show();
					$("#selectedMinus" + id).show();
					$("#selectedNum"   + id).show();
					
					$("#cancelBlock" + id).hide();
				}
				selectedDishes[id] = dishInfo[id].num;

				$("#dishNum" + id).html("&times; " + dishInfo[id].num);
				$("#selectedNum" + id).html("&times; " + dishInfo[id].num);

				storeObject.totalPrice = + storeObject.totalPrice + parseFloat(dishInfo[id].price);
				$("#totalPrice").text("Total Price: " + storeObject.totalPrice.toFixed(2));
			});
			$("#dishMinus" + id).click(function() {
				if (dishInfo[id].minusNum() == 0) {
					$("#dish" + id).removeClass("ui-btn-active");

					$("#dishMinus" + id).hide();
					$("#dishNum"   + id).hide();

					$("#selectedBlock" + id).hide();
					$("#selectedMinus" + id).hide();
					$("#selectedNum"   + id).hide();

					//$("#cancelBlock" + id).hide();
					delete selectedDishes[id];
				} else {
					selectedDishes[id] = dishInfo[id].num;
				}

				$("#dishNum" + id).html("&times; " + dishInfo[id].num);
				$("#selectedNum" + id).html("&times; " + dishInfo[id].num);

				storeObject.totalPrice = + storeObject.totalPrice - parseFloat(dishInfo[id].price);
				$("#totalPrice").text("Total Price: " + storeObject.totalPrice.toFixed(2));
			});

			$("#showSelected").append(dishInfo[id].getElement("select"));
			$("#selectedBlock" + id).hide();
			
			$("#selected" + id).click(function() {
				storeObject.DishID = id;
			});
			$("#selectedPlus" + id).click(function() {
				if (dishInfo[id].plusNum() == 1) {
					$("#dish" + id).addClass("ui-btn-active");

					$("#dishMinus" + id).show();
					$("#dishNum"   + id).show();

					$("#selectedBlock" + id).show();
					$("#selectedMinus" + id).show();
					$("#selectedNum"   + id).show();

					$("#cancelBlock" + id).hide();
				}
				selectedDishes[id] = dishInfo[id].num;

				$("#dishNum" + id).html("&times; " + dishInfo[id].num);
				$("#selectedNum" + id).html("&times; " + dishInfo[id].num);

				storeObject.totalPrice = + storeObject.totalPrice + parseFloat(dishInfo[id].price);
				$("#totalPrice").text("Total Price: " + storeObject.totalPrice.toFixed(2));
			});
			$("#selectedMinus" + id).click(function() {
				if (dishInfo[id].minusNum() == 0) {
					$("#dish" + id).removeClass("ui-btn-active");

					$("#dishMinus" + id).hide();
					$("#dishNum"   + id).hide();

					$("#selectedBlock" + id).hide();
					$("#selectedMinus" + id).hide();
					$("#selectedNum"   + id).hide();

					$("#cancelBlock" + id).show();
					delete selectedDishes[id];
				} else {
					selectedDishes[id] = dishInfo[id].num;
				}
				$("#dishNum" + id).html("&times; " + dishInfo[id].num);
				$("#selectedNum" + id).html("&times; " + dishInfo[id].num);

				storeObject.totalPrice = + storeObject.totalPrice - parseFloat(dishInfo[id].price);
				$("#totalPrice").text("Total Price: " + storeObject.totalPrice.toFixed(2));
			});

			$("#showCancel").append(dishInfo[id].getElement("cancel"));
			$("#cancelBlock" + id).hide();

			$("#cancel" + id).click(function() {
				storeObject.DishID = id;
			});
			$("#cancelPlus" + id).click(function() {
				if (dishInfo[id].plusNum() == 1) {
					$("#dish" + id).addClass("ui-btn-active");

					$("#dishMinus" + id).show();
					$("#dishNum"   + id).show();

					$("#selectedBlock" + id).show();
					$("#selectedMinus" + id).show();
					$("#selectedNum"   + id).show();
					
					$("#cancelBlock" + id).hide();
				}
				selectedDishes[id] = dishInfo[id].num;
				
				$("#dishNum" + id).html("&times; " + dishInfo[id].num);
				$("#selectedNum" + id).html("&times; " + dishInfo[id].num);

				storeObject.totalPrice = + storeObject.totalPrice + parseFloat(dishInfo[id].price);
				$("#totalPrice").text("Total Price: " + storeObject.totalPrice.toFixed(2));
			});
			$("#cancelMinus" + id).click(function() {
				$("#cancelBlock" + id).hide();
			});
			
			storeObject.totalPrice = + storeObject.totalPrice + dishInfo[id].price * dishInfo[id].num;
        });

		$("#totalPrice").text("Total Price: " + storeObject.totalPrice.toFixed(2));

		$.each(dishType, function(type, dishes) {
    		$("#showType").append("<li><a class='ui-btn' id='dishType" + type + "'>" + type + "</a></li>");
        	$("#dishType" + type).click(function() {
        		$.each(dishInfo, function(id, eachDish){
        			$("#dishBlock" + id).hide();
        		});
        		$.each(dishes, function(i, num) {
        			$("#dishBlock" + num).show();
        			if (i%2 == 0) {
        				dishInfo[num].position("left");
        			} else {
        				dishInfo[num].position("right");
        			}
        			// the code below might be useless, since all the initial states are stored already
        			// use ui-btn-active as the selected state is not a good idea.
        			// click the link will clear ui-btn-active
					/*if (dishInfo[num].num == 0) {
						$("#dishMinus" + dishInfo[num].id).hide();
						$("#dish"      + dishInfo[num].id).removeClass("ui-btn-active");
						$("#dishNum"   + dishInfo[num].id).hide();
					} else {
						$("#dishMinus" + dishInfo[num].id).show();
						$("#dish"      + dishInfo[num].id).addClass("ui-btn-active");
						$("#dishNum"   + dishInfo[num].id).show();
						$("#dishNum"   + dishInfo[num].id).html("&times; " + dishInfo[num].num);
					}*/
					////////////////
        		});
        	});
    	});
	});
});
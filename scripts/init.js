$(document).on("pagebeforecreate", "#indexPage", function() {
	$.getJSON("includes/readmenu.php", function(data){

		$.each(data, function(i, field){
			var id = field.DishID;
			dishInfo[i] = new dishInfoCollect(field.DishID, field.DishName, field.DishType, field.Price, field.DishComposition);
			if(typeof dishType[dishInfo[i].type] == "undefined") {
				dishType[dishInfo[i].type] = [i];
			} else {
				dishType[dishInfo[i].type].push(i);
			}
			$("#showMenu").append(dishInfo[i].getElement("menu"));
			$("#dishBlock" + id).hide();

			$("#dish" + id).click(function() {
				storeObject.DishID = id;
			});
			$("#dishPlus" + id).click(function() {
				if (dishInfo[i].plusNum() == 1) {
					$("#dish" + id).addClass("ui-btn-active");

					$("#dishMinus" + id).show();
					$("#dishNum"   + id).show();

					$("#selectedBlock" + id).show();
					$("#selectedMinus" + id).show();
					$("#selectedNum"   + id).show();
				}
				$("#dishNum" + id).html("&times; " + dishInfo[i].num);
				$("#selectedNum" + id).html("&times; " + dishInfo[i].num);

				storeObject.totalPrice = + storeObject.totalPrice + parseFloat(dishInfo[i].price);
				$("#totalPrice").text("Total Price: " + storeObject.totalPrice.toFixed(2));
			});
			$("#dishMinus" + id).click(function() {
				if (dishInfo[i].minusNum() == 0) {
					$("#dish" + id).removeClass("ui-btn-active");

					$("#dishMinus" + id).hide();
					$("#dishNum"   + id).hide();

					$("#selectedBlock" + id).hide();
					$("#selectedMinus" + id).hide();
					$("#selectedNum"   + id).hide();
				}
				$("#dishNum" + id).html("&times; " + dishInfo[i].num);
				$("#selectedNum" + id).html("&times; " + dishInfo[i].num);

				storeObject.totalPrice = + storeObject.totalPrice - parseFloat(dishInfo[i].price);
				$("#totalPrice").text("Total Price: " + storeObject.totalPrice.toFixed(2));
			});

			$("#showSelected").append(dishInfo[i].getElement("select"));
			$("#selectedBlock" + dishInfo[i].id).hide();
			
			$("#selected" + dishInfo[i].id).click(function() {
				storeObject.DishID = dishInfo[i].id;
			});
			$("#selectedPlus" + dishInfo[i].id).click(function() {
				if (dishInfo[i].plusNum() == 1) {
					$("#dish" + dishInfo[i].id).addClass("ui-btn-active");

					$("#dishMinus" + dishInfo[i].id).show();
					$("#dishNum"   + dishInfo[i].id).show();

					$("#selectedBlock" + dishInfo[i].id).show();
					$("#selectedMinus" + dishInfo[i].id).show();
					$("#selectedNum"   + dishInfo[i].id).show();
				}
				$("#dishNum" + dishInfo[i].id).html("&times; " + dishInfo[i].num);
				$("#selectedNum" + dishInfo[i].id).html("&times; " + dishInfo[i].num);

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

			$("#showCancel").append(dishInfo[i].getElement("cancel"));
			$("#cancelBlock" + dishInfo[i].id).hide();
			
			storeObject.totalPrice = + storeObject.totalPrice + dishInfo[i].price * dishInfo[i].num;
        });
		$("#totalPrice").text("Total Price: " + storeObject.totalPrice.toFixed(2));

		$.each(dishType, function(type, dishes) {
    		$("#showType").append("<li><a class='ui-btn' id='dishType" + type + "'>" + type + "</a></li>");
        	$("#dishType" + type).click(function() {
        		$.each(dishInfo, function(i, eachDish){
        			$("#dishBlock" + eachDish.id).hide();
        		});
        		//$("#showMenu").text("");
        		$.each(dishes, function(i, num) {
        			$("#dishBlock" + dishInfo[num].id).show();
        			//$("#showMenu").append(dishInfo[num].getElement("menu"));
        			if (i%2 == 0) {
        				dishInfo[num].position("left");
        			} else {
        				dishInfo[num].position("right");
        			}
        			// the code below might be useless, since all the initial states are stored already
					if (dishInfo[num].num == 0) {
						$("#dishMinus" + dishInfo[num].id).hide();
						$("#dish"      + dishInfo[num].id).removeClass("ui-btn-active");
						$("#dishNum"   + dishInfo[num].id).hide();
					} else {
						$("#dishMinus" + dishInfo[num].id).show();
						$("#dish"      + dishInfo[num].id).addClass("ui-btn-active");
						$("#dishNum"   + dishInfo[num].id).show();
						$("#dishNum"   + dishInfo[num].id).html("&times; " + dishInfo[num].num);
					}
					////////////////
        		});
        	});
    	});
	});
});
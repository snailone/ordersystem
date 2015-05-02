$(document).on("pagebeforecreate", "#indexPage", function() {
	$.getJSON("includes/readmenu.php", function(data){
		var count = 0;
		$.each(data, function(id, field){
			if (id != field.DishID) {
				alert("something wrong!!");
			}
			dishInfo[id] = new dishInfoCollect(field.DishID, field.DishName, field.DishType, field.Price, field.DishComposition, field.Status, field.Bargain, field.Star, field.StarNum);
			if(typeof dishType[dishInfo[id].type] == "undefined") {
				dishType[dishInfo[id].type] = [id];
			} else {
				dishType[dishInfo[id].type].push(id);
			}
			if(dishInfo[id].newDish == 1) {
				dishSpecial.newDish.push(id);
			}
			if (dishInfo[id].recommend == 1) {
				dishSpecial.recommend.push(id);
			}
			if (dishInfo[id].offer == 1) {
				dishSpecial.offer.push(id);
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
		console.log(dishSpecial.newDish);
		console.log(dishSpecial.recommend);
		console.log(dishSpecial.offer);

		$("#totalPrice").text("Total Price: " + storeObject.totalPrice.toFixed(2));

		count = 0;
		$.each(dishType, function(type, dishes) {
    		$("#showType").append("<li><a href='#menuPage' data-rel='close' class='ui-btn' id='dishType" + type + "'>" + type + "</a></li>");
        	$("#dishType" + type).click(function() {
        		$("#dishType" + storeObject.prevType).css("background-color","LightGray");
        		$("#dishType" + type).css("background-color","yellow");
        		storeObject.prevType = type;
        		$("#typeTitle").text(type);
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
        		});
        	});
        	if (count == 0) {
        		$("#typeTitle").text(type);
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
        		});
        	}
        	count++;
    	});
		$.each(dishSpecial.newDish, function(i, num){
			$("#newBlock").append('<img src="images/menu/dish'+num+'.jpg" style="max-width:100%;display:none" alt="dish'+num+'" data-role="none">');
			$("#newBlock div").append('<span style="font-size:4em;height:1em;color:gray">&bull;</span>');
		});
		$.each(dishSpecial.recommend, function(i, num){
			$("#recommendBlock").append('<img src="images/menu/dish'+num+'.jpg" style="max-width:100%;display:none" alt="dish'+num+'" data-role="none">');
			$("#recommendBlock div").append('<span style="font-size:4em;height:1em;color:gray">&bull;</span>');
		});
		$.each(dishSpecial.offer, function(i, num){
			$("#bargainBlock").append('<img src="images/menu/dish'+num+'.jpg" style="max-width:100%;display:none" alt="dish'+num+'" data-role="none">');
			$("#bargainBlock div").append('<span style="font-size:4em;height:1em;color:gray">&bull;</span>');
		});
		$("#newBlock").show();
		$("#recommendBlock").hide();
		$("#bargainBlock").hide();
		$("#newButton").click(function() {
			$("#newBlock").show();
			$("#recommendBlock").hide();
			$("#bargainBlock").hide();
		});
		$("#recommendButton").click(function() {
			$("#newBlock").hide();
			$("#recommendBlock").show();
			$("#bargainBlock").hide();
		});
		$("#bargainButton").click(function() {
			$("#newBlock").hide();
			$("#recommendBlock").hide();
			$("#bargainBlock").show();
		});
		loopPictures(0, dishSpecial.newDish.length, "#newBlock");
		loopPictures(0, dishSpecial.recommend.length, "#recommendBlock");
		loopPictures(0, dishSpecial.offer.length, "#bargainBlock");

		$("#newBlock").click(function () {
			$("#typeTitle").text("New");
        	$.each(dishInfo, function(id, eachDish){
        		$("#dishBlock" + id).hide();
        	});
        	$.each(dishSpecial.newDish, function(i, num) {
        		$("#dishBlock" + num).show();
        		if (i%2 == 0) {
        			dishInfo[num].position("left");
        		} else {
        			dishInfo[num].position("right");
        		}
        	});
		});
		$("#recommendBlock").click(function () {
			$("#typeTitle").text("Recommend");
        	$.each(dishInfo, function(id, eachDish){
        		$("#dishBlock" + id).hide();
        	});
        	$.each(dishSpecial.recommend, function(i, num) {
        		$("#dishBlock" + num).show();
        		if (i%2 == 0) {
        			dishInfo[num].position("left");
        		} else {
        			dishInfo[num].position("right");
        		}
        	});
		});
		$("#bargainBlock").click(function () {
			$("#typeTitle").text("Bargain Price");
        	$.each(dishInfo, function(id, eachDish){
        		$("#dishBlock" + id).hide();
        	});
        	$.each(dishSpecial.offer, function(i, num) {
        		$("#dishBlock" + num).show();
        		if (i%2 == 0) {
        			dishInfo[num].position("left");
        		} else {
        			dishInfo[num].position("right");
        		}
        	});
		});

		$("#dishType-new").click(function () {
			$("#typeTitle").text("New");
        	$.each(dishInfo, function(id, eachDish){
        		$("#dishBlock" + id).hide();
        	});
        	$.each(dishSpecial.newDish, function(i, num) {
        		$("#dishBlock" + num).show();
        		if (i%2 == 0) {
        			dishInfo[num].position("left");
        		} else {
        			dishInfo[num].position("right");
        		}
        	});
		});
		$("#dishType-recommend").click(function () {
			$("#typeTitle").text("Recommend");
        	$.each(dishInfo, function(id, eachDish){
        		$("#dishBlock" + id).hide();
        	});
        	$.each(dishSpecial.recommend, function(i, num) {
        		$("#dishBlock" + num).show();
        		if (i%2 == 0) {
        			dishInfo[num].position("left");
        		} else {
        			dishInfo[num].position("right");
        		}
        	});
		});
		$("#dishType-offer").click(function () {
			$("#typeTitle").text("Bargain Price");
        	$.each(dishInfo, function(id, eachDish){
        		$("#dishBlock" + id).hide();
        	});
        	$.each(dishSpecial.offer, function(i, num) {
        		$("#dishBlock" + num).show();
        		if (i%2 == 0) {
        			dishInfo[num].position("left");
        		} else {
        			dishInfo[num].position("right");
        		}
        	});
		});
	});
});

function loopPictures(i, num, selector) {
	selector = selector;
	$(selector).children("img").eq(i).fadeOut(1000).promise().done(function() {
		$(selector + " div").children("span").eq(i).css("color","gray");
		i = i==(+num-1) ? 0 : i+1;
		$(selector).children("img").eq(i).fadeIn(1000);
		$(selector + " div").children("span").eq(i).css("color","green");
	});
	setTimeout( function() {
		loopPictures(i, num, selector);
	}, 5000);
}
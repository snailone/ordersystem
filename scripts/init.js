$(document).on("pagebeforecreate", "#indexPage", function() {
	$.getJSON("includes/readmenu.php", function(data){

		$.each(data, function(i, field){
			dishInfo[i] = new dishInfoCollect(field.DishID, field.DishName, field.DishType, field.Price, field.DishComposition);
			if(typeof dishType[dishInfo[i].type] == "undefined") {
				dishType[dishInfo[i].type] = [i];
			} else {
				dishType[dishInfo[i].type].push(i);
			}
        });

		$.each(dishType, function(type, dishes) {
    		$("#showType").append("<li><a class='ui-btn' id='dishType" + type + "'>" + type + "</a></li>");
        	$("#dishType" + type).click(function() {
        		$("#showMenu").text("");
        		$.each(dishes, function(i, num) {
        			$("#showMenu").append(dishInfo[num].element());
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
							$("#dishMinus" + dishInfo[num].id).show();
							$("#dish"      + dishInfo[num].id).addClass("ui-btn-active");
							$("#dishNum"   + dishInfo[num].id).show();
						}
						$("#dishNum" + dishInfo[num].id).html("&times; " + dishInfo[num].num);
					});
					$("#dishMinus" + dishInfo[num].id).click(function() {
						if (dishInfo[num].minusNum() == 0) {
							$("#dishMinus" + dishInfo[num].id).hide();
							$("#dish"      + dishInfo[num].id).removeClass("ui-btn-active");
							$("#dishNum"   + dishInfo[num].id).hide();
						}
						$("#dishNum" + dishInfo[num].id).html("&times; " + dishInfo[num].num);
					});
        		});
        	});
    	});
	});
});
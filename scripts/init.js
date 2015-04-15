$(document).on("pagebeforecreate", "#indexPage", function() {
	$.getJSON("includes/readmenu.php", function(data){
		$.each(data, function(i, field){
			dishInfo[i] = new dishInfoCollect(field.DishID, field.DishName, field.DishType, field.Price, field.DishComposition);
        });
        /*var i = 0;
        var prevalue = null;
        $.each(dishTypeCollect, function(key, value) {
        	if (key == 0 || prevalue != value) {
        		dishType[i] = value;
        		i = i + 1;
        	}
        	prevalue = value;
        });*/
		$.each(dishInfo, function(i, eachDish){
			if(typeof dishType[eachDish.type] == "undefined") {
				dishType[eachDish.type] = [i];
			} else {
				dishType[eachDish.type].push(i);
			}
		});
	});
});
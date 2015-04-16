function setCookie(cname, cvalue, exhours) {
    var d = new Date();
    d.setTime(d.getTime() + (exhours*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function curDate() {
    var dt = new Date();
    var month  = dt.getMonth()+1;
    var day    = dt.getDate();
    var time   = dt.getFullYear();
    time += '-' + (month <10?'0':'') + month;
    time += '-' + (day   <10?'0':'') + day;
    return time;
}

function curTime() {
    var dt = new Date();
    var month  = dt.getMonth()+1;
    var day    = dt.getDate();
    var hour   = dt.getHours();
    var minute = dt.getMinutes();
    var second = dt.getSeconds();
    var time   = dt.getFullYear();
    time += '-' + (month <10?'0':'') + month;
    time += '-' + (day   <10?'0':'') + day;
    time += ' ' + (hour  <10?'0':'') + hour;
    time += ":" + (minute<10?'0':'') + minute; 
    time += ":" + (second<10?'0':'') + second;
    return time;
}

function dishInfoCollect (id, name, type, price, composition) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.price = price;
    this.composition = composition;
    // dish number which is selected
    this.num = 0;
}
(function() {
    this.getName = function() {
        return this.name;
    };
    this.getPrice = function() {
        return this.price;
    };
    this.plusNum = function() {
        this.num = this.num + 1;
        return this.num;
    };
    this.minusNum = function() {
        this.num = this.num - 1;
        if (this.num<=0) {
            this.num = 0;
        }
        return this.num;
    };
    this.getMenu = function() {
        var list = "";
        list = "<div id='dishBlock" + this.id + "'>"
             +   "<a id='dish" + this.id + "' href='#singlePage' class='ui-btn ui-mini' style='text-align:left; margin:0 0 0 0;' >"
             +     "<img src='images/menu/dish"+this.id+".jpg' alt='dish' style='max-width:100%'>"
             +     "<h2>"+ this.name + "</h2>"
             +     "<p>Price: &pound;" + this.price + " <span style='color:red' id='dishNum" + this.id + "'></span></p>"
             +   "</a>"
             +   "<div style='text-align:right'>"
             +     "<a id='dishMinus" + this.id + "' href='#' class='ui-btn ui-mini ui-btn-inline ui-btn-icon-notext ui-icon-minus ui-corner-all'>Minus</a>"
             +     "<a id='dishPlus" + this.id + "' href='#' class='ui-btn ui-mini ui-btn-inline ui-btn-icon-notext ui-icon-plus ui-corner-all'>Plus</a>"
             +   "</div>"
             + "</div>";
        return list;
    };
    this.getSelected = function() {
        var list;
        list = "<li class='ui-li-has-alt' id='selectedBlock" + this.id + "'>"
            +   "<div class='ui-grid-a my-breakpoint'>"
            +     "<div class='ui-block-a'>"
            +       "<a id='selected" + this.id + "' href='#singlePage' class='ui-btn ui-mini' style='text-align:left; margin:0 0 0 0;' >"
            +         "<h2>"+ this.name + "</h2>"
            +         "<p>Price: " + this.price + " <span style='color:red' id='selectedNum" + this.id + "'></span></p>"
            +       "</a>"
            +     "</div>"
            +     "<div class='ui-block-b' >"
            +       "<div style='float:right;'>"
            +         "<a id='selectedMinus" + this.id + "' href='#' class='ui-btn ui-mini ui-btn-inline ui-btn-icon-notext ui-icon-minus ui-corner-all'>Minus</a>"
            +         "<a id='selectedPlus" + this.id + "' href='#' class='ui-btn ui-mini ui-btn-inline ui-btn-icon-notext ui-icon-plus ui-corner-all'>Plus</a>"
            +       "</div>"
            +     "</div>"
            +   "</div>"
            + "</li>";
        return list;
    };
    this.position = function(pos) {
        if (pos == "left") {
            return $('#dishBlock' + this.id).removeClass("ui-block-b").addClass("ui-block-a");
        } else if (pos == "right") {
            return $('#dishBlock' + this.id).removeClass("ui-block-a").addClass("ui-block-b");
        }
    };
}).call(dishInfoCollect.prototype);
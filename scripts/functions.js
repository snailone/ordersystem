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
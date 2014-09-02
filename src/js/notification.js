$(document).ready( function(){
    setInterval(notification, 60000);

    function notification()
    {
        var hungertext = document.getElementById("hungertext");
        var happynesstext = document.getElementById("happynesstext");
        var sicktext = document.getElementById("sicktext");
        var insalubritytext = document.getElementById("insalubritytext");
	var img, text;
        
        if(tamaVars.hunger <= 30){
            img = '/img/logo-128.png';
            text = hungertext.textContent;
            var hunger_notification = new Notification("TMGC-JS", { body: text, icon: img });
            window.navigator.vibrate(1000);
        }
        if(tamaVars.happyness <= 30){
            img = '/img/logo-128.png';
            text = happynesstext.textContent;
            var happyness_notification = new Notification("TMGC-JS", { body: text, icon: img });
            window.navigator.vibrate(1000);
        }
        if(tamaVars.sick === true){
            img = '/img/logo-128.png';
            text = sicktext.textContent;
            var sick_notification = new Notification("TMGC-JS", { body: text, icon: img });
            window.navigator.vibrate(1000);
        }
        if(tamaVars.insalubrity >= 25){
            img = '/img/logo-128.png';
            text = insalubritytext.textContent;
            var insalubrity_notification = new Notification("TMGC-JS", { body: text, icon: img });
            window.navigator.vibrate(1000);
        }
    }
});

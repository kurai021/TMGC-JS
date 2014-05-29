$(document).ready( function(){
    
    setInterval(notification, 30000);
    
    function notification()
    {
        var hungertext = document.getElementById("hungertext");
        var happynesstext = document.getElementById("happynesstext");
        var sicktext = document.getElementById("sicktext");
        var insalubritytext = document.getElementById("insalubritytext");
        
        if(tamaVars.hunger <= 30){
            var img = '/img/logo-128.png';
            var text = hungertext.textContent;
            var hunger_notification = new Notification("TMGC-JS", { body: text, icon: img });
            window.navigator.vibrate(1000);
        }
        if(tamaVars.happyness <= 30){
            var img = '/img/logo-128.png';
            var text = happynesstext.textContent;
            var happyness_notification = new Notification("TMGC-JS", { body: text, icon: img });
            window.navigator.vibrate(1000);
        }
        if(tamaVars.sick == true){
            var img = '/img/logo-128.png';
            var text = sicktext.textContent;
            var sick_notification = new Notification("TMGC-JS", { body: text, icon: img });
            window.navigator.vibrate(1000);
        }
        if(tamaVars.insalubrity >= 25){
            var img = '/img/logo-128.png';
            var text = insalubritytext.textContent;
            var insalubrity_notification = new Notification("TMGC-JS", { body: text, icon: img });
            window.navigator.vibrate(1000);
        }
    }
});
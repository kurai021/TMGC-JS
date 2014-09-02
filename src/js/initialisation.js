$(document).ready( function() {
    
    var lock = navigator.requestWakeLock("cpu");
    
	$('li i').each(function() {
		var id = $(this).parent()[0].id;
		switch(id) {
			case 'li0':
				$(this).bind('mousedown', function(e){ tamaControls.HungerMeter();});
				break;
			case 'li1':
				$(this).bind('mousedown', function(e){ tamaControls.FeedingTime();});
				break;
			case 'li2':
				$(this).bind('mousedown', function(e){ tamaControls.Toilet();});
				break;
			case 'li3':
				$(this).bind('mousedown', function(e){ tamaControls.GamingTime();});
				break;
			case 'li4':
				$(this).bind('mousedown', function(e){ tamaControls.Discipline();});
				break;
			case 'li5':
				$(this).bind('mousedown', function(e){ tamaControls.Health();});
				break;
			case 'li6':
				$(this).bind('mousedown', function(e){ tamaControls.Lights();});
				break;
            case 'li7':
                $(this).bind('mousedown', function(e){ tama.help();});
				break;
		}
	});
	tama.init();
	$('#snack').bind('mouseup', function() { tamaControls.FeedingTime('snack'); });
	$('#food').bind('mouseup', function() { tamaControls.FeedingTime('food'); });
	$('#praise').bind('mouseup', function() { tamaControls.Discipline('praise'); });
	$('#punish').bind('mouseup', function() { tamaControls.Disciplines('punish'); });
});

$(function() {
        $( "#load" ).click(function() {
                var tamaLoad = localStorage.getItem("tamaVars");
                tamaVars = JSON.parse(tamaLoad); //var test is now re-loaded!

                if(tamaVars.theme == 'firefoxos'){
                    var cssLink = $("<link rel='stylesheet' type='text/css' href='css/firefoxos.css'>");
                    $("head").append(cssLink);
                }
                else{
                    $('link[rel=stylesheet][href~="css/firefoxos.css"]').remove();
                }
        });
});

$(function() {
        $( "#save" ).click(function() {
                localStorage.setItem('tamaVars', JSON.stringify(tamaVars));
        });
});

$(function() {
	$( "#help" ).on('mousedown', function() {
		$("#li8-content").toggle();
		$("#li0-content").toggle();
	});
    
    $( "#exit-help" ).on('mousedown', function() {
		$("#li7-content").toggle();
	});
});

$(function(){
    $("#firefoxos").on('mousedown', function(){
        var cssLink = $("<link rel='stylesheet' type='text/css' href='css/firefoxos.css'>");
        $("head").append(cssLink);     
        tamaVars.theme = 'firefoxos';
    });
    
    $("#themedefault").on('mousedown', function(){
       $('link[rel=stylesheet][href~="css/firefoxos.css"]').remove();
        tamaVars.theme = 'default';
    });
});

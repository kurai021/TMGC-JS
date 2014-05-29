$(document).ready( function() {
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
		}
	});
	tama.init();
	$('#snack').bind('mouseup', function() { tamaControls.FeedingTime('snack') });
	$('#food').bind('mouseup', function() { tamaControls.FeedingTime('food') });
	$('#praise').bind('mouseup', function() { tamaControls.Discipline('praise') });
	$('#punish').bind('mouseup', function() { tamaControls.Disciplines('punish') });
});

$(function() {
        $( "#load" ).click(function() {
                var tamaLoad = localStorage.getItem("tamaVars");
                tamaVars = JSON.parse(tamaLoad); //var test is now re-loaded!
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
});

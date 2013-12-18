$(document).ready( function() {
	$('li img').each(function() {
		var id = $(this).parent()[0].id;
		switch(id) {
			case 'li0':
				$(this).bind('mouseup', function(e){ tamaControls.HungerMeter();});
				break;
			case 'li1':
				$(this).bind('mouseup', function(e){ tamaControls.FeedingTime();});
				break;
			case 'li2':
				$(this).bind('mouseup', function(e){ tamaControls.Toilet();});
				break;
			case 'li3':
				$(this).bind('mouseup', function(e){ tamaControls.GamingTime();});
				break;
			case 'li4':
				$(this).bind('mouseup', function(e){ tamaControls.Discipline();});
				break;
			case 'li5':
				$(this).bind('mouseup', function(e){ tamaControls.Health();});
				break;
			case 'li6':
				$(this).bind('mouseup', function(e){ tamaControls.Lights();});
				break;
		}
	})
	tama.init();
	$('#snack').bind('mouseup', function() { tamaControls.FeedingTime('snack') });
	$('#food').bind('mouseup', function() { tamaControls.FeedingTime('food') });
	$('#praise').bind('mouseup', function() { tamaControls.Discipline('praise') });
	$('#punish').bind('mouseup', function() { tamaControls.Disciplines('punish') });
});

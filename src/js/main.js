var k = 1/5000;
var loopTime = 0.01*1000;// = 10 ms
var $water   = $('#water');
var $tamaPic = $('#tamapic');
var $screen  = $('#screen');
var happydream = null;
var tamaVars =
{
		hunger: 50,
        happyness: 50,
        diabetes: 0,
        illness: 0,
        insalubrity: 0,
        utp: 0, //What?
        training: 0,
        age: 1,
        weight: 100,
        name: 'bouh',
        gender: 'Boy',
        generation: 1,
        state: -1,
        animation: 'main',
        busy: false,
        doingbullshit: 0,
        tidy: true,
        water:-50,
        dung:0,
        sick: false,
        theme: 'default'
}

var tamaRules =
{
	// TODO: Clean this part up to make it more verbose. E.g. k is defined
	//       in line 1!
	loop:
	{
		hunger: -1*k,
		happyness: -0.25*k-tamaVars.doingbullshit*4*k,
		illness: +0.5*k + tamaVars.diabetes/2*k,
		utp: +2*k,
		insalubrity: (tamaVars.utp) / 25*k,
		training: 0-tamaVars.doingbullshit*4*k,
		age: 1/8640000 // 1 year = 1 earth day
	},
	actualizing:function()
	{
		this.loop.hunger = -1*k,
		this.loop.happyness = -0.05*k-tamaVars.doingbullshit*4*k,
		this.loop.illness = +0.5*k + tamaVars.diabetes/2*k,
		this.loop.utp = 0,
		this.loop.insalubrity = (tamaVars.utp / 25)*k,
		this.loop.training = -tamaVars.doingbullshit*4*k,
		this.loop.age = 1/8640000
	}
}
var tamaControls =
{
	currentTabId: '',
	lights: true,

	HungerMeter: function(actualizing)
	{
		$('#hungerbar').progressbar(
		{
			value: tamaVars.hunger
		});
		$('#happybar').progressbar(
		{
			value: tamaVars.happyness
		});
		$('#trainingbar').progressbar(
		{
			value: tamaVars.training
		});
        
		$('#trainingbar div, #happybar div, #hungerbar div').css({background: '#01c5ed'});

		$('#age').html(Math.floor(tamaVars.age) + ' years');
		$('#weight').html(Math.round(tamaVars.weight) / 100 + ' g');
		$('#name').html(tamaVars.name);
		$('#gender').html(tamaVars.gender);
		//$('#generation').html(tamaVars.generation);

		if(!actualizing)
		{
			this.toggle('#li0-content');
		}
		
	},
	FeedingTime: function(type)
	{
		if(type && tamaVars.state >= 1 && !tamaVars.busy)
		{
			if(type == 'food')
			{
				tama.add('hunger', 10);
				tama.add('utp', 10);
				tama.add('weight', 5, true);

				// According to conventions, it should be addSprites …
				tamaControls.addsprites('food', 2000);
			}
			else if(type == 'snack')
			{
				tama.add('hunger', 5);
				tama.add('utp', 5);
				tama.add('weight', 2.5, true);
				tama.add('happyness', 5);
				tama.add('diabetes', 2.5);

				tamaControls.addsprites('snack', 2000);
			}
			tamaControls.evolve('eat', true, 2000);
			
		}
		this.toggle('#li1-content');
	},
	Toilet: function()
	{
		if(!tamaVars.busy)
		{
			tamaVars.insalubrity = 0;
			tama.cleaning(true);		
		}

	},
	GamingTime: function()
	{
		if(tamaVars.state >= 1  && !tamaVars.busy)
		{
			tamaControls.evolve('play', true, 6000);
			tamaControls.addsprites('play', 6000);
			tama.add('hunger', -10);
			tama.add('weight', -5, true);
			tama.add('happyness', 5);
			tama.add('training', 0.5);
		}
			
	},
	Discipline: function(type)
	{
		if(tamaVars.state >= 1)
		{
			tamaVars.doingbullshit = 0;
			tama.add('training', 1);
		}
	},
	Health: function()
	{
		if(tamaVars.state >= 1)
		{
			tamaVars.illness = 0;
		}
	},
	Lights: function()
	{
		if(tamaControls.lights)
		{
			$screen.css('background-color', '#777777');
			$tamaPic.attr('src', 'img/chars/0'+state+'/sleep.gif');
			$("#li1").toggle();
			$("#li2").toggle();
			$("#li3").toggle();
			$("#li4").toggle();
			$("#li5").toggle();
            tamaControls.lights = false;
            happydream = setInterval(function(){tama.add('happyness', 0.1)}, 15000);
		}
		else
		{
			$screen.css('background-color', '#fff');
			$tamaPic.attr('src', 'img/chars/0'+state+'/main.gif');
			$("#li1").toggle();
			$("#li2").toggle();
			$("#li3").toggle();
			$("#li4").toggle();
			$("#li5").toggle();
			tamaControls.lights = true;
            clearInterval(happydream);
		}
	},
	toggle: function(id)
	{
		if(this.currentTabId != '')
		{
			$(this.currentTabId).toggle(false);
		}

		if(this.currentTabId == id)
		{
			$(id).toggle(false);
			this.currentTabId = '';
		}
		else
		{
			$(id).toggle(true);
			this.currentTabId = id;
		}
	},
	evolve: function(state, animation, time)
	{
		if(tamaVars.state != state && !tamaVars.busy)
		{
			if(animation)
			{
				$tamaPic.attr('src', 'img/chars/0'+tamaVars.state+'/'+state+'.gif');
				tamaVars.busy = true;
				setTimeout(function()
				{
					$tamaPic.attr('src', 'img/chars/0'+tamaVars.state+'/main.gif');
					tamaVars.busy = false;
				}, time);
			}
			else
			{
				switch(state)
				{
					case -2:
						$tamaPic.attr('src', 'img/chars/death/main.gif');
						break;
					case -1:
						$tamaPic.attr('src', 'img/chars/00/main.gif');
						break;
					case 0:
						$tamaPic.attr('src', 'img/chars/00/hach.gif');
						break;
					default:
						if(tamaVars.sick)
						{
							if(state == 'sick')
							{
								state = tamaVars.state;
								$tamaPic.attr('src', './img/chars/0'+state+'/sick.gif');
							}
							else
							{
								state = tamaVars.state;
								$tamaPic.attr('src', './img/chars/0'+state+'/main.gif');
							}
							
						}
						else if(!tamaVars.tidy)
						{	
							if(state == 'unhp')
							{
								state = tamaVars.state;
								$tamaPic.attr('src', './img/chars/0'+state+'/unhp.gif');
							}
							else
							{
								state = tamaVars.state;
								$tamaPic.attr('src', './img/chars/0'+state+'/main.gif');
							}
						}
						else
						{
							$tamaPic.attr('src', './img/chars/0'+state+'/main.gif');
						}
						break;
				}

				tamaVars.state = state;
			}

		}
	},
	addsprites: function(type, time)
	{
		switch(type)
		{
			// FIXME: Get rid of setTimeout! Use requestAnimationFrame instead!
			case 'food':
				buffer = "<img class=\"food\" src=\"./img/other/food.gif\" />";
				$screen.append(buffer);
				if(time)
				{
					setTimeout(function(){$('.food').remove()}, time);
				}
				break;
			case 'snack':
				buffer = "<img class=\"food\" src=\"./img/other/snack.gif\" />";
				$screen.append(buffer);
				setTimeout(function(){$('.food').remove()}, time);
				break;
			case 'play': 
				buffer = "<img id=\"stars1\" class=\"play\" src=\"./img/other/stars.gif\" />"
				buffer += "<img id=\"stars2\" class=\"play\" src=\"./img/other/stars.gif\" />"
				$screen.append(buffer);
				setTimeout(function(){$('.play').remove()}, time);
				break;
			case 'sick':
				if(time >= 0)
				{
					buffer = "<img class=\"skull\" src=\"./img/other/skull.gif\" />"
					$screen.append(buffer);
				}
				else
				{
					$('.skull').remove();
				}
			default:
				break;
		}
	}
}
var tama =
{
	counter: 0,
	moving: false,
	clock: 
	{
		si: null,
		start: function()
		{
			tama.clock.si = setInterval(function()
			{
				tama.main();
			}, loopTime);
		},
		stop: function()
		{
			tama.clock.si = clearInterval(tama.clock.si);
		},
		reset: function()
		{
			tama.counter = 0;
		}
	},
	init: function()
	{
		tama.clock.start();
	},
	main: function()
	{
		tamaRules.actualizing();
		tamaControls.HungerMeter(true);
		tama.counter++;
		tama.add('hunger', tamaRules.loop.hunger);
		tama.add('happyness', tamaRules.loop.happyness);
		tama.add('illness', tamaRules.loop.illness);
		tama.add('insalubrity', tamaRules.loop.insalubrity);
		tama.add('utp', tamaRules.loop.utp);
		tama.add('training', tamaRules.loop.training);
		tama.add('age', tamaRules.loop.age);

		if(Math.random()*(1*100)+1 == 1)
			tamaVars.doingbullshit = 1;

		this.growing();
		this.pooping();
		this.cleaning();
		this.beingsick();
		this.doingbullshit();
		this.dead();
	},
	add: function(prop, value, nolimit)
	{
		var tmp = tamaVars[prop] += value;
		if((tamaVars[prop] > 100 || tamaVars[prop] < 0) && !nolimit)
		{
			tamaVars[prop] -= tamaVars[prop] % 100;
		}
		
	},
	growing:function()
	{
		switch(this.counter)
		{
			case 300:
				state = 0;
				break;
			case 500:
				state = 1;
				break;
			case 51840000:
				state = 2;
				break;
			case 95040000:
				state = 3;
				break;
			case 146880000:
				state = 4;
				break;
			default:
				state = tamaVars.state;
				break;
		}
		tamaControls.evolve(state);
	},
	cleaning:function(init)
	{
		if(init)
		{
			tamaVars.busy = true;
			tamaVars.water = 210;
			$water.css('left', tamaVars.water+'px');
		}
		{
			if(tamaVars.water >= -50)
			{
				tamaVars.water -= 5
				$water.css('left', tamaVars.water+'px');
				if(tamaVars.water == -50)
				{
					tamaVars.busy = false;
					$('.dung').remove();
					tamaVars.dung = 0;
				}
			}
		}

	},
	pooping:function()
	{
		var d = tamaVars.insalubrity;
		if(d > 12 && tamaVars.dung < 1)
		{
			this.dung();
		}
		else if(d > 25 && tamaVars.dung < 2)
		{
			this.dung();
		}
		else if(d > 37 && tamaVars.dung < 3)
		{
			this.dung();
		}
		else if(d > 50 && tamaVars.dung < 4)
		{
			this.dung();
		}
		else if(d > 62 && tamaVars.dung < 5)
		{
			this.dung();
		}
		else if(d > 75 && tamaVars.dung < 6)
		{
			this.dung();
		}
		else if(d > 87 && tamaVars.dung < 7)
		{
			this.dung();
		}
		else if(d > 100 && tamaVars.dung < 8)
		{
			this.dung();
		}
	},
	dung:function()
	{
		buffer = "<img class=\"dung\" style=\"top: "+Math.floor((Math.random()*(200-13))+1)+"px; left: "+Math.floor((Math.random()*(200-13))+1)+"px;\" src=\"./img/other/dung.gif\" />";
		$screen.append(buffer);
		tamaVars.dung++;
		tamaVars.utp = 0;
	},
	beingsick:function()
	{
		if(tamaVars.illness >= 50 && !tamaVars.sick)
		{
			tamaVars.sick = true;
			tamaControls.evolve('sick');
			tamaControls.addsprites('sick', 1);
		}
		
		if(tamaVars.illness < 50 && tamaVars.sick)
		{
			tamaControls.evolve('unsick');			
			tamaControls.addsprites('sick', -1);
			tamaVars.sick = false;			
		}
	},
	doingbullshit:function()
	{
		if(tamaVars.doingbullshit == 1 && tamaVars.tidy)
		{
			tamaVars.tidy = false;
			tamaControls.evolve('unhp');
			console.log("blop")
		}
		
		if(tamaVars.doingbullshit == 0 && !tamaVars.tidy)
		{
			tamaControls.evolve('hp');
			tamaVars.tidy = true;

				
		}
	},
	dead:function()
	{
		score = 2;
		if(tamaVars.hunger <= 10)
			score--;
		if(tamaVars.happyness <= 10)
			score--;
		if(tamaVars.illness >= 90)
			score--;
		if(tamaVars.insalubrity >= 90)
			score--;
		if(tamaVars.training <= 10)
			score--;

		if(score <= 0)
		{
			tamaControls.evolve(-2);
			tama.clock.stop();
			//$('#defeat').css('display', 'block');
			$('#time').html(Math.round(tama.counter/(1000/loopTime)));
            var defeat = document.getElementById("defeat");
            var timedefeat = document.getElementById("time");
            var seconds = document.getElementById("seconds");
            
            alert(defeat.textContent + ' ' + timedefeat.textContent + ' ' + seconds.textContent + '.');
		}
	},
    
    help:function()
    {
        $('#li7-content').toggle();
    }
}

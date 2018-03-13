//The cookie bliss mod object:
var CB = {};
CB.version = 2.0045;
CB.saveTo = 'CookieBliss';
CB.customUpgrades = [];
CB.customAchievements = [];
CB.loaded = false;

//Initialization:
CB.init = function(){
	var proceed = true;	
	if (Game.version != CB.version) {
		proceed = confirm('Cookie bliss version is meant for Game version ' + CB.version + '.  Loading a different version may cause errors.  Do you still want to load Cookie bliss?');
	}
	if(!proceed || CB.loaded)
		return;
	
	//Adding upgrades! Check out: http://orteil.dashnet.org/cookieclicker/img/icons.png?v=2.0045 for the icons.
	//========Modifying the cursor cps/buyFunctions to introduce the new -illion finger upgrades.
	CB.addCustomUpgrade('Nonillion fingers','The mouse and cursors gain <b>+50000000</b> cookies for each non-cursor object owned.<q>Lightning cracks, and from the portals spill forth an endless tide of fingers. </q>',10000000000000000000000000,[0,24],100);
	CB.addCustomUpgrade('Decillion fingers','The mouse and cursors gain <b>+500000000</b> cookies for each non-cursor object owned.<q>This uncanny ritual involves fingerless gloves and concentrated nonbaryonic dark matter.</q>',10000000000000000000000000000,[12,24],100);
	CB.addCustomUpgrade('Undecillion fingers','The mouse and cursors gain <b>+5000000000</b> cookies for each non-cursor object owned.<q>Plenty of fingers.</q>',10000000000000000000000000000000,[0,23],100);
	CB.addCustomUpgrade('Duodecillion fingers','The mouse and cursors gain <b>+50000000000</b> cookies for each non-cursor object owned.<q>Fingers are fractal -- for each fingertip equip a tiny little fingerglove hosting another hand with five more fingers. Recurse. Descend. Down to the atomic scale.</q>',10000000000000000000000000000000000,[12,23],100);
	
	
	Game.Objects['Cursor'].cps = function(){
		var add=0;
		if (Game.Has('Thousand fingers')) add+=		0.1;
		if (Game.Has('Million fingers')) add+=		0.5;
		if (Game.Has('Billion fingers')) add+=		5;
		if (Game.Has('Trillion fingers')) add+=		50;
		if (Game.Has('Quadrillion fingers')) add+=	500;
		if (Game.Has('Quintillion fingers')) add+=	5000;
		if (Game.Has('Sextillion fingers')) add+=	50000;
		if (Game.Has('Septillion fingers')) add+=	500000;
		if (Game.Has('Octillion fingers')) add+=	5000000;
		if (Game.Has('Nonillion fingers')) add+=	50000000;
		if (Game.Has('Decillion fingers')) add+=	500000000;
		if (Game.Has('Undecillion fingers')) add+=	5000000000;
		if (Game.Has('Duodecillion fingers')) add+=	50000000000;

		var mult=1;
		var num=0;
		for (var i in Game.Objects) {if (Game.Objects[i].name!='Cursor') num+=Game.Objects[i].amount;}
		add=add*num;
		mult*=Game.magicCpS('Cursor');
		return Game.ComputeCps(0.1,Game.Has('Reinforced index finger')+Game.Has('Carpal tunnel prevention cream')+Game.Has('Ambidextrous'),add)*mult;
	}
	
	Game.Objects['Cursor'].buyFunction = (function(){
			var cachedFunc = Game.Objects['Cursor'].buyFunction;
			return function(){
				cachedFunc.apply(this,arguments);
				if (this.amount>=450) Game.Unlock('Nonillion fingers');
				if (this.amount>=500) Game.Unlock('Decillion fingers');
				if (this.amount>=550) Game.Unlock('Undecillion fingers');
				if (this.amount>=600) Game.Unlock('Duodecillion fingers');	
			};
	})();
	
	//Adding new kittens!
	order=20000;
	new Game.Upgrade('Kitten logisticians','You gain <b>more CpS</b> the more milk you have.<q>It\'s simple. Meowve product, grow business.</q>',900000000000000000000000000000000000000,[18,21]);Game.last.kitten=1;
	new Game.Upgrade('Kitten investors','You gain <b>more CpS</b> the more milk you have.<q>Buy low, cat nap, sell high.</q>',900000000000000000000000000000000000000000,[18,25]);Game.last.kitten=1;
	new Game.Upgrade('Kitten executives','You gain <b>more CpS</b> the more milk you have.<q>Let\'s synergize our core competencies and leverage our purrfect track record.</q>',900000000000000000000000000000000000000000000,[18,26]);Game.last.kitten=1;

	//===========Adding new custom achievements
	//Adding the -centenials
	CB.addCustomAchievement('Tricentennial and a half','Have at least <b>350 of everything</b>.<q>Up, up, and away we go. Up, up, and I\'m liking it. Up, up, and away!</q>',[29,12],7002);
	CB.addCustomAchievement('Quadricentenial','Have at least <b>400 of everything</b>.<q>You have, by now, conquered galaxies and converted their excess mass into dough, have thrummed the strings of the cosmos to warm the oven for innumerable cookies, and somehow you do this all with 400 of each building. Huh.</q>',[29,12],7002);
	CB.addCustomAchievement('Quadricentenial and a half','Have at least <b>450 of everything</b><q>...</q>',[29,12],7002);
	CB.addCustomAchievement('Quincentennial','Have at least <b>500 of everything</b><q>Call your family. Tell them you love them and need help..</q>',[29,12],7002);	
	
	//adding the fibbonacci award
	CB.fibbonacciCached = [0,1]; //nth element of array is nth element of sequence A000045
	for(var i = 2; i < 30; i++) CB.fibbonacciCached.push(CB.fibbonacciCached[i-1]+CB.fibbonacciCached[i-2]);	
	CB.addCustomAchievement('Fibonacci','Have at least <b>0 of the most expensive object, 1 of the most second-most, 1 of the third-most, 2 of the next, 3 of the next, and then 5, and so on.</b> <q>Ah, what golden proportions!</q>',[23,12],Game.Achievements['Base 10'].order-0.001*Game.AchievementsN+0.0001); 
	
	//adding the wrinkler tickler
	CB.addCustomAchievement('Wrinkler tickler','Make a single wrinkler twitch for <b>30 consecutive seconds</b>. <q>Awww, coochie coochie coo! Who\'s a good little abyssal worm? <br/> You are!</q>',[19,8],21000); 
	
	//adding the kitten-caboodle upgrade. 
	CB.addCustomAchievement('The whole kitten caboodle','<b>Unlock every kitten</b> in the vanilla game. <q>Such cute kitty capers.</q>',[18,0],11000);
	CB.vanillaKittenUpgrades=[];
	for(var i in Game.Upgrades)
		if(Game.Upgrades[i].kitten && Game.Upgrades[i].vanilla)
			CB.vanillaKittenUpgrades.push(i);
	
	//===========loading relevant data, and saving it.
	if(window.localStorage.getItem(CB.saveTo))
		CB.load();
	else {
		Game.Objects['Cursor'].buyFunction();
		CB.save();
	}
	Game.customSave.push(CB.save);
	Game.customLoad.push(CB.load);
	Game.customLogic.push(CB.logic);
	Game.customCpsMult.push(CB.customCpsMult);
	
	CB.Notify('Cookie Bliss loaded successfully.');
	CB.loaded = true;
	Game.Win('Third-party'); // Give you the Third Party achievement
	
	
	proceed=true;
	proceed = confirm('Cookie Bliss loaded, do you want to also load Cookie Monster?');
	if(proceed)
		Game.LoadMod('http://aktanusa.github.io/CookieMonster/CookieMonster.js');
}


CB.wrinklerBeingTickled = -1;
CB.wrinklerTickleCount = 0;
CB.logic = function(){
	if(Game.T%(Game.fps*5) != 0)
		return; // only execute our logic function every five seconds.
	
	if(Game.milkProgress>=10) Game.Unlock('Kitten logisticians');
	if(Game.milkProgress>=11) Game.Unlock('Kitten investors');
	if(Game.milkProgress>=12) Game.Unlock('Kitten executives');
	
	
	//===updating achievements!
	var fewestNumberOfBuildings = 1000000000;
	var meetsFib = 1;
	for (var i in Game.Objects){
		fewestNumberOfBuildings = Math.min(fewestNumberOfBuildings,Game.Objects[i].amount);
		meetsFib = ( CB.fibbonacciCached[(Game.ObjectsN-Game.Objects[i].id-1)] > Game.Objects[i].amount ) ? 0 : meetsFib;
	}
	
	//checking for the quadricentenial / tricentenial and half, etc.
	if(fewestNumberOfBuildings >= 350) { Game.Win('Tricentennial and a half'); }
	if(fewestNumberOfBuildings >= 400) { Game.Win('Quadricentenial'); }
	if(fewestNumberOfBuildings >= 450) { Game.Win('Quadricentenial and a half'); }
	if(fewestNumberOfBuildings >= 500) { Game.Win('Quincentennial'); }
	if(meetsFib)Game.Win('Fibonacci');
	
	//checking the wrinkler tickler.
	var notickles = 1;
	for(var i in Game.wrinklers)
		if(Game.wrinklers[i].selected){
			notickles = 0;
			if(CB.wrinklerBeingTickled == i){
				CB.wrinklerTickleCount++;
				if(CB.wrinklerTickleCount > 6) Game.Win('Wrinkler tickler');
			}
			else{
				CB.wrinklerTickleCount=0;
				CB.wrinklerBeingTickled = i;
			}
		}
	if(notickles)
		wrinklerBeingTickled = -1;
	
	//checking for the kitten caboodle achievement!
	var allKittens = 1;
	for(var i in CB.vanillaKittenUpgrades)
		allKittens = (allKittens && Game.Has(CB.vanillaKittenUpgrades[i]));
	if(allKittens)
		Game.Win('The whole kitten caboodle');
}

CB.customCpsMult = function(){
	//effecting the custom kitten upgrades.
	var mult = 1.0;	
	var milkMult=1.0;
	
	if (Game.Has('Santa\'s milk and cookies')) milkMult*=1.05;
	if (Game.hasAura('Breath of Milk')) milkMult*=1.05;
	if (Game.hasGod)
	{
		var godLvl=Game.hasGod('mother');
		if (godLvl==1) milkMult*=1.1;
		else if (godLvl==2) milkMult*=1.06;
		else if (godLvl==3) milkMult*=1.03;
	}
	
	if (Game.Has('Kitten logisticians')) mult*=(1+Game.milkProgress*0.2*milkMult);
	if (Game.Has('Kitten investors')) mult*=(1+Game.milkProgress*0.2*milkMult);
	if (Game.Has('Kitten executives')) mult*=(1+Game.milkProgress*0.2*milkMult);

	return mult;
}

CB.addCustomUpgrade = function(name,description,cost,icon,order){
	new Game.Upgrade(name,description,cost,icon);
	Game.Upgrades[name].order = order + Game.Upgrades[name].id*.001;
	CB.customUpgrades.push(name);
}

CB.addCustomAchievement = function(name,description,icon,order){
	new Game.Achievement(name,description,icon)
	Game.Achievements[name].order = order + Game.Achievements[name].id*.001;
	CB.customAchievements.push(name);
}

//call this, and then CB.save if your save is broken I guess?
CB.clearSave = function(){
	window.localStorage.removeItem(CB.saveTo);
}

CB.save = function(){
	var CBState = {};
	CBState.upg = [];
	for (var i in CB.customUpgrades){
		var upg = CB.customUpgrades[i];
		CBState.upg[i] = [upg, Game.HasUnlocked(upg), Game.Upgrades[upg].bought];
	}
	CBState.achievements = [];
	for (var i in CB.customAchievements){
		var cheevo = CB.customAchievements[i];
		CBState.achievements[i] = [cheevo,Game.HasAchiev(cheevo)];
	}
	window.localStorage.setItem(CB.saveTo,JSON.stringify(CBState))
}

CB.load = function(){
	var CBState = JSON.parse(window.localStorage.getItem(CB.saveTo));
	for(var i in CB.customUpgrades){ //checking each of the defined upgrades against the save file
		var upg = CB.customUpgrades[i];
		if(CBState.upg) {
			for(var j in CBState.upg){
				if(upg === CBState.upg[j][0]) {
					if(CBState.upg[j][1])
						Game.Unlock(upg);
					if(CBState.upg[j][2])
						Game.Upgrades[upg].earn();
				}
			}
		}
	}
	
	for(var i in CB.customAchievements){
		var cheevo = CB.customAchievements[i];
		if(CBState.achievements){
			for(var j in CBState.achievements){
				if(cheevo === CBState.achievements[j][0]){
					if(CBState.achievements[j][1]){
						Game.Achievements[cheevo].won=1;
						if(Game.Achievements[cheevo].pool!='shadow')
							Game.AchievementsOwned++;
					}
					else{
						Game.Achievements[cheevo].won=0
					}
				}
			}
		}
	}
	Game.recalculateGains=1;
}


//Helper functions
CB.Notify = function(msg){
	if (document.hasFocus())
		if (Game.prefs.popups) Game.Popup(msg);
			else Game.Notify(msg,'','',1,1);
}


//Calling our initialization script
CB.init();
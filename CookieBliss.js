//We broke the custom kittens and new tiers of stuff. We should probably go about adding that back in!

//The cookie bliss mod object:
var CB = {};
CB.version = 2.016; 
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
	
	//======adding new tiered upgrades and achievements:
	/* obsolete with version 2.012
	
	Game.Tiers[11] = {name:'Taiga',unlock:400,achievUnlock:550,iconRow:21,color:'#7e7ab9',price: 500000000000000000000000};
	Game.Tiers[12] = {name:'Carribean',unlock:450,achievUnlock:600,iconRow:25,color:'#7e7ab9',price: 500000000000000000000000000};
	Game.Tiers[13] = {name:'Carribean',unlock:500,achievUnlock:650,iconRow:27,color:'#7e7ab9',price: 500000000000000000000000000000};
	
	CB.addCustomTieredUpgrade('Glossolalia','Temples are <b>twice</b> as efficient.<q>Extra devotion for half the coherence!</q>','Temple',10);
	
	CB.addCustomTieredUpgrade('Gun(star)ship diplomacy','Shipments are <b>twice</b> as efficient.<q>Take a stronger stand in your neogtiations for cookie dough.</q>','Shipment',10);
	
	CB.addCustomTieredUpgrade('Eldritch holidays','Portals are <b>twice</b> as efficient.<q>Why not host interplanar beings rich in cookie dough for a while?</q>','Portal',10);
	CB.addCustomTieredUpgrade('Perpetual doughtion machine','Portals are <b>twice</b> as efficient.<q>Don\'t tell the guys over in particle physics, but if you just point two portals at each other...</q>','Portal',11);
	//CB.addCustomTieredUpgrade('Eldritch holidays','Portals are <b>twice</b> as efficient.<q></q>','Portal',12);
	//CB.addCustomTieredUpgrade('Eldritch holidays','Portals are <b>twice</b> as efficient.<q></q>','Portal',13);
	
	CB.addCustomTieredUpgrade('Chameleon circuits','Time machines are <b>twice</b> as efficient.<q>When in Rome...</q>','Time machine',10);
	CB.addCustomTieredUpgrade('Time winglets','Time machines are <b>twice</b> as efficient.<q>Reduces the formation of time vortices, an otherwise unavoidable consequence of high rapidity time travel.</q>','Time machine',11);
	CB.addCustomTieredUpgrade('Tackier tachyons','Time machines are <b>twice</b> as efficient.<q>How can a subatomic particle wear plaid?</q>','Time machine',12);
	//CB.addCustomTieredUpgrade('','Time machines are <b>twice</b> as efficient.<q></q>','Time machine',13);
	
	CB.addCustomTieredUpgrade('Hidden sector particles','Antimatter condensers are <b>twice</b> as efficient.<q>Look, Ma! Dark matter!</q>','Antimatter condenser',10);
	CB.addCustomTieredUpgrade('Unsymmetrizer','Antimatter condensers are <b>twice</b> as efficient.<q>Noether told us that each symmetry implies a conservation law, so we\'ve unsymmetrized the Universe to avoid that pesky "conservation of mass" thing.</q>','Antimatter condenser',11);
	//CB.addCustomTieredUpgrade('','Antimatter condensers are <b>twice</b> as efficient.<q></q>','Antimatter condenser',12);
	//CB.addCustomTieredUpgrade('','Antimatter condensers are <b>twice</b> as efficient.<q></q>','Antimatter condenser',13);
	
	CB.addCustomTieredUpgrade('Parametric down conversion','Prism are <b>twice</b> as efficient.<q>Double your photons with the latest and greatest meta-material: Nonlinear crystals!</q>','Prism',10);
	CB.addCustomTieredUpgrade('Umbral refocuser','Prism are <b>twice</b> as efficient.<q>Bring that wasted light back, using techniques from umbral calculus!</q>','Prism',11);
	//CB.addCustomTieredUpgrade('','Prism are <b>twice</b> as efficient.<q></q>','Prism',12);
	//CB.addCustomTieredUpgrade('','Prism are <b>twice</b> as efficient.<q></q>','Prism',13);
	
	CB.addCustomTieredUpgrade('White cats','Chancemakers are <b>twice</b> as efficient.<q>If black cats are unlucky, then surely...</q>','Chancemaker',10);
	CB.addCustomTieredUpgrade('Leprechaun farriers','Chancemakers are <b>twice</b> as efficient.<q>Lucky creatures specializing in making lucky horseshoes.</q>','Chancemaker',11);
	//CB.addCustomTieredUpgrade('','Chancemakers are <b>twice</b> as efficient.<q></q>','Chancemaker',12);
	//CB.addCustomTieredUpgrade('','Chancemakers are <b>twice</b> as efficient.<q></q>','Chancemaker',13);
		
	//====Adding new tiered upgrades.
	CB.addCustomTieredAchievement('No one expects the cookie inquisition','Have <b>400</b> temples.','Temple',9);	
	CB.addCustomTieredAchievement('Church is state','Have <b>450</b> temples.','Temple',10);	
	CB.addCustomTieredAchievement('Xenoreligion','Have <b>500</b> temples.','Temple',11);	
	
	CB.addCustomTieredAchievement('Madwand','Have <b>400</b> wizard towers.','Wizard tower',9);
	CB.addCustomTieredAchievement('Shazam!','Have <b>450</b> wizard towers.','Wizard tower',10);
	CB.addCustomTieredAchievement('Paranormal panpsychism','Have <b>500</b> wizard towers.','Wizard tower',11);
	
	CB.addCustomTieredAchievement('The doughmann transfer','Have <b>400</b> shipments.','Shipment',9);
	CB.addCustomTieredAchievement('Billions and billions','Have <b>450</b> shipments.','Shipment',10);
	CB.addCustomTieredAchievement('A small brown crumb','Have <b>500</b> shipments.','Shipment',11);
	
	CB.addCustomTieredAchievement('Philosopher\'s pebble','Have <b>400</b> alchemy labs.','Alchemy lab',9);
	CB.addCustomTieredAchievement('The diamond age','Have <b>450</b> alchemy labs.','Alchemy lab',10);	
	CB.addCustomTieredAchievement('Postscarcity','Have <b>500</b> alchemy labs.','Alchemy lab',11);	
	
	CB.addCustomTieredAchievement('R\'lyeh rising','Have <b>400</b> portals.','Portal',9);
	CB.addCustomTieredAchievement('Gibbering empire','Have <b>450</b> portals.','Portal',10);
	CB.addCustomTieredAchievement('Elemental chaos','Have <b>500</b> portals.','Portal',11);
	
	CB.addCustomTieredAchievement('A new beginning','Have <b>400</b> time machines.','Time machine',9);
	CB.addCustomTieredAchievement('Tacky tachyons','Have <b>450</b> time machines.','Time machine',10);
	CB.addCustomTieredAchievement('What IS time, anyways?','Have <b>500</b> time machines.','Time machine',11);
	
	
	CB.addCustomTieredAchievement('Plenty of room at the bottom','Have <b>400</b> antimatter condensers.','Antimatter condenser',9);
	CB.addCustomTieredAchievement('Superposistion','Have <b>450</b> antimatter condensers.','Antimatter condenser',10);
	CB.addCustomTieredAchievement('Truth and beauty','Have <b>500</b> antimatter condensers.','Antimatter condenser',11);
	
	
	
	CB.addCustomTieredAchievement('From radio to gamma','Have <b>400</b> Prisms.','Prism',9);
	CB.addCustomTieredAchievement('A well-lighted place','Have <b>450</b> Prisms.','Prism',10);
	CB.addCustomTieredAchievement('Photonic revolution','Have <b>500</b> Prisms.','Prism',11);
	
	CB.addCustomTieredAchievement('Winner winner chicken dinner','Have <b>400</b> chancemakers.','Chancemaker',9);
	CB.addCustomTieredAchievement('Roulette champion','Have <b>450</b> chancemakers.','Chancemaker',10);
	CB.addCustomTieredAchievement('A likely story','Have <b>500</b> chancemakers.','Chancemaker',11);
	
	//Adding new kittens!
	CB.addCustomUpgrade('Kitten logisticians','You gain <b>more CpS</b> the more milk you have.<q>It\'s simple. Meowve product, grow business.</q>',900000000000000000000000000000000000000,[18,21],20000);Game.last.kitten=1;
	CB.addCustomUpgrade('Kitten investors','You gain <b>more CpS</b> the more milk you have.<q>Buy low, cat nap, sell high.</q>',900000000000000000000000000000000000000000,[18,25],20000);Game.last.kitten=1;
	CB.addCustomUpgrade('Kitten executives','You gain <b>more CpS</b> the more milk you have.<q>Let\'s synergize our core competencies and leverage our purrfect track record.</q>',900000000000000000000000000000000000000000000,[18,26],20000);Game.last.kitten=1;
*/
	
	//===========Adding new custom achievements
	//Adding the -centenials
	CB.addCustomAchievement('Quincentennial and a half','Have at least <b>550 of everything</b><q>Call your family. Tell them you love them and need help..</q>',[29,25],7002);		
	CB.addCustomAchievement('Sexcentennial','Have at least <b>600 of everything</b><q>...</q>',[29,25],7002);
	CB.addCustomAchievement('Sexcentennial and a half','Have at least <b>650 of everything</b>.<q>You have, by now, conquered galaxies and converted their excess mass into dough, have thrummed the strings of the cosmos to warm the oven for innumerable cookies, and somehow you do this all with <b>only</b> 650 of each building. Huh.</q>',[29,25],7002);
	CB.addCustomAchievement('Septennial','Have at least <b>700 of everything</b>.<q>Up, up, and away we go.</q>',[29,12],7002);
	
	//adding the fibbonacci award
	CB.fibbonacciCached = [0,1]; //nth element of array is nth element of sequence A000045
	for(var i = 2; i < 30; i++) CB.fibbonacciCached.push(CB.fibbonacciCached[i-1]+CB.fibbonacciCached[i-2]);	
	CB.addCustomAchievement('Fibonacci','Have at least <b>0 of the most expensive object, 1 of the most second-most, 1 of the third-most, 2 of the next, 3 of the next, and then 5, and so on.</b> <q>Ah, what golden proportions!</q>',[23,12],Game.Achievements['Base 10'].order-0.001*Game.AchievementsN+0.0001); 
	
	//adding the wrinkler tickler
	CB.addCustomAchievement('Wrinkler tickler','Make a single wrinkler twitch for <b>30 consecutive seconds</b>. <q>Awww, coochie coochie coo! Who\'s a good little abyssal worm? <br/> You are!</q>',[19,8],21000); 
	
	//adding the kitten caboodle upgrade. 
	CB.addCustomAchievement('The whole kitten caboodle','<b>Unlock every kitten</b> in the vanilla game. <q>Such cute kitty capers.</q>',[18,0],11000);
	CB.vanillaKittenUpgrades=[];
	for(var i in Game.Upgrades)
		if(Game.Upgrades[i].kitten && Game.Upgrades[i].vanilla)
			CB.vanillaKittenUpgrades.push(i);
		
	//Adding the new reset upgrades. Gotta update these for 2.012
	/*
	CB.addCustomAchievement('Ragnarok','Ascend with <b>1 undecillion</b> cookies baked. <q>and roll.</q>',[29,6],30050);
	CB.addCustomAchievement('Apocalypse','Ascend with <b>1 duodecillion</b> cookies baked. <q>The end of an epoch.</q>',[29,6],30050);
	CB.addCustomAchievement('Eschatology','Ascend with <b>1 tredecillion</b> cookies baked. <q>Who dare find us wanting, we whose amibitions strip mined galaxies and plundered nebulae in the name of cookies? Who judges we?</q>',[29,6],30050);
	Game.Reset = (function(){
			var cachedFunc = Game.Reset;
			return function(){
				var cookiesForfeited=Game.cookiesEarned;
				if (cookiesForfeited>=1000000000000000000000000000000000000) Game.Win('Ragnarok');
				if (cookiesForfeited>=1000000000000000000000000000000000000000) Game.Win('Apocalypse');
				if (cookiesForfeited>=1000000000000000000000000000000000000000000) Game.Win('Eschatology');
				cachedFunc.apply(this,arguments);
			};
	})();
	*/
		
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
	
	/*
	if(Game.milkProgress>=10) Game.Unlock('Kitten logisticians');
	if(Game.milkProgress>=11) Game.Unlock('Kitten investors');
	if(Game.milkProgress>=12) Game.Unlock('Kitten executives');
	*/
	
	
	//===updating achievements!
	var fewestNumberOfBuildings = 1000000000;
	var meetsFib = 1;
	for (var i in Game.Objects){
		fewestNumberOfBuildings = Math.min(fewestNumberOfBuildings,Game.Objects[i].amount);
		meetsFib = ( CB.fibbonacciCached[(Game.ObjectsN-Game.Objects[i].id-1)] > Game.Objects[i].amount ) ? 0 : meetsFib;
	}
	if(meetsFib)Game.Win('Fibonacci');
	
	//checking for the quadricentenial / tricentenial and half, etc.
	if(fewestNumberOfBuildings >= 550) { Game.Win('Quincentennial and a half'); }
	if(fewestNumberOfBuildings >= 600) { Game.Win('Sexcentennial'); }
	if(fewestNumberOfBuildings >= 650) { Game.Win('Sexcentennial and a half'); }
	if(fewestNumberOfBuildings >= 700) { Game.Win('Septennial'); }
	
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
	
	/*
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
	*/
	
	return mult;
}

CB.addCustomUpgrade = function(name,description,cost,icon,order){
	new Game.Upgrade(name,description,cost,icon);
	Game.Upgrades[name].order = order + Game.Upgrades[name].id*.001;
	CB.customUpgrades.push(name);
}

CB.ObjectUpgradeOrder = {'Grandma':200,'Farm':300,'Mine':400,'Factory':500,'Bank':525,'Temple':550,'Wizard tower':575,'Shipment':600,'Alchemy lab':700,'Portal':800,'Time machine':900,'Antimatter condenser':1000,'Prism':1100,'Chancemaker':1200};
CB.addCustomTieredUpgrade = function(name,description,associatedObject,tier){
	new Game.TieredUpgrade(name,description,associatedObject,tier);
	Game.Upgrades[name].order = CB.ObjectUpgradeOrder[associatedObject]+Game.Upgrades[name].id*.001;
	CB.customUpgrades.push(name);
}

CB.ObjectAchievementOrder = {'Grandma':1100,'Farm':1200,'Mine':1300,'Factory':1400,'Bank':1425,'Temple':1450,'Wizard tower':1475,'Shipment':1500,'Alchemy lab':1600,'Portal':1700,'Time machine':1800,'Antimatter condenser':1900,'Prism':2000,'Chancemaker':2100};
CB.addCustomAchievement = function(name,description,icon,order){
	new Game.Achievement(name,description,icon)
	Game.Achievements[name].order = order + Game.Achievements[name].id*.001;
	CB.customAchievements.push(name);
}

CB.addCustomTieredAchievement = function(name,description,associatedObject,tier){
	new Game.TieredAchievement(name,description,associatedObject,tier);
	Game.Achievements[name].order = CB.ObjectAchievementOrder[associatedObject]+Game.Achievements[name].id*.001;
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
	
	for(var i in CB.customAchievements){//iterate over all of the custom achievements 
		var cheevo = CB.customAchievements[i];
		if(CBState.achievements){ //iterate over all of the savefile achievements 
			for(var j in CBState.achievements){
				if(cheevo === CBState.achievements[j][0]){ //check each of the savefile achievements to see if it matches something we've added to the game!
					if(CBState.achievements[j][1]){ //if the save file says we've won it 
						if(!Game.Achievements[cheevo].won){ //and we haven't yet 
							Game.Achievements[cheevo].won=1; //add it
							if(Game.Achievements[cheevo].pool!='shadow')
								Game.AchievementsOwned++;
						}
					}
					else{//savefile says we haven't won it, so we probably shouldn't have it.
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
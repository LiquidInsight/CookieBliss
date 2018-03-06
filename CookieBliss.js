//The cookie bliss mod object:
var CB = {};
CB.version = 2.0045;
CB.saveTo = 'CookieBliss';
CB.customUpgrades = [];
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
	CB.addCustomUpgrade('Nonillion fingers','The mouse and cursors gain <b>+50000000</b> cookies for each non-cursor object owned.<q>Lightning cracks, and from the portals spill forth an endless tide of fingers. </q>',10000000000000000000000000,[0,24],100);
	CB.addCustomUpgrade('Decillion fingers','The mouse and cursors gain <b>+500000000</b> cookies for each non-cursor object owned.<q>This uncanny ritual involves fingerless gloves and concentrated nonbaryonic dark matter.</q>',10000000000000000000000000000,[12,24],100);
	CB.addCustomUpgrade('Undecillion fingers','The mouse and cursors gain <b>+5000000000</b> cookies for each non-cursor object owned.<q>Plenty of fingers.</q>',10000000000000000000000000000000,[0,23],100);
	CB.addCustomUpgrade('Dodecillion fingers','The mouse and cursors gain <b>+50000000000</b> cookies for each non-cursor object owned.<q>Fingers all the way down.</q>',10000000000000000000000000000000000,[12,23],100);
	
	//Modifying the cursor cps/buyFunctions to introduce the new -illion finger upgrades.
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
		if (Game.Has('Dodecillion fingers')) add+=	50000000000;

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
				if (this.amount>=600) Game.Unlock('Dodecillion fingers');	
			};
	})();
	
	
	//loading relevant data, and saving it.
	if(window.localStorage.getItem(CB.saveTo))
		CB.load();
	else {
		console.log('running save function');
		Game.Objects['Cursor'].buyFunction();
		CB.save();
	}
	Game.customSave.push(CB.save);
	Game.customLoad.push(CB.load);
	
	CB.Notify('Cookie Bliss loaded successfully.');
	CB.loaded = true;
	Game.Win('Third-party'); // Give you the Third Party achievement
	
	proceed=true;
	proceed = confirm('Load Cookie Monster?');
	if(proceed)
		Game.LoadMod('http://aktanusa.github.io/CookieMonster/CookieMonster.js');
}

CB.addCustomUpgrade = function(name,description,cost,icon,order){
	new Game.Upgrade(name,description,cost,icon);
	Game.Upgrades[name].order = order + Game.Upgrades[name].id*.001;
	CB.customUpgrades.push(name);
}

//call this, and then CB.save if your save is broken I guess?
CB.clearSave = function(){
	window.localStorage.removeItem(CB.saveTo);
}

CB.save = function(){
	CBState = {};
	CBState.upg = [];
	for (var i in CB.customUpgrades){
		var upg = CB.customUpgrades[i];
		CBState.upg[i] = [upg, Game.HasUnlocked(upg), Game.Upgrades[upg].bought];
	}
	window.localStorage.setItem(CB.saveTo,JSON.stringify(CBState))
}

CB.load = function(){
	CBState = JSON.parse(window.localStorage.getItem(CB.saveTo));
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
}



//Helper functions
CB.Notify = function(msg){
	if (document.hasFocus())
		if (Game.prefs.popups) Game.Popup(msg);
			else Game.Notify(msg,'','',1,1);
}



//Calling our initialization script
CB.init();
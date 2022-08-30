const SUPERNOVA_GALAXY = {
	req(){
		return E(1.246).pow(player.superGal).mul(1e6).floor();
	},
	reset(){
		if(player.supernova.times.lt(SUPERNOVA_GALAXY.req()))return;
		if(confirm("Are you sure to reset for a Supernova Galaxy? It will reset all previous, including Prestiges.")?!confirm("ARE YOU SURE ABOUT IT???"):true) return
		player.superGal = player.superGal.add(1);
		player.prestiges=[E(0),E(0),E(0)];
		player.supernova.tree=[];
		player.chal.comps[9] = E(0)
		player.chal.comps[10] = E(0)
		player.chal.comps[11] = E(0)
		player.chal.comps[12] = E(0)
		player.chal.comps[13] = E(0)
		player.chal.comps[14] = E(0)
		player.chal.comps[15] = E(0)
		player.chal.comps[16] = E(0)
		player.chal.comps[17] = E(0)
		player.chal.comps[18] = E(0)
		player.chal.comps[19] = E(0)
		player.chal.comps[20] = E(0)
		player.inf.reached = false
        tmp.pass = false
		player.mainUpg.inf = []
		ETERNITY_LAYER.doReset()
		player.inf.points = E(0);
		player.inf.times = E(0);
		player.et.points = E(0);
		player.et.shards = E(0);
		player.et.shard_gen = E(0);
		player.et.times = E(0);
		player.atom.points = E(0)
		player.atom.quarks = E(0)
		if(player.superGal.lt(2))player.rp.unl = false;
		if(player.superGal.lt(2))player.bh.unl = false;
		if(player.superGal.lt(2))player.atom.unl = false;
		if(player.superGal.lt(2))player.supernova.fermions.unl = false;
		player.atom.elements=SUPERNOVA_GALAXY.effects.elem();
		if(player.superGal.lt(2))player.qu.reached = false;
		if(player.superGal.lt(2))player.qu.chr_get = [];
		player.qu.times = SUPERNOVA_GALAXY.effects.qut();
		tmp.radiation.unl = false;
		player.supernova.tree=[];
		player.qu.rip.first = false;
		if(player.superGal.lt(2))player.supernova.post_10 = false;
		player.md.break.upgs=[E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0)];
		player.prestigeMass=new Decimal(0);
		if(player.superGal.gte(3))player.mainUpg.rp=[4,5,6];
		if(player.superGal.gte(3))player.mainUpg.bh=[4,5,6];
		if(player.superGal.gte(3))player.mainUpg.atom=[2,3,4,5,6];
		TABS.choose(0);
		TABS.choose(5);
	},
	effects:{
		pqgs(){
			if(player.superGal.lt(1))return new Decimal(1);
			return Decimal.pow(6, player.superGal);
		},
		rp(){
			if(player.superGal.lt(1))return new Decimal(1);
			return Decimal.pow(2.5, player.superGal);
		},
		bh(){
			if(player.superGal.lt(2))return new Decimal(1);
			return Decimal.pow(2, player.superGal.sub(1));
		},
		tsMult(){
			if(player.superGal.lt(1))return new Decimal(1);
			return Decimal.pow(1e5, player.superGal);
		},
		ts(){
			if(player.superGal.lt(1))return new Decimal(1);
			return Decimal.pow(2, player.superGal);
		},
		apMult(){
			if(player.superGal.lt(1))return new Decimal(1);
			return Decimal.pow(10, player.superGal.pow(0.1));
		},
		nsMult(){
			if(player.superGal.lt(1))return new Decimal(1);
			return Decimal.pow(100, player.superGal);
		},
		ns(){
			if(player.superGal.lt(1))return new Decimal(1);
			return Decimal.pow(2, player.superGal);
		},
		meta(){
			if(player.superGal.lt(1))return new Decimal(1);
			return Decimal.pow(10, player.superGal);
		},
		entropyg(){
			if(player.superGal.lt(1))return new Decimal(1);
			return Decimal.pow(100, player.superGal);
		},
		entropy(){
			if(player.superGal.lt(1))return new Decimal(1);
			return Decimal.pow(1e100, player.superGal.pow(2));
		},
		chal(){
			if(player.superGal.lt(1))return new Decimal(0);
			return Decimal.mul(100, player.superGal).floor();
		},
		elem(){
			if(player.superGal.gte(3))return [14,24,134,170,218];
			return [134,170,218];
		},
		inf(){
			if(player.superGal.lt(1))return new Decimal(1);
			return Decimal.pow(2, player.superGal);
		},
		qs(){
			if(player.superGal.lt(1))return 0;
			return player.superGal.min(10).toNumber()*40+8;
		},
		qut(){
			if(player.superGal.lt(2))return new Decimal(0);
			return Decimal.pow(2, player.superGal);
		},
		qut2(){
			if(player.superGal.lt(2))return new Decimal(1);
			return Decimal.pow(2, player.superGal);
		},
		aesc(){
			if(player.superGal.lt(3))return new Decimal(1);
			return Decimal.mul(0.5, player.superGal);
		},
	},
	galPow0_gain(){
		if(player.superGal.lt(1))return E(0);
		return player.supernova.stars.add(1).log10().pow(player.superGal);
	},
	galPow0_eff(){
		let ret=Decimal.pow(1.01,player.galPow[0].add(1).log10());
		if(hasPrestige(1,90))ret = ret.pow(2)
		return overflow(overflow(overflow(ret,2,3),"e500",0.275),"e1500",0.25);
	},
}

function calcSupernovaGalaxy(dt, dt_offline) {
	player.galPow[0] = player.galPow[0].add(SUPERNOVA_GALAXY.galPow0_gain().mul(dt));
}

function updateSupernovaGalaxyHTML() {
    tmp.el.superGal.setTxt(format(player.superGal,0))
    tmp.el.superGalReq.setTxt(format(SUPERNOVA_GALAXY.req(),0))
	tmp.el.galPow0span.setDisplay(player.superGal.gte(1));
	
	if(player.superGal.gte(1)){
		var html="Your Supernova Galaxies gives you following effects:";
		html += "<br>Multiply Pre-Quantum Global Speed by "+format(SUPERNOVA_GALAXY.effects.pqgs());
		html += "<br>Multiply mass gain by "+format(SUPERNOVA_GALAXY.effects.pqgs());
		html += "<br>Raise Rage Power gain by "+format(SUPERNOVA_GALAXY.effects.rp());
		if(player.superGal.gte(2))html += "<br>Raise Black Hole mass gain by "+format(SUPERNOVA_GALAXY.effects.bh());
		html += "<br>Multiply Tickspeed Power by "+format(SUPERNOVA_GALAXY.effects.tsMult())+", then raise it by "+format(SUPERNOVA_GALAXY.effects.ts());
		html += "<br>Multiply Accelerator Power by "+format(SUPERNOVA_GALAXY.effects.apMult());
		html += "<br>Multiply Neutron star gain by "+format(SUPERNOVA_GALAXY.effects.nsMult())+", then raise it by "+format(SUPERNOVA_GALAXY.effects.ns());
		html += "<br>The meta-scalings of Rank, Tier, Tickspeeds, BH Condensers and Cosmic Rays starts "+format(SUPERNOVA_GALAXY.effects.meta())+"x later";
		html += "<br>Entropy gain is multiplied by "+format(SUPERNOVA_GALAXY.effects.entropyg());
		html += "<br>Entropy cap is multiplied by "+format(SUPERNOVA_GALAXY.effects.entropy());
		html += "<br>Add "+format(SUPERNOVA_GALAXY.effects.chal())+" C1-C16 max completions";
		html += "<br>You start with Elements "+SUPERNOVA_GALAXY.effects.elem().join(", ");
		html += "<br>You start with "+SUPERNOVA_GALAXY.effects.qs()+" Quantum Shards";
		html += "<br>Gain "+format(SUPERNOVA_GALAXY.effects.inf())+"x more Infinity and Eternal Mass";
		if(player.superGal.gte(2))html += "<br>You start with Chroma Unlocked";
		if(player.superGal.gte(2))html += "<br>You start with "+format(SUPERNOVA_GALAXY.effects.qut())+" Quantizes";
		if(player.superGal.gte(2))html += "<br>Gain "+format(SUPERNOVA_GALAXY.effects.qut2())+"x more Quantizes, Infinities and Eternities";
		if(player.superGal.gte(3))html += "<br>Accelerator Effect Softcap^1-^2 starts "+format(SUPERNOVA_GALAXY.effects.aesc())+"x later";
		tmp.el.superGalEff.setHTML(html)
		tmp.el.galPow0.setTxt(format(player.galPow[0])+player.galPow[0].formatGain(SUPERNOVA_GALAXY.galPow0_gain()))
		tmp.el.galPow0_eff.setTxt(format(SUPERNOVA_GALAXY.galPow0_eff()))
	}
	
    
}

const MATTERS = {
    gain(i) {
		let base=(i==0)?player.bh.dm : player.exotic.matters[i-1]
		if(base.slog().lt(2))return E(0)
		let x = Decimal.pow(10,base.slog().sub(1).pow(MATTERS.pow().mul(hasTree('ax16')?base.slog().div(3).max(1):1))).sub(10);
		if(i==1 && hasTree('qp15'))x = x.mul(treeEff('qp15'));
		if(i==2 && hasElement(513))x = x.mul(tmp.elements.effect[513]||1);
		if(i<MATTERS_LENGTH-1 && hasElement(548))x = x.mul(player.exotic.matters[i+1].add(1).pow(MATTERS.extendPow()));
		return x;
    },
    eff(i) {
		let base=player.exotic.matters[i]
		if(player.chal.active==23)base=E(0)
		if(i==0||i==3||i==11){
			let x = base.add(1).cbrt();
			if(x.gte(1e10))x = x.log10().pow(10);
			return x;
		}
		if(i==1){
			let x = base.add(1).log10();
			if(hasTree("qp34"))x = x.pow(1.5);
			if(x.gte(100))x = x.log10().mul(50);
			return E(0.9).pow(x);
		}
		if(i==2||i==10){
			return base.add(1).log10().add(1).log10();
		}
		if(i==4){
			return base.add(1).log10().add(1).log10().pow(2).mul(50000);
		}
		if(i==5||i==6||i==7||i==9){
			return base.add(1).log10().add(1).log10().add(1).log10().add(1);
		}
		if(i==8){
			return base.add(1).log10().add(1).log10().add(1).log10().add(1).log10().div(10);
		}
		if(i==12){
			let x = base.add(1).log10().add(10).log10();
			return x;
		}
    },
    exeff() {
		if(hasTree('ax9'))return player.exotic.points.add(1e10).log10().sqrt().div(2.63).log10().mul(10)
		if(player.exotic.points.gte('1e360'))return player.exotic.points.add(10).log10().div(10).sqrt().mul(0.6).min(5).mul(hasElement(495)?2:1).min(10);
		if(player.exotic.points.gte('1e260'))return player.exotic.points.add(10).log10().div(50).sub(3.6).min(5).mul(hasElement(495)?2:1).min(10);
		return player.exotic.points.add(10).log10().div(100).sub(1).min(5).mul(hasElement(495)?2:1).min(10);
    },
    pow() {
		let x = E(1)
		if (hasTree('qp10')) x = x.add(0.3)
		if (hasElement(487)) x = x.add(MATTERS.exeff());
		if (hasElement(490)) x = x.add(0.4)
		if (hasElement(492)) x = x.add(EXOTIC.dsEff().me)
		if (hasElement(493)) x = x.add(0.3)
		if (hasElement(508)) x = x.add(tmp.elements.effect[508]||0)
		if (hasElement(512)) x = x.add(EXOTIC.abEff().me)
		if (hasElement(524)) x = x.add(EXOTIC.drEff().me)
		if (hasElement(544)) x = x.add(tmp.elements.effect[544]||0)
		if (hasElement(545)) x = x.add(tmp.chal.eff[23]||0)
		if (hasTree('qp17')) x = x.add(treeEff('qp17',0))
		if (hasTree('ax5')) x = x.add(treeEff('ax5',0))
		if(player.superCluster.gte(13))x = x.add(SUPERNOVA_CLUSTER.effects.eff6());
		if(player.exotic.dark_run.upgs[15].gte(1))x = x.add(tmp.dark_run.upgs[15].eff);
		return x
    },
    extendPow() {
		let x = E(0)
		if (hasElement(548)) x = x.add(player.exotic.fss.div(100));
		return x
    },
	fssBase(){
		let x = E(0);
		for(var i=0;i<MATTERS_LENGTH;i++){
			x = x.add(player.exotic.matters[i].add(1).log10().add(1).log10());
		}
		return x;
	},
	fssReq(){
		return E(40).mul(Decimal.pow(1.1,player.exotic.fss));
	},
	fssEff(){
		let x = MATTERS.fssBase().pow(player.exotic.fss).sqrt();
		if(hasTree('ax7'))x = x.pow(treeEff('ax7')||1);
			return x;
	},
	fssReset(force=false){
		if(!force)if(MATTERS.fssBase().lt(MATTERS.fssReq()))return;
		if(!force)if((confirm("Are you sure to reset for a Final Star Shard? It will force an Exotic Reset, and reset your Exotic Matter!")?!confirm("ARE YOU SURE ABOUT IT???"):true)) return
		if(!force)player.exotic.fss = player.exotic.fss.add(1);
		player.exotic.matters = getPlayerData().exotic.matters;
		player.exotic.points = E(0);
		player.prestigeMass = E(0);
		player.prestigeRP = E(0);
		player.prestigeBH = E(0);
		player.prestigeBHC = E(0);
		player.prestigeDM = E(0);
		player.prestigeTickspeed = E(0);
		SUPERNOVA_CLUSTER.reset(true);
	}
}

const MATTERS_LENGTH = 13;
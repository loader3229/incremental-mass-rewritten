const SUPERNOVA_GALAXY = {
	req_base(){
		let ret = 1.246;
		if(hasElement(291))ret -= 0.006;
		if(hasElement(323))ret -= 0.01;
		if(hasUpgrade('inf',21))ret -= 0.01;
		if(hasElement(396))ret -= 0.01;
		if(hasElement(422))ret -= 0.01;
		return ret;
	},
	req_start(){
		let ret=1e6;
		if(hasElement(467))ret /= 40;
		if(hasAscension(1,19))ret /= 2;
		if(hasElement(539))ret /= 125;
		return ret;
	},
	req(){
		return E(SUPERNOVA_GALAXY.req_base()).pow(player.superGal.scaleEvery('superGal')).mul(SUPERNOVA_GALAXY.req_start()).floor();
	},
	bulk(){
		if(player.supernova.times.lt(SUPERNOVA_GALAXY.req_start()))return new Decimal(0);
		return player.supernova.times.div(SUPERNOVA_GALAXY.req_start()).log(SUPERNOVA_GALAXY.req_base()).scaleEvery('superGal',true).add(1).floor();
	},
	reset(force=false){
		if(!force)if(player.supernova.times.lt(SUPERNOVA_GALAXY.req()))return;
		if(!force)if (player.confirms.sg) if((confirm("Are you sure to reset for a Supernova Galaxy? It will reset all previous, including Prestiges.")?!confirm("ARE YOU SURE ABOUT IT???"):true)) return
		if(!force && hasElement(291))player.superGal = player.superGal.max(SUPERNOVA_GALAXY.bulk());
		else if(!force)player.superGal = player.superGal.add(1);
		if(player.superGal.lt(11)){
			player.prestiges=getPlayerData().prestiges;
		}
		if(player.superGal.lt(6))player.supernova.tree=[];
		player.chal.comps[9] = E(0)
		player.chal.comps[10] = E(0)
		player.chal.comps[11] = E(0)
		player.chal.comps[12] = E(0)
		if(player.superGal.lt(13))player.chal.comps[13] = E(0)
		if(player.superGal.lt(13))player.chal.comps[14] = E(0)
		if(player.superGal.lt(13))player.chal.comps[15] = E(0)
		if(player.superGal.lt(13))player.chal.comps[16] = E(0)
		if(player.superGal.lt(13))player.chal.comps[17] = E(0)
		if(player.superGal.lt(13))player.chal.comps[18] = E(0)
		if(player.superGal.lt(13))player.chal.comps[19] = E(0)
		if(player.superGal.lt(13))player.chal.comps[20] = E(0)
		player.inf.reached = false
        tmp.pass = false
		if(player.superGal.lt(10))player.mainUpg.inf = []
		ETERNITY_LAYER.doReset()
		player.inf.points = E(0);
		player.inf.times = E(0);
		if(player.superGal.gte(10))player.inf.times = E(2);
		if(!hasElement(383))player.et.points = E(0);
		player.et.shards = E(0);
		if(!hasElement(383))player.et.shard_gen = E(0);
		if(!hasElement(383))player.et.times = E(0);
		player.atom.points = E(0)
		player.atom.quarks = E(0)
		if(player.superGal.lt(2))player.rp.unl = false;
		if(player.superGal.lt(2))player.bh.unl = false;
		if(player.superGal.lt(2))player.atom.unl = false;
		if(player.superGal.lt(2))player.supernova.fermions.unl = false;
		if(player.superGal.lt(8))player.atom.elements=SUPERNOVA_GALAXY.effects.elem();
		if(player.superGal.lt(2))player.qu.reached = false;
		if(player.superGal.lt(2))player.qu.chr_get = [];
		player.qu.times = SUPERNOVA_GALAXY.effects.qut();
		tmp.radiation.unl = false;
		if(player.superGal.lt(5))player.supernova.tree=[];
		if(player.superGal.lt(10))player.qu.rip.first = false;
		if(player.superGal.lt(2))player.supernova.post_10 = false;
		player.md.break.upgs=[E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0)];
		player.prestigeMass=new Decimal(0);
		if(player.superGal.gte(3) && !hasUpgrade('exotic',19))player.mainUpg.rp=[4,5,6];
		if(player.superGal.gte(3) && !hasUpgrade('exotic',19))player.mainUpg.bh=[4,5,6];
		if(player.superGal.gte(3) && !hasUpgrade('exotic',19))player.mainUpg.atom=[2,3,4,5,6];
		player.supernova.fermions.tiers[0]=[E(0),E(0),E(0),E(0),E(0),E(0)];
		player.supernova.fermions.tiers[1]=[E(0),E(0),E(0),E(0),E(0),E(0)];
		if(!hasElement(291))TABS.choose(0);
		if(!hasElement(291))tmp.rank_tab = 0;
		if(!hasElement(291))TABS.choose(5);
	},
	effects:{
		pqgs(){
			if(player.superGal.lt(1) || player.chal.active == 21)return new Decimal(1);
			return Decimal.pow(6, player.superGal);
		},
		rp(){
			if(player.superGal.lt(1) || player.chal.active == 21)return new Decimal(1);
			if(hasElement(240))return Decimal.pow(50, player.superGal.pow(2.5));
			return Decimal.pow(2.5, player.superGal);
		},
		bh(){
			if(player.superGal.lt(2) || player.chal.active == 21)return new Decimal(1);
			return Decimal.pow(2, player.superGal.sub(1));
		},
		tsMult(){
			if(player.superGal.lt(1) || player.chal.active == 21)return new Decimal(1);
			return Decimal.pow(1e5, player.superGal);
		},
		ts(){
			if(player.superGal.lt(1) || player.chal.active == 21)return new Decimal(1);
			return Decimal.pow(2, player.superGal);
		},
		apMult(){
			if(player.superGal.lt(1) || player.chal.active == 21)return new Decimal(1);
			return Decimal.pow(10, player.superGal.pow(0.1));
		},
		nsMult(){
			if(player.superGal.lt(1) || player.chal.active == 21)return new Decimal(1);
			return Decimal.pow(100, player.superGal);
		},
		ns(){
			if(player.superGal.lt(1) || player.chal.active == 21)return new Decimal(1);
			return Decimal.pow(2, player.superGal);
		},
		meta(){
			if(player.superGal.lt(1) || player.chal.active == 21)return new Decimal(1);
			return Decimal.pow(10, player.superGal);
		},
		entropyg(){
			if(player.superGal.lt(1) || player.chal.active == 21)return new Decimal(1);
			if(hasPrestige(3,40))return Decimal.pow(1e5, player.superGal.pow(3));
			if(hasElement(254))return Decimal.pow(1e100, player.superGal.pow(1.5));
			return Decimal.pow(100, player.superGal);
		},
		entropy(){
			if(player.superGal.lt(1) || player.chal.active == 21)return new Decimal(1);
			if(hasElement(356))return Decimal.pow(1e5, player.superGal.pow(3));
			return Decimal.pow(1e100, player.superGal.pow(2));
		},
		chal(){
			if(player.superGal.lt(1) || player.chal.active == 21)return new Decimal(0);
			return Decimal.mul(100, player.superGal).floor();
		},
		chal2(){
			if(player.superGal.lt(34) || player.chal.active == 21)return new Decimal(0);
			return Decimal.mul(100, player.superGal.sub(30)).floor();
		},
		elem(){
			if(player.superGal.gte(8))return 0;
			if(player.superGal.gte(3))return [14,24,134,170,218];
			return [134,170,218];
		},
		inf(){
			if(player.superGal.lt(1) || player.chal.active == 21)return new Decimal(1);
			return Decimal.pow(2, player.superGal);
		},
		qs(){
			if(player.superGal.lt(1))return 0;
			return player.superGal.min(10).toNumber()*40+8;
		},
		qut(){
			if(player.chal.active == 21)return new Decimal(10);
			if(player.superGal.lt(2))return new Decimal(0);
			return Decimal.pow(2, player.superGal);
		},
		qut2(){
			if(player.superGal.lt(2) || player.chal.active == 21)return new Decimal(1);
			return Decimal.pow(2, player.superGal);
		},
		aesc(){
			if(player.superGal.lt(3) || player.chal.active == 21)return new Decimal(1);
			return Decimal.mul(0.5, player.superGal);
		},
		em(){
			if(!hasElement(467))return 1;
			return player.superGal.add(1);
		},
	},
	galPow0_gain(){
		if(player.superGal.lt(1))return E(0);
		let ret=player.supernova.stars.add(1).log10();
		ret = overflow(ret,"e2e34",0.1);
		ret = ret.pow(player.superGal).pow(tmp.gc.GSeffect);
		return ret.mul(SUPERNOVA_GALAXY.galPow6_eff());
	},
	galPow0_eff(){
		if(player.chal.active == 21)return E(1);
		let ret=Decimal.pow(1.01,player.galPow[0].add(1).log10());
		if(hasPrestige(1,90))ret = ret.pow(2)
		if(player.superCluster.gte(9))ret = ret.pow(34.830358446787444612070950011779)
		let ss1p=E(0.275);
		if(hasElement(257))ss1p = E(1);
		else{
			if(hasElement(225))ss1p = ss1p.pow(0.9326007411640309);
			if(hasElement(228))ss1p = ss1p.pow(0.9335178441025087);
			if(hasElement(248))ss1p = ss1p.pow(0.92);
		}
		let ss2p=E(0.25);
		if(hasElement(326))ss2p = ss2p.pow(0.9);
		if(hasElement(353))ss2p = ss2p.pow(0.9);
		if(player.superCluster.gte(9))ss2p = ss2p.pow(0.978371914025405050280085767869);
		return overflow(overflow(overflow(ret,2,3),"e500",ss1p),"e1500",ss2p);
	},
	galPow1_gain(){
		if(player.superGal.lt(6))return E(0);
		return player.atom.points.add(1).log10().add(1).log10().pow(player.superGal).pow(hasElement(287)?tmp.gc.GSeffect:1).mul(SUPERNOVA_GALAXY.galPow6_eff());
	},
	galPow1_eff(){
		if(player.chal.active == 21)return E(1);
		let ret=Decimal.pow(1.1,player.galPow[1].add(1).log10())
		if(hasElement(234))ret = ret.pow(1.8);
		if(hasElement(373))return overflow(ret,2,3.6);
		return overflow(overflow(ret,2,3),"1e30000",0.1);
	},
	galPow2_gain(){
		if(player.superGal.lt(6))return E(0);
		return player.bh.dm.add(1).log10().add(1).log10().pow(player.superGal).pow(hasElement(281)?tmp.gc.GSeffect:1).mul(SUPERNOVA_GALAXY.galPow6_eff());
	},
	galPow2_eff(){
		if(player.chal.active == 21)return E(1);
		let ret=Decimal.pow(1.1,player.galPow[2].add(1).log10());
		if(hasPrestige(1,136))ret = ret.pow(2.6)
		if(hasElement(469))return overflow(ret.pow(3),2,4);
		if(hasElement(347))return overflow(ret.pow(3),2,3);
		return overflow(overflow(overflow(ret,2,3),"1e43000",0.5),"1e100000",0.5);
	},
	galPow3_gain(){
		if(player.superGal.lt(7))return E(0);
		let ret=player.supernova.bosons.photon.add(1).log10().add(1).log10().mul(player.supernova.bosons.gluon.add(1).log10().add(1).log10()).pow(player.superGal.sub(5))
		ret = ret.pow(hasElement(317)?tmp.gc.GSeffect:1)
		ret = ret.mul(tmp.fermions.effs[3][1]||E(1));
		if(hasElement(503))ret = ret.pow(tmp.fermions.effs2[3][1]||E(1))
		return ret.mul(SUPERNOVA_GALAXY.galPow6_eff());
	},
	galPow3_eff(){
		if(player.chal.active == 21)return E(1);
		let ret=Decimal.pow(1.275,player.galPow[3].add(1).log10());
		if(hasElement(270))ret = ret.pow(1.2);
		if(hasElement(469))return overflow(ret.pow(3),2,3);
		if(hasElement(347))return overflow(overflow(ret,2,3),"1e50",0.7);
		return overflow(overflow(ret,2,3),"1e50",0.5);
	},
	galPow4_gain(){
		if(player.superGal.lt(9))return E(0);
		let ret=player.supernova.fermions.points[0].add(1).log10().add(1).log10().mul(player.supernova.fermions.points[1].add(1).log10().add(1).log10()).pow(player.superGal.sub(7));
		
		for(var i = 2; i <= 3; i++)for(var j = 0;j < 6; j++){
			ret = ret.mul(player.supernova.fermions.tiers[i][j].add(1).pow(2));
		}
		ret = ret.pow(hasElement(329)?tmp.gc.GSeffect:1)
		
		return ret.mul(SUPERNOVA_GALAXY.galPow6_eff());
	},
	galPow4_eff(){
		if(player.chal.active == 21)return E(1);
		let ret=Decimal.pow(1.3,player.galPow[4].add(1).log10());
		if(hasElement(375))return overflow(ret,2,3);
		return overflow(overflow(ret,2,3),"1e1500",0.5);
	},
	galPow5_gain(){
		if(player.superGal.lt(9))return E(0);
		let ret=player.supernova.radiation.hz.add(1).log10().add(1).log10().pow(player.superGal.sub(6));
		ret = ret.pow(hasElement(345)?tmp.gc.GSeffect:1)
		ret = ret.mul(tmp.fermions.effs[2][4]||E(1));
		if(hasElement(503))ret=ret.pow(tmp.fermions.effs2[2][4]||E(1))
		return ret.mul(SUPERNOVA_GALAXY.galPow6_eff());
	},
	galPow5_eff(){
		if(player.chal.active == 21)return E(1);
		let ret=Decimal.pow(1.1,player.galPow[5].add(1).log10().pow(hasTree('qp14')?3:2.5));
		return ret;
	},
	galPow6_gain(){
		if(player.superCluster.lt(9))return E(0);
		let ret=player.superGal.pow(player.superCluster);
		if(player.superCluster.lt(22))ret=player.superGal.pow(player.superCluster.div(3).sub(2));
		if(hasAscension(2,11))ret = ret.mul(ascensionEff(2,11));
		return ret;
	},
	galPow6_eff(){
		if(player.chal.active == 21)return E(1);
		let ret=player.galPow[6].add(1).sqrt();
		return ret;
	},
	galQkGain(){
		if(player.superGal.lt(10))return E(0);
		let ret=player.supernova.fermions.points[0].add(1).log10().add(1).log10().add(1).log10();
		if(hasElement(386))ret=player.supernova.fermions.points[0].add(1).log10().add(1).log10().add(1).log10().max(player.supernova.fermions.points[0].add(1).log10().add(1).log10().pow(0.1));
		if(hasElement(374))ret=ret.mul(player.atom.quarks.add(1).log10().add(1).log10().pow(0.1));
		else ret=ret.mul(player.atom.quarks.add(1).log10().add(1).log10().add(1).log10());
		if(hasElement(260)){
			ret = ret.pow(player.superGal.softcap(100,0.5,0).div(2));
		}else{
			ret = ret.pow(player.superGal.softcap(100,0.5,0).div(3));
		}
		if(hasPrestige(1,242)){
			ret = ret.mul(prestigeEff(1,242,E(1)));
		}
		if(hasPrestige(3,12)){
			ret = ret.mul(prestigeEff(3,12,E(1)));
		}
		if(hasAscension(0,6)){
			ret = ret.mul(ascensionEff(0,6,E(1)));
		}
        if (hasAscension(1,2)) ret = ret.mul(ascensionEff(1,2,E(1)));
		if(hasElement(294))ret = ret.mul(overflow(player.supernova.fermions.tiers[3][5],11,2).add(1).pow(2));
		if(hasElement(339))ret = ret.mul(tmp.elements.effect[339]);
		if(hasElement(381))ret = ret.mul(tmp.elements.effect[381]);
		if(hasElement(382)){
			ret = ret.mul(tmp.ex.dsEff.ex);
		}
		if(hasElement(503))ret = ret.mul(overflow(player.supernova.fermions.tiers[3][5].max(100).sub(100),10,2).add(1).pow(2));
		
		if (player.exotic.times.gte(3))ret = ret.mul(player.exotic.times);
		
		if(hasUpgrade('bh',22))ret = ret.mul(upgEffect(2,18));
		if(hasUpgrade('atom',23))ret = ret.mul(upgEffect(3,18));
		if(hasUpgrade('rp',24))ret = ret.mul(upgEffect(1,18));
		if(hasUpgrade('inf',25))ret = ret.mul(upgEffect(5,24));
		ret = ret.mul(SUPERNOVA_CLUSTER.effects.eff1())
		if (player.ranks.enne.gte(6)) ret = ret.mul(RANKS.effect.enne[6]())
		ret = ret.mul(SUPERNOVA_GALAXY.galPow6_eff())
		if(hasElement(486))ret = ret.mul(MATTERS.eff(3));
		if(player.superCluster.gte(21))ret = ret.mul(tmp.stellar.eff);
		return ret;
	},
}

function calcSupernovaGalaxy(dt, dt_offline) {
	player.galPow[0] = player.galPow[0].add(SUPERNOVA_GALAXY.galPow0_gain().mul(dt));
	player.galPow[1] = player.galPow[1].add(SUPERNOVA_GALAXY.galPow1_gain().mul(dt));
	player.galPow[2] = player.galPow[2].add(SUPERNOVA_GALAXY.galPow2_gain().mul(dt));
	player.galPow[3] = player.galPow[3].add(SUPERNOVA_GALAXY.galPow3_gain().mul(dt));
	player.galPow[4] = player.galPow[4].add(SUPERNOVA_GALAXY.galPow4_gain().mul(dt));
	player.galPow[5] = player.galPow[5].add(SUPERNOVA_GALAXY.galPow5_gain().mul(dt));
	player.galPow[6] = player.galPow[6].add(SUPERNOVA_GALAXY.galPow6_gain().mul(dt));
	player.galQk = player.galQk.add(SUPERNOVA_GALAXY.galQkGain().mul(dt));
	player.stardust = player.stardust.add(SUPERNOVA_CLUSTER.stardustGain().mul(dt));
	if(player.exotic.times.gte(50))player.superGal = player.superGal.max(SUPERNOVA_GALAXY.bulk());
		
    tmp.stellar.cost = E(2).pow(player.stellar_gen.add(1)).mul(1e30)
    tmp.stellar.bulk = player.stardust.div(1e30).max(1).log(2).floor()

    tmp.stellar.can = player.stardust.gte(tmp.stellar.cost)
    tmp.stellar.pow = SUPERNOVA_CLUSTER.stellar_gen.eff().pow
    tmp.stellar.gen_eff = SUPERNOVA_CLUSTER.stellar_gen.eff().eff
    tmp.stellar.gain = SUPERNOVA_CLUSTER.stellarGain()
    tmp.stellar.eff = SUPERNOVA_CLUSTER.stellarEff()
	player.stellar = player.stellar.add(tmp.stellar.gain.mul(dt));
	
}

function updateSupernovaGalaxyHTML() {
    tmp.el.superGal.setTxt(format(player.superGal,0))
	tmp.el.superGalScale.setTxt(getScalingName('superGal'));
    tmp.el.superGalReq.setTxt(format(SUPERNOVA_GALAXY.req(),0))
	tmp.el.galPow0span.setDisplay(player.superGal.gte(1));
	tmp.el.galPow1span.setDisplay(player.superGal.gte(6));
	tmp.el.galPow2span.setDisplay(player.superGal.gte(6));
	tmp.el.galPow3span.setDisplay(player.superGal.gte(7));
	tmp.el.galPow4span.setDisplay(player.superGal.gte(9));
	tmp.el.galPow5span.setDisplay(player.superGal.gte(9));
	tmp.el.galPow6span.setDisplay(player.superCluster.gte(9));
	tmp.el.stardustspan.setDisplay(player.superCluster.gte(14));
	tmp.el.galQkspan.setDisplay(player.superGal.gte(10));
	tmp.el.galPowNextspan.setDisplay(true);
	
	if(player.superGal.gte(1)){
		var html="您的超新星星系提供了以下效果：";
		html += "<br>量子之前所有资源获取速度变为原来的"+format(SUPERNOVA_GALAXY.effects.pqgs())+"倍";
		html += "<br>质量获取变为原来的"+format(SUPERNOVA_GALAXY.effects.pqgs())+"倍";
		html += "<br>狂怒能量获取变为原来的"+format(SUPERNOVA_GALAXY.effects.rp())+"次方";
		if(player.superGal.gte(2))html += "<br>黑洞质量获取变为原来的"+format(SUPERNOVA_GALAXY.effects.bh())+"次方";
		html += "<br>时间速度倍率乘以"+format(SUPERNOVA_GALAXY.effects.tsMult())+"后变为原来的"+format(SUPERNOVA_GALAXY.effects.ts())+"次方";
		html += "<br>加速器倍率变为原来的"+format(SUPERNOVA_GALAXY.effects.apMult())+"倍";
		html += "<br>中子星获取乘以"+format(SUPERNOVA_GALAXY.effects.nsMult())+"后变为原来的"+format(SUPERNOVA_GALAXY.effects.ns())+"次方";
		html += "<br>级别、阶层、时间速度、黑洞压缩器和宇宙射线的元折算延迟"+format(SUPERNOVA_GALAXY.effects.meta())+"倍出现";
		html += "<br>熵获取变为原来的"+format(SUPERNOVA_GALAXY.effects.entropyg())+"倍";
		html += "<br>熵上限变为原来的"+format(SUPERNOVA_GALAXY.effects.entropy())+"倍";
		html += "<br>挑战1-16的最大完成次数增加"+format(SUPERNOVA_GALAXY.effects.chal());
		if(player.superGal.gte(34))html += "<br>挑战17-20的最大完成次数增加"+format(SUPERNOVA_GALAXY.effects.chal2());
		if(player.superGal.lt(8))html += "<br>初始拥有元素"+SUPERNOVA_GALAXY.effects.elem().join("、");
		else html += "<br>重置时保留元素";
		html += "<br>初始拥有"+SUPERNOVA_GALAXY.effects.qs()+"量子碎片";
		html += "<br>无限质量、永恒质量获取变为原来的"+format(SUPERNOVA_GALAXY.effects.inf())+"倍";
		if(player.superGal.gte(2))html += "<br>初始时就解锁色度";
		if(player.superGal.gte(2))html += "<br>初始时就有"+format(SUPERNOVA_GALAXY.effects.qut())+"量子次数";
		if(player.superGal.gte(2))html += "<br>量子次数、无限次数、永恒次数获取变为原来的"+format(SUPERNOVA_GALAXY.effects.qut2())+"倍";
		if(player.superGal.gte(2))html += "<br>购买中子树升级不需要完成它们的额外条件";
		if(player.superGal.gte(3))html += "<br>加速器效果的软上限和二重软上限延迟"+format(SUPERNOVA_GALAXY.effects.aesc())+"倍出现";

		tmp.el.galPow0.setTxt(format(player.galPow[0])+player.galPow[0].formatGain(SUPERNOVA_GALAXY.galPow0_gain()))
		tmp.el.galPow0_eff.setTxt(format(SUPERNOVA_GALAXY.galPow0_eff()))
		if(player.superGal.gte(5))html += "<br>重置时保留中子树";
		if(player.superGal.gte(6)){
			tmp.el.galPow1.setTxt(format(player.galPow[1])+player.galPow[1].formatGain(SUPERNOVA_GALAXY.galPow1_gain()))
			tmp.el.galPow1_eff.setTxt(format(SUPERNOVA_GALAXY.galPow1_eff()))
			tmp.el.galPow2.setTxt(format(player.galPow[2])+player.galPow[2].formatGain(SUPERNOVA_GALAXY.galPow2_gain()))
			tmp.el.galPow2_eff.setTxt(format(SUPERNOVA_GALAXY.galPow2_eff()))
			if(player.superGal.gte(7)){
				tmp.el.galPow3.setTxt(format(player.galPow[3])+player.galPow[3].formatGain(SUPERNOVA_GALAXY.galPow3_gain()))
				tmp.el.galPow3_eff.setTxt(format(SUPERNOVA_GALAXY.galPow3_eff()))
				if(player.superGal.gte(9)){
					html += "<br>所有转生不再重置任何东西";
					tmp.el.galPow4.setTxt(format(player.galPow[4])+player.galPow[4].formatGain(SUPERNOVA_GALAXY.galPow4_gain()))
					tmp.el.galPow4_eff.setTxt(format(SUPERNOVA_GALAXY.galPow4_eff()))
					tmp.el.galPow5.setTxt(format(player.galPow[5])+player.galPow[5].formatGain(SUPERNOVA_GALAXY.galPow5_gain()))
					tmp.el.galPow5_eff.setTxt(format(SUPERNOVA_GALAXY.galPow5_eff()))
					if(player.superGal.gte(10)){
						html += "<br>重置时保留无限升级";
						html += "<br>解锁元素阶层3";
						tmp.el.galQk.setTxt(format(player.galQk)+player.galQk.formatGain(SUPERNOVA_GALAXY.galQkGain()))
						tmp.el.galPowNextspan.setDisplay(false);
					}else tmp.el.galPowNext.setTxt(10);
				}else tmp.el.galPowNext.setTxt(9);
			}else tmp.el.galPowNext.setTxt(7);
		}else tmp.el.galPowNext.setTxt(6);
		if(player.superGal.gte(11))html += "<br>重置时保留转生";
		if(player.superGal.gte(13))html += "<br>重置时保留挑战13-20的完成次数";
		if(hasElement(467))html += "<br>Multiply Exotic Matter and Glyphic Mass gain by "+format(SUPERNOVA_GALAXY.effects.em());
		
		tmp.el.superGalEff.setHTML(html)
	}else tmp.el.galPowNext.setTxt(1);
	
    tmp.el.superCluster.setTxt(format(player.superCluster,0))
	tmp.el.superClusterScale.setTxt(getScalingName('superCluster'));
    tmp.el.superClusterReq.setTxt(format(SUPERNOVA_CLUSTER.req(),0))
	
	
	if(player.superCluster.gte(1)){
		var html="Your Supernova Clusters gives you following effects:";
		html += "<br>Multiply Galactic Quarks gain by "+format(SUPERNOVA_CLUSTER.effects.eff1());
		html += "<br>Multiply Exotic Matter gain by "+format(SUPERNOVA_CLUSTER.effects.eff1());
		html += "<br>Super Supernova Galaxies starts "+format(SUPERNOVA_CLUSTER.effects.eff2())+" later";
		html += "<br>Add "+format(SUPERNOVA_CLUSTER.effects.eff3())+" Exotic Boosts";
		html += "<br>Add "+format(SUPERNOVA_CLUSTER.effects.eff4())+" to base Infinity Mass gain exponent";
		if(player.superCluster.gte(2))html += "<br>Ascension Level resets nothing";
		if(player.superCluster.gte(3))html += "<br>Multiply Dark Shadow gain by "+format(SUPERNOVA_CLUSTER.effects.eff1());
		if(player.superCluster.gte(4))html += "<br>Multiply Dark Ray gain by "+format(SUPERNOVA_CLUSTER.effects.eff1());
		if(player.superCluster.gte(5))html += "<br>Automatically gain Ascension Level";
		if(player.superCluster.gte(6))html += "<br>Automatically gain Valor";
		if(player.superCluster.gte(7))html += "<br>Multiply Abyssal Blot gain by "+format(SUPERNOVA_CLUSTER.effects.eff1());
		if(player.superCluster.gte(7))html += "<br>Multiply Glyphic Mass gain by "+format(SUPERNOVA_CLUSTER.effects.eff1());
		if(player.superCluster.gte(8))html += "<br>Multiply Exotic Count gain by "+format(SUPERNOVA_CLUSTER.effects.eff1());
		if(player.superCluster.gte(9))html += "<br>Galactic Power effect is better";
		if(player.superCluster.gte(9))html += "<br>Unlock Galactic Mass";
		if(player.superCluster.gte(9))tmp.el.galPow6.setTxt(formatMass(player.galPow[6])+player.galPow[6].formatGain(SUPERNOVA_GALAXY.galPow6_gain(),1))
		if(player.superCluster.gte(9))tmp.el.galPow6_eff.setTxt(format(SUPERNOVA_GALAXY.galPow6_eff()))
		if(player.superCluster.gte(10))html += "<br>Meta-Supernova is "+formatReduction(SUPERNOVA_CLUSTER.effects.eff5())+" weaker";
		if(player.superCluster.gte(11))html += "<br>Transcension Level resets nothing";
		if(player.superCluster.gte(12))html += "<br>Automatically gain Transcension Level";
		if(player.superCluster.gte(13))html += "<br>Add "+format(SUPERNOVA_CLUSTER.effects.eff6())+" to Matter Exponent";
		if(player.superCluster.gte(14))html += "<br>Unlock Stardust";
		if(player.superCluster.gte(14))tmp.el.stardust.setTxt(format(player.stardust)+player.stardust.formatGain(SUPERNOVA_CLUSTER.stardustGain()))
		if(player.superCluster.gte(14))tmp.el.stardustEff.setTxt(format(SUPERNOVA_CLUSTER.stardustEff()))
		if(player.superCluster.gte(20))html += "<br>Recursion resets nothing";
		if(player.superCluster.gte(20))html += "<br>Automatically gain Recursion";
		if(player.superCluster.gte(20))html += "<br>Multiply X Axion Generator Power by "+format(SUPERNOVA_CLUSTER.effects.eff7());
		if(player.superCluster.gte(20))html += "<br>Multiply Y Axion Generator Power by "+format(SUPERNOVA_CLUSTER.effects.eff7());
		if(player.superCluster.gte(21))html += "<br>Unlock Stellar Mass";
		if(player.superCluster.gte(21))html += "<br>Unlock a Stardust buyable in Main Tab";
		
		tmp.el.superClusterEff.setHTML(html)
	}
}
const SUPERNOVA_CLUSTER = {
	req_base(){
		let ret = 1.1;
		return ret;
	},
	req(){
		return E(SUPERNOVA_CLUSTER.req_base()).pow(player.superCluster.scaleEvery('superCluster')).mul(100).floor();
	},
	bulk(){
		if(player.superGal.lt(100))return new Decimal(0);
		return player.superGal.div(100).log(SUPERNOVA_CLUSTER.req_base()).scaleEvery('superCluster',true).add(1).floor();
	},
	reset(force=false){
		if(!force)if(player.superGal.lt(SUPERNOVA_CLUSTER.req()))return;
		if(!force) if((confirm("Are you sure to reset for a Supernova Cluster? It will force an Exotic Reset!")?!confirm("ARE YOU SURE ABOUT IT???"):true)) return
		if(!force)player.superCluster = player.superCluster.add(1);
		player.ascensions=[E(0), E(0), E(0), E(0)];
		EXOTIC.doReset();
	},
	effects:{
		eff1(){
			if(player.superCluster.lt(1))return new Decimal(1);
			return Decimal.pow(3, player.superCluster);
		},
		eff2(){
			if(player.superCluster.lt(1))return new Decimal(0);
			return player.superCluster;
		},
		eff3(){
			if(player.superCluster.lt(1))return new Decimal(0);
			return player.superCluster;
		},
		eff4(){
			if(player.superCluster.lt(1))return new Decimal(0);
			return player.superCluster;
		},
		eff5(){
			if(player.superCluster.lt(10))return new Decimal(1);
			return E(0.7).pow(player.superCluster.pow(player.superCluster.gte(23)?0.9:player.superCluster.gte(21)?0.75:0.3));
		},
		eff6(){
			if(player.superCluster.lt(13))return new Decimal(0);
			return player.superCluster.div(100);
		},
		eff7(){
			if(player.superCluster.lt(20))return new Decimal(1);
			return player.superCluster;
		},
	},
	stardustGain(){
		if(player.superCluster.lt(14))return E(0);
		let ret=player.supernova.times.add(1).log10().pow(player.superCluster.sqrt());
		if(hasElement(517))ret = ret.mul(MATTERS.eff(3));
		if(hasAscension(2,10))ret = ret.mul(ascensionEff(2,10));
		return ret;
	},
	stardustEff(){
		if(player.superCluster.lt(14))return E(0);
		let ret=player.stardust.add(1).log10().div(4);
		if(hasTree('qp26'))ret = ret.mul(8);
		return ret;
	},
    stellarGain() {
		if(player.superCluster.lt(21))return E(0);
        let x = E(1);
		if(tmp.stellar.gen_eff)x = x.mul(tmp.stellar.gen_eff);
        return x
    },
    stellarEff() {
		if(player.superCluster.lt(21))return E(1);
        let x = player.stellar.pow(2).add(1);
        return x
    },
    stellar_gen: {
        buy() {
            if (tmp.stellar.can) {
				player.stardust = player.stardust.sub(tmp.stellar.cost).max(0)
				player.stellar_gen = player.stellar_gen.add(1)
			}
        },
        buyMax() {
            if (tmp.stellar.can) {
				player.stellar_gen = tmp.stellar.bulk
				player.stardust = player.stardust.sub(tmp.stellar.cost).max(0)
			}
        },
        eff() {
            let pow = E(2)
            let x = pow.pow(player.stellar_gen)
            return {pow: pow, eff: x}
        },
    },
}
const EXOTIC = {
    gain() {
		let x = player.mass.max(1).log10().max(1).log10().div(1e12)
        if (x.lt(1)) return E(0)
        x = x.max(0).pow(hasUpgrade('exotic',22)?3:2)
		if (player.qu.times.gte(1e255) && player.exotic.times.gte(1))x = x.mul(3)
		if (player.qu.times.gte(1e295) && player.exotic.times.gte(1))x = x.mul(5)
        if (hasPrestige(2,141)) x = x.mul(prestigeEff(2,141,E(1)));
        if (hasPrestige(3,21)) x = x.mul(prestigeEff(3,21,E(1)));
        if (hasPrestige(3,22)) x = x.mul(prestigeEff(3,22,E(1)));
        if (hasPrestige(4,15)) x = x.mul(prestigeEff(4,15,E(1)));
		if (player.ranks.oct.gte(34)) x = x.mul(RANKS.effect.oct[34]())
		if (player.ranks.enne.gte(5)) x = x.mul(RANKS.effect.enne[5]())
		if (player.ranks.enne.gte(101)) x = x.mul(RANKS.effect.enne[101]())
		if(hasUpgrade('exotic', 15)){
			x = x.mul(tmp.ex.dsEff.ex);
		}
		if(hasUpgrade('exotic', 17)){
			x = x.mul(player.exotic.times.add(1));
		}
		if(hasUpgrade('br', 23)){
			x = x.mul(upgEffect(4,23));
		}
		if(hasUpgrade('inf', 24)){
			x = x.mul(upgEffect(5,24));
		}
		if(hasUpgrade('bh', 25)){
			x = x.mul(upgEffect(2,25));
		}
        if (hasAscension(0,2)) x = x.mul(ascensionEff(0,2,E(1)));
        if (hasAscension(1,1)) x = x.mul(ascensionEff(1,1,E(1)));
        if (hasChargedElement(6)) x = x.mul(tmp.elements.ceffect[6]);
		x = x.mul(SUPERNOVA_CLUSTER.effects.eff1())
        if (hasElement(395)) x = x.mul(tmp.elements.effect[395]);
		if(hasElement(406)){
			x = x.mul(tmp.ex.drEff.ex);
		}
		if(player.exotic.dark_run.upgs[10].gte(1))x = x.mul(tmp.dark_run?(tmp.dark_run.upgs[10].eff||1):1);
		x = x.mul(SUPERNOVA_GALAXY.effects.em());
		if(hasChargedElement(120))x = x.mul(tmp.elements.ceffect[120]);
		if(hasElement(486))x = x.mul(MATTERS.eff(0));
		if(hasElement(534))x = x.mul(player.exotic.ax[0].add(1));
        return x.floor()
    },
    gainTimes() {
        let x = E(1)
		if (hasElement(402)) x = x.mul(tmp.ex.rcb_eff[3]?(tmp.ex.rcb_eff[3].eff||1):1);
		if(player.superCluster.gte(8))x = x.mul(SUPERNOVA_CLUSTER.effects.eff1());
        return x
    },
    mils: [
        [E(1), `You start with 10 Supernova Galaxies, and keep Elements on Exotic resets. Unlock new Quantum Milestones.`],
        [E(2), `Automatically Gain Prestige Level, Honor, Glory and Renown.`],
        [E(3), `Exotic reset times boost Quantizes and Galactic Quarks gain.`],
        [E(4), `Keep Galactic Fermion Tiers on Exotic resets.`],
        [E(5), `Keep Galactic Shards on Exotic resets.`],
        [E(10), `You start with 15 Supernova Galaxies, and keep C20 completions on Exotic resets.`],
        [E(50), `Automatically Gain Supernova Galaxies, Supernova Galaxies don't reset anything.`],
    ],
    enter() {
        if (EXOTIC.gain().gte(1)) {
            if (player.confirms.exotic) if (confirm("Are you sure to reset for Exotic Matter? This will reset all previous except QoL mechanicals")?!confirm("ARE YOU SURE ABOUT IT???"):true) return
			player.exotic.points = player.exotic.points.add(EXOTIC.gain())
            player.exotic.times = player.exotic.times.add(EXOTIC.gainTimes())
			if(hasUpgrade('exotic', 15)){
				player.exotic.dr = player.exotic.dr.add(EXOTIC.drGain())
			}
            this.doReset()
        }
    },
    doReset(force=false) {
		player.superGal=new Decimal(player.exotic.times.lt(10)?10:15)
		player.galQk=new Decimal(0)
		if(player.exotic.times.lt(5))player.gc.shard=new Decimal(0)
		player.galParticles=[new Decimal(0),new Decimal(0),new Decimal(0)]
		player.galPow=[E(0),E(0),E(0),E(0),E(0),E(0),player.galPow[6]]
		if(player.exotic.times.lt(4))player.supernova.fermions.tiers[2]=[E(0),E(0),E(0),E(0),E(0),E(0)]
		if(player.exotic.times.lt(4))player.supernova.fermions.tiers[3]=[E(0),E(0),E(0),E(0),E(0),E(0)]
		player.prestigeMassUpg=[E(0),E(0),E(0),E(0),E(0)]
		player.prestigeRP=E(0)
		player.prestigeTickspeed=E(0)
		if(player.exotic.times.lt(10)){
			for (let x = 1; x <= 20; x++) player.chal.comps[x] = E(0)
		}else{
			for (let x = 1; x <= 19; x++) player.chal.comps[x] = E(0)
		}
        SUPERNOVA_GALAXY.reset(true)
        SUPERNOVA_GALAXY.reset(true)
    },
    rcb: {
        buy(i) {
            if (tmp.ex.rcb_can[i]) {
				player.exotic.rcb[i] = player.exotic.rcb[i].add(1)
				player.exotic.points = player.exotic.points.sub(tmp.ex.rcb_cost[i]).max(0)
			}
        },
        buyMax(i) {
            if (tmp.ex.rcb_can[i]) {
				player.exotic.rcb[i] = tmp.ex.rcb_bulk[i]
				player.exotic.points = player.exotic.points.sub(tmp.ex.rcb_cost[i]).max(0)
			}
        },
        eff(i) {
            let pow = E(2)
            let x = pow.pow(player.exotic.rcb[i])
			if(i==3)x = pow.mul(player.exotic.rcb[i]).add(1)
            return {pow: pow, eff: x}
        },
    },
    ax: {
        buy(i) {
            if (tmp.ex.axg_can[i]) {
				player.exotic.axg[i] = player.exotic.axg[i].add(1)
				player.exotic.points = player.exotic.points.sub(tmp.ex.axg_cost[i]).max(0)
			}
        },
        buyMax(i) {
            if (tmp.ex.axg_can[i]) {
				player.exotic.axg[i] = tmp.ex.axg_bulk[i]
				player.exotic.points = player.exotic.points.sub(tmp.ex.axg_cost[i]).max(0)
			}
        },
        eff(i) {
            let pow = E(player.exotic.axg[i].add(1))
			if (hasElement(535) && i==0) pow = pow.mul(tmp.elements.effect[535]);
			if (hasElement(536) && i==0) pow = pow.mul(tmp.elements.effect[536]);
			if(player.superCluster.gte(20) && i<=1)pow = pow.mul(SUPERNOVA_CLUSTER.effects.eff7());
			if(hasElement(542)) pow = pow.mul(MATTERS.fssEff());
            let x = pow.mul(player.exotic.axg[i])
            return {pow: pow, eff: x}
        },
    },
    drGain(){
        let x = E(1);
		if(hasUpgrade('exotic', 15)){
			x = x.mul(tmp.ex.dsEff.ex);
		}
		if(hasElement(372))x = x.mul(tmp.elements.effect[372]);
        if (hasAscension(0,11)) x = x.mul(ascensionEff(0,11,E(1)));
		if(hasElement(389))x = x.mul(tmp.elements.effect[389]);
		if(player.superCluster.gte(4))x = x.mul(SUPERNOVA_CLUSTER.effects.eff1());
		if(hasElement(426)){
			x = x.mul(tmp.ex.abEff.ds);
		}
        if (hasPrestige(4,8)) x = x.mul(prestigeEff(4,8,E(1)));
		if(player.exotic.dark_run.upgs[2].gte(1))x = x.mul(tmp.dark_run.upgs[2].eff);
		if(player.exotic.dark_run.upgs[14].gte(1))x = x.mul(tmp.dark_run.upgs[14].eff);
        if (hasTree('qp21')) x = x.mul(treeEff('qp21'));
        if (hasTree('qp22')) x = x.mul(treeEff('qp22'));
		if(hasElement(486))x = x.mul(MATTERS.eff(12));
		if(hasElement(540))x = x.mul(player.exotic.ax[1].add(1));
		return x;
    },
    dsGain(){
        let x = E(1);
		if(hasUpgrade('exotic', 15)){
			x = x.mul(tmp.ex.drEff.ds);
		}
		if(hasElement(414)){
			x = x.mul(tmp.ex.abEff.ds);
		}
		if(hasElement(370))x = x.mul(tmp.elements.effect[370]);
		if(hasElement(388))x = x.mul(tmp.elements.effect[388]);
		if(hasElement(401))x = x.mul(tmp.elements.effect[401]);
		if(hasElement(405))x = x.mul(tmp.elements.effect[405]);
		if(player.superCluster.gte(3))x = x.mul(SUPERNOVA_CLUSTER.effects.eff1());
        if (hasAscension(0,20)) x = x.mul(ascensionEff(0,20,E(1)));
		if (player.ranks.enne.gte(10)) x = x.mul(RANKS.effect.enne[10]())
		return x;
    },
    abGain(){
		if(!hasElement(414))return E(0);
        let x = E(1);
		x = x.mul(EXOTIC.dsEff().ab);
		if(hasElement(442))x = x.mul(tmp.elements.effect[442]);
		if(hasElement(445))x = x.mul(tmp.elements.effect[445]);
		if(player.superCluster.gte(7))x = x.mul(SUPERNOVA_CLUSTER.effects.eff1());
		if(player.exotic.dark_run.upgs[9].gte(1))x = x.mul(tmp.dark_run.upgs[9].eff);
		if(hasElement(486))x = x.mul(MATTERS.eff(11));
		return x;
    },
    drEff(){
		let x = {ds:player.exotic.dr.pow(2)};
		if(hasElement(406))x.ex = player.exotic.dr.pow(0.1);
		if(hasElement(428))x.ex = player.exotic.dr.pow(0.25);
		if(hasElement(456))x.ex = player.exotic.dr.pow(0.4);
		if(hasElement(480))x.ex = player.exotic.dr.pow(0.55);
		if(hasElement(504))x.ex = player.exotic.dr.pow(0.7);
		if(hasElement(514))x.ex = player.exotic.dr.pow(0.85);
		if(hasElement(518))x.ex = player.exotic.dr;
		if(hasElement(456))x.gm = player.exotic.dr.add(10).log10();
		if(hasElement(524))x.me = player.exotic.dr.add(10).log10().div(100);
		return x;
    },
    dsEff(){
		let x = {ex:player.exotic.ds.add(1).log10().add(1)};
		if(hasElement(376))x.sn = player.exotic.ds.div(1e20).add(1).log10().div(10).add(1).pow(-1);
		if(hasElement(394))x.en = expMult(player.exotic.ds.add(2),2).pow(1e4);
		if(hasElement(400))x.bp = player.exotic.ds.add(1e50).log10().div(50);
		if(hasElement(412)){
			x.ex = x.ex.pow(2)
			x.en = x.en.pow(2)
		}
		if(hasElement(414))x.ab = player.exotic.ds.div(hasElement(468)?1:1e60).add(1).pow(2);
		if(hasElement(474))x.qf = player.exotic.ds.add(1e100).log10().div(100);
		if(hasElement(492))x.me = player.exotic.ds.add(1e100).log10().div(100).sub(1);
		if(x.me.gte(1))x.me = x.me.log10().add(1);
		if(hasElement(496))x.sn = x.sn.pow(2);
		if(hasElement(498))x.me = x.me.mul(2);
		return x;
    },
    abEff(){
		let x = {ds:player.exotic.ab.add(1).log10().add(1).pow(2),exb:player.exotic.ab.add(1).log10().div(100).add(1).sqrt()};
		if(hasElement(420))x.csp = player.exotic.ab.add(10).log10().pow(2);
		if(hasElement(436))x.em = player.exotic.ab.add(1);
		if(hasElement(512))x.me = player.exotic.ab.add(1e100).log10().div(100).log10();
		return x;
    },
}

function updateExoticTemp() {
	
	tmp.ex.drEff = EXOTIC.drEff()
	tmp.ex.dsEff = EXOTIC.dsEff()
	tmp.ex.abEff = EXOTIC.abEff()
	
    tmp.ex.gain = EXOTIC.gain()
    tmp.ex.gainTimes = EXOTIC.gainTimes()

	for(let i=0;i<=3;i++){
		tmp.ex.rcb_cost[i] = E(2+i).pow(player.exotic.rcb[i].scaleEvery("ex_rcb").add(1))
		tmp.ex.rcb_bulk[i] = player.exotic.points.max(1).log(2+i).scaleEvery("ex_rcb",true).floor()

		tmp.ex.rcb_can[i] = player.exotic.points.gte(tmp.ex.rcb_cost[i])
		tmp.ex.rcb_eff[i] = EXOTIC.rcb.eff(i)
		
		tmp.ex.axg_cost[i] = E(2+i).pow(player.exotic.axg[i].scaleEvery("ex_axg").add(1)).mul(E(2+i).pow([1023,728][i]));
		tmp.ex.axg_bulk[i] = player.exotic.points.div(E(2+i).pow([1023,728][i])).max(1).log(2+i).scaleEvery("ex_axg",true).floor()

		tmp.ex.axg_can[i] = player.exotic.points.gte(tmp.ex.axg_cost[i])
		tmp.ex.axg_eff[i] = EXOTIC.ax.eff(i)
		
		if(hasChargedElement(43)&&(i<=hasElement(402)?3:2))player.exotic.rcb[i] = player.exotic.rcb[i].max(tmp.ex.rcb_bulk[i]);
	}
	
	player.exotic.bp = player.exotic.bp.max(EXOTIC_BOOST.gain());
	tmp.ex.exb_can = player.exotic.bp.gt(EXOTIC_BOOST.used_bp());
	
	for(let i=0;i<EXOTIC_BOOST_LENGTH;i++){
		tmp.ex.exb_eff[i] = EXOTIC_BOOST.effect(i)
	}
	
	updateDRTemp()
	
}

function calcExotic(dt) {
	if(hasUpgrade('exotic', 15)){
		player.exotic.dr = player.exotic.dr.max(1);
		player.exotic.ds = player.exotic.ds.add(EXOTIC.dsGain().mul(dt));
	}
	if(hasChargedElement(14)){
		player.exotic.dr = player.exotic.dr.add(EXOTIC.drGain().mul(dt));
	}
	if(hasChargedElement(16)){
		player.exotic.dr = player.exotic.dr.add(EXOTIC.drGain().mul(dt).mul(tmp.elements.effect[16]||1));
	}
	if(hasChargedElement(24)){
		player.exotic.points = player.exotic.points.add(EXOTIC.gain().mul(dt));
	}
	if(hasElement(414)){
		player.exotic.ab = player.exotic.ab.add(EXOTIC.abGain().mul(dt));
	}
	if(player.exotic.dark_run.active){
		player.exotic.dark_run.points = player.exotic.dark_run.points.add(DARK_RUN.gain().mul(dt));
	}
	if(player.exotic.dark_run.upgs[4].gte(1)){
		player.exotic.times = player.exotic.times.add(EXOTIC.gainTimes().mul(dt));
	}
	if(hasElement(486)){
		for(var i=0;i<MATTERS_LENGTH;i++){
			player.exotic.matters[i]=player.exotic.matters[i].add(MATTERS.gain(i).mul(dt));
		}
	}
	if(hasElement(534)){
		player.exotic.ax[0]=player.exotic.ax[0].add(tmp.ex.axg_eff[0].eff.mul(dt));
	}
	if(hasElement(540)){
		player.exotic.ax[1]=player.exotic.ax[1].add(tmp.ex.axg_eff[1].eff.mul(dt));
	}
}

function updateExoticHTML(){
        if (tmp.stab[7] == 0) {
            tmp.el.exotic_times.setTxt(format(player.exotic.times,0))
            for (let x = 0; x < EXOTIC.mils.length; x++) {
                tmp.el['ex_mil'+x].changeStyle('background-color',player.exotic.times.gte(EXOTIC.mils[x][0])?'#2f22':'#4442')
                tmp.el['ex_mil_goal'+x].setTxt(format(EXOTIC.mils[x][0],0))
            }
        }
        if (tmp.stab[7] == 1) {
            tmp.el.rcb0_times.setTxt(format(player.qu.times,0)+player.qu.times.formatGain(tmp.qu.gainTimes))
            tmp.el.rcb1_times.setTxt(format(player.inf.times,0)+player.inf.times.formatGain(tmp.inf.gainTimes))
            tmp.el.rcb2_times.setTxt(format(player.et.times,0)+player.et.times.formatGain(tmp.et.gainTimes))
			for(let i=0;i<=3;i++){
				tmp.el["rcb"+i+"_lvl"].setTxt(format(player.exotic.rcb[i],0))
				tmp.el["rcb"+i+"_btn"].setClasses({btn: true, locked: !tmp.ex.rcb_can[i]})
				tmp.el["rcb"+i+"_cost"].setTxt(format(tmp.ex.rcb_cost[i],0))
				tmp.el["rcb"+i+"_pow"].setTxt(format(tmp.ex.rcb_eff[i].pow))
				tmp.el["rcb"+i+"_eff"].setTxt(format(tmp.ex.rcb_eff[i].eff))
			}
			tmp.el["rcb3_div"].changeStyle('display',hasElement(402)?'':'none');
        }
        if (tmp.stab[7] == 2) {
            tmp.el.ex_bp.setTxt(EXOTIC_BOOST.used_bp().format(0)+" / "+player.exotic.bp.format(0));
            tmp.el.ex_bp2.setTxt(Decimal.pow(1e3,player.exotic.bp.add(1).sub(EXOTIC_BOOST.fgain())).format(0));
			for(let i=0;i<EXOTIC_BOOST_LENGTH;i++){
				tmp.el["exb"+i+"_lvl"].setTxt(format(player.exotic.boosts[i],0))
				tmp.el["exb"+i+"_btn"].setClasses({btn: true, locked: !tmp.ex.exb_can})
				tmp.el["exb"+i+"_refund"].setClasses({btn: true, locked: player.exotic.boosts[i].lte(0)})
				tmp.el["exb"+i+"_eff"].setTxt(format(tmp.ex.exb_eff[i]))
			}
			tmp.el["exb2_div"].changeStyle('display',hasUpgrade('exotic',11)?'':'none');
			tmp.el["exb3_div"].changeStyle('display',hasUpgrade('exotic',18)?'':'none');
			tmp.el["exb4_div"].changeStyle('display',hasUpgrade('exotic',20)?'':'none');
			tmp.el["exb5_div"].changeStyle('display',hasUpgrade('exotic',24)?'':'none');
			tmp.el["exb6_div"].changeStyle('display',hasUpgrade('exotic',25)?'':'none');
			tmp.el["exb6_div2"].changeStyle('display',hasUpgrade('exotic',25)?'':'none');
        }
        if (tmp.stab[7] == 3) {
            tmp.el.darkRay.setTxt(player.exotic.dr.format(0));
            tmp.el.darkShadow.setTxt(player.exotic.ds.format(0));
            tmp.el.ab_div.changeStyle('display',hasElement(414)?'':'none');
            tmp.el.abyssalBlot.setTxt(player.exotic.ab.format(0));
			tmp.el.drEff.setHTML(`
					Boosts dark shadow gain by <b>x${tmp.ex.drEff.ds.format(3)}</b><br>`+
					(hasElement(406)?`Boosts exotic matter gain by <b>x${tmp.ex.drEff.ex.format(3)}</b><br>`:"")+
					(hasElement(456)?`Boosts glyphic mass gain by <b>x${tmp.ex.drEff.gm.format(3)}</b><br>`:"")+
					(hasElement(524)?`Add <b>${tmp.ex.drEff.me.format(3)}</b> to Matter Exponent<br>`:"")
				);
			tmp.el.dsEff.setHTML(`
					Boosts exotic matter gain by <b>x${tmp.ex.dsEff.ex.format(3)}</b><br>
					Boosts dark ray gain by <b>x${tmp.ex.dsEff.ex.format(3)}</b><br>`+
					(hasElement(376)?`Meta-Supernova is <b>${formatReduction(tmp.ex.dsEff.sn)}</b> weaker<br>`:"")+
					(hasElement(382)?`Boosts Galactic Quarks gain by <b>x${tmp.ex.dsEff.ex.format(3)}</b><br>`:"")+
					(hasElement(394)?`Boosts Entropy gain by <b>x${tmp.ex.dsEff.en.format(3)}</b><br>`:"")+
					(hasElement(400)?`Boosts Blueprint Particles gain by <b>^${tmp.ex.dsEff.bp.format(3)}</b><br>`:"")+
					(hasElement(414)?`Boosts Abyssal Blot gain by <b>x${tmp.ex.dsEff.ab.format(3)}</b><br>`:"")+
					(hasElement(474)?`Boosts Quantum Foam gain by <b>^${tmp.ex.dsEff.qf.format(3)}</b><br>`:"")+
					(hasElement(492)?`Add <b>${tmp.ex.dsEff.me.format(3)}</b> to Matter Exponent<br>`:"")
				);
			tmp.el.abEff.setHTML(`
					Boosts dark shadow gain by <b>x${tmp.ex.abEff.ds.format(3)}</b><br>
					Exotic boosts are <b>x${tmp.ex.abEff.exb.format(3)}</b> stronger<br>`+
					(hasElement(420)?`Boosts Cosmic String power by <b>x${tmp.ex.abEff.csp.format(3)}</b><br>`:"")+
					(hasElement(426)?`Boosts dark ray gain by <b>x${tmp.ex.abEff.ds.format(3)}</b><br>`:"")+
					(hasElement(436)?`Boosts eternal mass gain by <b>x${tmp.ex.abEff.em.format(3)}</b><br>`:"")+
					(hasElement(512)?`Add <b>${tmp.ex.abEff.me.format(3)}</b> to Matter Exponent<br>`:"")
				);
        }
        if (tmp.stab[7] == 4) {
            tmp.el.dr_points.setTxt(formatMass(player.exotic.dark_run.points));
			updateDRHTML()
        }
        if (tmp.stab[7] == 5) {
            tmp.el.matters_em_amount.setTxt(format(player.exotic.points));
            tmp.el.matters_em_gain.setTxt(player.exotic.points.formatGain(tmp.ex.gain));
            tmp.el.matters_dm_amount.setTxt(format(player.bh.dm));
            tmp.el.matters_dm_gain.setTxt(player.bh.dm.formatGain(tmp.bh.dm_gain));
            tmp.el.matters_pow.setTxt(format(MATTERS.pow()));
			for(var i=0;i<MATTERS_LENGTH;i++){
				tmp.el["matters"+i+"_amount"].setTxt(format(player.exotic.matters[i]));
				tmp.el["matters"+i+"_gain"].setTxt(player.exotic.matters[i].formatGain(MATTERS.gain(i)));
			}
			tmp.el.matters0_eff.setTxt(format(MATTERS.eff(0)));
			tmp.el.matters1_eff.setTxt(formatReduction(MATTERS.eff(1)));
			tmp.el.matters1_eff2.setTxt(format(MATTERS.eff(1).pow(-1)));
			if(player.exotic.matters[1].gte("1e200"))tmp.el.matters1_eff2a.changeStyle('display','');
			else tmp.el.matters1_eff2a.changeStyle('display','none');
			if(player.exotic.matters[1].gte("1e200"))tmp.el.matters1_eff1a.changeStyle('display','none');
			else tmp.el.matters1_eff1a.changeStyle('display','');
			tmp.el.matters2_eff.setTxt(format(MATTERS.eff(2)));
			tmp.el.matters3_eff.setTxt(format(MATTERS.eff(3)));
			tmp.el.matters4_eff.setTxt(format(MATTERS.eff(4)));
			tmp.el.matters5_eff.setTxt(format(MATTERS.eff(5)));
			tmp.el.matters6_eff.setTxt(format(MATTERS.eff(6)));
			tmp.el.matters7_eff.setTxt(format(MATTERS.eff(7)));
			tmp.el.matters8_eff.setTxt(format(MATTERS.eff(8)));
			tmp.el.matters9_eff.setTxt(format(MATTERS.eff(9)));
			tmp.el.matters10_eff.setTxt(format(MATTERS.eff(10)));
			tmp.el.matters11_eff.setTxt(format(MATTERS.eff(11)));
			tmp.el.matters12_eff.setTxt(format(MATTERS.eff(12)));
			tmp.el["matters_ex"].changeStyle('display',hasElement(487)?'':'none');
			tmp.el.matters_ex_eff.setTxt("+"+format(MATTERS.exeff()));
			if(hasElement(542)){
				tmp.el.fss_div.changeStyle('display','');
				tmp.el.fss_base.setTxt(format(MATTERS.fssBase()));
				tmp.el.fss_cnt.setTxt(format(player.exotic.fss,0));
				tmp.el.fss_req.setTxt(format(MATTERS.fssReq()));
				tmp.el.fss_eff.setTxt(format(MATTERS.fssEff()));
			}else{
				tmp.el.fss_div.changeStyle('display','none');
			}
			if(hasElement(548)){
				tmp.el.matters_extend.changeStyle('display','');
				tmp.el.matters_extend.setTxt("*((next matter+1)^"+MATTERS.extendPow()+")");
			}else{
				tmp.el.matters_extend.changeStyle('display','none');
			}
        }
        if (tmp.stab[7] == 6) {
            for(let i=0;i<=1;i++){
				tmp.el["ax"+i].setTxt(format(player.exotic.ax[i],0))
				tmp.el["ax"+i+"_lvl"].setTxt(format(player.exotic.axg[i],0))
				tmp.el["ax"+i+"_btn"].setClasses({btn: true, locked: !tmp.ex.axg_can[i]})
				tmp.el["ax"+i+"_cost"].setTxt(format(tmp.ex.axg_cost[i],0))
				tmp.el["ax"+i+"_pow"].setTxt(format(tmp.ex.axg_eff[i].pow))
				tmp.el["ax"+i+"_eff"].setTxt(format(tmp.ex.axg_eff[i].eff))
			}
			tmp.el.ax0b.setTxt(format(player.exotic.ax[0].add(1),0))
			tmp.el.ax1b.setTxt(format(player.exotic.ax[1].add(1),0))
			tmp.el.ax1_div.changeStyle('display',hasElement(540)?'':'none');
        }
}

function setupExoticHTML() {
    let new_table = new Element("ex_milestones_table")
    html = ""
    for (let x in EXOTIC.mils) {
        html += `
        <div id="ex_mil${x}" style="width: 100%; margin: 5px 0px; padding: 8px 0px; background-color: #4444; font-size: 14px;">
            <h2><span id="ex_mil_goal${x}">X</span> Exotic Resets</h2><br><br>
            ${EXOTIC.mils[x][1]}
        </div>
        `
    }
    new_table.setHTML(html)
	setupDRHTML()
}
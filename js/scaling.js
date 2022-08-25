const SCALE_START = {
    super: {
        rank: E(50),
		tier: E(10),
		tetr: E(7),
		pent: E(15),
		hex: E(100),
        massUpg: E(100),
		tickspeed: E(100),
		bh_condenser: E(100),
		gamma_ray: E(100),
		supernova: E(15),
		fTier: E(10),
		cosmic_str: E(15),
		prestige0: E(15),
		prestige1: E(7),
    },
	hyper: {
		rank: E(120),
		tier: E(200),
		tetr: E(60),
		pent: E(100),
		hex: E(500),
		massUpg: E(500),
		tickspeed: E(250),
		bh_condenser: E(300),
		gamma_ray: E(300),
		supernova: E(35),
		fTier: E(50),
		cosmic_str: E(90),
		prestige0: E(160),
		prestige1: E(30),
	},
	ultra: {
		rank: E(600),
		tier: E(1e5),
		tetr: E(150),
		pent: E(500),
		hex: E(1000),
		massUpg: E(1e11),
		tickspeed: E(700),
		bh_condenser: E(750),
		gamma_ray: E(800),
		supernova: E(60),
		fTier: E(100),
		prestige0: E(600),
		//prestige1: E(40), // remove it in next version
	},
	meta: {
		rank: E(1e4),
		tickspeed: E(5e4),
		bh_condenser: E(1e7),
		gamma_ray: E(1e6),
		supernova: E(100),
		fTier: E(25000),
		prestige0: E(1000),
	},
}

const SCALE_POWER= {
    super: {
		rank: 1.5,
		tier: 1.5,
		tetr: 2,
		pent: 2,
		hex: 3,
		massUpg: 2.5,
		tickspeed: 2,
		bh_condenser: 2,
		gamma_ray: 2,
		supernova: 3,
		fTier: 2.5,
		cosmic_str: 2,
		prestige0: 1.5,
		prestige1: 1.5,
    },
	hyper: {
		rank: 2.5,
		tier: 2.5,
		tetr: 3,
		pent: 3,
		hex: 5,
		massUpg: 5,
		tickspeed: 4,
		bh_condenser: 2,
		gamma_ray: 4,
		supernova: 3,
		fTier: 4,
		cosmic_str: 4,
		prestige0: 2,
		prestige1: 2,
	},
	ultra: {
		rank: 4,
		tier: 4,
		tetr: 6,
		pent: 6,
		hex: 10,
		massUpg: 10,
		tickspeed: 7,
		bh_condenser: 4,
		gamma_ray: 6,
		supernova: 5,
		fTier: 6,
		prestige0: 4,
		//prestige1: 10, // remove it in next version
	},
	meta: {
		rank: 1.0025,
		tier: 1.0025,
		tetr: 1.0025,
		tickspeed: 1.001,
		bh_condenser: 1.001,
		gamma_ray: 1.001,
		supernova: 1.025,
		fTier: 1.0001,
		prestige0: 1.004,
	},
}

const SCALE_FP = {
	tickspeed() { return [1,1,1,tmp.tickspeedFP] },
}

const QCM8_SCALES = ['rank','tier','tetr','pent','massUpg','tickspeed','bh_condenser','gamma_ray','supernova','fTier']
const PreQ_SCALES = ['rank','tier','tetr','massUpg','tickspeed','bh_condenser','gamma_ray']
const SCALE_TYPE = ['super', 'hyper', 'ultra', 'meta'] // super, hyper, ultra, meta
const FULL_SCALE_NAME = ['Super', 'Hyper', 'Ultra', 'Meta']

const SCALING_RES = {
    rank(x=0) { return player.ranks.rank },
	tier(x=0) { return player.ranks.tier },
	tetr(x=0) { return player.ranks.tetr },
	pent(x=0) { return player.ranks.pent },
	hex(x=0) { return player.ranks.hex },
	tickspeed(x=0) { return player.tickspeed },
    massUpg(x=1) { return E(player.massUpg[x]||0) },
	bh_condenser(x=0) { return player.bh.condenser },
	gamma_ray(x=0) { return player.atom.gamma_ray },
	supernova(x=0) { return player.supernova.times },
	fTier(x=0, y=0) { return player.supernova.fermions.tiers[x][y] },
	cosmic_str(x=0) { return player.qu.cosmic_str },
	prestige0() { return player.prestiges[0] },
	prestige1() { return player.prestiges[1] },
}

const NAME_FROM_RES = {
	rank: "Rank",
	tier: "Tier",
	tetr: "Tetr",
	pent: "Pent",
	hex: "Hex",
	massUpg: "Mass Upgrades",
	tickspeed: "Tickspeed",
	bh_condenser: "Black Hole Condenser",
	gamma_ray: "Cosmic Ray",
	supernova: "Supernova",
	fTier: "Fermion Tier",
	cosmic_str: "Cosmic String",
	prestige0: "Prestige Level",
	prestige1: "Honor",
}

function updateScalingHTML() {
	let s = SCALE_TYPE[player.scaling_ch]
	tmp.el.scaling_name.setTxt(FULL_SCALE_NAME[player.scaling_ch])
	if (!tmp.scaling) return
	for (let x = 0; x < SCALE_TYPE.length; x++) {
		tmp.el["scaling_div_"+x].setDisplay(player.scaling_ch == x)
		if (player.scaling_ch == x) {
			let key = Object.keys(SCALE_START[SCALE_TYPE[x]])
			for (let y = 0; y < key.length; y++) {
				let have = tmp.scaling[SCALE_TYPE[x]].includes(key[y])
				tmp.el['scaling_'+x+'_'+key[y]+'_div'].setDisplay(have)
				if (have) {
					tmp.el['scaling_'+x+'_'+key[y]+'_power'].setTxt(format(getScalingPower(SCALE_TYPE[x], key[y]).mul(100))+"%")
					tmp.el['scaling_'+x+'_'+key[y]+'_start'].setTxt(format(getScalingStart(SCALE_TYPE[x], key[y]),0))
				}
			}
		}
	}
}

function updateScalingTemp() {
	if (!tmp.scaling) tmp.scaling = {}
	for (let x = 0; x < SCALE_TYPE.length; x++) {
		tmp.scaling[SCALE_TYPE[x]] = []
		let key = Object.keys(SCALE_START[SCALE_TYPE[x]])
		for (let y = 0; y < key.length; y++) {
			if (key[y] == "massUpg") for (let i = 0; i < UPGS.mass.cols; i++) {
				if (scalingActive(key[y], SCALING_RES[key[y]](i), SCALE_TYPE[x])) {
					tmp.scaling[SCALE_TYPE[x]].push(key[y])
					break
				}
			}
			else if (key[y] == "fTier") for (let i = 0; i < 2; i++) for (let j = 0; j < 6; j++) {
				if (scalingActive(key[y], SCALING_RES[key[y]](i,j), SCALE_TYPE[x])) {
					tmp.scaling[SCALE_TYPE[x]].push(key[y])
					break
				}
			}
			else if (scalingActive(key[y], SCALING_RES[key[y]](), SCALE_TYPE[x])) tmp.scaling[SCALE_TYPE[x]].push(key[y])
		}
	}
	let sqc8 = []
	if (player.mainUpg.br.includes(2)) sqc8.push("massUpg","rank","tier","tetr","pent")
	if (player.md.break.active) sqc8.push("bh_condenser","gamma_ray")
	tmp.scaling_qc8 = sqc8
}

function scalingActive(name, amt, type) {
	if (SCALE_START[type][name] === undefined) return false
	amt = E(amt);
	return amt.gte(getScalingStart(type, name));
}

function getScalingName(name, x=0, y=0) {
	if (!NAME_FROM_RES[name]) return

	let cap = Object.keys(SCALE_START).length;
	let current = "";
	let amt = SCALING_RES[name](x,y);
	for (let n = cap - 1; n >= 0; n--) {
		if (scalingActive(name, amt, Object.keys(SCALE_START)[n]))
			return capitalFirst(Object.keys(SCALE_START)[n]) + (n==3?"-":" ");
	}
	return current;
}

function getScalingStart(type, name) {
	let start = E(SCALE_START[type][name])
	if (type=="super") {
		if (name=="rank") {
			if (CHALS.inChal(1) || CHALS.inChal(10) || CHALS.inChal(14)) return E(25)
			start = start.add(tmp.chal?tmp.chal.eff[1].rank:0)
		}
		if (name=="tier") {
			if (player.mainUpg.atom.includes(5)) start = start.add(10)
		}
		if (name=="tetr") {
			if (player.ranks.tier.gte(100)) start = start.add(5)
		}
		if (name=="massUpg") {
			if (CHALS.inChal(1) || CHALS.inChal(10) || CHALS.inChal(14)) return E(25)
			if (player.mainUpg.bh.includes(3)) start = start.add(tmp.upgs?tmp.upgs.main?tmp.upgs.main[2][3].effect:0:0)
		}
		if (name=='tickspeed') {
			if (CHALS.inChal(1) || CHALS.inChal(10) || CHALS.inChal(14)) return E(50)
		}
		if (name=="prestige0") {
			if (player.md.break.upgs[9].gte(1)) start = start.add(10)
			if (hasPrestige(2,1)) start = start.add(5)
		}
		if (name=="prestige1") {
			if (hasPrestige(2,2)) start = start.add(1)
		}
	}
	if (type=="hyper") {
		if (name=="tickspeed") {
			if (player.mainUpg.rp.includes(14)) start = start.add(50)
			if (player.ranks.tetr.gte(5)) start = start.add(RANKS.effect.tetr[5]())
		}
		if (name=="rank") {
			if (player.mainUpg.atom.includes(10)) start = start.add(tmp.upgs?tmp.upgs.main?tmp.upgs.main[3][10].effect:0:0)
		}
	}
	if (type=="ultra") {
		if (name=="rank") {
			if (hasElement(62)) start = start.add(tmp.elements.effect[62])
		}
		if (name=="tickspeed") {
			if (player.ranks.tetr.gte(5)) start = start.add(RANKS.effect.tetr[5]())
		}
	}
	if (type=="meta") {
		if (name=="rank") {
			if (player.ranks.pent.gte(1)) start = start.mul(1.1)
			if (player.ranks.pent.gte(5)) start = start.mul(RANKS.effect.pent[5]())
			if (hasPrestige(1,5)) start = start.mul(prestigeEff(1,5))
			start = start.mul(tmp.radiation.bs.eff[14])
			start = start.mul(tmp.bd.upgs[4].eff)
			if (hasPrestige(0,53)) start = start.mul(1.5)
			if (player.ranks.hex.gte(62)) start = start.mul(RANKS.effect.hex[62]())
		}
		if (name=="tickspeed") {
			if (hasElement(68)) start = start.mul(2)
			if (player.ranks.hex.gte(68)) start = start.mul(2)
			if (player.ranks.hex.gte(88)) start = start.mul(100)
			if (player.ranks.pent.gte(4)) start = start.mul(RANKS.effect.pent[4]())
			if (player.ranks.hex.gte(123)) start = start.mul(RANKS.effect.hex[123]())
			if (hasPrestige(2,7)) start = start.mul(10000)
			start = start.mul(tmp.fermions.effs[0][5])
			start = start.mul(getEnRewardEff(0))
		}
		if (name=="bh_condenser" || name=="gamma_ray") {
			start = start.mul(getEnRewardEff(0))
		}
		if (name == "supernova") if (hasPrestige(1,2)) start = start.add(100)
	}
	if (name=='supernova') {
		start = start.add(tmp.prim.eff[7])
	}
	if ((name=="bh_condenser" || name=="gamma_ray" || name=="tickspeed") && hasUpgrade('atom',14)) start = start.mul(10)
	if ((name=="bh_condenser" || name=="gamma_ray" || name=="tickspeed") && hasUpgrade('atom',14) && player.prestiges[0].gte(50)) start = start.mul(1.2)
	if (QCs.active() && QCM8_SCALES.includes(name)) if (!tmp.scaling_qc8.includes(name)) start = start.pow(tmp.qu.qc_eff[7][0])
	if (hasUpgrade('br',14) && name=="fTier" && type=="super") start = start.add(10)
	if (hasElement(88) && name == "tickspeed") start = start.mul(player.qu.rip.active?100:10)
		
	if (type=="meta") {
		if (name=="rank") {
			tmp.rankCollapse = start.div(start.softcap("1e30", hasElement(162)?0.6:0.5, 0).softcap("1e50", 0.5, 0).softcap("1e60", 0.5, 0));
			start = start.softcap("1e30", hasElement(162)?0.6:0.5, 0).softcap("1e50", 0.5, 0).softcap("1e60", 0.5, 0);
		}
	}
	
	if (name=="rank" && type!="meta") if (player.ranks.hex.gte(80))return EINF;
	if (name=="tickspeed" && type!="meta") if (player.ranks.hex.gte(80))return EINF;
	if (name=="bh_condenser" && type!="meta") if (player.ranks.hex.gte(82))return EINF;
	if ( name=="gamma_ray" && type!="meta") if (player.ranks.hex.gte(82))return EINF;
	if (name=="massUpg" && type!="meta" && type!="ultra") if (player.ranks.hex.gte(95))return EINF;
	if (name=="tier" && type!="meta" && type!="ultra") if (player.ranks.hex.gte(95))return EINF;
	if (name=="supernova" && type!="meta") if (player.ranks.hex.gte(98))return EINF;
	if (name=="tetr" && type=="super") if (player.ranks.hex.gte(238))return EINF;
	if (name=="tetr" && type=="hyper") if (player.ranks.hept.gte(11))return EINF;
	//if (name=="tier" && type=="ultra") if (player.ranks.hept.gte(14))return EINF;
	return start.floor()
}

function getScalingPower(type, name) {
	let power = E(1)
	if (name == "supernova" && type != "meta") {
		power = power.mul(tmp.fermions.effs[1][4])
	}
	if (name == "fTier" && type != "meta") {
		if (hasTree("fn12")) power = power.mul(0.9)
	}
	if (name == "massUpg" && type != "ultra" && hasElement(84)) power = power.mul(tmp.elements.effect[84])
	if (type=="super") {
		if (name=="rank") {
			if (player.mainUpg.rp.includes(10)) power = power.mul(0.8)
			if (player.ranks.tetr.gte(4)) power = power.mul(RANKS.effect.tetr[4]())
			if (hasPrestige(0,77)) power = power.mul(tmp.prestigeMassEffect)
		}
		if (name=="tier") {
			if (player.ranks.tetr.gte(4)) power = power.mul(0.8)
			if (hasElement(37)) power = power.mul(tmp.elements.effect[37])
			if (hasPrestige(0,75)) power = power.mul(tmp.prestigeMassEffect)
		}
		if (name=="tetr") {
			if (hasElement(74)) power = power.mul(0.75)
			if (player.prestiges[1].gte(10)) power = power.mul(tmp.prestigeMassEffect)
			if (player.ranks.hex.gte(74)) power = power.mul(0.9)
		}
		if (name=="massUpg") {
			if (player.mainUpg.rp.includes(8)) power = power.mul(tmp.upgs.main?tmp.upgs.main[1][8].effect:1)
		}
		if (name=='tickspeed') {
			power = power.mul(tmp.chal?tmp.chal.eff[1].tick:1)
		}
		if (name=='bh_condenser') {
			if (hasElement(15)) power = power.mul(0.8)
			if (player.ranks.hex.gte(15)) power = power.mul(0.8)
		}
		if (name=='gamma_ray') {
			if (hasElement(15)) power = power.mul(0.8)
			if (player.ranks.hex.gte(15)) power = power.mul(0.8)
		}
		if (name=="fTier") {
			if (hasTree("fn3")) power = power.mul(0.925)
			if (hasPrestige(0,500)) power = power.mul(tmp.prestigeMassEffect)
		}
		if (name=="cosmic_str") {
			if (hasPrestige(0,24)) power = power.mul(0.8)
			if (hasPrestige(0,79)) power = power.mul(tmp.prestigeMassEffect)
		}
		if (name=="pent") {
			if (hasPrestige(0,61)) power = power.mul(tmp.prestigeMassEffect)
		}
		if (name=="supernova") {
			if (hasPrestige(0,61)) power = power.mul(tmp.prestigeMassEffect)
		}
		if (name=="prestige0") {
			if (hasPrestige(0,62)) power = power.mul(tmp.prestigeMassEffect)
		}
		if (name=="prestige1") {
			if (hasPrestige(0,77)) power = power.mul(tmp.prestigeMassEffect)
			if (hasPrestige(0,105)) power = power.mul(0.97)
		}
		if (name=="hex") {
			if (hasPrestige(1,34)) power = power.mul(tmp.prestigeMassEffect)
			if (hasElement(149)) power = power.mul(0.95)
		}
	}
	if (type=="hyper") {
		if (name=="rank") {
			if (player.ranks.tetr.gte(1)) power = power.mul(0.85)
			if (hasElement(27)) power = power.mul(0.75)
			if (player.ranks.hex.gte(27)) power = power.mul(0.75)
			if (hasPrestige(0,77)) power = power.mul(tmp.prestigeMassEffect)
		}
		if (name=="tier") {
			if (player.ranks.tetr.gte(4)) power = power.mul(0.8)
			if (hasElement(37)) power = power.mul(tmp.elements.effect[37])
			if (hasPrestige(0,75)) power = power.mul(tmp.prestigeMassEffect)
		}
		if (name=="massUpg") {
			if (player.mainUpg.rp.includes(8)) power = power.mul(tmp.upgs.main?tmp.upgs.main[1][8].effect:1)
		}
		if (name=='tickspeed') {
			if (player.mainUpg.bh.includes(12)) power = power.mul(0.85)
			if (hasElement(27)) power = power.mul(0.75)
			if (player.ranks.hex.gte(27)) power = power.mul(0.75)
		}
		if (name=='bh_condenser') {
			if (hasElement(55)) power = power.mul(0.75)
			if (player.ranks.hex.gte(55)) power = power.mul(0.75)
		}
		if (name=='gamma_ray') {
			if (hasElement(55)) power = power.mul(0.75)
			if (player.ranks.hex.gte(55)) power = power.mul(0.75)
		}
		if (name=="tetr") {
			if (player.prestiges[1].gte(10)) power = power.mul(tmp.prestigeMassEffect)
			if (hasPrestige(1,37)) power = power.mul(0.98)
			if (player.ranks.hept.gte(8)) power = power.mul(0.9)
			if (player.ranks.hept.gte(9)) power = power.mul(0.7)
			if (player.ranks.hept.gte(10)) power = power.mul(0.5)
		}
		if (name=="pent") {
			if (hasPrestige(0,61)) power = power.mul(tmp.prestigeMassEffect)
		}
		if (name=="supernova") {
			if (hasPrestige(0,61)) power = power.mul(tmp.prestigeMassEffect)
		}
		if (name=="cosmic_str") {
			if (hasPrestige(0,79)) power = power.mul(tmp.prestigeMassEffect)
			if (hasPrestige(1,35)) power = power.mul(0.8)
		}
		if (name=="prestige0") {
			if (hasPrestige(1,21)) power = power.mul(tmp.prestigeMassEffect)
		}
		if (name=="prestige1") {
			if (hasPrestige(1,32)) power = power.mul(tmp.prestigeMassEffect)
		}
		if (name=="fTier") {
			if (hasPrestige(0,1000)) power = power.mul(tmp.prestigeMassEffect)
		}
		if (name=="hex") {
			//if (hasPrestige(1,56)) power = power.mul(0.94)
		}
	}
	if (type=="ultra") {
		if (name=="rank") {
			if (hasElement(27)) power = power.mul(0.75)
			if (player.ranks.hex.gte(27)) power = power.mul(0.75)
			if (hasElement(58)) power = power.mul(tmp.elements.effect[58])
			if (hasPrestige(0,77)) power = power.mul(tmp.prestigeMassEffect)
		}
		if (name=='tickspeed') {
			if (hasElement(27)) power = power.mul(0.75)
			if (player.ranks.hex.gte(27)) power = power.mul(0.75)
			if (hasElement(58)) power = power.mul(tmp.elements.effect[58])
		}
		if (name=="tier") {
			if (hasPrestige(0,75)) power = power.mul(tmp.prestigeMassEffect)
			if (hasUpgrade("atom",17)) power = power.mul(0.9)
			if (player.ranks.hept.gte(3)) power = power.mul(RANKS.effect.hept[3]())
		}
		if (name=="tetr") {
			if (player.prestiges[0].gte(45)) power = power.mul(0.58)
			if (player.prestiges[1].gte(10)) power = power.mul(tmp.prestigeMassEffect)
		}
		if (name=='bh_condenser') {
			if (hasElement(55)) power = power.mul(0.75)
			if (player.ranks.hex.gte(55)) power = power.mul(0.75)
		}
		if (name=='gamma_ray') {
			if (hasElement(55)) power = power.mul(0.75)
			if (player.ranks.hex.gte(55)) power = power.mul(0.75)
		}
		if (name=="pent") {
			if (hasPrestige(0,61)) power = power.mul(tmp.prestigeMassEffect)
		}
		if (name=="supernova") {
			if (hasPrestige(0,61)) power = power.mul(tmp.prestigeMassEffect)
		}
		if (name=="cosmic_str") {
			if (hasPrestige(0,79)) power = power.mul(tmp.prestigeMassEffect)
		}
		if (name=="massUpg") {
			if (player.ranks.hex.gte(300)) power = power.mul(0.98)
		}
		if (name=="prestige0") {
			if (hasPrestige(2,8)) power = power.mul(tmp.prestigeMassEffect)
		}
	}
	if (type=="meta") {
		if (name=='supernova') {
			if (hasElement(78)) power = power.mul(0.8)
			if (player.ranks.hex.gte(78)) power = power.mul(0.95)
			if (hasPrestige(0,93)) power = power.mul(tmp.prestigeMassEffect)
		}
		if (name=="rank") {
			if (hasPrestige(0,77)) power = power.mul(tmp.prestigeMassEffect)
			if (hasPrestige(0,107)) power = power.mul(1e-4)
			if (hasPrestige(0,113)) power = power.mul(0.1)
		}
	}
	if (name=="rank" && hasPrestige(0,58)) power = power.mul(0.5)
	if (name=="rank" && hasPrestige(1,15)) power = power.mul(0.1)
	if (hasUpgrade("atom",15) && name == "gamma_ray") power = power.mul(0.8)
	if (hasUpgrade("atom",15) && name == "gamma_ray" && player.prestiges[0].gte(50)) power = power.mul(0.76/0.8)
	if (hasElement(108) && ["rank","tier","tetr","pent"].includes(name)) power = power.mul(player.qu.rip.active?0.98:0.9)
	if (QCs.active() && QCM8_SCALES.includes(name)) if (!tmp.scaling_qc8.includes(name)) power = power.mul(tmp.qu.qc_eff[7][1])
	if (PreQ_SCALES.includes(name) && type != "meta")  power = power.mul(getEnRewardEff(5))
	return power.max(type=="meta"?1e-8:0)
}
const INFINITY_LAYER = {
    gain() {
        let x = player.qu.points.add(1).log(Number.MAX_VALUE);
        if (x.lt(1)) return E(0)
        x = x.pow(hasUpgrade('inf',7)?3:2).sub(1);

		let m = player.mass.add(1).log10().add(1).log10().add(1).sqrt();
		x = x.mul(m);
		if (hasUpgrade('inf',8))x = x.mul(m.pow(0.5))
		if (hasUpgrade('inf',9))x = x.mul(m.pow(0.5))
		let p = player.prestigeMass.add(1).log10().add(1).log10().add(1).sqrt();
		x = x.mul(p);
		if (hasUpgrade('inf',10))x = x.mul(p)
        if (hasUpgrade('inf',4)) x = x.mul(upgEffect(5,4))
		if (hasUpgrade('inf',7)) x = x.mul(2)
        if (hasPrestige(2,3)) x = x.mul(prestigeEff(2,3));
        if (hasPrestige(1,18)) x = x.mul(prestigeEff(1,18));
        if (hasPrestige(0,171)) x = x.mul(prestigeEff(0,171));
        return x
    },
    gainTimes() {
        let x = E(1)
        if (hasUpgrade('inf',12)) x = x.mul(upgEffect(5,12))
        return x
    },
    enter() {
        let x = player.qu.points.add(1).log(Number.MAX_VALUE);
        if (x.lt(1)) return
        if (player.confirms.inf) if (confirm("Are you sure to go Infinity? Going Infinity will reset all previous except QoL mechanicals and Prestiges")?!confirm("ARE YOU SURE ABOUT IT???"):true) return
		INFINITY_LAYER.doReset()
    },
    doReset(force=false) {
		updateInfinityTemp()
        player.inf.points = player.inf.points.add(tmp.inf.gain)
        player.inf.times = player.inf.times.add(tmp.inf.gainTimes)
		if(!hasUpgrade('inf',2))player.supernova.tree = ['qol1','qol2','qol3','qol4','qol5','qol6','fn2','fn5','fn6','fn7','fn8','fn9','fn10','fn11','qol8','qol9','c','qol7','unl1','qu_qol1','qu_qol4']
		else{
			
        let keep = ['qol1','qol2','qol3','qol4','qol5','qol6','fn2','fn5','fn6','fn7','fn8','fn9','fn10','fn11']
        for (let x = 0; x < tmp.supernova.tree_had.length; x++) if (TREE_UPGS.ids[tmp.supernova.tree_had[x]].qf) keep.push(tmp.supernova.tree_had[x])
        keep.push('chal1','chal2','chal3','chal4','chal4a','chal5','chal6','chal7','c','qol7','chal4b','chal7a','chal8')
        keep.push('unl1')
        keep.push('qol8','qol9')

        let save_keep = []
        for (let x in keep) if (hasTree(keep[x])) save_keep.push(keep[x])
        player.supernova.tree = save_keep
		}
		player.qu.points = E(0)
		if(!hasUpgrade('inf',3))player.qu.times = E(0)
		if(hasUpgrade('inf',3))player.qu.times = E(200)
		player.qu.bp = E(0)
		player.qu.cosmic_str = E(0)
		player.qu.chroma = [E(0),E(0),E(0)]
		player.qu.prim.theorems = E(0)
		player.qu.prim.particles = [E(0),E(0),E(0),E(0),E(0),E(0),E(0),E(0)]
		if(!hasUpgrade('inf',3))player.qu.qc.shard = 0
		if(!hasUpgrade('inf',3))player.qu.qc.mods = [0,0,0,0,0,0,0,0]
		player.qu.qc.active = false
		player.qu.en.amt = E(0)
		player.qu.en.eth = [false,E(0),E(0),0]
		player.qu.en.hr = [false,E(0),E(0),0]
		player.qu.en.rewards = []
		player.qu.rip.active = false
		player.qu.rip.amt = E(0)
		for (let x = 0; x < ENTROPY.rewards.length; x++) player.qu.en.rewards.push(E(0))
		if(!hasUpgrade('inf',3))player.mainUpg.br = []
		if(!hasUpgrade('inf',3))player.mainUpg.rp = []
		if(!hasUpgrade('inf',3))player.mainUpg.bh = []
		if(!hasUpgrade('inf',3))player.mainUpg.atom = []
		if(!hasUpgrade('inf',5))player.atom.elements=[]
		player.md.break.energy = E(0)
		player.md.break.mass = E(0)
        QUANTUM.doReset()
		player.atom.points = E(1e100)
		player.atom.quarks = E(1e100)
        tmp.pass = false
    },
}


function calcInfinity(dt, dt_offline) {
    if (player.qu.points.gte(Number.MAX_VALUE) && !player.inf.reached) {
        player.inf.reached = true
        addPopup(POPUP_GROUPS.inf)
    }
	if  (player.inf.times.gte(0)){
		if (hasUpgrade('inf',11)){
			updateInfinityTemp()
			player.inf.points = player.inf.points.add(tmp.inf.gain.mul(dt))
			player.inf.times = player.inf.times.add(tmp.inf.gainTimes.mul(dt))
		}
	}
}

function updateInfinityTemp() {
    tmp.inf.gain = INFINITY_LAYER.gain()
    tmp.inf.gainTimes = INFINITY_LAYER.gainTimes()
}


function updateInfinityHTML() {
    let gain2 = hasUpgrade('inf',11)
    let unl = player.inf.reached
    tmp.el.infinity_div.setDisplay(unl)
    if (unl) tmp.el.infAmt.setHTML(formatMass(player.inf.points,0)+"<br>"+(gain2?player.inf.points.formatGain(tmp.inf.gain,1):"(+"+formatMass(tmp.inf.gain,0)+")"))
}
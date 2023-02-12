const EXOTIC_BOOST = {
    gain() {
		let x = player.exotic.points.add(1).log10().div(3);
        return x.floor()
    },
    used_bp() {
		let x = E(0);
		for(let i=0;i<=3;i++){
			x = x.add(player.exotic.boosts[i]);
		}
        return x
    },
	effect(i) {
		return E(1).add(player.exotic.boosts[i].sqrt().mul(0.01));
	},
	buy(i) {
		tmp.ex.exb_can = player.exotic.bp.gt(EXOTIC_BOOST.used_bp());
		if(tmp.ex.exb_can)player.exotic.boosts[i]=player.exotic.boosts[i].add(1);
	},
	respec() {
		if (!confirm("Are you sure you want to respec all Exotic Boosts?"))return;
		for(let i=0;i<=3;i++){
			player.exotic.boosts[i]=E(0);
		}
		EXOTIC.doReset(true);
	},
}
const MATTERS = {
    gain(i) {
		let base=(i==0)?player.bh.dm : player.exotic.matters[i-1]
		if(base.slog().lt(2))return E(0)
		let x = Decimal.pow(10,base.slog().sub(1).pow(MATTERS.pow())).sub(10);
		if(i==1 && hasTree('qp15'))x = x.mul(treeEff('qp15'));
		return x;
    },
    eff(i) {
		let base=player.exotic.matters[i]
		if(i==0){
			let x = base.add(1).cbrt();
			if(x.gte(1e10))x = x.log10().pow(10);
			return x;
		}
		if(i==1){
			return E(0.9).pow(base.add(1).log10());
		}
		if(i==2){
			return base.add(1).log10().add(1).log10();
		}
    },
    pow() {
		let x = E(1)
		if (hasTree('qp10')) x = x.add(0.3)
		if (hasElement(487)) x = x.add(player.exotic.points.add(10).log10().div(100).sub(1).mul(hasElement(495)?2:1))
		if (hasElement(490)) x = x.add(0.4)
		if (hasElement(492)) x = x.add(EXOTIC.dsEff().me)
		if (hasElement(493)) x = x.add(0.3)
		if (hasElement(508)) x = x.add(tmp.elements.effect[508]||0)
		if (hasTree('qp17')) x = x.add(treeEff('qp17',0))
		if(player.superCluster.gte(13))x = x.add(SUPERNOVA_CLUSTER.effects.eff6());
		if(player.exotic.dark_run.upgs[15].gte(1))x = x.add(tmp.dark_run.upgs[15].eff);
		return x
    }
}

const MATTERS_LENGTH = 3;
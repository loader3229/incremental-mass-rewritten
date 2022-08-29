const ELEMENTS = {
    map: [`x_________________xvxx___________xxxxxxvxx___________xxxxxxvxxx_xxxxxxxxxxxxxxxvxxx_xxxxxxxxxxxxxxxvxxx1xxxxxxxxxxxxxxxvxxx2xxxxxxxxxxxxxxxv_v___3xxxxxxxxxxxxxx_v___4xxxxxxxxxxxxxx_`],
    la: [null,'*','**','*','**'],
    exp: [0,118,218,362,558,814,1138],
    names: [
        null,
        'H','He','Li','Be','B','C','N','O','F','Ne',
        'Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca',
        'Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn',
        'Ga','Ge','As','Se','Br','Kr','Rb','Sr','Y','Zr',
        'Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn',
        'Sb','Te','I','Xe','Cs','Ba','La','Ce','Pr','Nd',
        'Pm','Sm','Eu','Gd','Tb','Dy','Ho','Er','Tm','Yb',
        'Lu','Hf','Ta','W','Re','Os','Ir','Pt','Au','Hg',
        'Ti','Pb','Bi','Po','At','Rn','Fr','Ra','Ac','Th',
        'Pa','U','Np','Pu','Am','Cm','Bk','Cf','Es','Fm',
        'Md','No','Lr','Rf','Db','Sg','Bh','Hs','Mt','Ds',
        'Rg','Cn','Nh','Fl','Mc','Lv','Ts','Og'
    ],
    fullNames: [
        null,
        'Hydrogen','Helium','Lithium','Beryllium','Boron','Carbon','Nitrogen','Oxygen','Fluorine','Neon',
        'Sodium','Magnesium','Aluminium','Silicon','Phosphorus','Sulfur','Chlorine','Argon','Potassium','Calcium',
        'Scandium','Titanium','Vanadium','Chromium','Manganese','Iron','Cobalt','Nickel','Copper','Zinc',
        'Gallium','Germanium','Arsenic','Selenium','Bromine','Krypton','Rubidium','Strontium','Yttrium','Zirconium',
        'Niobium','Molybdenum','Technetium','Ruthenium','Rhodium','Palladium','Silver','Cadmium','Indium','Tin',
        'Antimony','Tellurium','Iodine','Xenon','Caesium','Barium','Lanthanum','Cerium','Praseodymium','Neodymium',
        'Promethium','Samarium','Europium','Gadolinium','Terbium','Dysprosium','Holmium','Erbium','Thulium','Ytterbium',
        'Lutetium','Hafnium','Tantalum','Tungsten','Rhenium','Osmium','Iridium','Platinum','Gold','Mercury',
        'Thallium','Lead','Bismuth','Polonium','Astatine','Radon','Francium','Radium','Actinium','Thorium',
        'Protactinium','Uranium','Neptunium','Plutonium','Americium','Curium','Berkelium','Californium','Einsteinium','Fermium',
        'Mendelevium','Nobelium','Lawrencium','Ruthefordium','Dubnium','Seaborgium','Bohrium','Hassium','Meitnerium','Darmstadium',
        'Roeritgenium','Copernicium','Nihonium','Flerovium','Moscovium','Livermorium','Tennessine','Oganesson'
    ],
    canBuy(x) { 
		if(this.upgs[x].et)return player.et.points.gte(this.upgs[x].cost) && !hasElement(x)
		if(x>118) return player.inf.points.gte(this.upgs[x].cost) && !hasElement(x)
		return player.atom.quarks.gte(this.upgs[x].cost) && !hasElement(x) && (player.qu.rip.active ? true : x <= 86) && !tmp.elements.cannot.includes(x)
	},
    buyUpg(x) {
        if (this.canBuy(x)) {
			if(x>118){
				if(this.upgs[x].et)player.et.points = player.et.points.sub(this.upgs[x].cost)
				else player.inf.points = player.inf.points.sub(this.upgs[x].cost)
			}else{
				player.atom.quarks = player.atom.quarks.sub(this.upgs[x].cost)
			}
            player.atom.elements.push(x)
        }
    },
    upgs: [
        null,
        {
            desc: `Improves quark gain formula is better.`,
            cost: E(5e8),
        },
        {
            desc: `Hardened Challenge scale 25% weaker.`,
            cost: E(2.5e12),
        },
        {
            desc: `Electron Power boost Atomic Powers gain.`,
            cost: E(1e15),
            effect() {
                let x = player.atom?player.atom.powers[2].add(1).root(2):E(1)
				if(player.ranks.hex.gte(3))x=x.pow(1.5);
                if (x.gte('e1e4')) x = expMult(x.div('e1e4'),0.9).mul('e1e4')
				if (x.gte('ee4000')) x = overflow(x,'ee4000',0.5);
                return x
            },
            effDesc(x) { return format(x)+"x"+(x.gte('e1e4')?"<span class='soft'>(softcapped)</span>":"") },
        },
        {
            desc: `Stronger's power is stronger based on Proton Powers.`,
            cost: E(2.5e16),
            effect() {
                let x = player.atom?player.atom.powers[0].max(1).log10().pow(0.8).div(50).add(1):E(1)
				if(player.ranks.hex.gte(4))x=x.pow(1.05);
                return x
            },
            effDesc(x) { return format(x)+"x stronger" },
        },
        {
            desc: `The 7th challenge's effect is twice as effective.`,
            cost: E(1e18),
        },
        {
            desc: `Gain 1% more quarks for each challenge completion.`,
            cost: E(5e18),
            effect() {
                let x = E(0)
                for (let i = 1; i <= CHALS.cols; i++) x = x.add(player.chal.comps[i].mul(i>4?2:1))
                if (hasElement(7)) x = x.mul(tmp.elements.effect[7])
                if (hasElement(87)) x = E(1.01).pow(x).root(3)
                else x = x.div(100).add(1).max(1)
                return x
            },
            effDesc(x) { return format(x)+"x" },
        },
        {
            desc: `Carbon's effect is now multiplied by the number of elements bought.`,
            cost: E(1e20),
            effect() {
                let x = E(player.atom.elements.length+1)
				if (player.ranks.hex.gte(7))x = x.pow(1.1);
                if (hasElement(11) && (!hasElement(87) || player.ranks.hex.gte(11))) x = x.pow(2);
                return x
            },
            effDesc(x) { return format(x)+"x" },
        },
        {
            desc: `C2's reward's softcap is 75% weaker.`,
            cost: E(1e21),
        },
        {
            desc: `The Tetr requirement is 15% weaker.`,
            cost: E(6.5e21),
        },
        {
            desc: `使挑战3和挑战4的折算弱化。`,
            cost: E(1e24),
        },
        {
            desc: `Nitrogen's multiplier is squared.`,
            cost: E(1e27),
        },
        {
            desc: `Power's gain from each particle formula is better.`,
            cost: E(1e29),
        },
        {
            desc: `For every c7 completion, add 2 c5 & 6 completion.`,
            cost: E(2.5e30),
            effect() {
                let x = player.chal.comps[7].mul(2)
                if (hasElement(79)) x = x.mul(tmp.qu.chroma_eff[2])
                return x
            },
            effDesc(x) { return "+"+format(x) },
        },
        {
            desc: `Passively gain 5% of the quarks you would get from resetting each second.`,
            cost: E(1e33),
        },
        {
            desc: `Super BH Condenser & Cosmic Ray scales 20% weaker.`,
            cost: E(1e34),
        },
        {
            desc: `Silicon now gets +2% for each element bought.`,
            cost: E(5e38),
            effect() {
                let x = player.atom.elements.length*0.02
				if(player.ranks.hex.gte(16))x = player.atom.elements.length
                return Number(x)
            },
            effDesc(x) { return "+"+format(x*100)+"%" },
        },
        {
            desc: `Raise Atom's gain by 1.1.`,
            cost: E(1e40),
        },
        {
            desc: `You can now automatically buy Cosmic Rays. Cosmic Ray raise tickspeed effect at an extremely reduced rate.`,
            cost: E(1e44),
            effect() {
                let x = player.atom.gamma_ray.pow(0.35).mul(0.01).add(1)
				if(player.ranks.hex.gte(18))x = player.atom.gamma_ray
                return x
            },
            effDesc(x) { return "^"+format(x) },
        },
        {
            desc: `2nd Neutron's effect is better.`,
            cost: E(1e50),
        },
        {
            desc: `Adds 50 more C7 maximum completions.`,
            cost: E(1e53),
        },
        {
            desc: `Unlock Mass Dilation.`,
            cost: E(1e56),
        },
        {
            desc: `Dilated mass gain is affected by tickspeed at a reduced rate.`,
            cost: E(1e61),
            effect() {
                let x = E(1.25).pow(player.tickspeed.pow(0.55))
				if(player.ranks.hex.gte(22))x = E(10).pow(player.tickspeed)
                return x
            },
            effDesc(x) { return format(x)+"x" },
        },
        {
            desc: `The Atomic Power effect is better.`,
            cost: E(1e65),
        },
        {
            desc: `Passively gain 100% of the atoms you would get from resetting each second. Atomic Power boost Relativistic particles gain at a reduced rate.`,
            cost: E(1e75),
            effect() {
                let x = hasPrestige(0,40) ? player.atom.atomic.max(1).log10().add(1).log10().add(1).root(2) : player.atom.atomic.max(1).log10().add(1).pow(0.4)
				if(player.ranks.hex.gte(24))x = x.pow(1.1)
				return x
            },
            effDesc(x) { return hasPrestige(0,40) ? "^"+format(x) : format(x)+"x" },
        },
        {
            desc: `Adds 1 base of Mass Dilation upgrade 1 effect.`,
            cost: E(1e80),
        },
        {
            desc: `Hardened Challenge scaling weaker for each element bought.`,
            cost: E(1e85),
            effect() {
                let x = E(0.99).pow(E(player.atom.elements.length).softcap(30,2/3,0)).max(0.5)
				if(player.ranks.hex.gte(26))x = E(0.99).pow(E(player.atom.elements.length))
                return x
            },
            effDesc(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
        },
        {
            desc: `Hyper/Ultra Rank & Tickspeed scales 25% weaker.`,
            cost: E(1e90),
        },
        {
            desc: `Mass gain is raised to the power of 1.5th if you dilated mass.`,
            cost: E(1e97),
        },
        {
            desc: `Proton powers effect is better.`,
            cost: E(1e100),
        },
        {
            desc: `Electron powers effect is better. Passively gain 10% of each particle you would assign quarks.`,
            cost: E(1e107),
        },
        {
            desc: `Dilated mass boost Relativistic particles gain.`,
            cost: E(1e130),
            effect() {
                let x = player.md.mass.add(1).log10().add(1).log10().add(1).pow(5);
                return x
            },
            effDesc(x) { if(player.ranks.hex.gte(31))return "^"+format(x)+", "+format(player.md.mass.add(1).pow(0.0125))+"x";return format(player.md.mass.add(1).pow(0.0125))+"x" },
        },
        {
            desc: `Increase dilated mass gain exponent by 5%.`,
            cost: E(1e140),
        },
        {
            desc: `Add 50 more C8 maximum completions.`,
            cost: E(1e155),
        },
        {
            desc: `Rage power boost Relativistic particles gain.`,
            cost: E(1e175),
            effect() {
                let x = player.rp.points.max(1).log10().add(1).pow(0.75)
                if(player.ranks.hex.gte(34))x = player.rp.points.add(1).log10().add(1).log10().add(1).log10().add(1);
                return x
            },
            effDesc(x) { if(player.ranks.hex.gte(34))return "^"+format(x);return format(x)+"x" },
        },
        {
            desc: `Mass from Black Hole boost dilated mass gain.`,
            cost: E(1e210),
            effect() {
                let x = player.bh.mass.max(1).log10().add(1).pow(0.8)
				if(player.ranks.hex.gte(35))x = player.bh.mass.add(1).log10().add(1).log10().add(1).log10().add(1).sqrt();
                return x
            },
            effDesc(x) { if(player.ranks.hex.gte(35))return "^"+format(x);return format(x)+"x" },
        },
        {
            desc: `Unlock Stars.`,
            cost: E(1e225),
        },
        {
            desc: `Super Tier scale weaker based on Tetr.`,
            cost: E(1e245),
            effect() {
				if(player.ranks.hex.gte(37))return E(0);
                let x = E(0.9).pow(player.ranks.tetr.softcap(6,0.5,0))
                return x
            },
            effDesc(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
        },
        {
            desc: `Cosmic Ray's free tickspeeds now adds to RU7.`,
            cost: E(1e260),
            effect() {
                let x = tmp.atom?tmp.atom.atomicEff:E(0)
                if (hasElement(82)) x = x.mul(3)
                if (player.ranks.hex.gte(38)) x = x.mul(2)
                return x.div(6).floor()
            },
            effDesc(x) { return "+"+format(x,0)+" to Rage Power Upgrade 7" },
        },
        {
            desc: `Remove softcap from C2 & C6 effects.`,
            cost: E(1e285),
        },
        {
            desc: `Collapsed star boost dilated mass gain.`,
            cost: E(1e303),
            effect() {
                let x = player.stars.points.add(1).pow(0.5)
                if (player.ranks.hex.gte(40)) x = x.pow(2)
                return x
            },
            effDesc(x) { return format(x)+"x" },
        },
        {
            desc: `Add 50 more C7 maximum completions.`,
            cost: E('e315'),
        },
        {
            desc: `Collapsed star boost quark gain.`,
            cost: E('e325'),
            effect() {
                let x = player.stars.points.add(1).pow(1/3)
                if (player.ranks.hex.gte(42)) x = x.pow(3)
                return x
            },
            effDesc(x) { return format(x)+"x" },
        },
        {
            desc: `You can now automatically buy mass dilation upgrades if you purchased any first. They no longer spent dilated mass.`,
            cost: E('e360'),
        },
        {
            desc: `The Tetr requirement is broken.`,
            cost: E('e380'),
        },
        {
            desc: `Collapsed star boost relativistic particles gain.`,
            cost: E('e420'),
            effect() {
                let x = player.stars.points.add(1).pow(0.15).min(1e20)
				if(player.ranks.hex.gte(45))x = player.stars.points.add(1).log10().add(1).log10().add(1).log10().add(1).sqrt();
                return x
            },
            effDesc(x) { if(player.ranks.hex.gte(45))return "^"+format(x);return format(x)+"x" },
        },
        {
            desc: `Collapsed star's effect boost mass gain from the black hole at a reduced rate.`,
            cost: E('e510'),
            effect() {
                let x = tmp.stars?tmp.stars.effect.add(1).pow(0.02):E(1)
				if(player.ranks.hex.gte(46))x = tmp.stars?tmp.stars.effectPower:E(1)
                return x
            },
            effDesc(x) { if(player.ranks.hex.gte(46))return "^"+format(x);return format(x)+"x" },
        },
        {
            desc: `Quarks gain is raised to the 1.1th power.`,
            cost: E('e610'),
        },
        {
            desc: `Collapsed stars effect is 10% stronger.`,
            cost: E('e800'),
        },
        {
            desc: `Collapsed star boost last type of stars.`,
            cost: E('e1000'),
            effect() {
                let x = player.stars.points.add(1).log10().add(1).pow(1.1)
				if(player.ranks.hex.gte(49))x = player.stars.points
                return x
            },
            effDesc(x) { return format(x)+"x" },
        },
        {
            desc: `Star generator is now ^1.05 stronger.`,
            cost: E('e1750'),
        },
        {
            desc: `Mass gain softcap^2 is 10% weaker.`,
            cost: E('e2400'),
        },
        {
            desc: `Mass of black hole boost atomic powers gain at a reduced rate.`,
            cost: E('e2800'),
            effect() {
                let x = expMult(player.bh.mass.add(1),0.6)
				if(player.ranks.hex.gte(52))x = expMult(player.bh.mass.add(1),0.95)
                return x
            },
            effDesc(x) { return format(x)+"x" },
        },
        {
            desc: `Mass Dilation upgrade 6 is 75% stronger.`,
            cost: E('e4600'),
        },
        {
            desc: `Collapsed stars boost all-star resources at a reduced rate.`,
            cost: E('e5200'),
            effect() {
                let x = player.mass.max(1).log10().root(2)
                return x
            },
            effDesc(x) { return format(x)+"x" },
        },
        {
            desc: `Hyper/Ultra BH Condenser & Cosmic Ray scale 25% weaker.`,
            cost: E('e1.6e4'),
        },
        {
            desc: `Add 200 more C8 maximum completions.`,
            cost: E('e2.2e4'),
        },
        {
            desc: `Tickspeed power boost base from Star Booster at a reduced rate.`,
            cost: E('e3.6e4'),
            effect() {
                let x = tmp.tickspeedEffect?tmp.tickspeedEffect.step.max(1).log10().div(10).max(1):E(1)
                if (hasElement(66)) x = x.pow(2)
                if (player.ranks.hex.gte(57)) x = x.pow(1.1)
                if (player.ranks.hex.gte(66)) x = x.pow(1.1)
                return x
            },
            effDesc(x) { return format(x)+"x" },
        },
        {
            desc: `Ultra Rank & Tickspeed scales weaker based on Tier.`,
            cost: E('e5.7e4'),
            effect() {
				if(player.ranks.hex.gte(58))return E(0);
                let x = E(0.975).pow(player.ranks.tier.pow(0.5))
                return x
            },
            effDesc(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
        },
        {
            desc: `The power from the mass of the BH formula is increased to 0.45.`,
            cost: E('e6.6e4'),
        },
        {
            desc: `Add 100 more C7 maximum completions.`,
            cost: E('e7.7e4'),
        },
        {
            desc: `Multiply Particle Powers gain by ^0.5 of its Particle's amount after softcap.`,
            cost: E('e1.5e5'),
        },
        {
            desc: `Ultra Rank scale 3 later for every Supernova.`,
            cost: E('e2.5e5'),
            effect() {
                let x = player.supernova.times.mul(3)
                return x
            },
            effDesc(x) { return format(x,0)+" later" },
        },
        {
            desc: `Non-bonus Tickspeed is 25x effective.`,
            cost: E('e3e5'),
        },
        {
            desc: `Rewards from Challenges 3-4 & 8 are 50% effective.`,
            cost: E('e5e5'),
        },
        {
            desc: `Add 200 more C7 & c8 maximum completions.`,
            cost: E('e8e5'),
        },
        {
            desc: `Lanthanum's effect is twice stronger.`,
            cost: E('e1.1e6'),
        },
        {
            desc: `Collapsed star boost quarks gain.`,
            cost: E('e1.7e6'),
            effect() {
                let x = player.stars.points.add(1)
                if (player.ranks.hex.gte(67)) return player.stars.points.add(1).log10().add(1).log10().add(1).log10().add(1).sqrt();
                return x.softcap('e3e15',0.85,2)
            },
            effDesc(x) { if(player.ranks.hex.gte(67))return "^"+format(x);return format(x)+"x" },
        },
        {
            desc: `Meta-Tickspeed start 2x later.`,
            cost: E('e4.8e6'),
        },
        {
            desc: `Pent is now added in mass gain formula from collapsed stars.`,
            cost: E('e3.6e7'),
        },
        {
            desc: `Add 200 more C7 & c8 maximum completions.`,
            cost: E('e6.9e7'),
        },
        {
            desc: `From BH the formulas softcap starts later based on Supernovas.`,
            cost: E('e1.6e8'),
            effect() {
                let x = player.supernova.times.add(1).root(4)
                return x
            },
            effDesc(x) { return "^"+format(x)+" later" },
        },
        {
            desc: `Tetrs are 15% cheaper.`,
            cost: E('e5.75e8'),
        },
        {
            desc: `Add more C5-6 & C8 maximum completions based on Supernovas.`,
            cost: E('e1.3e9'),
            effect() {
                let x = player.supernova.times.mul(5)
                if (hasElement(79)) x = x.mul(tmp.qu.chroma_eff[2])
                return x
            },
            effDesc(x) { return "+"+format(x,0) },
        },
        {
            desc: `Super Tetr scales 25% weaker.`,
            cost: E('e2.6e9'),
        },
        {
            desc: `Remove 2 softcaps from Atomic Power's effect.`,
            cost: E('e3.9e9'),
        },
        {
            desc: `Collapsed Star's effect is 25% stronger.`,
            cost: E('e3.75e10'),
        },
        {
            desc: `Softcap^3 from mass gain is 17.5% weaker.`,
            cost: E('e4e11'),
        },
        {
            desc: `Meta-Supernova scales 20% weaker.`,
            cost: E('e3.4e12'),
        },
        {
            desc: `Neutronium-0 affects Aluminium-13 & Tantalum-73.`,
            cost: E('e4.8e12'),
        },
        {
            desc: `Stronger & Tickspeed are 25x stronger.`,
            cost: E('e1.4e13'),
        },
        {
            desc: `Stronger is ^1.1 stronger.`,
            cost: E('e2.8e13'),
        },
        {
            desc: `Strontium-38 is thrice effective.`,
            cost: E('e4e13'),
        },
        {
            desc: `Mass Dilation upgrade 2 effect is overpowered.`,
            cost: E('e3e14'),
        },
        {
            desc: `Pre-Ultra Mass Upgrades scale weaker based on Cosmic Ray's free tickspeeds.`,
            cost: E('e7e14'),
            effect() {
				if(player.ranks.hex.gte(84))return E(0);
                let x = tmp.atom?E(0.9).pow(tmp.atom.atomicEff.add(1).log10().pow(2/3)):E(1)
                return x
            },
            effDesc(x) { return formatReduction(x)+" weaker" },
        },
        {
            desc: `Stronger’s Power softcap starts 3x later, is 10% weaker.`,
            cost: E('e7.5e15'),
        },
        {
            desc: `Tickspeed’s Power softcap starts ^2 later, scales 50% weaker.`,
            cost: E('e2e16'),
        },
        {
            desc: `Carbon-6’s effect is overpowered, but Sodium-11 don’t work.`,
            cost: E('e150'),
        },
        {
            desc: `All scaling from Tickspeed start 100x later (after nerf from 8th QC modifier).`,
            cost: E('e500'),
        },
        {
            desc: `Mass of Black Hole effect raises itself at a reduced logarithm rate.`,
            cost: E('e1100'),
            effect() {
                let x = player.bh.mass.add(1).log10().add(1).log10().mul(1.25).add(1).pow(player.qu.rip.active?2:0.4)
                return x
            },
            effDesc(x) { return "^"+x.format() },
        },
        {
            desc: `Death Shard is boosted by Dilated Mass.`,
            cost: E('e1300'),
            effect() {
                let x = player.md.mass.add(1).log10().add(1).pow(0.5)
				if(player.ranks.hex.gte(90))x = x.pow(1.1);
                return x
            },
            effDesc(x) { return "x"+x.format() },
        },
        {
            desc: `Entropic Accelerator & Booster nerfing is 10% weaker.`,
            cost: E('e2700'),
        },
        {
            desc: `Insane Challenges scale 25% weaker.`,
            cost: E('e4800'),
        },
        {
            desc: `Entropy gain is increased by 66.7% for every OoM^2 of normal mass.`,
            cost: E('e29500'),
            effect() {
                let x = E(player.ranks.hex.gte(93)?2:(5/3)).pow(player.mass.add(1).log10().add(1).log10())
                return x
            },
            effDesc(x) { return "x"+x.format() },
        },
        {
            desc: `Death Shard is increased by 10% for every supernova.`,
            cost: E("e32000"),
            effect() {
                let x = E(1.1).pow(player.supernova.times)
                return x
            },
            effDesc(x) { return "x"+x.format() },
        },
        {
            desc: `Epsilon Particles are worked in Big Rip, but 90% weaker.`,
            cost: E("e34500"),
        },
        {
            desc: `Entropic Converter nerfing is 10% weaker.`,
            cost: E('e202000'),
        },
        {
            desc: `Increase Entropic Evaporation’s base by 1.`,
            cost: E('e8.5e6'),
        },
        {
            desc: `8th QC modifier in Big Rip is 20% weaker.`,
            cost: E('e1.2e7'),
        },
        {
            desc: `Remove softcap^3 from Photon Upgrade 3 effect, its softcap^2 is weaker.`,
            cost: E('e2.15e7'),
        },
        {
            desc: `Prestige Base’s exponent is increased based on Pent.`,
            cost: E('e2.5e7'),
            effect() {
                let x = player.ranks.pent.root(2).div(1e3).softcap(5.5,0.1,0);
				if(player.ranks.pent.gte(1e11))x = x.min(player.ranks.pent.log10().pow(8/9));
                return x
            },
            effDesc(x) { return "+^"+format(x) },
        },
        {
            desc: `Blueprint Particles effect is overpowered.`,
            cost: E('e3.5e7'),
        },
        {
            desc: `Tickspeed Power’s softcap starts ^100 later.`,
            cost: E('e111111111'),
        },
        {
            desc: `Pre-Quantum Global Speed is effective based on Honor.`,
            cost: E('e5e8'),
            effect() {
                let x = E(player.ranks.hex.gte(103)?2.1:2).pow(player.prestiges[1])
				if(hasPrestige(1,23))x = x.pow(prestigeEff(1,23))
                return x
            },
            effDesc(x) { return format(x)+"x" },
        },
        {
            desc: `Add 200 more C9-12 maximum completions.`,
            cost: E('e1.2e9'),
        },
        {
            desc: `Each Particle Power’s 1st effect is exponentially overpowered.`,
            cost: E('e2.2e9'),
        },
        {
            desc: `Entropic Evaporation^2 and Condenser^2 scale 15% weaker.`,
            cost: E('e7.25e9'),
        },
        {
            desc: `Beta Particles are twice effective.`,
            cost: E('e1.45e10'),
        },
        {
            desc: `All scalings from Ranks to Pent scale 10% weaker (only 2% during Big Rip).`,
            cost: E('e1.6e10'),
        },
        {
            desc: `Entropic Multiplier is effective, even in Big Rip.`,
            cost: E('e3e10'),
        },
        {
            desc: `Mass gain softcap^4 is 50% weaker (only 20% in Big Rip).`,
            cost: E('e6e10'),
        },
        {
            desc: `Neutron Stars raise Atom gain.`,
            cost: E('e7.5e10'),
            effect() {
                let x = player.supernova.stars.add(1).log10().add(1).log10().add(1).root(3)
                return x
            },
            effDesc(x) { return "^"+format(x) },
        },
        {
            desc: `[sn4] effect is increased by 2.`,
            cost: E('e3e12'),
        },
        {
            desc: `[bs2] uses a better formula.`,
            cost: E('e4e12'),
        },
        {
            desc: `Entropic Multiplier uses a better formula.`,
            cost: E('e1.2e13'),
        },
        {
            desc: `Mass Dilation upgrades are 5% stronger.`,
            cost: E("e7e13"),
        },
        {
            desc: `Prestige Base boosts Relativistic Energy gain.`,
            cost: E('e1e14'),
            effect() {
                let x = (tmp.prestiges.base||E(1)).add(1).root(3)
				if(player.ranks.hex.gte(116))x = x.pow(3)
                return x
            },
            effDesc(x) { return "x"+format(x) },
        },
        {
            desc: `Mass gain after all softcaps is raised by 10.`,
            cost: E("e5e16"),
        },
        {
            desc: `解锁新的中子树升级。<span id="final_118" style="display:none;"></span>`,
            cost: E("e1.7e17"),
        },
		
		// extended element
		
		{
			desc: `无限质量加成时间碎片。`,
			cost: E("5e13"),
			effect() {
				let x = player.inf.points.add(10).log10();
				if(player.ranks.hex.gte(119))x = x.pow(2)
				return x
			},
			effDesc(x) { return format(x)+"x" },
		},
		{
			desc: `每一个已购买的编号大于118的元素使无限质量和无限次数的获取量翻倍。`,
			cost: E("5e13"),
			effect() {
				let x = E(1)
				for(var i = 0;i < player.atom.elements.length;i++)if(player.atom.elements[i]>118)x = x.mul(2);
				return x
			},
			effDesc(x) { return format(x)+"x" },
		},
		{
			desc: `无限质量加成永恒质量。`,
			cost: E("1e15"),
			effect() {
				let x = player.inf.points.add(10).log10();
				if(hasElement(142))x = x.pow(2)
				return x
			},
			effDesc(x) { return format(x)+"x" },
		},
		{
			desc: `使碎片产生器倍率乘以1.5。`,
			cost: E("1e15"),
		},
		{
			desc: `永恒次数加成永恒质量和无限次数。`,
			cost: E("5e4"),
			et: true,
			effect() {
				let x = player.et.times.add(1);
				return x
			},
			effDesc(x) { return format(x)+"x" },
		},
		{
			desc: `永恒次数加成无限质量。`,
			cost: E("1e6"),
			et: true,
			effect() {
				let x = player.et.times.add(1);
				return x
			},
			effDesc(x) { return format(x)+"x" },
		},
		{
			desc: `无限次数加成熵获取速度。`,
			cost: E("1.6190000001e20"),
			effect() {
				let x = player.inf.times.add(1);
				return x
			},
			effDesc(x) { return format(x)+"x" },
		},
		{
			desc: `移除所有的费米子的阶层上限。`,
			cost: E("1.6190000001e23"),
		},
		{
			desc: `使120号元素可以加成永恒质量，只是效果倍率降低。`,
			cost: E("2e7"),
			et: true,
			effect() {
				let x = (tmp.elements.effect[120]||E(1)).pow(0.4);
				if(hasElement(131))x = x.pow(1.5);
				return x
			},
			effDesc(x) { return format(x)+"x" },
		},
		{
			desc: `永恒质量加成无限质量。`,
			cost: E("2e8"),
			et: true,
			effect() {
				let x = player.et.points.add(1).log10().add(1);
				if(hasElement(140))x = player.et.points.add(1).pow(0.2);
				if(hasElement(147))x = x.pow(1.2);
				if(hasElement(157))x = x.pow(1.2);
				return x
			},
			effDesc(x) { return format(x)+"x" },
		},
		{
			desc: `在大撕裂中，使“阶层超量”的效果变为原来的50%。`,
			cost: E("5.9720000001e27"),
		},
		{
			desc: `'90%' in Neutron Tree Upgrade [br3] is now 80%.`,
			cost: E("5.9720000001e27").mul(200),
		},
		{
			desc: `You can autobuy Cosmic Strings, and the 127th Element is better.`,
			cost: E("1e14"),
			et: true,
		},
		{
			desc: `If you bought [prim8], levels of Epsilon/Theta/Beta Particles is 1 per 2 Primordium Theorem, instead of 2.5.`,
			cost: E("1e15"),
			et: true,
		},
		{
			desc: `Uncap C12 completions.`,
			cost: E("1.9890000001e33"),
		},
		{
			desc: `Unlock Accelerators, tickspeed now provides exponential boost, but Argon-18 is disabled.`,
			cost: E("1.9890000001e33").mul(200),
		},
		{
			desc: `Accelerators boost itself.`,
			cost: E("1e18"),
			et: true,
			effect() {
				let x = player.accelerator.div(1000).add(1);
				return x
			},
			effDesc(x) { return format(x)+"x to power" },
		},
		{
			desc: `Accelerators boost Pre-Quantum Global Speed.`,
			cost: E("1e19"),
			et: true,
			effect() {
				let x = player.accelerator.add(1);
				return x
			},
			effDesc(x) { return format(x)+"x" },
		},
		{
			desc: `Accelerator Effect boost Tickspeed Power.`,
			cost: E("1.9890000001e37"),
		},
		{
			desc: `Entropic Condenser^2 is 15% weaker.`,
			cost: E("1.9890000001e37"),
		},
		{
			desc: `Multiply Entropy gain by Eternity times.`,
			cost: E("1.6190000001e20"),
			et: true,
			effect() {
				let x = player.et.times.add(1);
				return x
			},
			effDesc(x) { return format(x)+"x" },
		},
		{
			desc: `The Formula of Element 128 is better.`,
			cost: E("1.6190000001e21"),
			et: true,
		},
		{
			desc: `Entropic Radiation^2 is 20% weaker.`,
			cost: E("2.98350000001e45"),
		},
		{
			desc: `Element 121 is squared.`,
			cost: E("2.98350000001e45"),
		},
		{
			desc: `QC Modifier 'Intense Catalyst' is 5% weaker.`,
			cost: E("1.6190000001e26"),
			et: true,
		},
		{
			desc: `Entropic Condenser^2 is 15% weaker.`,
			cost: E("1.6190000001e27"),
			et: true,
		},
		{
			desc: `Gain 10x more Prestige Mass.`,
			cost: E("2.98350000001e53"),
		},
		{
			desc: `Entropy Post-1.8e308 added to base Infinity Mass gain formula.`,
			cost: uni(1),
		},
		{
			desc: `Element 128's effect ^1.2.`,
			cost: E("5.9720000001e30"),
			et: true,
		},
		{
			desc: `Timeshard effect is slightly stronger.`,
			cost: E("5.9720000001e31"),
			et: true,
		},
		{
			desc: `Super Hex is 5% weaker.`,
			cost: uni(1e5),
		},
		{
			desc: `The Hept requirement is reduced.`,
			cost: uni(1e7),
		},
		{
			desc: `Entropic Condenser^2 is 15% weaker.`,
			cost: E("1.9890000001e34"),
			et: true,
		},
		{
			desc: `If you bought [prim8], levels of Epsilon/Theta/Beta Particles is 1 per 1.5 Primordium Theorem, instead of 2.`,
			cost: E("1.9890000001e34"),
			et: true,
		},
		{
			desc: `The first softcap of Prestige Mass effect is weaker.`,
			cost: E("1.9890000001e36"),
			et: true,
		},
		{
			desc: `QC Modifier 'Intense Catalyst' is 5% weaker.`,
			cost: E("1.9890000001e40"),
			et: true,
		},
		{
			desc: `Unlock the 13th Challenge.`,
			cost: uni(1e18),
		},
		{
			desc: `Effects of Protons Powers is better.`,
			cost: uni(1e21),
		},
		{
			desc: `Element 128's effect ^1.2.`,
			cost: E("1.9890000001e41").mul(3),
			et: true,
		},
		{
			desc: `Disable dilated mass gain softcap, and Dilated Overflow is weaker.`,
			cost: E("1.9890000001e41").mul(3),
			et: true,
		},
		{
			desc: `Unlock the 14th Challenge.`,
			cost: uni(1e27),
		},
		{
			desc: `Base Dilated Mass effect ^6.`,
			cost: uni(1e29),
		},
		{
			desc: `Eternal Mass boost Timeshards.`,
			cost: E("1.989e44"),
			et: true,
			effect() {
				let x = player.et.points.add(1).pow(0.2);
				return x
			},
			effDesc(x) { return format(x)+"x" },
		},
		{
			desc: `First Rank Collapse effect is weaker.`,
			cost: E("2.98350000001e45"),
			et: true,
		},
		{
			desc: `Prestige Base Post-1.8e308 added to base Infinity Mass gain formula.`,
			cost: uni(6e35),
		},
		{
			desc: `Unlock the 15th Challenge.`,
			cost: uni(5e39),
		},
		{
            desc: `Entropic Evaporation^2 is 5% weaker.`,
			cost: E("2.9835e49"),
			et: true,
		},
		{
            desc: `If you bought [prim8], levels of Epsilon/Theta/Beta Particles is 1 per 1 Primordium Theorem, instead of 1.5.`,
			cost: uni(1),
			et: true,
		},
		{
			desc: `Entropic Condenser^2 is 15% weaker.`,
			cost: uni(1e61),
		},
		{
			desc: `Unlock the 16th Challenge.`,
			cost: uni(1e100),
		},
		{
            desc: `First Rank Collapse effect is weaker.`,
			cost: uni(1e21),
			et: true,
		},
		{
            desc: `C5 effect is changed. C15 goal is heavily weaken.`,
			cost: uni(1e22),
			et: true,
		},
		{
            desc: `Second Rank Collapse effect is weaker.`,
			cost: uni(1e23),
			et: true,
		},
		{
            desc: `QC Modifier 'Intense Catalyst' is 6% weaker.`,
			cost: uni(1e26),
			et: true,
		},
		{
            desc: `Booster boost its effect.`,
			cost: uni(1e147),
			effect() {
				let x = (player.massUpg[2]||E(0)).add(10).log10().pow(0.6);
				return x
			},
			effDesc(x) { return "^"+format(x) },
		},
		{
            desc: `Muscler boost its effect.`,
			cost: uni(1e150),
			effect() {
				let x = (player.massUpg[1]||E(0)).add(10).log10().pow(0.6);
				return x
			},
			effDesc(x) { return "^"+format(x) },
		},
		{
            desc: `Add 100 C13 & C15 completions.`,
			cost: uni(1e27),
			et: true,
		},
		{
            desc: `Second Rank Collapse effect is weaker.`,
			cost: uni(1e27),
			et: true,
		},
		{
            desc: `Entropic Condenser^2 is 15% weaker.`,
			cost: E(1.5e217),
		},
		{
            desc: `Permanently remove Pre-Meta Tier scaling.`,
			cost: E(1.5e221),
		},
		{
			desc: `'80%' in Neutron Tree Upgrade [br3] is now 70%.`,
			cost: uni(1e32),
			et: true,
		},
		{
			desc: `If you're not in Big Rip, Green Chroma's effect ^1.5`,
			cost: uni(1e36),
			et: true,
		},
		{
			desc: `Third Rank Collapse effect is weaker.`,
			cost: uni(1e203),
		},
		{
			desc: `Add 100 C13 & C16 completions.`,
			cost: E(9e284),
		},
		{
			desc: `Remove the first Rank Collapse effect.`,
			cost: uni(1e45),
			et: true,
		},
		{
			desc: `Remove the second Rank Collapse effect.`,
			cost: uni(1e48),
			et: true,
		},
		{
			desc: `Post-20 QC Modifier 'Intense Catalyst' effect scaling is weaker.`,
			cost: E(1.5e294),
		},
		{
			desc: `Add 300 C13 & C15 completions.`,
			cost: E(6e299),
		},
		{
			desc: `Remove Super Cosmic Strings scaling.`,
			cost: uni(1e49),
			et: true,
		},
		{
			desc: `Break Dilation Upgrade 5 affects Meta-Tier scaling.`,
			cost: uni(5e51),
			et: true,
		},
		{
			desc(){return `Meta-Infinity Confirmed! Infinity mass is added to its base gain formula. Cost of this element is ${format(E(2).pow(1024))} grams of Infinity mass.`},
			cost: E(2).pow(1024),
		},
		{
			desc: `Add 200 C13 & C16 completions.`,
			cost: E("6e310"),
		},
		{
			desc: `Remove Rank Collapse.`,
			cost: uni(1e54),
			et: true,
		},
		{
			desc: `Unlock the 17th Challenge.`,
			cost: uni(1e61),
			et: true,
		},
		{
			desc: `Remove 3 softcaps from Radiation Booster 'Meta-Rank Boost'`,
			cost: uni(1e301),
		},
		{
			desc: `Add 200 C13 completions.`,
			cost: E("3e393"),
		},
		{
			desc: `Gain 100% of Eternal Mass gain per second. Gain 1 Eternity count per second.`,
			cost: uni(1e71),
			et: true,
		},
		{
			desc: `Dilated Overflow is weaker.`,
			cost: uni(1e75),
			et: true,
		},
		{
			desc: `Entropic Condenser^2 is 15% weaker.`,
			cost: E("1.5e461"),
		},
		{
			desc: `Entropic Evaporation^2 is 10% weaker.`,
			cost: E("1e500"),
		},
		{
			desc: `C5 effect is changed.`,
			cost: E("3e144"),
			et: true,
		},
		{
			desc: `Epsilon Particles's 2nd effect is better if you're not in Big Rips or Quantum Challenges.`,
			cost: E("3e152"),
			et: true,
		},
		{
			desc: `Entropic Radiation^2 is 25% weaker.`,
			cost: E("1.5e523"),
		},
		{
			desc: `Remove Meta-Rank scaling. Radiation Booster 'Meta-Rank Boost' affects Meta-Tier at a reduced rate.`,
			cost: E("1.5e527"),
			effect() {
				let x = tmp.radiation.bs.eff[14].add(1).log10();
				return x
			},
			effDesc(x) { return format(x)+"x later"; },
		},
		{
			desc: `'70%' in Neutron Tree Upgrade [br3] is now 60%.`,
			cost: E("1.5e634"),
		},
		{
			desc: `Add 1000 C13 completions.`,
			cost: E("1.5e674"),
		},
		{
			desc: `Unlock the 18th Challenge.`,
			cost: uni(2e123),
			et: true,
		},
		{
			desc: `Add 100 C14 & C16 completions.`,
			cost: E("7.5e193"),
			et: true,
		},
		{
			desc: `Remove a softcap from Radiation Booster 'Meta-Rank Boost'.`,
			cost: E("6e832"),
		},
		{
			desc: `Entropic Radiation^2 is 50% weaker.`,
			cost: E("6e852"),
		},
		{
			desc: `Unlock the 19th Challenge.`,
			cost: uni(1e158),
			et: true,
		},
		{
			desc: `Add 100 C14 & C17 completions.`,
			cost: E("9e224"),
			et: true,
		},
		{
			desc: `Raise Infinity Upgrade 3 by 1.2`,
			cost: E("1.5e955"),
		},
		{
			desc: `Multiply Honor 9 Effect by 2`,
			cost: E("1.5e1099"),
		},
		{
			desc: `Unlock the 20th Challenge.`,
			cost: uni(1e197),
			et: true,
		},
		{
			desc: `Add 200 C15 & C16 completions.`,
			cost: uni(2e198),
			et: true,
		},
		{
			desc: `Multiply Honor 9 Effect by 2`,
			cost: E("1.5e1145"),
		},
		{
			desc: `Eternity Times boost Quantum Times gain.`,
			cost: E("1.5e1157"),
			effect() {
				let x = player.et.times.add(1);
				return x
			},
			effDesc(x) { return format(x)+"x"; },
		},
		{
			desc: `Eternal Mass boost Eternity Times gain.`,
			cost: uni(1e206),
			et: true,
			effect() {
				let x = player.et.points.add(1).log10();
				return x
			},
			effDesc(x) { return format(x)+"x"; },
		},
		{
			desc: `Reach the current Endgame.`,
			cost: uni(1e210),
			et: true,
		},
	],
    /*
    {
        desc: `Placeholder.`,
        cost: EINF,
        effect() {
            let x = E(1)
            return x
        },
        effDesc(x) { return format(x)+"x" },
    },
    */
    getUnlLength() {
        let u = 4

        if (quUnl()) u = 77+3
        else {
            if (player.supernova.times.gte(1)) u = 49+5
            else {
                if (player.chal.comps[8].gte(1)) u += 14
                if (hasElement(18)) u += 3
                if (MASS_DILATION.unlocked()) u += 15
                if (STARS.unlocked()) u += 18
            }
            if (player.supernova.post_10) u += 3
            if (player.supernova.fermions.unl) u += 10
            if (tmp.radiation.unl) u += 10
        }
        if (PRIM.unl()) u += 3
        if (hasTree('unl3')) u += 3
        if (player.qu.rip.first) u += 9
        if (hasUpgrade("br",9)) u += 23 // 23
		if (hasUpgrade("atom",16)) u += 16
		if (hasElement(134)) u += 21
        if (player.chal.comps[13].gte(4)) u += 13
        if (player.chal.comps[16].gte(3)) u += 24
        if (player.chal.comps[17].gte(3)) u += 13
        if (player.chal.comps[18].gte(3)) u += 4
        if (player.chal.comps[19].gte(8)) u += 9
        return u
    },
}

const MAX_ELEM_TIERS = 2

function getElementId(x) {
    let log = Math.floor(Math.log10(x))
    let list = ["n", "u", "b", "t", "q", "p", "h", "s", "o", "e"]
    let r = ""
    for (var i = log; i >= 0; i--) {
        let n = Math.floor(x / Math.pow(10, i)) % 10
        if (r == "") r = list[n].toUpperCase()
        else r += list[n]
    }
    return r
}

function getElementName(x) {
	return x+"号元素";
}

function WE(a,b) { return 2*(a**2-(a-b)**2) }

for (let x = 2; x <= MAX_ELEM_TIERS; x++) {
    let [ts,te] = [ELEMENTS.exp[x-1],ELEMENTS.exp[x]]

    let m = 'xx1xxxxxxxxxxxxxxxxvxx2xxxxxxxxxxxxxxxxv_v'

    for (let y = x; y >= 1; y--) {
        let k = 10 + 4 * y
        m += "1"+'x'.repeat(k)+"v"
        m += "2"+'x'.repeat(k)
        if (y > 1) m += "v_v"
    }

    for (let y = ts+1; y <= te; y++) {
        ELEMENTS.names.push(getElementId(y))
        ELEMENTS.fullNames.push(getElementName(y))
        if (!ELEMENTS.upgs[y]) ELEMENTS.upgs.push({
            desc: `Placeholder.`,
            cost: EINF,
        })
    }

    ELEMENTS.map.push(m)
}

function hasElement(x) { return player.atom.elements.includes(x) }

function setupElementsHTML() {
    let elements_table = new Element("elements_table")
	let table = ""
    let num = 0
    for (let k = 1; k <= MAX_ELEM_TIERS; k++) {
        let n = 0, p = (k+3)**2*2, xs = ELEMENTS.exp[k-1], xe = ELEMENTS.exp[k]
        table += `<div id='elemTier${k}_div'><div class='table_center'>`
        for (let i = 0; i < ELEMENTS.map[k-1].length; i++) {
            let m = ELEMENTS.map[k-1][i]
            if (m=='v') table += '</div><div class="table_center">'
            else if (m=='_' || !isNaN(Number(m))) table += `<div ${ELEMENTS.la[m]!==undefined&&k==1?`id='element_la_${m}'`:""} style="width: 50px; height: 50px">${ELEMENTS.la[m]!==undefined?"<br>"+ELEMENTS.la[m]:""}</div>`
            else if (m=='x') {
                num++
                table += ELEMENTS.upgs[num]===undefined?`<div style="width: 50px; height: 50px"></div>`
                :`<button class="elements ${num == 118 ? 'final' : ''}" id="elementID_${num}" onclick="ELEMENTS.buyUpg(${num}); ssf[0]('${ELEMENTS.names[num]}')" onmouseover="tmp.elements.choosed = ${num}" onmouseleave="tmp.elements.choosed = 0"><div style="font-size: 12px;">${num}</div>${ELEMENTS.names[num]}</button>`
                if (k == 1) {
                    if (num==57 || num==89) num += 14
                    else if (num==71) num += 18
                    else if (num==118) num = 57
                    else if (num==103) num = 118
                } else {
                    //console.log(num,p)
                    if (n == 0) {
                        if (num == xs + 2 || num == xs + p + 2) num += p - 18
                        else if (num == xe) {
                            num = xs + 2
                            n++
                        }
                    } else {
                        if (num == xs + WE(k+3,n) + 2) num = xs + p + WE(k+3,n-1) + 2
                        else if (num == xe - 16) num = xe
                        else if (num == xs + p + WE(k+3,n) + 2) {
                            num = xs + WE(k+3,n) + 2
                            n++
                        }
                    }
                }
            }
        }
        table += "</div></div>"
    }
	elements_table.setHTML(table)
}

function updateElementsHTML() {
    let tElem = tmp.elements

    tmp.el.elemTierDiv.setDisplay(hasUpgrade("atom",16))
    tmp.el.elemTier.setHTML("Element Tier "+player.atom.elemTier)

    let ch = tElem.choosed
    tmp.el.elem_ch_div.setVisible(ch>0)
    if (ch) {
        tmp.el.elem_desc.setHTML("<b>["+ELEMENTS.fullNames[ch]+"]</b>"+ELEMENTS.upgs[ch].desc)
		if(ELEMENTS.upgs[ch].desc instanceof Function)tmp.el.elem_desc.setHTML("<b>["+ELEMENTS.fullNames[ch]+"]</b> "+ELEMENTS.upgs[ch].desc())
        tmp.el.elem_cost.setTxt(format(ELEMENTS.upgs[ch].cost,0)+"夸克"+(ch>86?"(需进入大撕裂)":"")+(player.qu.rip.active&&tmp.elements.cannot.includes(ch)?"[大撕裂中无法购买]":""))
        if(ch > 118)tmp.el.elem_cost.setTxt(formatMass(ELEMENTS.upgs[ch].cost,0)+(ELEMENTS.upgs[ch].et?"永恒质量":"无限质量"))
		tmp.el.elem_eff.setHTML(ELEMENTS.upgs[ch].effDesc?"Currently: "+ELEMENTS.upgs[ch].effDesc(tElem.effect[ch]):"")
    }

    for (let x = 1; x <= MAX_ELEM_TIERS; x++) {
        let unl = player.atom.elemTier == x
        tmp.el["elemTier"+x+"_div"].setDisplay(unl)
        if (unl) {
            if (x == 1) {
                tmp.el.element_la_1.setVisible(tElem.unl_length>56)
                tmp.el.element_la_3.setVisible(tElem.unl_length>56)
                tmp.el.element_la_2.setVisible(tElem.unl_length>88)
                tmp.el.element_la_4.setVisible(tElem.unl_length>88)
            }

            for (let x = 1; x <= tElem.upg_length; x++) {
                let upg = tmp.el['elementID_'+x]
                if (upg) {
                    let unl2 = x <= tElem.unl_length
                    upg.setVisible(unl2)
                    if (unl2) {
                        upg.setClasses({elements: true, locked: !ELEMENTS.canBuy(x), bought: hasElement(x), br: (x > 86 && x <= 118) || ELEMENTS.upgs[x].et})
                    }
                }
            }
        }
    }
}

function updateElementsTemp() {
	if (!player.atom.elemTier)player.atom.elemTier = 1
    let cannot = []
    if (player.qu.rip.active && !hasTree('br2')) cannot.push(58,74)
    tmp.elements.cannot = cannot

    if (!tmp.elements.upg_length) tmp.elements.upg_length = ELEMENTS.upgs.length-1
    for (let x = tmp.elements.upg_length; x >= 1; x--) if (ELEMENTS.upgs[x].effect) {
        tmp.elements.effect[x] = ELEMENTS.upgs[x].effect()
    }
    tmp.elements.unl_length = ELEMENTS.getUnlLength()
}
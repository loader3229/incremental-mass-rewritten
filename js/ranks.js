const RANKS = {
    names: ['rank', 'tier', 'tetr', 'pent', 'hex', 'hept', 'oct', 'enne'],
    fullNames: ['Rank', 'Tier', 'Tetr', 'Pent', 'Hex', 'Hept', 'Oct', 'Enne'],
    reset(type) {
        if (tmp.ranks[type].can) {
            player.ranks[type] = player.ranks[type].add(1)
            let reset = true
            if (type == "rank" && player.mainUpg.rp.includes(4)) reset = false
            if (type == "tier" && player.mainUpg.bh.includes(4)) reset = false
            if (type == "tetr" && hasTree("qol5")) reset = false
            if (type == "pent" && hasTree("qol8")) reset = false
            if (type == "hex" && hasPrestige(1,27)) reset = false
            if (type == "hept" && hasPrestige(2,18)) reset = false
            if (type == "oct" && hasPrestige(3,9)) reset = false
            if (hasPrestige(3,38)) reset = false
            if (reset) this.doReset[type]()
            updateRanksTemp()
        }
    },
    bulk(type) {
        if (tmp.ranks[type].can) {
            player.ranks[type] = player.ranks[type].max(tmp.ranks[type].bulk.max(player.ranks[type].add(1)))
            let reset = true
            if (type == "rank" && player.mainUpg.rp.includes(4)) reset = false
            if (type == "tier" && player.mainUpg.bh.includes(4)) reset = false
            if (type == "tetr" && hasTree("qol5")) reset = false
            if (type == "pent" && hasTree("qol8")) reset = false
            if (type == "hex" && hasPrestige(1,27)) reset = false
            if (type == "hept" && hasPrestige(2,18)) reset = false
            if (type == "oct" && hasPrestige(3,9)) reset = false
            if (hasPrestige(3,38)) reset = false
            if (reset) this.doReset[type]()
            updateRanksTemp()
        }
    },
    unl: {
        tier() { return player.ranks.rank.gte(3) || player.ranks.tier.gte(1) || player.mainUpg.atom.includes(3) || tmp.radiation.unl },
        tetr() { return player.mainUpg.atom.includes(3) || tmp.radiation.unl },
        pent() { return tmp.radiation.unl },
        hex() { return player.prestiges[0].gte(42) },
        hept() { return player.prestiges[2].gte(6) },
        oct() { return player.prestiges[2].gte(30) },
        enne() { return player.prestiges[3].gte(38) },
    },
    doReset: {
        rank() {
            player.mass = E(0)
            for (let x = 1; x <= UPGS.mass.cols; x++) if (player.massUpg[x]) player.massUpg[x] = E(0)
        },
        tier() {
            player.ranks.rank = E(0)
            this.rank()
        },
        tetr() {
            player.ranks.tier = E(0)
            this.tier()
        },
        pent() {
            player.ranks.tetr = E(0)
            this.tetr()
        },
        hex() {
            player.ranks.pent = E(0)
            this.pent()
        },
        hept() {
            player.ranks.hex = E(0)
            this.hex()
        },
        oct() {
            player.ranks.hept = E(0)
            this.hept()
        },
        enne() {
            player.ranks.oct = E(0)
            this.oct()
        },
    },
    autoSwitch(rn) { player.auto_ranks[rn] = !player.auto_ranks[rn] },
    autoUnl: {
        rank() { return player.mainUpg.rp.includes(5) },
        tier() { return player.mainUpg.rp.includes(6) },
        tetr() { return player.mainUpg.atom.includes(5) },
        pent() { return hasTree("qol8") },
        hex() { return true; },
        hept() { return true; },
        oct() { return true; },
        enne() { return true; },
    },
    desc: {
        rank: {
            '1': "unlock mass upgrade 1.",
            '2': "unlock mass upgrade 2, reduce mass upgrade 1 cost scaled by 20%.",
            '3': "unlock mass upgrade 3, reduce mass upgrade 2 cost scaled by 20%, mass upgrade 1 boosts itself.",
            '4': "reduce mass upgrade 3 cost scale by 20%.",
            '5': "mass upgrade 2 boosts itself.",
            '6': "make mass gain is boosted by (x+1)^2, where x is rank.",
            '13': "triple mass gain.",
            '14': "double Rage Powers gain.",
            '17': "make rank 6 reward effect is better. [(x+1)^2 -> (x+1)^x^1/3]",
            '34': "make mass upgrade 3 softcap start 1.2x later.",
            '40': "adds tickspeed power based on ranks.",
            '45': "ranks boosts Rage Powers gain.",
            '90': "rank 40 reward is stronger.",
            '180': "mass gain is raised by 1.025.",
            '220': "rank 40 reward is overpowered.",
            '300': "rank multiplie quark gain.",
            '380': "rank multiplie mass gain.",
            '800': "make mass gain softcap 0.25% weaker based on rank.",
        },
        tier: {
            '1': "reduce rank reqirements by 20%.",
            '2': "raise mass gain by 1.15",
            '3': "reduce all mass upgrades cost scale by 20%.",
            '4': "adds +5% tickspeed power for every tier you have, softcaps at +40%.",
            '6': "make rage powers boosted by tiers.",
            '8': "make tier 6's reward effect stronger by dark matters.",
            '12': "make tier 4's reward effect twice effective and remove softcap.",
            '30': "stronger effect's softcap is 10% weaker.",
            '55': "make rank 380's effect stronger based on tier.",
            '100': "Super Tetr scale 5 later.",
        },
        tetr: {
            '1': "reduce tier reqirements by 25%, make Hyper Rank scaling is 15% weaker.",
            '2': "mass upgrade 3 boosts itself.",
            '3': "raise tickspeed effect by 1.05.",
            '4': "Super Rank scale weaker based on Tier, Super Tier scale 20% weaker.",
            '5': "Hyper/Ultra Tickspeed starts later based on tetr.",
            '8': "Mass gain softcap^2 starts ^1.5 later.",
        },
        pent: {
            '1': "reduce tetr reqirements by 15%, make Meta-Rank starts 1.1x later.",
            '2': "tetr boost all radiations gain.",
            '4': "Meta-Tickspeeds start later based on Supernovas.",
            '5': "Meta-Ranks start later based on Pent.",
            '8': "Mass gain softcap^4 starts later based on Pent.",
            '15': "remove 3rd softcap of Stronger's effect.",
        },
        hex: {
            '1': "remove mass gain softcap^1, Hydrogen-1 is better.",
            '2': "Hardened Challenge scale 25% weaker.",
            '3': "Lithium-3's Effect is raised by 1.5 before softcaps.",
            '4': "remove mass gain softcap^2, Beryllium-4's Effect is raised by 1.05.",
            '5': "Hex boost Prestige Base Exponent.",
            '6': "Carbon-6's Effect boost Higgs Bosons.",
            '7': "Nitrogen-7's Effect is better.",
            '8': "remove mass gain softcap^3.",
            '9': "The Tetr requirement is 15% weaker.",
            '10': "Neon-10 is better.",
            '11': "Sodium-11 works even with Francium-87 bought.",
            '12': "Magnesium-12 is better.",
            '13': "remove mass gain softcap^4.",
            '15': "Super BH Condenser & Cosmic Ray scales 20% weaker.",
            '16': "Sulfur-16 now gives +100% per element.",
            '17': "Raise Atom's gain by 1.1.",
            '18': "Argon-18 is better.",
            '19': "Potassium-19 is better.",
            '20': "Add 1e5 more C7 completions.",
            '21': "remove mass gain softcap^5.",
            '22': "Titanium-22 is better.",
            '23': "Vanadium-23 is better.",
            '24': "Chromium-24 is better.",
            '25': "Adds 1 base of Mass Dilation upgrade 1 effect.",
            '26': "remove Iron-26's softcap and hardcap.",
			'27': "Hyper/Ultra Rank & Tickspeed scales 25% weaker.",
            '28': "Nickel-28 is applied outside mass dilation.",
            '29': "Copper-29 is better.",
            '30': "Zinc-30 is better.",
            '31': "Gallium-31 is better.",
            '32': "Increase dilated mass gain exponent by 5%.",
            '33': "remove mass gain softcap^6.",
            '34': "Selenium-34 is better.",
            '35': "Bromine-35 is better.",
            '36': "stars provide exponential boost.",
            '37': "Rubidium-37's effect is always 100%.",
            '38': "Strontium-38's effect is doubled.",
            '39': "softcap of C4 effect is weaker.",
            '40': "Zirconium-40 is better.",
            '41': "add 500 more C12 completions.",
            '42': "Molybdenum-42 is better.",
            '43': "broke the mass dilation penalty.",
            '44': "The Tetr requirement is broken.",
            '45': "Rhodium-45 is better.",
            '46': "Palladium-46 is better.",
			'47': "Quarks gain is raised to the 1.1th power.",
			'48': "Collapsed stars effect is 10% stronger.",
			'49': "Indium-49 is better.",
			'50': "Star generator is now ^1.05 stronger.",
			'51': "Mass gain softcap^9 is 10% weaker.",
			'52': "Tellurium-52 is better.",
			'53': "Mass Dilation upgrade 6 is 75% stronger.",
            '54': "remove mass gain softcap^7.",
			'55': "Hyper/Ultra BH Condenser & Cosmic Ray scale 25% weaker.",
			'56': "add 500 more C12 maximum completions.",
			'57': "Raise Lanthanum-57 by 1.1.",
            '58': "Cerium-58's effect is always 100%.",
            '59': "Praseodymium's effect is 0.5.",
			'60': "add 500 more C12 maximum completions.",
			'61': "Multiply Particle Powers gain by ^0.5 of its Particle's amount after softcap.",
			'62': "Meta-Rank scale later based on Supernovas.",
			'63': "Non-bonus Tickspeed is 25x effective.",
			'64': "remove mass gain softcap^8.",
			'65': "add 1000 more C12 maximum completions.",
			'66': "Raise Lanthanum-57 by 1.1.",
			'67': "Holmium-67 is better.",
			'68': "Meta-Tickspeed start 2x later.",
			'69': `Hex is now added in mass gain formula from collapsed stars.`,
			'70': "add 1000 more C12 maximum completions.",
			'71': "BH mass gain softcap is weaker based on Hex.",
			'72': `Tetrs are 15% cheaper. If you're in Big Rip or at least Hex 100, this effect is applied twice.`,
			'73': "add 1000 more C12 maximum completions. If you're in Big Rip, the softcap of [Neut-Muon] is weaker.",
			'74': `Super Tetr scales 10% weaker.`,
			'75': "remove mass gain softcap^9.",
			'76': "Collapsed Star's effect is 25% stronger.",
			'78': `Meta-Supernova scales 5% weaker.`,
			'80': "Disable Pre-Meta Rank & Tickspeed Scalings.",
			'82': "Disable Pre-Meta BH Condenser & Cosmic Ray Scalings.",
			'84': "Polonium-84's effect is always 100%.",
			'86': "Tickspeed power is squared.",
			'88': "Meta-Tickspeed start 100x later.",
			'90': "Raise Thorium-90 by 1.1.",
			'92': "Insane Challenges scale 25% weaker, except C9.",
			'93': "Neptunium-93's base effect is 100%, instead of 66.7%.",
			'95': "Disable Pre-Ultra Mass Upgrades & Tier Scalings.",
			'97': `Increase Entropic Evaporation’s base by 0.1.`,
			'98': "Disable Pre-Meta Supernova Scalings.",
			'99': `Remove all softcaps from Photon Upgrade 3 effect.`,
			'103': `Lawrencium-103's effect base is 2.1 instead of 2.`,
			'104': "add 2000 more C12 maximum completions.",
			'110': "add 2000 more C12 maximum completions.",
			'114': `Entropic Multiplier uses a better formula.`,
			'115': `Mass Dilation upgrades are 5% stronger.`,
			'116': "Livermorium-116 is better.",
			'119': "Effect of the 119th element is squared.",
			'120': "Mass Overflow start ^10 later.",
			'123': "Meta-Tickspeed starts later based on Accelerators.",
			'124': "Bought Tickspeeds boost Accelerator Power.",
			'125': "Hex Boost Entropy Gain.",
			'126': "Hex boost Accelerator Power.",
			'127': "Hex Boost Infinity Mass Gain.",
			'129': "If you're in Big Rip, QC Modifier 'Hypertiered' is 50% weaker.",
			'135': "If you're in Big Rip, QC Modifier 'Extreme Scaling' is 40% weaker.",
			'140': "C2 Completions boost Accelerator Power.",
			'238': "Disable Super Tetr scaling.",
			'300': "Ultra Mass Upgrades is 2% weaker.",
			'777': "Meta-Rank is 99.99999999% weaker.",
			'888': "Meta-Rank is 99.99999999% weaker.",
			'999': "Meta-Rank is 99.99999999% weaker.",
			'1005': "Meta-Rank is weaker based on Hept.",
        },
        hept: {
            '1': "Mass Overflow is weaker based on Hept.",
            '2': "Star Overflow is weaker based on Hept.",
            '3': "Ultra Tier scaling is weaker based on Hept.",
            '4': "Hept boost Accelerator Power.",
            '5': "Hept 1's effect and Hept 3's effect are boosted.",
            '6': "Hept boost Pre-Quantum Global Speed.",
			'8': "Hyper Tetr is 10% weaker.",
			'9': "Hyper Tetr is 30% weaker.",
			'10': "Hyper Tetr is 50% weaker.",
			'11': "Disable Hyper Tetr scaling.",
			'13': "Hept 3's effect is boosted.",
			'14': "Hept 3's effect affects Ultra Tetr scaling.",
			'15': "Disable Ultra Tier scaling.",
			'16': "Disable Ultra Tetr scaling.",
			'17': "Meta-Rank scaling starts later based on Hept.",
			'19': "Hept 17's effect is better.",
			'20': "Meta-Tier scaling starts later based on Hept.",
			'21': "Super Pent is 20% weaker.",
			'22': "Ultra Mass Upgrades is 1% weaker.",
			'30': "Super Pent is 40% weaker.",
			'40': "the effect of red chroma ^3",
			'52': "Hept Boost Entropy Gain.",
			'100': "Break Hept 1's effect hardcap.",
		},
		oct: {
            '1': "Super/Hyper Hex scalings are weaker based on Oct.",
            '2': "Meta-Tetr starts later based on Oct.",
            '3': "Tetr 2 softcap is weaker.",
			'4': "Remove Hyper Pent scaling.",
			'5': "Remove Ultra Pent scaling.",
			'6': "Oct 2's effect is better.",
			'8': "Stronger Overflow is weaker.",
			'9': "Accelerator effect softcap^2 starts 2.5x later, and is weaker.",
			'10': "Oct Boost Infinity/Eternal Mass.",
			'12': "Oct Boost Hept 52's effect.",
			'17': "Meta-Hex is 99.6% weaker.",
			'20': "Remove Super Hex scaling. Oct 1's effect is applied to Ultra/Meta Hex scalings.",
			'21': "Accelerator effect softcap^2 starts 2x later, and is weaker.",
			'29': "Accelerator effect softcap^2 starts 2x later, and is weaker.",
			'33': "Accelerator effect softcap^2 is weaker.",
			'34': "Oct Boost Exotic Matter gain.",
			'35': "Square Oct 34 Effect.",
			'46': "Super Overpower is 4% weaker.",
		},
		enne: {
            '1': "Gain 10x more Prestige Dark Matter.",
            '2': "Meta-Pent starts later based on Enne.",
            '3': "Stronger Overflow is weaker.",
            '4': "Super Overpower is 1% weaker.",
			'5': "Enne Boost Exotic Matter gain.",
			'6': "Enne Boost Galactic Quarks gain.",
            '7': "Hyper/Ultra Hept scalings are weaker based on Enne.",
            '9': "Meta-Hept scaling is weaker based on Enne.",
            '10': "Enne Boost Dark Shadow gain.",
            '11': "Oct 1 effect is better.",
            '12': "Collapsed Star effect is better.",
            '14': "Meta-Hex scaling is weaker based on Enne.",
            '15': "Meta-Hept starts 7.5x later.",
            '100': "Unlock Beyond Ranks, Collapse Rank-Pent.",
            '101': "Dec Boost Exotic Matter gain.",
            '102': "Meta-Hex starts later based on Enne.",
            '117': "Meta-Hex starts 1e50x later.",
            '140': "Remove a softcap from Pent 2.",
            '200': "Exotic Boost 'Dark Matter Boost' affects Mass of Black Hole.",
            '250': "Dec Boost Dark Ray gain.",
            '300': "Dec Boost Stardust gain.",
            '666': "Meta-Supernova is 99.99% weaker.",
            '1580': "Enne 7,9,14 effects are better.",
            '2400': "'50%' in Element 550 is now 40%.",
            '2440': "Enne 14 effect is better.",
            '2500': "Meta-Hept starts 2x later.",
            '2650': "Meta-Hept starts 2x later.",
            '2800': "Meta-Hept starts 2x later.",
            '3340': "Meta-Hept starts 2x later.",
            '3690': "Meta-Supernova is 99.99% weaker.",
            '3720': "Meta-Hept starts 2x later.",
            '4360': "Stronger Overflow is weaker.",
            '4480': "Meta-Supernova is 99.9% weaker.",
            '4570': "Stronger Overflow is weaker.",
            '5740': "Meta-Hex starts later based on its starting point.",
            '7360': "The previous Enne effect is better.",
            '9590': "Enne 14 effect is better.",
            '11280': "Meta-Hept starts 2x later.",
		},
    },
    effect: {
        rank: {
            '3'() {
                let ret = E(player.massUpg[1]||0).div(20)
                return ret
            },
            '5'() {
                let ret = E(player.massUpg[2]||0).div(40)
                return ret
            },
            '6'() {
                let ret = player.ranks.rank.add(1).pow(player.ranks.rank.gte(17)?player.ranks.rank.add(1).root(3):2)
				if(ret.gte("eee55"))ret = overflow(ret,"eee55",0.5);
                return ret
            },
            '40'() {
                let ret = player.ranks.rank.root(2).div(100)
                if (player.ranks.rank.gte(90)) ret = player.ranks.rank.root(1.6).div(100)
                if (player.ranks.rank.gte(220)) ret = player.ranks.rank.div(100)
                return ret
            },
            '45'() {
                let ret = player.ranks.rank.add(1).pow(1.5)
                return ret
            },
            '300'() {
                let ret = player.ranks.rank.add(1)
                return ret
            },
            '380'() {
                let ret = E(10).pow(overflow(player.ranks.rank.sub(379).pow(1.5).pow(player.ranks.tier.gte(55)?RANKS.effect.tier[55]():1).softcap(1000,0.5,0),"1e2500",0.1))
                return ret
            },
            '800'() {
                let ret = E(1).sub(player.ranks.rank.sub(799).mul(0.0025).add(1).softcap(1.25,0.5,0).sub(1)).max(0.75)
                return ret
            },
        },
        tier: {
            '4'() {
                let ret = E(0)
                if (player.ranks.tier.gte(12)) ret = player.ranks.tier.mul(0.1)
                else ret = player.ranks.tier.mul(0.05).add(1).softcap(1.4,0.75,0).sub(1)
                return ret
            },
            '6'() {
                let ret = E(2).pow(player.ranks.tier)
                if (player.ranks.tier.gte(8)) ret = ret.pow(RANKS.effect.tier[8]())
                return ret
            },
            '8'() {
                let ret = player.bh.dm.max(1).log10().add(1).root(2)
				ret = overflow(ret,"ee36",0.9);
                return ret
            },
            '55'() {
                let ret = player.ranks.tier.max(1).log10().add(1).root(4)
                return ret
            },
        },
        tetr: {
            '2'() {
                let ret = E(player.massUpg[3]||0).div(400)
                if (ret.gte(1) && hasPrestige(0,15)) ret = ret.pow(1.5)
				ret = ret.softcap("e4.5e6", player.ranks.oct.gte(3)?0.8:0.5, 0);
				ret = overflow(ret, "e1.8e10", 0.8);
                return ret
            },
            '4'() {
                let ret = E(0.96).pow(player.ranks.tier.pow(1/3))
                return ret
            },
            '5'() {
                let ret = player.ranks.tetr.pow(4).softcap(1000,0.25,0)
                return ret
            },
        },
        pent: {
            '2'() {
                let ret = E(1.3).pow(player.ranks.tetr.softcap("1e2000000",player.ranks.enne.gte(140)?1:0.6,2).softcap("e2e30",0.5,2));
                return ret
            },
            '4'() {
                let ret = player.supernova.times.add(1).root(5)
                return ret
            },
            '5'() {
                let ret = overflow(E(1.05).pow(player.ranks.pent),1e10,hasPrestige(1,63)?0.15:0.1);
                return ret
            },
            '8'() {
                let ret = E(1.1).pow(player.ranks.pent)
                return ret
            },
        },
        hex: {
            '5'() {
                let ret = player.ranks.hex.div(1000).softcap(40,0.25,0)
				if(ret.gte(100))ret = ret.log10().pow(2).mul(25)
                return ret
            },
            '62'() {
                let ret = Decimal.pow(1.0001,player.supernova.times);
                return ret
            },
            '71'() {
                let ret = Decimal.pow(0.93,player.ranks.hex.sub(70));
                return ret
            },
            '123'() {
                let ret = player.accelerator.add(1);
                return ret
            },
            '124'() {
                let ret = player.tickspeed.add(1).log10().div(15).max(1);
                return ret
            },
            '125'() {
                let ret = player.ranks.hex.add(1);
                return ret
            },
            '126'() {
                let ret = player.ranks.hex.div(100);
				if(ret.gte("1e600"))ret = ret.log10().div(60).pow(600);
				ret = ret.softcap("1e1000",0.5,0);
                return ret
            },
            '127'() {
                let ret = player.ranks.hex.add(1);
                return ret
            },
            '140'() {
                let ret = player.chal.comps[2].div(200000).add(1);
                return ret
            },
            '1005'() {
                let ret = E(0.99).pow(player.ranks.hept.pow(2.2));
                return ret
            },
        },
        hept: {
            '1'() {
                let ret = E(0.98).pow(player.ranks.hept);
				if(player.ranks.hept.gte(5))ret = ret.pow(1.2);
				ret = ret.max(1/3);
				if(player.ranks.hept.gte(100))ret = E(1).div(E(1).add(player.ranks.hept.log10()));
                return ret
            },
            '2'() {
                let ret = E(0.9).pow(player.ranks.hept);
                return ret
            },
            '3'() {
                let ret = E(0.99).pow(player.ranks.hept);
				if(player.ranks.hept.gte(5))ret = ret.pow(1.2);
				if(player.ranks.hept.gte(13))ret = ret.pow(3.2);
                return ret
            },
            '4'() {
				let ret = player.ranks.hept.softcap(30000,0.1,0).softcap(60000,0.1,0);
				if(ret.gte(1e5))ret = ret.log10().pow(2).mul(4000);
                ret = E(1.01).pow(ret);
                return ret
            },
            '6'() {
                let ret = player.ranks.hept.add(1);
                return ret
            },
            '17'() {
                let ret = E(10).pow(player.ranks.hept);
				if(player.ranks.hept.gte(19))ret = E(1.001).pow(player.ranks.hept.pow(4));
                return ret
            },
            '20'() {
                let ret = E(1.1).pow(player.ranks.hept);
                return ret
            },
            '52'() {
                let ret = E(10).pow(player.ranks.hept);
				if(player.ranks.oct.gte(12))ret = ret.pow(player.ranks.oct);
                return ret
            },
		},
		oct: {
            '1'() {
                let ret = E(player.ranks.enne.gte(11)?0.97:0.98).pow(player.ranks.oct);
                return ret
            },
            '2'() {
                let ret = E(10).pow(player.ranks.oct);
				if(player.ranks.oct.gte(6))ret = E(10).pow(player.ranks.oct.pow(4));
                return ret
            },
            '10'() {
                let ret = player.ranks.oct.pow(6);
                return ret
            },
            '12'() {
                let ret = player.ranks.oct;
                return ret
            },
            '34'() {
                let ret = player.ranks.oct.add(1).log10().pow(2);
				if(player.ranks.oct.gte(35))ret = ret.pow(2);
                return ret
            },
		},
		enne: {
            '2'() {
                let ret = E(10).pow(player.ranks.enne.pow(2));
                return ret
            },
            '5'() {
                let ret = player.ranks.enne.add(1).pow(2);
                return ret
            },
            '6'() {
                let ret = player.ranks.enne.add(1).pow(2);
                return ret
            },
            '7'() {
                let ret = E(0.99).pow(player.ranks.enne.softcap(75,0.5,0)).max(1/3);
				if(player.ranks.enne.gte(1580))ret = E(1).div(player.ranks.enne.log10().add(1));
                return ret
            },
            '9'() {
                let ret = E(0.99).pow(player.ranks.enne.softcap(75,0.5,0)).max(1/3);
				if(player.ranks.enne.gte(1580))ret = E(1).div(player.ranks.enne.log10().add(1));
                return ret
            },
            '10'() {
                let ret = player.ranks.enne.add(1).pow(2);
                return ret
            },
            '14'() {
                let ret = E(0.99).pow(player.ranks.enne.softcap(75,0.5,0)).max(1/3);
				if(player.ranks.enne.gte(1580))ret = E(1).div(player.ranks.enne.log10().add(1));
				if(player.ranks.enne.gte(2440))ret = E(0.9).pow(player.ranks.enne.pow(player.ranks.enne.gte(9590)?1.1:1));
				if(hasPrestige(4,74))ret = E(0.5).pow(player.ranks.enne.pow(player.ranks.enne.gte(9590)?1.1:1));
				if(hasAscension(2,24))ret = E(0.1).pow(player.ranks.enne.pow(player.ranks.enne.gte(9590)?1.1:1));
                return ret
            },
            '101'() {
                let ret = beyondRankTier(9).add(1).pow(3);
                return ret
            },
            '102'() {
                let ret = E(10).pow(player.ranks.enne);
                return ret
            },
            '250'() {
                let ret = beyondRankTier(9).add(1).pow(2);
                return ret
            },
            '300'() {
                let ret = beyondRankTier(9).add(1).pow(2);
                return ret
            },
		},
    },
    effDesc: {
        rank: {
            3(x) { return "+"+format(x) },
            5(x) { return "+"+format(x) },
            6(x) { return format(x)+"x" },
            40(x) {  return "+"+format(x.mul(100))+"%" },
            45(x) { return format(x)+"x" },
            300(x) { return format(x)+"x" },
            380(x) { return format(x)+"x" },
            800(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
        },
        tier: {
            4(x) { return "+"+format(x.mul(100))+"%" },
            6(x) { return format(x)+"x" },
            8(x) { return "^"+format(x) },
            55(x) { return "^"+format(x) },
        },
        tetr: {
            2(x) { return "+"+format(x) },
            4(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
            5(x) { return "+"+format(x,0)+" later" },
        },
        pent: {
            2(x) { return format(x)+"x" },
            4(x) { return format(x)+"x later" },
            5(x) { return format(x)+"x later" },
            8(x) { return "^"+format(x)+" later" },
        },
        hex: {
            5(x) { return "+"+format(x)},
            62(x) { return format(x)+"x later" },
            71(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
            123(x) { return format(x)+"x later" },
            124(x) { return format(x)+"x" },
            125(x) { return format(x)+"x" },
            126(x) { return format(x)+"x" },
            127(x) { return format(x)+"x" },
            140(x) { return format(x)+"x" },
            1005(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
        },
        hept: {
            1(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
            2(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
            3(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
            4(x) { return format(x)+"x" },
            6(x) { return format(x)+"x" },
            17(x) { return format(x)+"x later" },
            20(x) { return format(x)+"x later" },
            52(x) { return format(x)+"x" },
		},
		oct: {
            1(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
            2(x) { return format(x)+"x later" },
            10(x) { return format(x)+"x" },
            12(x) { return "^"+format(x) },
            34(x) { return format(x)+"x" },
		},
		enne: {
            2(x) { return format(x)+"x later" },
            5(x) { return format(x)+"x" },
            6(x) { return format(x)+"x" },
            7(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
            9(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
            10(x) { return format(x)+"x" },
            14(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
            101(x) { return format(x)+"x" },
            102(x) { return format(x)+"x later" },
            250(x) { return format(x)+"x" },
            300(x) { return format(x)+"x" },
		},
    },
    fp: {
        rank() {
            let f = E(1)
            if (player.ranks.tier.gte(1)) f = f.mul(1/0.8)
            if (!hasElement(170))f = f.mul(tmp.chal.eff[5].pow(-1))
            return f
        },
        tier() {
            let f = E(1)
            f = f.mul(tmp.fermions.effs[1][3])
            if (player.ranks.tetr.gte(1)) f = f.mul(1/0.75)
            if (player.mainUpg.atom.includes(10)) f = f.mul(2)
            return f
        },
    },
}

const PRESTIGES = {
    fullNames: ["Prestige Level", "Honor", "Glory", "Renown", "Valor"],
    baseExponent() {
        let x = E(0)
        if (hasElement(100)) x = x.add(tmp.elements.effect[100])
        if (hasPrestige(0,32)) x = x.add(prestigeEff(0,32,0))
        if (player.ranks.hex.gte(5)) x = x.add(RANKS.effect.hex[5]())
        if (hasTree('qc8')) x = x.add(treeEff('qc8',0))
		if(hasAscension(0,12))x = x.add(ascensionEff(0,12,E(0)));
		x = x.add(tmp.ascensionMassEffect);
		if(hasElement(486))x = x.add(MATTERS.eff(4));
        return x.add(1)
    },
    base() {
        let x = E(1)

        for (let i = 0; i < RANKS.names.length; i++) {
            let r = player.ranks[RANKS.names[i]]
            if (hasPrestige(0,18) && i == 0) r = r.mul(2)
            x = x.mul(r.add(1))
        }

        return x.sub(1)
    },
    req(i) {
        let x = EINF, y = player.prestiges[i]
        switch (i) {
            case 0:
                x = Decimal.pow(1.1,y.scaleEvery('prestige0').pow(1.1)).mul(2e13)
                break;
            case 1:
                x = y.scaleEvery('prestige1').pow(1.25).mul(3).add(4)
                break;
            case 2:
                x = y.scaleEvery('prestige2').pow(1.25).mul(3).add(12)
                break;
            case 3:
                x = y.scaleEvery('prestige3').pow(1.25).mul(3).add(33)
                break;
            case 4:
                x = y.scaleEvery('prestige4').pow(1.25).mul(3).add(50)
                break;
            default:
                x = EINF
                break;
        }
        return x.ceil()
    },
    bulk(i) {
        let x = E(0), y = i==0?tmp.prestiges.base:player.prestiges[i-1]
        switch (i) {
            case 0:
                if (y.gte(2e13)) x = y.div(2e13).max(1).log(1.1).max(0).root(1.1).scaleEvery('prestige0',true).add(1)
                break;
            case 1:
                if (y.gte(4)) x = y.sub(4).div(3).max(0).root(1.25).scaleEvery('prestige1',true).add(1)
                break
            case 2:
                if (y.gte(12)) x = y.sub(12).div(3).max(0).root(1.25).scaleEvery('prestige2',true).add(1)
                break
            case 3:
                if (y.gte(33)) x = y.sub(33).div(3).max(0).root(1.25).scaleEvery('prestige3',true).add(1)
                break
            case 4:
                if (y.gte(50)) x = y.sub(50).div(3).max(0).root(1.25).scaleEvery('prestige4',true).add(1)
                break
            default:
                x = E(0)
                break;
        }
        return x.floor()
    },
    unl: [
        _=>true,
        _=>true,
        _=>hasPrestige(1,12) || hasPrestige(2,1),
        _=>hasPrestige(2,33) || hasPrestige(3,1),
        _=>hasAscension(0,30) || hasPrestige(4,1),
    ],
    noReset: [
        _=>hasUpgrade('br',11) || player.superGal.gte(9),
        _=>hasPrestige(2,2) || player.superGal.gte(9),
        _=>player.superGal.gte(9),
        _=>player.superGal.gte(9),
        _=>player.superGal.gte(9),
    ],
    rewards: [
        {
            "1": `All Mass softcaps up to ^5 start ^10 later.`,
            "2": `Quantum Shard Base is increased by 0.5.`,
            "3": `Quadruple Quantum Foam and Death Shard gain.`,
            "5": `Pre-Quantum Global Speed is raised by ^2 (before division).`,
            "6": `Tickspeed Power softcap starts ^100 later.`,
            "8": `Mass softcap^5 starts later based on Prestige.`,
            "10": `Gain more Relativistic Energies based on Prestige.`,
            "12": `Stronger Effect's softcap^2 is 7.04% weaker.`,
            "15": `Tetr 2's reward is overpowered.`,
            "18": `Gain 100% more Ranks to Prestige Base.`,
            "24": `Super Cosmic Strings scale 20% weaker.`,
            "28": `Remove all softcaps from Gluon Upgrade 4's effect.`,
            "32": `Prestige Base’s exponent is increased based on Prestige Level.`,
            "40": `Chromium-24 is slightly stronger.`,
            "42": `Unlock Hex.`,
            "45": `Ultra Tetr scale 42% weaker.`,
            "50": `The 13th-15th Atom upgrades can be bought outside Big Rips, are stronger, and costs are raised by 1/20000.`,
            "51": `Mass gain softcap^2 is 50% weaker.`,
            "53": `Meta-Rank starts 1.5x later.`,
            "55": `Multiply Quantum Foam and Death Shard gain by your Prestige Level.`,
            "58": `All rank scaling are 50% weaker.`,
            "60": `Prestige Mass and Pre-Quantum Global Speed boost each other.`,
            "61": `Prestige Mass Effect is applied to Pre-Meta Pent and Supernova scalings.`,
            "62": `Prestige Mass Effect is applied to Super Prestige Level scaling.`,
            "64": `Prestige Mass Formula from Prestige Level is better.`,
            "74": `Prestige Mass Formula from Honor is better.`,
            "75": `Prestige Mass Effect is applied to Pre-Meta Tier scalings.`,
            "77": `Prestige Mass Effect is applied to Pre-Meta Rank scalings and Super Honor scaling.`,
            "79": `Prestige Mass Effect is applied to Pre-Meta Cosmic String scalings.`,
            "80": "Mass gain softcap^3 is 10% weaker.",
            "82": "Mass gain softcap^3 is 50% weaker.",
            "88": `Prestige Mass and Blueprint Particles boost each other.`,
            "89": `Prestige Mass and Quantum Foams boost each other.`,
            "91": `Entropic Evaporation^2 is 20% weaker.`,
            "93": `Prestige Mass Effect is applied to Meta Supernova scaling.`,
            "98": `Prestige Mass and Death Shards boost each other.`,
            "99": `QC Modifier 'Intense Catalyst' is 8% weaker.`,
            "100": `Effect of Blueprint Particles is raised by ^1.02.`,
            "101": `Effect of W- Bosons affects mass gain softcap ^3-^6.`,
            "103": `Prestige Mass Formula from Prestige Level is better.`,
            "105": `Super Honor is 3% weaker.`,
            "106": `Prestige Mass Formula from Prestige Level is better.`,
            "107": `Meta-Rank is 99.99% weaker.`,
            "110": `Boost Prestige Mass gain by Protons Powers.`,
            "111": `Prestige Mass boost itself.`,
            "113": `Meta-Rank is 90% weaker.`,
            "115": `Entropic Evaporation^2 is 5% weaker.`,
            "129": `Add 5000 C9-C11 Completions.`,
            "130": `If you bought [prim8], levels of Epsilon/Theta/Beta Particles is 1 per 2.5 Primordium Theorem, instead of 3.`,
            "131": `Entropic Evaporation^2 is 5% weaker.`,
            "134": `QC Modifier 'Time Anomaly' is 3% weaker.`,
            "135": `Prestige Level Boost Honor 9 reward.`,
            "140": `Effect of W- Bosons affects mass gain softcap ^7.`,
            "141": `Entropic Evaporation^2 is 5% weaker.`,
            "165": `Prestige Level boost Infinity Mass gain.`,
            "250": `Prestige Level boost Eternal Mass gain.`,
            "500": `Prestige Mass Effect is applied to Super Fermion Tier scaling.`,
            "1000": `Prestige Mass Effect is applied to Hyper Fermion Tier scaling.`,
        },
        {
            "1": `All-Star resources are raised by ^2.`,
            "2": `Meta-Supernova starts 100 later.`,
            "3": `Bosonic resources are boosted based on Prestige Base.`,
            "4": `Gain 5 free levels of each Primordium Particle.`,
            "5": `Pent 5's reward is stronger based on Prestige Base.`,
            "7": `Quarks are boosted based on Honor.`,
            "9": `Gain free levels of each Primordium Particle equals to your Honor.`,
            "10": `Unlock Prestige Mass.`,
            "11": `Prestige Mass and Entropy boost each other.`,
            "12": `Unlock Glory.`,
            "13": `Add 100 C12 Completions.`,
            "15": `All Rank Scalings are 90% weaker.`,
            "18": `Honor boost Infinity Mass gain.`,
            "21": `Prestige Mass Effect is applied to Hyper Prestige Level scaling.`,
            "22": `Multiply Honor 9 reward by 2.`,
            "23": `Lawrencium-103's effect is raised based on your Glory.`,
            "24": `Unsoftcap the collapsed star's multiply effect, and its hardcap is raised by 1e10.`,
            "25": `Uncap C1-C11 Completions.`,
            "26": `Honor boost Eternal Mass gain.`,
            "27": `Hex don't reset anything.`,
            "28": `QC Modifier 'Intense Catalyst' is 8% weaker.`,
            "31": `Prestige Mass Formula from Prestige Level is better.`,
			"32": `Prestige Mass Effect is applied to Hyper Honor scaling.`,
			"33": `Honor boost Accelerator Power.`,
			"34": `Prestige Mass Effect is applied to Super Hex scaling.`,
			"35": `Hyper Cosmic Strings is 20% weaker.`,
			"37": `Hyper Tetr is 2% weaker.`,
			"38": `Honor 18's effect ^4.`,
            "39": `QC Modifier 'Intense Catalyst' is 5% weaker.`,
            "43": `Prestige Level 135's reward is better.`,
			"44": `Honor 26's effect ^4.`,
			"56": `Hyper Hex scaling is 4.5% weaker.`,
			"57": `Meta-Rank scaling starts later based on your Honor.`,
			"58": `Meta-Tier scaling starts later based on your Rank.`,
			"60": `Boost Honor 57's effect`,
			"61": `Prestige Mass Effect is applied to Ultra Honor scaling.`,
			"62": `Prestige Mass Effect is applied to Hyper Hex scaling.`,
			"63": `Pent 5's effect softcap is weaker.`,
			"64": `Prestige Mass Effect is applied to Super Hept scaling.`,
			"67": `Prestige Mass Effect is applied to Meta Prestige Level scaling.`,
			"90": `Galactic Power effect is better.`,
			"120": `Super Pent is 60% weaker.`,
			"122": `Hardened scalings of Challenge 1-20 are 10% weaker.`,
			"136": `Galactic Dark Energy effect is better.`,
			"146": `Prestige Mass Effect is applied to Hyper Hept scaling at reduced rate.`,
			"242": `Honor boost Galactic Quarks.`,
        },
		{
            "1": `Super Prestige Level starts 5 later, and automatically gain Prestige Level.`,
            "2": `Super Honor starts 1 later, and Honor resets nothing. Multiply Honor 9 reward by Glory.`,
            "3": `Glory boost Infinity Mass gain.`,
            "4": `Glory boost Eternal Mass gain, and Glory 3's effect is squared.`,
            "5": `Honor boost Entropy gain.`,
            "6": `Unlock Hept.`,
            "7": `Meta-Tickspeed starts 10000x later.`,
            "8": `Prestige Mass Effect is applied to Ultra Prestige Level scaling.`,
            "10": `Automatically gain Honor.`,
            "12": `Prestige Mass Effect is applied to Super Glory scaling.`,
            "13": `Prestige Mass Effect is applied to Ultra Fermion Tier scaling.`,
            "14": `Meta Fermion Tier scaling starts 100x later.`,
            "17": `Boost Challenge 20 effect.`,
            "18": `Hept don't reset anything.`,
            "19": `First effect of W- Bosons affects Mass Overflow.`,
            "21": `Add +10% to Honor 146's effectiveness`,
            "22": `Add +30% to Honor 146's effectiveness`,
            "23": `Add +50% to Honor 146's effectiveness`,
			"25": `Prestige Mass Effect is applied to Ultra Hex scaling at reduced rate.`,
			"27": `Glory 5's effect is better based on Glory.`,
            "29": `Remove Super Pent scaling.`,
            "30": `Unlock Oct.`,
            "31": `Remove Super Fermion Tier scaling.`,
            "33": `Unlock Renown.`,
            "37": `Remove All Mass Upgrades scaling.`,
            "38": `Unlock Prestige Muscler.`,
            "39": `Unlock Prestige Booster.`,
            "41": `Glory 4 and Glory 5's effects are squared.`,
            "42": `Renown boost Eternal Mass gain.`,
            "43": `Remove Super Prestige Level scaling.`,
            "47": `Remove Ultra Fermion Tier scaling.`,
            "49": `Meta-Presige Level starts 1.2x later.`,
            "51": `Prestige Muscler boost itself.`,
            "52": `Prestige Booster boost itself.`,
            "53": `Prestige Stronger boost itself.`,
            "54": `Add +10% to Glory 25's effectiveness`,
            "55": `Add +30% to Glory 25's effectiveness`,
            "56": `Add +50% to Glory 25's effectiveness`,
			"57": `Prestige Mass Effect is applied to Meta-Hex scaling.`,
			"59": `Prestige Mass Effect is applied to Ultra Hept scaling at reduced rate.`,
            "81": `Stronger Overflow is weaker.`,
            "84": `Meta-Prestige Level starts 2x later.`,
            "98": `Ultra Glory starts 6 later.`,
            "140": `Add +5% to Glory 59's effectiveness`,
            "141": `Glory boost Exotic Matter gain.`,
            "145": `Remove Hyper Hex scaling.`,
            "146": `Galactic Shards boost Quantizes.`,
            "147": `Galactic Shards boost Infinities.`,
            "148": `Galactic Shards boost Eternities.`,
            "155": `Square the effect of Glory 141.`,
            "156": `Meta-Prestige Level starts 1.2x later.`,
            "162": `Super Overpower starts (10/9)x later.`,
            "163": `Meta-Pent starts 1e10x later.`,
            "165": `Unlock Prestige Rage Power.`,
            "173": `Add +5% to Glory 59's effectiveness`,
            "175": `Meta-Pent starts 1e20x later.`,
		},
		{
            "1": `Remove Hyper Prestige Level scaling.`,
            "2": `Remove Hyper Fermion Tier scaling.`,
            "3": `Multiply Honor 9 reward by Renown.`,
            "4": `Prestige Mass Effect is applied to Ultra Glory scaling.`,
            "5": `Add +5% to Glory 25's effectiveness`,
			"6": `Prestige Mass Effect is applied to Super Oct scaling.`,
            "7": `Square the Renown 3 reward.`,
            "8": `Automatically gain Glory.`,
            "9": `Oct resets nothing.`,
            "10": `The Tier requirement is broken.`,
            "11": `Renown boost Prestige Stronger Power.`,
            "12": `Renown boost Galactic Quarks gain.`,
            "13": `Remove Super Honor scaling.`,
            "17": `Renown boost Infinity and Eternal Mass gain.`,
            "18": `Add +5% to Glory 59's effectiveness`,
            "19": `Super Supernova Galaxies starts 5 later.`,
            "20": `Remove Super Hept scaling.`,
            "21": `Supernova Galaxies boost Exotic Matter gain.`,
            "22": `Renown boost Exotic Matter gain.`,
            "23": `Unlock Ascension.`,
            "24": `Prestige Muscler boost its effect.`,
            "25": `Remove Ultra Hex scaling.`,
            "26": `Meta Fermion Tier scaling starts 10x later.`,
            "27": `Renown boost Ascension Base Exponent.`,
            "28": `Prestige Booster boost its effect.`,
            "29": `Multiply Honor 9 reward by Prestige Level.`,
            "30": `Renown is added to Prestige Mass formula.`,
            "31": `Add +5% to Glory 59's effectiveness`,
            "32": `Square Renown 21 Effect.`,
			"33": `Prestige Mass Effect is applied to Super Renown scaling.`,
			"34": `Unlock Prestige Black Hole.`,
			"35": `Meta BH Condensers starts later based on Dark Matter.`,
			"36": `Renown 3 reward ^1.5.`,
			"37": `Unlock Prestige Dark Matter.`,
			"38": `Unlock Enne. All ranks resets nothing, and collapse Rank, Tier and Tetr.`,
			"39": `Prestige Dark Matter effect is better.`,
			"40": `The Entropy Gain effect from Supernova Galaxies is better.`,
			"46": `Remove Super Oct scaling.`,
            "48": `Remove Hyper Cosmic Strings scaling.`,
            "49": `Add +5% to Glory 59's effectiveness`,
            "86": `Add +50% to Glory 59's effectiveness`,
		},
		{
			"1": `Meta-Hex starts 1000x later.`,
			"2": `Meta-Hex starts 10x later.`,
            "3": `Add +20% to Glory 59's effectiveness`,
            "4": `Valor boost Prestige Rage Power and Prestige Dark Matter gain.`,
            "5": `Meta-Prestige Level starts 2x later.`,
            "6": `Remove Meta-Prestige Level scaling, Prestige Mass Effect is applied to Exotic Prestige Level scaling.`,
            "7": `Meta-Hex starts 1e10x later.`,
            "8": `Valor boost Dark Ray gain.`,
            "9": `Remove Hyper Hept scaling.`,
            "10": `The Tier Requirement is broken.`,
            "11": "Exotic Prestige Level scaling is weaker based on Valor.",
            "12": `Valor boost Glyphic Mass gain.`,
			"13": `Prestige Mass Effect is applied to Meta-Hept scaling at reduced rate.`,
			"14": `Renown 24 & 28 effects are better.`,
            "15": `Valor boost Exotic Matter gain.`,
            "16": `Add +5% to Valor 13's effectiveness`,
            "17": `Square Valor 12's effect.`,
            "18": `Remove Super Glory scaling.`,
            "20": `Accelerator Effect Softcap^2 is weaker.`,
            "23": `Remove Hyper Oct scaling.`,
            "26": `Remove Ultra Hept scaling.`,
            "30": `Valor is added to Prestige Mass formula.`,
            "34": `Square Valor 15's effect.`,
            "35": `Reduce Hex-Oct Requirements.`,
			"39": `Renown 24 & 28 effects are better.`,
            "47": `Add +1% to Valor 13's effectiveness for each Valor after 47th (90% max).`,
            "51": `Meta-Tickspeeds stars ^2 later for each Valor after 51st.`,
			"57": `Prestige Mass Effect is applied to Hyper Renown scaling at reduced rate.`,
            "73": "Valor 11 effect is better.",
            "74": "Enne 14 effect is better.",
		},
    ],
    rewardEff: [
        {
            "8": [_=>{
                let x = player.prestiges[0].root(2).div(2).add(1)
                return x
            },x=>"^"+x.format()+" later"],
            "10": [_=>{
                let x = Decimal.pow(2,player.prestiges[0])
                return x
            },x=>x.format()+"x"],
            "32": [_=>{
                let x = player.prestiges[0].div(1e4)
				if(x.gte(30000))x = x.div(3).log10().mul(7500);
                return x
            },x=>"+^"+format(x)],
            "55": [_=>{
                let x = player.prestiges[0].max(1)
                return x
            },x=>x.format()+"x"],
            "60": [_=>{
                return [player.prestigeMass.add(1),(tmp.preQUGlobalSpeed||E(0)).add(10).log10().sqrt()];
            },x=>x[0].format()+"x to Pre-Quantum Global Speed, "+x[1].format()+"x to Prestige Mass"],
            "88": [_=>{
                return [player.prestigeMass.add(1),(player.qu.bp||E(0)).add(10).log10().sqrt()];
            },x=>x[0].format()+"x to Blueprint Particles, "+x[1].format()+"x to Prestige Mass"],
            "89": [_=>{
                return [player.prestigeMass.add(1),(player.qu.points||E(0)).add(10).log10().sqrt()];
            },x=>x[0].format()+"x to Quantum Foams, "+x[1].format()+"x to Prestige Mass"],
            "98": [_=>{
                return [player.prestigeMass.add(10).log10().pow(2),(player.qu.rip.amt||E(0)).add(10).log10().sqrt()];
            },x=>x[0].format()+"x to Death Shards, "+x[1].format()+"x to Prestige Mass"],
			"110": [_=>{
                let x = player.atom.powers[0].add(1).log10().add(1).log10();
                return x
            },x=>x.format()+"x"],
			"111": [_=>{
                let x = player.prestigeMass.add(10).log10();
                return x
            },x=>x.format()+"x"],
			"135": [_=>{
                let x = player.prestiges[0].add(10).log10();
				if(hasPrestige(1,43))x = player.prestiges[0].add(1).pow(0.2);
                return x
            },x=>x.format()+"x"],
			"165": [_=>{
                let x = player.prestiges[0].add(1).log10().pow(1.5);
                return x
            },x=>x.format()+"x"],
			"250": [_=>{
                let x = player.prestiges[0].add(1).log10().pow(1.5);
                return x
            },x=>x.format()+"x"],
            /*
            "1": [_=>{
                let x = E(1)
                return x
            },x=>{
                return x.format()+"x"
            }],
            */
        },
        {
            "3": [_=>{
                let x = tmp.prestiges.base.max(1).log10().div(10).add(1).root(2)
                return x
            },x=>"^"+x.format()],
            "5": [_=>{
                let x = tmp.prestiges.base.max(1).log10().div(10).add(1).root(3)
                return x
            },x=>"x"+x.format()],
            "7": [_=>{
                let x = player.prestiges[1].add(1).root(3)
                return x
            },x=>"^"+x.format()],
            "9": [_=>{
                let x = player.prestiges[1].max(1)
				if(hasPrestige(2,2))x = x.mul(player.prestiges[2].max(1));
				if(hasPrestige(0,135))x = x.mul(prestigeEff(0,135));
				if(hasPrestige(1,22))x = x.mul(2);
				if(hasElement(212))x = x.mul(2);
				if(hasElement(215))x = x.mul(2);
				if(hasPrestige(3,3))x = x.mul(prestigeEff(3,3));
				if(hasPrestige(3,29))x = x.mul(prestigeEff(3,29));
				if(hasAscension(0,80))x = x.mul(ascensionEff(0,80));
				if(hasAscension(0,170))x = x.pow(ascensionEff(0,170));
				if(hasChargedElement(212))x = x.pow(1.35);
				if(hasChargedElement(215))x = x.pow(1.05);
                return x
            },x=>"+"+x.format()],
            "11": [_=>{
                return [player.prestigeMass.add(1).sqrt(),player.qu.en.amt.add(10).log10().sqrt()];
            },x=>x[0].format()+"x to Entropy Gain, "+x[1].format()+"x to Prestige Mass"],
            "18": [_=>{
                let x = player.prestiges[1].add(1).root(4)
				if(hasPrestige(1,38))x = x.pow(4);
                return x
            },x=>"x"+x.format()],
            "23": [_=>{
                let x = player.prestiges[2].add(1).root(3)
                return x
            },x=>"^"+x.format()],
            "26": [_=>{
                let x = player.prestiges[1].add(1).root(4)
				if(hasPrestige(1,44))x = x.pow(4);
                return x
            },x=>"x"+x.format()],
            "33": [_=>{
                let x = player.prestiges[1].sub(30).div(10).add(1);
                return x
            },x=>"x"+x.format()],
            "57": [_=>{
                let x = E(2).pow(player.prestiges[1]);
				if(player.prestiges[1].gte(60))x = E(1.001).pow(player.prestiges[1].pow(3));
                return x
            },x=>"x"+x.format()],
            "58": [_=>{
                let x = player.ranks.rank.add(10).log10();
                return x
            },x=>"x"+x.format()],
            "146": [_=>{
                let x = 10;
				if (hasPrestige(2,21))x += 10;
				if (hasPrestige(2,22))x += 30;
				if (hasPrestige(2,23))x += 50;
                return x
            },x=>x+"% effectiveness"],
            "242": [_=>{
                let x = player.prestiges[1].add(1).pow(4.2)
                return x
            },x=>"x"+x.format()],
        },
		{
            "3": [_=>{
                let x = player.prestiges[2].add(1).root(2)
				if (hasPrestige(2,4)) x = player.prestiges[2].add(1)
                return x
            },x=>"x"+x.format()],
            "4": [_=>{
                let x = player.prestiges[2].add(1).root(2)
				if (hasPrestige(2,41)) x = player.prestiges[2].add(1)
                return x
            },x=>"x"+x.format()],
            "5": [_=>{
                let x = E(2).pow(player.prestiges[1]).pow(player.prestiges[2].sub(25).max(1));
				if (hasPrestige(2,41)) x = x.pow(2)
                return x
            },x=>"x"+x.format()],
            "25": [_=>{
                let x = 5;
				if (hasPrestige(3,5))x += 5;
				if (hasPrestige(2,54))x += 10;
				if (hasPrestige(2,55))x += 30;
				if (hasPrestige(2,56))x += 50;
                return x
            },x=>x+"% effectiveness"],
            "42": [_=>{
                let x = player.prestiges[3].add(1)
                return x
            },x=>"x"+x.format()],
            "51": [_=>{
                let x = player.prestigeMassUpg[1].add(1)
                return x
            },x=>"x"+x.format()+" to power"],
            "52": [_=>{
                let x = player.prestigeMassUpg[2].add(1)
                return x
            },x=>"x"+x.format()+" to power"],
            "53": [_=>{
                let x = player.prestigeMassUpg[2].add(1).log10().add(1).sqrt()
                return x
            },x=>"x"+x.format()+" to power"],
            "59": [_=>{
                let x = 5;
				if (hasPrestige(3,18))x += 5;
				if (hasPrestige(2,140))x += 5;
				if (hasPrestige(2,173))x += 5;
				if (hasPrestige(3,31))x += 5;
				if (hasPrestige(3,49))x += 5;
				if (hasPrestige(4,3))x += 20;
				if (hasPrestige(3,86))x += 50;
                return x
            },x=>x+"% effectiveness"],
            "141": [_=>{
                let x = player.prestiges[2].div(100).add(1);
				if (hasPrestige(2,155))x = x.pow(2);
                return x
            },x=>"x"+x.format()],
            "146": [_=>{
                let x = player.gc.shard.add(1);
                return x
            },x=>"x"+x],
            "147": [_=>{
                let x = player.gc.shard.add(1);
                return x
            },x=>"x"+x],
            "148": [_=>{
                let x = player.gc.shard.add(1);
                return x
            },x=>"x"+x],
		},
		{
            "3": [_=>{
                let x = player.prestiges[3];
				if(x.gte(36))x = x.pow(1.5);
				if(x.gte(7))x = x.pow(2);
                return x
            },x=>"x"+x.format()],
            "11": [_=>{
                let x = player.prestiges[3].log10();
                return x
            },x=>"x"+x.format()+" to power"],
            "12": [_=>{
                let x = player.prestiges[3].add(1).pow(2);
                return x
            },x=>"x"+x.format()],
            "17": [_=>{
                let x = Decimal.pow(4,player.prestiges[3]);
                return x
            },x=>"x"+x.format()],
            "21": [_=>{
                let x = player.superGal.add(10).log10().pow(2);
				if(hasPrestige(3,32))x = x.pow(2);
                return x
            },x=>"x"+x.format()],
            "22": [_=>{
                let x = player.prestiges[3].div(10).add(1);
                return x
            },x=>"x"+x.format()],
            "24": [_=>{
                let x = player.prestigeMassUpg[1].add(10).log10().add(10).log10().add(10).log10();
				if(hasAscension(0,7))x = player.prestigeMassUpg[1].add(10).log10().add(10).log10().pow(0.5);
				if(hasPrestige(4,14))x = player.prestigeMassUpg[1].add(10).log10().add(10).log10();
				if(hasPrestige(4,39))x = player.prestigeMassUpg[1].add(10).log10().pow(0.5);
                return x
            },x=>"^"+x.format()],
            "27": [_=>{
                let x = player.prestiges[3].div(10000);
                return x
            },x=>"+"+x.format()],
            "28": [_=>{
                let x = player.prestigeMassUpg[2].add(10).log10().add(10).log10().add(10).log10();
				if(hasPrestige(4,14))x = player.prestigeMassUpg[2].add(10).log10().add(10).log10();
				if(hasPrestige(4,39))x = player.prestigeMassUpg[2].add(10).log10().pow(0.5);
                return x
            },x=>"^"+x.format()],
            "29": [_=>{
                let x = player.prestiges[0];
                return x
            },x=>"x"+x.format()],
            "35": [_=>{
                let x = player.bh.dm.add(1e10).log10().pow(0.5);
                return x
            },x=>x.format()+"x later"],
		},
		{
            "4": [_=>{
                let x = player.prestiges[4].add(1).pow(2);
                return x
            },x=>"x"+x.format()],
            "8": [_=>{
                let x = player.prestiges[4].add(1).pow(2);
                return x
            },x=>"x"+x.format()],
            "11": [_=>{
                let x = E(0.999).pow(player.prestiges[4]);
				if(hasPrestige(4,73))x = x.pow(2);
                return x
            },x=>formatReduction(x)+" weaker"],
            "12": [_=>{
                let x = player.prestiges[4].add(1);
				if(hasPrestige(4,17))x = x.pow(2);
                return x
            },x=>"x"+x.format()],
            "13": [_=>{
                let x = 5;
				if (hasPrestige(4,16))x += 5;
				if (hasPrestige(4,47))x += player.prestiges[4].sub(46).min(90).toNumber();
                return x
            },x=>x+"% effectiveness"],
            "15": [_=>{
                let x = player.prestiges[4].add(1);
				if(hasPrestige(4,34))x = x.pow(2);
                return x
            },x=>"x"+x.format()],
            "51": [_=>{
                let x = E(2).pow(player.prestiges[4].sub(50).max(0));
                return x
            },x=>"^"+x.format()+" later"],
            "57": [_=>{
                let x = 5;
                return x
            },x=>x+"% effectiveness"],
		},
    ],
    reset(i) {
        if (i==0?tmp.prestiges.base.gte(tmp.prestiges.req[i]):player.prestiges[i-1].gte(tmp.prestiges.req[i])) {
            player.prestiges[i] = player.prestiges[i].add(1)

            if (!this.noReset[i]()) {
                for (let j = i-1; j >= 0; j--) {
                    player.prestiges[j] = E(0)
                }
                QUANTUM.enter(false,true,false,true)
            }
            
            updateRanksTemp()
        }
    },
}

const PRES_LEN = PRESTIGES.fullNames.length

function hasPrestige(x,y) { return player.prestiges[x].gte(y) }

function prestigeEff(x,y,def=E(1)) { return tmp.prestiges.eff[x][y] || def }


const ASCENSIONS = {
    fullNames: ["Ascension Level","Transcension Level","Recursion"],
    baseExponent() {
        let x = E(0)
		if(hasPrestige(3,27))x = x.add(prestigeEff(3,27,E(0)));
		if(hasAscension(0,10))x = x.add(ascensionEff(0,10,E(0)));
		if(hasElement(486))x = x.add(MATTERS.eff(8));
        return x.add(1)
    },
    base() {
        let x = E(1)

        for (let i = 0; i < PRESTIGES.fullNames.length; i++) {
            let r = player.prestiges[i]
            x = x.mul(r.add(1))
        }

        return x.sub(1)
    },
    req(i) {
        let x = EINF, y = player.ascensions[i]
        switch (i) {
            case 0:
                x = Decimal.pow(1.1,y.scaleEvery('ascension0').pow(1.1)).mul(1.5e12)
                break;
            case 1:
                x = y.scaleEvery('ascension1').pow(1.25).mul(3).add(4)
                break;
            case 2:
                x = y.scaleEvery('ascension2').pow(1.25).mul(3).add(20)
                break;
            default:
                x = EINF
                break;
        }
        return x.ceil()
    },
    bulk(i) {
        let x = E(0), y = i==0?tmp.ascensions.base:player.ascensions[i-1]
        switch (i) {
            case 0:
                if (y.gte(1.5e12)) x = y.div(1.5e12).max(1).log(1.1).max(0).root(1.1).scaleEvery('ascension0',true).add(1)
                break;
			case 1:
                if (y.gte(4)) x = y.sub(4).div(3).max(0).root(1.25).scaleEvery('ascension1',true).add(1)
                break
			case 2:
                if (y.gte(20)) x = y.sub(20).div(3).max(0).root(1.25).scaleEvery('ascension2',true).add(1)
                break
            default:
                x = E(0)
                break;
        }
        return x.floor()
    },
    unl: [
        _=>true,
        _=>hasAscension(0,4)||hasAscension(1,1),
        _=>hasAscension(1,20)||hasAscension(2,1),
    ],
    noReset: [
        _=>player.superCluster.gte(2),
        _=>player.superCluster.gte(11),
        _=>player.superCluster.gte(20),
    ],
    rewards: [
        {
			"1": `Meta-Prestige Level starts 1.2x later.`,
			"2": `Ascension Level boost Exotic Matter gain.`,
			"3": `The effect of Galactic Particles is better.`,
			"4": `Unlock Transcension.`,
			"5": `Ascension Level 2's effect ^1.5`,
			"6": `Ascension Level boost Galactic Quarks gain.`,
			"7": `Renown 24's effect is better.`,
            "8": `Super Supernova Galaxies starts 5 later.`,
            "9": `Ascension Level boost Infinity Mass Base Formula.`,
            "10": `Ascension Level boost Ascension Base Exponent.`,
            "11": `Ascension Level boost Dark Ray gain.`,
            "12": `Ascension Level boost Prestige Base Exponent.`,
            "13": `Double Ascension Mass effect.`,
            "14": `[G-Neutrino] is better.`,
            "15": `Double Ascension Mass effect.`,
            "16": `Double Ascension Mass effect.`,
            "18": `Triple Ascension Level 9's effect.`,
			"19": `Ascension Level 2's effect ^(4/3)`,
            "20": `Ascension Level boost Dark Shadow gain.`,
            "21": `Prestige Mass Effect is applied to Hyper Oct scaling.`,
            "22": `Remove Entropic Condenser^2 scaling.`,
            "23": `C5 Effect is better.`,
            "25": `Square Ascension Level 20 Effect.`,
            "26": `Bonus BH Condensers and Cosmic Rays amount using multiplying to amount instead of adding to amount.`,
            "28": `Ascension Mass Formula from Ascension Level is better.`,
            "30": `Unlock Valor (a new Prestige Tier)`,
            "42": `Entropic Evaporation^2 is 20% weaker.`,
            "49": `C17 affects Prestige Mass Effect's 2nd softcap at reduced rate.`,
            "60": `Ascension Level 6's effect is squared.`,
            "65": `Prestige Black Hole Effect is better.`,
			"80": `Ascension Level boost Honor 9 effect.`,
            "87": `Ascension Mass effect is better.`,
			"170": `Ascension Base Exponent affects Honor 9 effect.`,
        },
        {
			"1": `Transcension Level boost Exotic Matter gain.`,
			"2": `Transcension Level boost Galactic Quarks gain.`,
			"3": `Unlock Ascension Mass.`,
			"4": `Unlock Ascension Mass Upgrade 1, Super Renown is 20% weaker.`,
			"5": `Unlock Ascension Mass Upgrade 2.`,
			"6": `Unlock Ascension Mass Upgrade 3.`,
			"7": `Raise Prestige Tickspeeds Power by 5.`,
			"8": `Exotic Upgrade 21 is better.`,
            "9": `Ascension Mass Formula from Ascension Level is better.`,
			"10": `Transcension Level 1's effect ^1.6`,
            "11": `Remove Ultra Prestige Level scaling.`,
            "12": `[G-Neut-Muon] is better.`,
            "13": `Remove Hyper Honor scaling.`,
			"14": `Transcension Level boost Glyphic Mass gain.`,
			"15": `Glyphic Mass gain formula is better.`,
			"16": `Ascension Mass Upgrade 1 boost itself.`,
			"17": `Transcension Level 14's effect is squared.`,
			"18": `Ascension Mass Upgrade 2 boost itself.`,
			"19": `Divide Supernova Galaxy Requirement by 2.`,
			"20": `Unlock Recursion.`,
            "21": `Entropic Evaporation^2 is 20% weaker.`,
            "25": `Collapsed Stars Effect is better.`,
            "26": `Reduce Enne Requirements.`,
            "31": `Prestige Stronger Softcap is weaker.`,
            "32": `Prestige Stronger Softcap is weaker.`,
			"33": `Raise Prestige Tickspeeds Power by 10.`,
			"34": `Raise Prestige Tickspeeds Power by 10.`,
            "35": `Prestige Stronger Softcap is weaker.`,
			"36": `Raise Prestige Tickspeeds Power by 10.`,
            "50": `Transcension Level 18 effect is better.`,
            "146": `Accelerator Effect Softcap^2 is weaker.`,
            "149": `Ascension Mass Effect is multiplied by 10`,
            "154": `Prestige Stronger Softcap is weaker.`,
            "160": `Dark Run Upgrade 10 is better.`,
            "190": `Dark Run Upgrade 10 is better.`,
            "191": `'50%' in Element 550 is now 10%.`,
        },
		{
			"1": `Free Mass Upgrades and Tickspeeds uses multiplication instead of add to amount.`,
            "2": `Remove Ultra Honor scaling.`,
            "3": `Remove Hyper Glory scaling.`,
            "4": `Reduce Enne Requirements.`,
            "5": `Reduce Enne Requirements.`,
            "6": `Recursion is added to Ascension Mass formula.`,
            "7": `Transcension Level 16 effect is better.`,
            "8": `Remove Super Renown scaling.`,
			"9": `Recursion boost Prestige Tickspeeds Power.`,
			"10": `Recursion boost Stardust gain.`,
			"11": `Recursion boost Galactic Mass gain.`,
			"12": `Meta-Honor starts 2x later.`,
			"13": `Meta-Honor starts 2x later.`,
			"14": `Meta-Honor starts 2x later.`,
			"15": `Recursion boost Axion Generators Power.`,
			"16": `Unlock Ascension Overpower.`,
			"17": `Meta-Honor starts 2x later.`,
			"18": `Meta-Honor starts 2x later.`,
			"19": `Meta-Hex starts ^2 later.`,
			"20": `Remove Meta-Honor scaling.`,
			"21": `Recursion 15 effect is squared.`,
			"22": `Exotic Prestige Level scaling is 25% weaker.`,
            "23": `Dark Run Upgrade 13 is better.`,
            "24": `Enne 14 is better.`,
            "25": `Galactic Particles is better.`,
            "26": `Accelerator Effect Softcap^2 is weaker.`,
		},
    ],
    rewardEff: [
        {
            "2": [_=>{
                let x = player.ascensions[0].add(1);
				if(hasAscension(0,19))x = x.pow(4/3);
				if(hasAscension(0,5))x = x.pow(1.5);
                return x
            },x=>{
                return x.format()+"x"
            }],
            "6": [_=>{
                let x = player.ascensions[0].add(1);
				if(hasAscension(0,60))x = x.pow(2);
                return x
            },x=>{
                return x.format()+"x"
            }],
            "9": [_=>{
                let x = player.ascensions[0].div(60);
				if(hasAscension(0,18))x = x.mul(3);
                return x
            },x=>{
                return "+"+x.format()
            }],
            "10": [_=>{
                let x = player.ascensions[0].div(10000);
                return x
            },x=>"+"+x.format()],
            "11": [_=>{
                let x = player.ascensions[0].add(1);
                return x
            },x=>{
                return x.format()+"x"
            }],
            "12": [_=>{
                let x = player.ascensions[0];
                return x
            },x=>"+"+x.format()],
            "20": [_=>{
                let x = player.ascensions[0].add(1);
				if(hasAscension(0,25))x = x.pow(2);
                return x
            },x=>{
                return x.format()+"x"
            }],
            "49": [_=>{
                let x = Decimal.pow(0.99,player.chal.comps[17].pow(2).div(1e43).add(1).log10());
                return x
            },x=>format(E(1).sub(x).mul(100))+"% weaker"],
            "80": [_=>{
                let x = player.ascensions[0].add(1).pow(3);
                return x
            },x=>{
                return x.format()+"x"
            }],
            "170": [_=>{
                let x = ASCENSIONS.baseExponent();
                return x
            },x=>{
                return "^"+x.format()
            }],
            /*
            "1": [_=>{
                let x = E(1)
                return x
            },x=>{
                return x.format()+"x"
            }],
            */
        },
        {
            "1": [_=>{
                let x = player.ascensions[1].add(1).pow(1.25);
				if(hasAscension(1,10))x = x.pow(1.6);
                return x
            },x=>{
                return x.format()+"x"
            }],
            "2": [_=>{
                let x = player.ascensions[1].add(1).pow(1.25);
                return x
            },x=>{
                return x.format()+"x"
            }],
            "14": [_=>{
                let x = player.ascensions[1].add(1);
				if(hasAscension(1,17))x = x.pow(2);
                return x
            },x=>{
                return x.format()+"x"
            }],
            "16": [_=>{
                let x = player.ascensionMassUpg[1].add(10).log10().add(10).log10();
				if(hasAscension(2,7))x = player.ascensionMassUpg[1].add(10).log10().pow(0.5);
                return x
            },x=>"^"+x.format()],
            "18": [_=>{
                let x = player.ascensionMassUpg[2].add(10).log10().add(10).log10();
				if(hasAscension(1,50))x = player.ascensionMassUpg[2].add(10).log10().pow(0.5);
                return x
            },x=>"^"+x.format()],
            /*
            "1": [_=>{
                let x = E(1)
                return x
            },x=>{
                return x.format()+"x"
            }],
            */
        },
		{
            "9": [_=>{
                let x = player.ascensions[2].add(1);
                return x
            },x=>{
                return "^"+x.format()
            }],
            "10": [_=>{
                let x = player.ascensions[2].add(1).pow(2);
                return x
            },x=>{
                return x.format()+"x"
            }],
            "11": [_=>{
                let x = player.ascensions[2].add(1).pow(2);
                return x
            },x=>{
                return x.format()+"x"
            }],
            "15": [_=>{
                let x = player.ascensions[2].add(1);
				if(hasAscension(2,21))x = x.pow(2);
                return x
            },x=>{
                return x.format()+"x"
            }],
		},
    ],
    reset(i) {
        if (i==0?tmp.ascensions.base.gte(tmp.ascensions.req[i]):player.ascensions[i-1].gte(tmp.ascensions.req[i])) {
            player.ascensions[i] = player.ascensions[i].add(1)

            if (!this.noReset[i]()) {
                for (let j = i-1; j >= 0; j--) {
                    player.ascensions[j] = E(0)
                }
                for (let j = PRES_LEN - 1; j >= 0; j--) {
                    player.prestiges[j] = E(0)
                }
                EXOTIC.doReset(true);
            }
            
            updateRanksTemp()
        }
    },
}

const AS_LEN = ASCENSIONS.fullNames.length

function hasPrestige(x,y) { return player.prestiges[x].gte(y) }

function prestigeEff(x,y,def=E(1)) { return tmp.prestiges.eff[x][y] || def }

function hasAscension(x,y) { return player.ascensions[x].gte(y) }

function ascensionEff(x,y,def=E(1)) { return tmp.ascensions.eff[x][y] || def }

function updateRanksTemp() {
    if (!tmp.ranks) tmp.ranks = {}
    for (let x = 0; x < RANKS.names.length; x++) if (!tmp.ranks[RANKS.names[x]]) tmp.ranks[RANKS.names[x]] = {}
    let fp2 = tmp.qu.chroma_eff[1]
    let fp = RANKS.fp.rank()
    tmp.ranks.rank.req = E(10).pow(player.ranks.rank.div(fp2).scaleEvery('rank').div(fp).pow(1.15)).mul(10)
    tmp.ranks.rank.bulk = E(0)
    if (player.mass.gte(10)) tmp.ranks.rank.bulk = player.mass.div(10).max(1).log10().root(1.15).mul(fp).scaleEvery('rank',true).mul(fp2).add(1).floor();
    tmp.ranks.rank.can = player.mass.gte(tmp.ranks.rank.req) && !CHALS.inChal(5) && !CHALS.inChal(10) && !CHALS.inChal(14) && !CHALS.inChal(19) && !FERMIONS.onActive("03")

    fp = RANKS.fp.tier()
    let pow = 2
	if (hasPrestige(3,10)) pow = 1.8
	if (hasChargedElement(9)) pow = 1.78
	if (hasChargedElement(44)) pow = 1.75
	if (hasPrestige(4,10)) pow = 1.5
    tmp.ranks.tier.req = player.ranks.tier.div(fp2).scaleEvery('tier').div(fp).add(2).pow(pow).floor()
    tmp.ranks.tier.bulk = player.ranks.rank.max(0).root(pow).sub(2).mul(fp).scaleEvery('tier',true).mul(fp2).add(1).floor();

    fp = E(1)
    pow = 2
    if (hasElement(44)) pow = 1.75
    if (player.ranks.hex.gte(44)) pow = 1.74
    if (hasChargedElement(72)) pow = 1.7
    if (hasChargedElement(74)) pow = 1.5
    if (hasElement(9)) fp = fp.mul(1/0.85)
    if (player.ranks.pent.gte(1)) fp = fp.mul(1/0.85)
    if (hasElement(72)) fp = fp.mul(1/0.85)
    if (player.ranks.hex.gte(9)) fp = fp.mul(1/0.85)
    if (player.ranks.hex.gte(72)) fp = fp.mul(1/0.85)
    if (player.ranks.hex.gte(72) && (player.qu.rip.active || player.ranks.hex.gte(100))) fp = fp.mul(1/0.85)
    tmp.ranks.tetr.req = player.ranks.tetr.div(fp2).scaleEvery('tetr').div(fp).pow(pow).mul(3).add(10).floor()
    tmp.ranks.tetr.bulk = player.ranks.tier.sub(10).div(3).max(0).root(pow).mul(fp).scaleEvery('tetr',true).mul(fp2).add(1).floor();

	fp2 = player.qu.times.gte("4.2e690")?fp2:hasElement(298)?tmp.elements.effect[298]:E(1)
    fp = E(1)
    pow = 1.5
    tmp.ranks.pent.req = player.ranks.pent.div(fp2).scaleEvery('pent').div(fp).pow(pow).add(15).floor()
    tmp.ranks.pent.bulk = player.ranks.tetr.sub(15).gte(0)?player.ranks.tetr.sub(15).max(0).root(pow).mul(fp).scaleEvery('pent',true).mul(fp2).add(1).floor():E(0);

    fp = E(1)
    pow = 1.5
    tmp.ranks.hex.req = player.ranks.hex.scaleEvery('hex').div(fp).pow(pow).add(25).floor()
    tmp.ranks.hex.bulk = player.ranks.pent.sub(25).gte(0)?player.ranks.pent.sub(25).max(0).root(pow).mul(fp).scaleEvery('hex',true).add(1).floor():E(0);

    fp = E(0.1)
	if (hasElement(150)) fp = fp.mul(1.6)
	if(hasPrestige(4,35)) fp = fp.mul(1.25)
	if (hasChargedElement(150)) fp = fp.mul(2.5)
    pow = 1.5
    tmp.ranks.hept.req = player.ranks.hept.scaleEvery('hept').div(fp).pow(pow).add(hasPrestige(4,35)?100:200).floor()
    tmp.ranks.hept.bulk = player.ranks.hex.sub(hasPrestige(4,35)?100:200).gte(0)?player.ranks.hex.sub(hasPrestige(4,35)?100:200).max(0).root(pow).mul(fp).scaleEvery('hept',true).add(1).floor():E(0);

    fp = E(0.16)
	if(hasPrestige(4,35)) fp = fp.mul(1.25)
    pow = 1.5
    tmp.ranks.oct.req = player.ranks.oct.scaleEvery('oct').div(fp).pow(pow).add(hasPrestige(4,35)?100:200).floor()
    tmp.ranks.oct.bulk = player.ranks.hept.sub(hasPrestige(4,35)?100:200).gte(0)?player.ranks.hept.sub(hasPrestige(4,35)?100:200).max(0).root(pow).mul(fp).scaleEvery('oct',true).add(1).floor():E(0);

    fp = E(0.1)
	if(hasAscension(1,26)) fp = fp.mul(1.25)
	if(hasAscension(2,4)) fp = fp.mul(1.28)
	if(hasAscension(2,5)) fp = fp.mul(1.25)
    pow = 1.5
    tmp.ranks.enne.req = player.ranks.enne.scaleEvery('enne').div(fp).pow(pow).add(100).floor()
    tmp.ranks.enne.bulk = player.ranks.oct.sub(100).gte(0)?player.ranks.oct.sub(100).max(0).root(pow).mul(fp).scaleEvery('enne',true).add(1).floor():E(0);

    for (let x = 0; x < RANKS.names.length; x++) {
        let rn = RANKS.names[x]
        if (x > 0) {
            tmp.ranks[rn].can = player.ranks[RANKS.names[x-1]].gte(tmp.ranks[rn].req)
        }
    }

    // Prestige

    tmp.prestiges.baseMul = PRESTIGES.base()
    tmp.prestiges.baseExp = PRESTIGES.baseExponent()
    tmp.prestiges.base = tmp.prestiges.baseMul.pow(tmp.prestiges.baseExp)
    for (let x = 0; x < PRES_LEN; x++) {
        tmp.prestiges.req[x] = PRESTIGES.req(x)
        for (let y in PRESTIGES.rewardEff[x]) {
            if (PRESTIGES.rewardEff[x][y]) tmp.prestiges.eff[x][y] = PRESTIGES.rewardEff[x][y][0]()
        }
    }
	
	tmp.prestigeMassGain = prestigeMassGain()
	tmp.prestigeMassEffect = prestigeMassEffect()
	tmp.prestigeRPGain = prestigeRPGain()
	tmp.prestigeRPEffect = prestigeRPEffect()
	
	if(hasPrestige(2,1) || player.exotic.times.gte(2)){
		player.prestiges[0] = player.prestiges[0].max(PRESTIGES.bulk(0));
	}
	if(hasPrestige(2,10) || player.exotic.times.gte(2)){
		player.prestiges[1] = player.prestiges[1].max(PRESTIGES.bulk(1));
	}
	if(hasPrestige(3,8) || player.exotic.times.gte(2)){
		player.prestiges[2] = player.prestiges[2].max(PRESTIGES.bulk(2));
	}
	if(player.exotic.times.gte(2)){
		player.prestiges[3] = player.prestiges[3].max(PRESTIGES.bulk(3));
	}
	if(player.superCluster.gte(6)){
		player.prestiges[4] = player.prestiges[4].max(PRESTIGES.bulk(4));
	}
	
	
    // Ascension

    tmp.ascensions.baseMul = ASCENSIONS.base()
    tmp.ascensions.baseExp = ASCENSIONS.baseExponent()
    tmp.ascensions.base = tmp.ascensions.baseMul.pow(tmp.ascensions.baseExp)
    for (let x = 0; x < AS_LEN; x++) {
        tmp.ascensions.req[x] = ASCENSIONS.req(x)
        for (let y in ASCENSIONS.rewardEff[x]) {
            if (ASCENSIONS.rewardEff[x][y]) tmp.ascensions.eff[x][y] = ASCENSIONS.rewardEff[x][y][0]()
        }
    }
	
	if(player.superCluster.gte(5)){
		player.ascensions[0] = player.ascensions[0].max(ASCENSIONS.bulk(0));
	}
	if(player.superCluster.gte(12)){
		player.ascensions[1] = player.ascensions[1].max(ASCENSIONS.bulk(1));
	}
	if(player.superCluster.gte(20)){
		player.ascensions[2] = player.ascensions[2].max(ASCENSIONS.bulk(2));
	}
	
	tmp.prestigeMassGain = prestigeMassGain()
	tmp.prestigeMassEffect = prestigeMassEffect()
	tmp.prestigeRPGain = prestigeRPGain()
	tmp.prestigeRPEffect = prestigeRPEffect()
	tmp.prestigeBHGain = prestigeBHGain()
	tmp.prestigeBHEffect = prestigeBHEffect()
	tmp.prestigeDMGain = prestigeDMGain()
	tmp.prestigeDMEffect = prestigeDMEffect()
	
	tmp.ascensionMassGain = ascensionMassGain()
	tmp.ascensionMassEffect = ascensionMassEffect()
}

function updateRanksHTML() {
    tmp.el.rank_tabs.setDisplay(hasUpgrade('br',9))
    tmp.el.rank_tab2_btn.setDisplay(hasPrestige(3,23) || hasAscension(0,1))
    for (let x = 0; x < 3; x++) {
        tmp.el["rank_tab"+x].setDisplay(tmp.rank_tab == x)
    }

    if (tmp.rank_tab == 0) {
		if(player.ranks.enne.gte(100))tmp.el["ranks_div_2"].setDisplay(false),player.auto_ranks.tetr=player.auto_ranks.pent;
		if(hasPrestige(3,38))tmp.el["ranks_div_0"].setDisplay(false),player.auto_ranks.rank=player.auto_ranks.tetr;
		if(hasPrestige(3,38))tmp.el["ranks_div_1"].setDisplay(false),player.auto_ranks.tier=player.auto_ranks.tetr;
		tmp.el["ranks_name_2"].setDisplay(!hasPrestige(3,38));
		tmp.el["ranks_name_3"].setDisplay(!player.ranks.enne.gte(100));
        for (let x = player.ranks.enne.gte(100)?3:hasPrestige(3,38)?2:0; x < RANKS.names.length; x++) {
            let rn = RANKS.names[x]
            let unl = RANKS.unl[rn]?RANKS.unl[rn]():true
            tmp.el["ranks_div_"+x].setDisplay(unl)
            if (unl) {
                let keys = Object.keys(RANKS.desc[rn])
                let desc = ""
                for (let i = 0; i < keys.length; i++) {
                    if (player.ranks[rn].lt(keys[i])) {
                        desc = ` At ${RANKS.fullNames[x]} ${format(keys[i],0)}, ${RANKS.desc[rn][keys[i]]}`
                        break
                    }
                }
    
                tmp.el["ranks_scale_"+x].setTxt(getScalingName(rn))
                tmp.el["ranks_amt_"+x].setTxt(format(player.ranks[rn],0))
                tmp.el["ranks_"+x].setClasses({btn: true, reset: true, locked: !tmp.ranks[rn].can})
                tmp.el["ranks_desc_"+x].setTxt(desc)
                tmp.el["ranks_desc1_"+x].setDisplay(!hasPrestige(3,38))
                tmp.el["ranks_req_"+x].setTxt(x==0?formatMass(tmp.ranks[rn].req):RANKS.fullNames[x-1]+" "+format(tmp.ranks[rn].req,0))
                tmp.el["ranks_auto_"+x].setDisplay(RANKS.autoUnl[rn]())
                tmp.el["ranks_auto_"+x].setTxt(player.auto_ranks[rn]?"ON":"OFF")
            }
        }
		if(hasPrestige(3,38))tmp.el.ranks_amt_2.setHTML("Rank "+format(player.ranks.rank,0)+"<br>Tier "+format(player.ranks.tier,0)+"<br>Tetr "+format(player.ranks.tetr,0));
		if(player.ranks.enne.gte(100)){
			tmp.el.ranks_amt_3.setHTML("Rank "+format(player.ranks.rank,0)+"<br>Tier "+format(player.ranks.tier,0)+"<br>Tetr "+format(player.ranks.tetr,0)+"<br>Pent "+format(player.ranks.pent,0));
			var html="<b>Current Beyond Ranks:</b><br>";
			for(let i=Math.max(9,getHighestBeyondRank()-1);i<=getHighestBeyondRank()+1;i++){
				html+=getRankTierName(i)+" "+format(beyondRankTier(i),0)+", to "+getRankTierName(i)+" up, requires "+getRankTierName(i-1)+" "+format(getNextBeyondRank(i),0)+(i>9?"(Enne "+format(getEnneforNextBeyondRank(i),0)+")":"")+"<br>";
			}
			tmp.el.beyond_ranks.setHTML(html);
		}else{
			tmp.el.beyond_ranks.setHTML('');
		}
    }else tmp.el.beyond_ranks.setHTML('');
    if (tmp.rank_tab == 1) {
        tmp.el.pres_base.setHTML(`${tmp.prestiges.baseMul.format(0)}<sup>${format(tmp.prestiges.baseExp)}</sup> = ${tmp.prestiges.base.format(0)}`)

        for (let x = 0; x < PRES_LEN; x++) {
            let unl = PRESTIGES.unl[x]?PRESTIGES.unl[x]():true

            tmp.el["pres_div_"+x].setDisplay(unl)

            if (unl) {
                let p = player.prestiges[x] || E(0)
                let keys = Object.keys(PRESTIGES.rewards[x])
                let desc = ""
                for (let i = 0; i < keys.length; i++) {
                    if (p.lt(keys[i])) {
                        desc = ` At ${PRESTIGES.fullNames[x]} ${format(keys[i],0)}, ${PRESTIGES.rewards[x][keys[i]]}`
                        break
                    }
                }

                tmp.el["pres_scale_"+x].setTxt(getScalingName("prestige"+x))
                tmp.el["pres_amt_"+x].setTxt(format(p,0))
                tmp.el["pres_"+x].setClasses({btn: true, reset: true, locked: x==0?tmp.prestiges.base.lt(tmp.prestiges.req[x]):player.prestiges[x-1].lt(tmp.prestiges.req[x])})
                tmp.el["pres_desc_"+x].setTxt(desc)
                tmp.el["pres_req_"+x].setTxt(x==0?format(tmp.prestiges.req[x],0)+" of Prestige Base":PRESTIGES.fullNames[x-1]+" "+format(tmp.prestiges.req[x],0))
                tmp.el["pres_auto_"+x].setDisplay(false)
                tmp.el["pres_auto_"+x].setTxt(false?"ON":"OFF")
            }
        }
		
		if (player.prestiges[1].gte(10)){
			tmp.el["pres_mass"].setDisplay(true);
			tmp.el["pres_mass2"].setTxt(formatMass(player.prestigeMass,0)+" "+formatGain(player.prestigeMass, tmp.prestigeMassGain, true))
			tmp.el["pres_mass3"].setTxt(format(E(1).sub(prestigeMassEffect()).mul(100))+"%");
			tmp.el["pres_mass4"].setDisplay(hasPrestige(2,1));
		}else{
			tmp.el["pres_mass"].setDisplay(false);
		}
		
		if (player.prestiges[2].gte(165)){
			tmp.el["pres_rp"].setDisplay(true);
			tmp.el["pres_rp2"].setTxt(format(player.prestigeRP,0)+" "+formatGain(player.prestigeRP, tmp.prestigeRPGain))
			tmp.el["pres_rp3"].setTxt(format(prestigeRPEffect()));
		}else{
			tmp.el["pres_rp"].setDisplay(false);
		}
		
		if (player.prestiges[3].gte(34)){
			tmp.el["pres_bh"].setDisplay(true);
			tmp.el["pres_bh2"].setTxt(formatMass(player.prestigeBH)+" "+formatGain(player.prestigeBH, tmp.prestigeBHGain, true))
			tmp.el["pres_bh3"].setTxt(format(prestigeBHEffect()));
		}else{
			tmp.el["pres_bh"].setDisplay(false);
		}
		
		if (player.prestiges[3].gte(37)){
			tmp.el["pres_dm"].setDisplay(true);
			tmp.el["pres_dm2"].setTxt(format(player.prestigeDM,0)+" "+formatGain(player.prestigeDM, tmp.prestigeDMGain))
			tmp.el["pres_dm3"].setTxt(format(E(1).sub(prestigeDMEffect()).mul(100))+"%");
		}else{
			tmp.el["pres_dm"].setDisplay(false);
		}
    }
    if (tmp.rank_tab == 2) {
        tmp.el.as_base.setHTML(`${tmp.ascensions.baseMul.format(0)}<sup>${format(tmp.ascensions.baseExp)}</sup> = ${tmp.ascensions.base.format(0)}`)

        for (let x = 0; x < AS_LEN; x++) {
            let unl = ASCENSIONS.unl[x]?ASCENSIONS.unl[x]():true

            tmp.el["as_div_"+x].setDisplay(unl)

            if (unl) {
                let p = player.ascensions[x] || E(0)
                let keys = Object.keys(ASCENSIONS.rewards[x])
                let desc = ""
                for (let i = 0; i < keys.length; i++) {
                    if (p.lt(keys[i])) {
                        desc = ` At ${ASCENSIONS.fullNames[x]} ${format(keys[i],0)}, ${ASCENSIONS.rewards[x][keys[i]]}`
                        break
                    }
                }

                tmp.el["as_scale_"+x].setTxt(getScalingName("ascension"+x))
                tmp.el["as_amt_"+x].setTxt(format(p,0))
                tmp.el["as_"+x].setClasses({btn: true, reset: true, locked: x==0?tmp.ascensions.base.lt(tmp.ascensions.req[x]):player.ascensions[x-1].lt(tmp.ascensions.req[x])})
                tmp.el["as_desc_"+x].setTxt(desc)
                tmp.el["as_req_"+x].setTxt(x==0?format(tmp.ascensions.req[x],0)+" of Ascension Base":ASCENSIONS.fullNames[x-1]+" "+format(tmp.ascensions.req[x],0))
                tmp.el["as_auto_"+x].setDisplay(false)
                tmp.el["as_auto_"+x].setTxt(false?"ON":"OFF")
            }
        }
		
		if (player.ascensions[1].gte(3)){
			tmp.el["as_mass"].setDisplay(true);
			tmp.el["as_mass2"].setTxt(formatMass(player.ascensionMass,0)+" "+formatGain(player.ascensionMass, tmp.ascensionMassGain, true))
			tmp.el["as_mass3"].setTxt(format(ascensionMassEffect()));
			tmp.el["as_mass4"].setDisplay(false);
		}else{
			tmp.el["as_mass"].setDisplay(false);
		}
		
    }
}

function prestigeMassGain(){
	if(player.prestiges[1].lt(10) || CHALS.inChal(16) || CHALS.inChal(19)){
		return E(0);
	}
	let p0pow = 1;
	if (hasPrestige(0,64)) p0pow += 0.5;
	if (hasPrestige(0,103)) p0pow += 0.25;
	if (hasPrestige(0,106)) p0pow += 0.1;
	if (hasPrestige(1,31)) p0pow += 0.15;
	let p1pow = 2;
	if (hasPrestige(0,74)) p1pow += 1;
	let p2pow = 1;
	let p3pow = 0;
	if (hasPrestige(3,30)) p3pow += 1;
	let p4pow = 0;
	if (hasPrestige(4,30)) p4pow += 1;
	
	let x= Decimal.log10(tmp.prestiges.base.add(10)).mul(player.prestiges[0].pow(p0pow)).mul(player.prestiges[1].pow(p1pow)).mul(player.prestiges[2].add(1).pow(p2pow)).mul(player.prestiges[3].add(1).pow(p3pow)).mul(player.prestiges[4].add(1).pow(p4pow)).pow(player.prestiges[1].div(10))
	if (hasPrestige(2,1)) x = x.pow(player.prestiges[2].div(10).add(1));
	if (hasPrestige(3,30)) x = x.pow(player.prestiges[3].div(29));
	if (hasPrestige(4,30)) x = x.pow(player.prestiges[4].div(29));
	if (hasChargedElement(145)) x = x.pow(1.1);
	x = x.div(400000);
	if (hasPrestige(0,60)) x = x.mul(prestigeEff(0,60,[E(1),E(1)])[1]);
	if (hasPrestige(1,11)) x = x.mul(prestigeEff(1,11,[E(1),E(1)])[1]);
    if (hasPrestige(0,88)) x = x.mul(prestigeEff(0,88,[E(1),E(1)])[1]);
    if (hasPrestige(0,89)) x = x.mul(prestigeEff(0,89,[E(1),E(1)])[1]);
    if (hasPrestige(0,98)) x = x.mul(prestigeEff(0,98,[E(1),E(1)])[1]);
    if (player.md.break.upgs[11].gte(1)) x = x.mul(tmp.bd.upgs[11].eff||1)
    if (hasTree("pm1")) x = x.mul(tmp.supernova.tree_eff.pm1)
    if (hasTree("pm2")) x = x.mul(tmp.supernova.tree_eff.pm2)
    if (hasTree("qc7")) x = x.mul(tmp.supernova.tree_eff.qc7)
    if (hasPrestige(0,110)) x = x.mul(prestigeEff(0,110));
    if (hasPrestige(0,111)) x = x.mul(prestigeEff(0,111));
    if (hasUpgrade('inf',5)) x = x.mul(upgEffect(5,5))
	if (hasElement(145)) x = x.mul(10);
	if (hasElement(255)) x = x.mul(tmp.elements.effect[255]);
	if (hasElement(306)) x = x.mul(tmp.elements.effect[306]);
	x = x.mul(tmp.upgs.prestigeMass[1].eff.eff);
	if (player.prestiges[2].gte(165)) x = x.mul(tmp.prestigeTickspeedEffect.eff);
	x = x.mul(tmp.prestigeBHEffect||1);
	return x;
}

function prestigeRPGain(){
	if(player.prestiges[2].lt(165)){
		return E(0);
	}
	let p = player.prestigeMass.add(1).log10().div(20).pow(0.5);
	let x = Decimal.pow(10,p);
	if(hasPrestige(4,4))x = x.mul(prestigeEff(4,4,E(1)));
	return x;
}

function prestigeBHGain(){
	if(player.prestiges[3].lt(34)){
		return E(0);
	}
	let x = player.prestigeMass.add(1).log10().add(1).pow(2).mul(player.prestigeBH.add(1).pow(0.33));
	if (player.prestiges[3].gte(37)) x = x.mul(tmp.prestigeBHCEffect.eff);
	return x;
}

function prestigeMassEffect(){
	let p = player.prestigeMass.add(1).log10();
	if(p.gte(104))p = p.softcap(104,E(hasElement(152)?0.6:hasElement(135)?0.55:0.5).pow(hasElement(168)?tmp.chal.eff[16]:1),0);
	if(p.gte(145))p = p.softcap(145,E(0.3).pow(hasAscension(0,49)?ascensionEff(0,49,E(1)):1),0);
	if(p.gte(680))p = p.softcap(680,0.4,0);
	if(p.gte(1400))p = p.softcap(1400,0.1,0);
	if(hasTree("qu12"))return E(0.98).pow(p.pow(0.725));
	return E(0.965).pow(p.sqrt());
}

function prestigeRPEffect(){
	let p = player.prestigeRP.add(1).log10().div(1e5);
	return p;
}

function prestigeBHEffect(){
	let p = overflow(player.prestigeBH.add(1),10,2.7);
	if(!hasAscension(0,65))p = overflow(p,Decimal.pow(10,1e5),0.33);
	return p;
}

function prestigeDMGain(){
	if(player.prestiges[3].lt(37)){
		return E(0);
	}
	let p = player.prestigeRP.add(1).log10().div(20).pow(0.5).sub(3);
	let x = Decimal.pow(10,p);
	if (player.ranks.enne.gte(1)) x = x.mul(10);
	if(hasPrestige(4,4))x = x.mul(prestigeEff(4,4,E(1)));
	return x;
}

function prestigeDMEffect(){
	let p = player.prestigeDM.add(1).log10();
	
	
	if(hasPrestige(3,39))p = p.mul(2);
	return E(0.995).pow(p.sqrt());
}

function calcPrestigeMass(dt){
	player.prestigeMass = player.prestigeMass.add(tmp.prestigeMassGain.mul(dt))
	player.prestigeRP = player.prestigeRP.add(tmp.prestigeRPGain.mul(dt))
	player.prestigeBH = player.prestigeBH.add(tmp.prestigeBHGain.mul(dt))
	player.ascensionMass = player.ascensionMass.add(tmp.ascensionMassGain.mul(dt))
	player.prestigeDM = player.prestigeDM.add(tmp.prestigeDMGain.mul(dt))
}

function ascensionMassGain(){
	if(player.ascensions[1].lt(3)){
		return E(0);
	}
	let a0pow = 1;
	if (hasAscension(0,28)) a0pow += 1;
	let a1pow = 2;
	if (hasAscension(1,9)) a1pow += 2;
	
	let x= Decimal.log10(tmp.ascensions.base.add(10)).mul(player.ascensions[0].pow(a0pow)).mul(player.ascensions[1].pow(a1pow)).pow(player.ascensions[1].div(10));
	if(hasAscension(2,6))x = x.pow(player.ascensions[2].div(5));
	x = x.mul(tmp.upgs.ascensionMass[1].eff.eff);
	return x;
}

function ascensionMassEffect(){
	let p = player.ascensionMass.add(1).log10().softcap(300,0.5,0);
	if(hasAscension(0,87))p = p.pow(2);
	if(hasAscension(0,13))p = p.mul(2);
	if(hasAscension(0,15))p = p.mul(2);
	if(hasAscension(0,16))p = p.mul(2);
	if(hasAscension(1,149))p = p.mul(10);
	return p;
}


// beyond ranks


const RTNS = [
    ['','Rank','Tier','Tetr','Pent','Hex','Hept','Oct','Enne'],
    ['','dec','icos'], // d>2 -> cont
    ['','hect'], // h>1 -> ct
]

const RTNS2 = [
    ['','un','do','tri','tetra','penta','hexa','hepta','octa','nona'], // d < 3
    ['','un','du','tria','tetra','penta','hexa','hepta','octa','nona'],
    ['','un','di','tri','tetra','penta','hexa','hepta','octa','nona'], // h
]

function getRankTierName(i) {
    if (i >= 999) return '['+format(i,0,9,'sc')+']'
    else {
        if (i < 9) return RTNS[0][i]
        i += 1
        let m = ''
        let h = Math.floor(i / 100), d = Math.floor(i / 10) % 10, o = i % 10

        if (d > 0) m += (d > 2 ? (o == 1 ? 'hen' : RTNS2[0][o]) + RTNS2[1][d] + 'cont' : (d == 2 && o == 3 ? "tr" : d > 1 && o == 1 ? "hen" : RTNS2[0][o]) + RTNS[1][d]) + (h > 0 ? 'a' : '');
        if (h > 0) m += h > 1 ? RTNS2[2][h] + 'ct' : 'hect';

        return capitalFirst(m)
    }
}

function beyondRankTier(x) {
	if(x <= 8)return player.ranks[RANKS.names[x-1]];
	if(player.ranks.enne.gte(E("e9e15").pow(Decimal.pow(1.5,x-8)))){
		return player.ranks.enne.root(Decimal.pow(1.5,x-8));
	}
	if(x == 9){
		if(player.ranks.enne.lt(100))return E(0);
		return player.ranks.enne.sub(100).max(0).root(1.5).div(5).add(1).floor();
	}
	let temp=beyondRankTier(x-1)
	if(temp.lt(100))return E(0);
	return temp.sub(100).max(0).root(1.5).div(5).add(1).floor();
}

function getNextBeyondRank(x) {
	return beyondRankTier(x).mul(5).pow(1.5).add(100).ceil();
}

function getHighestBeyondRank() {
	if(player.ranks.enne.lt(100))return 8;
	let x = 9;
	let step=1;
	while(beyondRankTier(x+step)>0){
		x+=step;
		step*=2;
	}
	while(step>=1){
		while(beyondRankTier(x+step)>0)x+=step;
		step/=2;
	}
	return x;
}

function getEnneforNextBeyondRank(x) {
	let y = beyondRankTier(x);
	while(x > 8){
		y = y.mul(5).pow(1.5).add(100).floor();
		x--;
		if(y.gte("e9e15")){
			return y.pow(Decimal.pow(1.5,x-8));
		}
	}
	return y;
}

function getEnneforBeyondRank(x) {
	let y = E(0);
	while(x > 8){
		y = y.mul(5).pow(1.5).add(100).floor();
		x--;
		if(y.gte("e9e15")){
			return y.pow(Decimal.pow(1.5,x-8));
		}
	}
	return y;
}

const RANKS = {
    names: ['rank', 'tier', 'tetr', 'pent', 'hex', 'hept'],
    fullNames: ['级别', '阶层', '三重阶层', '五重阶层', '六重阶层', '七重阶层'],
    reset(type) {
        if (tmp.ranks[type].can) {
            player.ranks[type] = player.ranks[type].add(1)
            let reset = true
            if (type == "rank" && player.mainUpg.rp.includes(4)) reset = false
            if (type == "tier" && player.mainUpg.bh.includes(4)) reset = false
            if (type == "tetr" && hasTree("qol5")) reset = false
            if (type == "pent" && hasTree("qol8")) reset = false
            if (type == "hex" && hasPrestige(1,27)) reset = false
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
    },
    autoSwitch(rn) { player.auto_ranks[rn] = !player.auto_ranks[rn] },
    autoUnl: {
        rank() { return player.mainUpg.rp.includes(5) },
        tier() { return player.mainUpg.rp.includes(6) },
        tetr() { return player.mainUpg.atom.includes(5) },
        pent() { return hasTree("qol8") },
        hex() { return true; },
        hept() { return true; },
    },
    desc: {
        rank: {
            '1': "解锁质量升级1。",
            '2': "解锁质量升级2，使质量升级1的花费折算弱化20%。",
            '3': "解锁质量升级3，使质量升级2的花费折算弱化20%，质量升级1的效果对自身生效。",
            '4': "使质量升级3的花费折算弱化20%。",
            '5': "使质量升级2的效果对自身生效。",
            '6': "使质量获取速度乘以(级别+1)的平方。",
            '13': "使质量获取速度变为原来的3倍。",
            '14': "使狂怒能量获取速度翻倍。",
            '17': "使级别6的奖励公式变得更好。即原公式的指数从2变为级别的1/3次方。",
            '34': "使质量升级3的软上限延迟1.2倍出现。",
            '40': "基于级别的数值，增加时间速度倍率。",
            '45': "使级别可以加成狂怒能量获取速度。",
            '90': "使级别40的奖励变得更好。",
            '180': "使质量获取速度变为原来的1.025次方。",
            '220': "使级别40的奖励变得滥强。",
            '300': "使级别可以加成夸克获取速度。",
            '380': "使级别可以加成质量获取速度。",
            '800': "基于级别的数值，使质量获取速度的软上限弱化0.25%。",
        },
        tier: {
            '1': "使级别的需求减少20%。",
            '2': "使质量获取速度变为原来的1.15次方。",
            '3': "使所有质量升级的花费折算弱化20%。",
            '4': "每有1个阶层，时间速度倍率就增加5%，在增加40%时达到软上限。",
            '6': "使阶层可以加成狂怒能量。",
            '8': "使阶层6的奖励效果基于暗物质的数值变得更强。",
            '12': "使阶层4的奖励效果翻倍，且移除软上限。",
            '30': "使强化器效果的软上限弱化10%。",
            '55': "使级别380的效果基于阶层的数值变得更强。",
            '100': "使三重阶层的超级折算延迟5次出现。",
        },
        tetr: {
            '1': "使阶层的需求减少25%，级别的究级折算弱化15%。",
            '2': "使质量升级3的效果对自身生效。",
            '3': "使时间速度效果变为原来的1.05次方。",
            '4': "使级别的超级折算基于阶层的数值而弱化，阶层的超级折算弱化20%。",
            '5': "使时间速度的究级折算和超究折算基于三重阶层的数值而延迟出现。",
            '8': "使质量获取速度的二重软上限延迟1.5次方出现。",
        },
        pent: {
            '1': "使三重阶层的需求减少15%，级别的元折算延迟1.1倍出现。",
            '2': "使三重阶层可以加成射线的获取速度。",
            '4': "使时间速度的元折算基于超新星次数而延迟出现。",
            '5': "使级别的元折算基于五重阶层的数值而延迟出现。",
            '8': "使质量获取速度的四重软上限基于五重阶层的数值而延迟出现。",
            '15': "移除强化器效果的三重软上限。",
        },
        hex: {
            '1': "移除质量获取速度的一重软上限，氢(1H)的效果变得更强。",
            '2': "Hardened Challenge scale 25% weaker.",
            '3': "锂(3Li)的效果变为原来的1.5次方（在软上限之前）。",
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
        },
        hept: {
            '1': "Mass Overflow is weaker based on Hept.",
            '2': "Star Overflow is weaker based on Hept.",
            '3': "Ultra Tier scaling is weaker based on Hept.",
            '4': "Hept boost Accelerator Power.",
            '5': "Hept 1's effect and Hept 3's effect are boosted.",
            '6': "Hept boost Pre-Quantum Global Speed.",
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
                let ret = E(10).pow(player.ranks.rank.sub(379).pow(1.5).pow(player.ranks.tier.gte(55)?RANKS.effect.tier[55]():1).softcap(1000,0.5,0))
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
                let ret = E(1.3).pow(player.ranks.tetr)
                return ret
            },
            '4'() {
                let ret = player.supernova.times.add(1).root(5)
                return ret
            },
            '5'() {
                let ret = overflow(E(1.05).pow(player.ranks.pent),1e10,0.1);
                return ret
            },
            '8'() {
                let ret = E(1.1).pow(player.ranks.pent)
                return ret
            },
        },
        hex: {
            '5'() {
                let ret = player.ranks.hex.div(1000).toNumber()
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
        },
        hept: {
            '1'() {
                let ret = E(0.98).pow(player.ranks.hept);
				if(player.ranks.hept.gte(5))ret = ret.pow(1.2);
                return ret
            },
            '2'() {
                let ret = E(0.9).pow(player.ranks.hept);
                return ret
            },
            '3'() {
                let ret = E(0.99).pow(player.ranks.hept);
				if(player.ranks.hept.gte(5))ret = ret.pow(1.2);
                return ret
            },
            '4'() {
                let ret = E(1.01).pow(player.ranks.hept);
                return ret
            },
            '6'() {
                let ret = player.ranks.hept.add(1);
                return ret
            },
		},
    },
    effDesc: {
        rank: {
            3(x) { return "+"+format(x) },
            5(x) { return "+"+format(x) },
            6(x) { return format(x)+"倍" },
            40(x) {  return "+"+format(x.mul(100))+"%" },
            45(x) { return format(x)+"倍" },
            300(x) { return format(x)+"倍" },
            380(x) { return format(x)+"倍" },
            800(x) { return "弱化"+format(E(1).sub(x).mul(100))+"%" },
        },
        tier: {
            4(x) { return "+"+format(x.mul(100))+"%" },
            6(x) { return format(x)+"倍" },
            8(x) { return "^"+format(x) },
            55(x) { return "^"+format(x) },
        },
        tetr: {
            2(x) { return "+"+format(x) },
            4(x) { return "弱化"+format(E(1).sub(x).mul(100))+"%" },
            5(x) { return "延迟"+format(x,0)+"次出现" },
        },
        pent: {
            2(x) { return format(x)+"倍" },
            4(x) { return "延迟"+format(x)+"倍出现" },
            5(x) { return "延迟"+format(x)+"倍出现" },
            8(x) { return "延迟"+format(x)+"次方出现" },
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
        },
        hept: {
            1(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
            2(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
            3(x) { return format(E(1).sub(x).mul(100))+"% weaker" },
            4(x) { return format(x)+"x" },
            6(x) { return format(x)+"x" },
		},
    },
    fp: {
        rank() {
            let f = E(1)
            if (player.ranks.tier.gte(1)) f = f.mul(1/0.8)
            f = f.mul(tmp.chal.eff[5].pow(-1))
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
    fullNames: ["转生等级", "荣耀", "辉煌"],
    baseExponent() {
        let x = 0
        if (hasElement(100)) x += tmp.elements.effect[100]
        if (hasPrestige(0,32)) x += prestigeEff(0,32,0)
        if (player.ranks.hex.gte(5)) x += RANKS.effect.hex[5]();
        if (hasTree('qc8')) x += treeEff('qc8',0)
        return x+1
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
                if (y.gte(4)) x = y.sub(4).div(2).max(0).root(1.5).scaleEvery('prestige1',true).add(1)
                break
            case 2:
                if (y.gte(12)) x = y.sub(12).div(2).max(0).root(1.5).scaleEvery('prestige2',true).add(1)
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
    ],
    noReset: [
        _=>hasUpgrade('br',11),
        _=>hasPrestige(2,2),
        _=>false,
    ],
    rewards: [
        {
            "1": `使到五重质量软上限为止的所有质量软上限延迟10次方出现。`,
            "2": `量子碎片的基础效果指数增加0.5。`,
            "3": `使量子泡沫和死寂碎片获取速度变为原来的4倍。`,
            "5": `使量子之前所有资源获取速度变为原来的2次方(在计算削弱之前生效)。`,
            "6": `使时间速度倍率的软上限延迟100次方出现。`,
            "8": `使质量获取速度的五重软上限基于转生等级而延迟出现。`,
            "10": `使相对论能量的获取速度基于转生等级而增加。`,
            "12": `使强化器效果的二重软上限弱化7.04%。`,
            "15": `使三重阶层2的奖励变得滥强。`,
            "18": `使计算转生基础值时级别的数值翻倍。`,
            "24": `使宇宙弦的超级折算弱化20%。`,
            "28": `移除胶子升级4的所有软上限。`,
            "32": `使转生基础值的指数基于转生等级而增加。`,
            "40": `使铬(24Cr)的效果略微增加。`,
            "42": `解锁六重阶层。`,
            "45": `使三重阶层的超究折算弱化42%。`,
            "50": `使第13-15个原子升级可以在大撕裂之外购买，并且变得更强，费用变为原来的20000次方根。`,
            "51": `使质量获取速度的二重软上限弱化50%。`,
            "53": `使级别的元折算延迟1.5倍出现。`,
            "55": `使量子泡沫和死寂碎片获取速度乘以转生等级。`,
            "58": `使级别的所有折算弱化50%。`,
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
            "135": `Multiply Honor 9 reward by log10(Prestige Level).`,
            "140": `Effect of W- Bosons affects mass gain softcap ^7.`,
            "141": `Entropic Evaporation^2 is 5% weaker.`,
            "165": `Prestige Level boost Infinity Mass gain.`,
            "250": `Prestige Level boost Eternal Mass gain.`,
            "500": `Prestige Mass Effect is applied to Super Fermion Tier scaling.`,
        },
        {
            "1": `使所有星辰相关资源获取速度变为原来的2次方。`,
            "2": `使超新星的元折算延迟100次出现。`,
            "3": `使玻色子的加成基于转生基础值而增加。`,
            "4": `所有原基粒子获得5级免费等级。`,
            "5": `使五重阶层5的奖励基于转生基础值变得更强。`,
            "7": `使夸克获取速度基于荣耀的数值而增加。`,
            "9": `所有原基粒子获得等同于荣耀的免费等级。`,
            "10": `解锁转生质量。`,
            "11": `Prestige Mass and Entropy boost each other.`,
            "12": `解锁辉煌。`,
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
        },
		{
            "1": `Super Prestige Level starts 5 later, and automatically gain Prestige Level.`,
            "2": `Super Honor starts 1 later, and Honor resets nothing. Multiply Honor 9 reward by Glory.`,
            "3": `Glory boost Infinity Mass gain.`,
            "4": `Glory boost Eternal Mass gain, and Glory 3's effect is squared.`,
            "5": `Honor boost Entropy gain.`,
            "6": `Unlock Hept.`,
		},
    ],
    rewardEff: [
        {
            "8": [_=>{
                let x = player.prestiges[0].root(2).div(2).add(1)
                return x
            },x=>"延迟"+x.format()+"次方"],
            "10": [_=>{
                let x = Decimal.pow(2,player.prestiges[0])
                return x
            },x=>x.format()+"倍"],
            "32": [_=>{
                let x = player.prestiges[0].div(1e4).toNumber()
                return x
            },x=>"+"+format(x)+"次方"],
            "55": [_=>{
                let x = player.prestiges[0].max(1)
                return x
            },x=>x.format()+"倍"],
            "60": [_=>{
                return [player.prestigeMass.add(1),(tmp.preQUGlobalSpeed||E(0)).add(1).log10().sqrt()];
            },x=>x[0].format()+"x to Pre-Quantum Global Speed, "+x[1].format()+"x to Prestige Mass"],
            "88": [_=>{
                return [player.prestigeMass.add(1),(player.qu.bp||E(0)).add(1).log10().sqrt()];
            },x=>x[0].format()+"x to Blueprint Particles, "+x[1].format()+"x to Prestige Mass"],
            "89": [_=>{
                return [player.prestigeMass.add(1),(player.qu.points||E(0)).add(1).log10().sqrt()];
            },x=>x[0].format()+"x to Quantum Foams, "+x[1].format()+"x to Prestige Mass"],
            "98": [_=>{
                return [player.prestigeMass.add(1).log10().pow(2),(player.qu.rip.amt||E(0)).add(1).log10().sqrt()];
            },x=>x[0].format()+"x to Death Shards, "+x[1].format()+"x to Prestige Mass"],
			"110": [_=>{
                let x = player.atom.powers[0].add(1).log10().add(1).log10();
                return x
            },x=>x.format()+"x"],
			"111": [_=>{
                let x = player.prestigeMass.add(1).log10();
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
            },x=>""+x.format()+"次方"],
            "5": [_=>{
                let x = tmp.prestiges.base.max(1).log10().div(10).add(1).root(3)
                return x
            },x=>""+x.format()+"倍"],
            "7": [_=>{
                let x = player.prestiges[1].add(1).root(3)
                return x
            },x=>""+x.format()+"次方"],
            "9": [_=>{
                let x = player.prestiges[1].max(1)
				if(hasPrestige(2,2))x = x.mul(player.prestiges[2].max(1));
				if(hasPrestige(0,135))x = x.mul(player.prestiges[0].add(10).log10());
				if(hasPrestige(1,22))x = x.mul(2);
                return x
            },x=>"+"+x.format()],
            "11": [_=>{
                return [player.prestigeMass.add(1).sqrt(),player.qu.en.amt.add(1).log10().sqrt()];
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
                return x
            },x=>"x"+x.format()],
            "33": [_=>{
                let x = player.prestiges[1].sub(30).div(10).add(1);
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
                return x
            },x=>"x"+x.format()],
            "5": [_=>{
                let x = E(2).pow(player.prestiges[1]);
                return x
            },x=>"x"+x.format()],
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

function updateRanksTemp() {
    if (!tmp.ranks) tmp.ranks = {}
    for (let x = 0; x < RANKS.names.length; x++) if (!tmp.ranks[RANKS.names[x]]) tmp.ranks[RANKS.names[x]] = {}
    let fp2 = tmp.qu.chroma_eff[1]
    let fp = RANKS.fp.rank()
    tmp.ranks.rank.req = E(10).pow(player.ranks.rank.div(fp2).scaleEvery('rank').div(fp).pow(1.15)).mul(10)
    tmp.ranks.rank.bulk = E(0)
    if (player.mass.gte(10)) tmp.ranks.rank.bulk = player.mass.div(10).max(1).log10().root(1.15).mul(fp).scaleEvery('rank',true).mul(fp2).add(1).floor();
    tmp.ranks.rank.can = player.mass.gte(tmp.ranks.rank.req) && !CHALS.inChal(5) && !CHALS.inChal(10) && !FERMIONS.onActive("03")

    fp = RANKS.fp.tier()
    tmp.ranks.tier.req = player.ranks.tier.div(fp2).scaleEvery('tier').div(fp).add(2).pow(2).floor()
    tmp.ranks.tier.bulk = player.ranks.rank.max(0).root(2).sub(2).mul(fp).scaleEvery('tier',true).mul(fp2).add(1).floor();

    fp = E(1)
    let pow = 2
    if (hasElement(44)) pow = 1.75
    if (player.ranks.hex.gte(44)) pow = 1.74
    if (hasElement(9)) fp = fp.mul(1/0.85)
    if (player.ranks.pent.gte(1)) fp = fp.mul(1/0.85)
    if (hasElement(72)) fp = fp.mul(1/0.85)
    if (player.ranks.hex.gte(9)) fp = fp.mul(1/0.85)
    if (player.ranks.hex.gte(72)) fp = fp.mul(1/0.85)
    if (player.ranks.hex.gte(72) && (player.qu.rip.active || player.ranks.hex.gte(100))) fp = fp.mul(1/0.85)
    tmp.ranks.tetr.req = player.ranks.tetr.div(fp2).scaleEvery('tetr').div(fp).pow(pow).mul(3).add(10).floor()
    tmp.ranks.tetr.bulk = player.ranks.tier.sub(10).div(3).max(0).root(pow).mul(fp).scaleEvery('tetr',true).mul(fp2).add(1).floor();

    fp = E(1)
    pow = 1.5
    tmp.ranks.pent.req = player.ranks.pent.scaleEvery('pent').div(fp).pow(pow).add(15).floor()
    tmp.ranks.pent.bulk = player.ranks.tetr.sub(15).gte(0)?player.ranks.tetr.sub(15).max(0).root(pow).mul(fp).scaleEvery('pent',true).add(1).floor():E(0);

    fp = E(1)
    pow = 1.5
    tmp.ranks.hex.req = player.ranks.hex.scaleEvery('hex').div(fp).pow(pow).add(25).floor()
    tmp.ranks.hex.bulk = player.ranks.pent.sub(25).gte(0)?player.ranks.pent.sub(25).max(0).root(pow).mul(fp).scaleEvery('hex',true).add(1).floor():E(0);

    fp = E(0.1)
	if (hasElement(150)) fp = fp.mul(1.6)
    pow = 1.5
    tmp.ranks.hept.req = player.ranks.hept.scaleEvery('hept').div(fp).pow(pow).add(200).floor()
    tmp.ranks.hept.bulk = player.ranks.hex.sub(200).gte(0)?player.ranks.hex.sub(200).max(0).root(pow).mul(fp).scaleEvery('hept',true).add(1).floor():E(0);

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
	
	if(hasPrestige(2,1)){
		player.prestiges[0] = player.prestiges[0].max(PRESTIGES.bulk(0));
	}
}

function updateRanksHTML() {
    tmp.el.rank_tabs.setDisplay(hasUpgrade('br',9))
    for (let x = 0; x < 2; x++) {
        tmp.el["rank_tab"+x].setDisplay(tmp.rank_tab == x)
    }

    if (tmp.rank_tab == 0) {
        for (let x = 0; x < RANKS.names.length; x++) {
            let rn = RANKS.names[x]
            let unl = RANKS.unl[rn]?RANKS.unl[rn]():true
            tmp.el["ranks_div_"+x].setDisplay(unl)
            if (unl) {
                let keys = Object.keys(RANKS.desc[rn])
                let desc = ""
                for (let i = 0; i < keys.length; i++) {
                    if (player.ranks[rn].lt(keys[i])) {
                        desc = `在${RANKS.fullNames[x]}${format(keys[i],0)}，将${RANKS.desc[rn][keys[i]]}`
                        break
                    }
                }
    
                tmp.el["ranks_scale_"+x].setTxt(getScalingName(rn))
                tmp.el["ranks_amt_"+x].setTxt(format(player.ranks[rn],0))
                tmp.el["ranks_"+x].setClasses({btn: true, reset: true, locked: !tmp.ranks[rn].can})
                tmp.el["ranks_desc_"+x].setTxt(desc)
                tmp.el["ranks_req_"+x].setTxt(x==0?formatMass(tmp.ranks[rn].req):RANKS.fullNames[x-1]+" "+format(tmp.ranks[rn].req,0))
                tmp.el["ranks_auto_"+x].setDisplay(RANKS.autoUnl[rn]())
                tmp.el["ranks_auto_"+x].setTxt(player.auto_ranks[rn]?"ON":"OFF")
            }
        }
    }
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
                        desc = `在${PRESTIGES.fullNames[x]}${format(keys[i],0)}，将${PRESTIGES.rewards[x][keys[i]]}`
                        break
                    }
                }

                tmp.el["pres_scale_"+x].setTxt(getScalingName("prestige"+x))
                tmp.el["pres_amt_"+x].setTxt(format(p,0))
                tmp.el["pres_"+x].setClasses({btn: true, reset: true, locked: x==0?tmp.prestiges.base.lt(tmp.prestiges.req[x]):player.prestiges[x-1].lt(tmp.prestiges.req[x])})
                tmp.el["pres_desc_"+x].setTxt(desc)
                tmp.el["pres_req_"+x].setTxt(x==0?format(tmp.prestiges.req[x],0)+"转生基础值":PRESTIGES.fullNames[x-1]+" "+format(tmp.prestiges.req[x],0))
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
    }
}

function prestigeMassGain(){
	if(player.prestiges[1].lt(10)){
		return E(0);
	}
	let x= Decimal.log10(tmp.prestiges.base.add(10)).mul(player.prestiges[0]).mul(player.prestiges[1].pow(2)).mul(player.prestiges[2].add(1)).pow(player.prestiges[1].div(10))
	if (hasPrestige(2,1)) x = x.pow(player.prestiges[2].div(10).add(1));
	x = x.div(400000);
	if (hasPrestige(0,60)) x = x.mul(prestigeEff(0,60,[E(1),E(1)])[1]);
	if (hasPrestige(0,64)) x = x.mul(player.prestiges[0].sqrt().pow(player.prestiges[1].div(10)).pow(player.prestiges[2].div(10).add(1)));
	if (hasPrestige(0,103)) x = x.mul(player.prestiges[0].pow(0.25).pow(player.prestiges[1].div(10)).pow(player.prestiges[2].div(10).add(1)));
	if (hasPrestige(1,11)) x = x.mul(prestigeEff(1,11,[E(1),E(1)])[1]);
	if (hasPrestige(0,74)) x = x.mul(player.prestiges[1].pow(player.prestiges[1].div(10)).pow(player.prestiges[2].div(10).add(1)));
    if (hasPrestige(0,88)) x = x.mul(prestigeEff(0,88,[E(1),E(1)])[1]);
    if (hasPrestige(0,89)) x = x.mul(prestigeEff(0,89,[E(1),E(1)])[1]);
    if (hasPrestige(0,98)) x = x.mul(prestigeEff(0,98,[E(1),E(1)])[1]);
	if (hasPrestige(0,106)) x = x.mul(player.prestiges[0].pow(0.1).pow(player.prestiges[1].div(10)).pow(player.prestiges[2].div(10).add(1)));
    if (player.md.break.upgs[11].gte(1)) x = x.mul(tmp.bd.upgs[11].eff||1)
    if (hasTree("pm1")) x = x.mul(tmp.supernova.tree_eff.pm1)
    if (hasTree("pm2")) x = x.mul(tmp.supernova.tree_eff.pm2)
    if (hasTree("qc7")) x = x.mul(tmp.supernova.tree_eff.qc7)
    if (hasPrestige(0,110)) x = x.mul(prestigeEff(0,110));
    if (hasPrestige(0,111)) x = x.mul(prestigeEff(0,111));
    if (hasUpgrade('inf',5)) x = x.mul(upgEffect(5,5))
	if (hasPrestige(1,31)) x = x.mul(player.prestiges[0].pow(0.15).pow(player.prestiges[1].div(10)).pow(player.prestiges[2].div(10).add(1)));
	if (hasElement(145)) x = x.mul(10);
	return x;
}

function prestigeMassEffect(){
	let p = player.prestigeMass.add(1).log10();
	if(p.gte(104))p = p.softcap(104,0.5,0);
	if(hasTree("qu12"))return E(0.98).pow(p.pow(0.725));
	return E(0.965).pow(p.sqrt());
}

function calcPrestigeMass(dt){
	player.prestigeMass = player.prestigeMass.add(tmp.prestigeMassGain.mul(dt))
}
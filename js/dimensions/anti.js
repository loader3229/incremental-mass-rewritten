const ANTI_MAIN = {
    massGain() {
        let x = E(0.1)
        if (hasAntiUpgrade("am",1)) x = x.mul(antiUpgEffect(1,1))
        if (hasAntiUpgrade("am",4)) x = x.mul(antiUpgEffect(1,4))
        return x
    },
}

function setupAntiHTML() {

    let main_upgs_table = new Element("anti_main_upgs_table")
	table = ""
	for (let x = 1; x <= ANTI_UPGS.main.cols; x++) {
		let id = ANTI_UPGS.main.ids[x]
		table += `<div id="anti_main_upg_${x}_div" style="width: 230px; margin: 0px 10px;"><b>${ANTI_UPGS.main[x].title}</b><br><br><div style="font-size: 13px; min-height: 50px" id="anti_main_upg_${x}_res"></div><br><div class="table_center" style="justify-content: start;">`
		for (let y = 1; y <= ANTI_UPGS.main[x].lens; y++) {
			let key = ANTI_UPGS.main[x][y]
            let img = id=="am"?`images/upgrades/main_upg_am1.png`:`images/upgrades/main_upg_${id+y}.png`
			table += `<img onclick="ANTI_UPGS.main[${x}].buy(${y})" onmouseover="ANTI_UPGS.main.over(${x},${y})" onmouseleave="ANTI_UPGS.main.reset()"
			 style="margin: 3px;" class="img_btn" id="anti_main_upg_${x}_${y}" src="${img}">`
		}
		table += `</div></div>` //<br><button id="anti_main_upg_${x}_auto" class="btn" style="width: 80px;" onclick="player.auto_mainUpg.${id} = !player.auto_mainUpg.${id}">OFF</button>
	}
	main_upgs_table.setHTML(table)

    setupInfusionHTML()
}

function updateAntiHTML() {
    let antiPlr = player.anti
    let at = tmp.anti

    let unl = true
    tmp.el.anti_mass_div.setDisplay(unl)
    if (unl) tmp.el.antiMassAmt.setHTML(formatMass(antiPlr.mass)+"<br>"+formatGain(antiPlr.mass, at.massGain, true))

    if (tmp.tab == 8) {
        if (tmp.stab[8] == 0) {
            updateInfusionHTML()
        }
        else if (tmp.stab[8] == 2) {
            if (antiPlr.main_upg_msg[0] != 0) {
                let upg1 = ANTI_UPGS.main[antiPlr.main_upg_msg[0]]
                let upg2 = ANTI_UPGS.main[antiPlr.main_upg_msg[0]][antiPlr.main_upg_msg[1]]
                let msg = "<span class='cyan'>"+(typeof upg2.desc == "function" ? upg2.desc() : upg2.desc)+"</span><br><span>Cost: "+(upg1.mass?formatMass(upg2.cost):format(upg2.cost,0))+" "+upg1.res+"</span>"
                if (upg2.effDesc !== undefined) msg += "<br><span class='green'>Currently: "+at.upgs.main[antiPlr.main_upg_msg[0]][antiPlr.main_upg_msg[1]].effDesc+"</span>"
                tmp.el.anti_main_upg_msg.setHTML(msg)
            } else tmp.el.anti_main_upg_msg.setTxt("")
            for (let x = 1; x <= ANTI_UPGS.main.cols; x++) {
                let id = ANTI_UPGS.main.ids[x]
                let upg = ANTI_UPGS.main[x]
                let unl = upg.unl()
                tmp.el["anti_main_upg_"+x+"_div"].changeStyle("visibility", unl?"visible":"hidden")
                tmp.el["anti_main_upg_"+x+"_res"].setTxt(`You have ${upg.mass?formatMass(upg.getRes()):upg.getRes().format(0)} ${upg.res}`)
                if (unl) {
                    for (let y = 1; y <= upg.lens; y++) {
                        let unl2 = upg[y].unl ? upg[y].unl() : true
                        tmp.el["anti_main_upg_"+x+"_"+y].changeStyle("visibility", unl2?"visible":"hidden")
                        if (unl2) tmp.el["anti_main_upg_"+x+"_"+y].setClasses({img_btn: true, locked: !upg.can(y), bought: antiPlr.mainUpg[id].includes(y)})
                    }
                    //tmp.el["main_upg_"+x+"_auto"].setDisplay(upg.auto_unl ? upg.auto_unl() : false)
                    //tmp.el["main_upg_"+x+"_auto"].setTxt(antiPlr.auto_mainUpg[id]?"ON":"OFF")
                }
            }
        }
    }
}

function getAntiSave() {
    let s = {
        mass: E(0),
        mainUpg: {},
        main_upg_msg: [0,0],
        infusions: [],
    }
    for (let x = 1; x <= ANTI_UPGS.main.cols; x++) {
        //s.auto_mainUpg[UPGS.main.ids[x]] = false
        s.mainUpg[ANTI_UPGS.main.ids[x]] = []
    }
    for (let x = 0; x < INFUSIONS_LEN; x++) s.infusions[x] = 0
    return s
}

function updateAntiTemp() {
    ANTI_UPGS.main.temp()
    updateInfusionTemp()

    let at = tmp.anti

    at.massGain = ANTI_MAIN.massGain()
}

function calcAnti(dt, dt_offline) {
    let antiPlr = player.anti
    let at = tmp.anti

    antiPlr.mass = antiPlr.mass.add(at.massGain.mul(dt))
}
var ss = ["",""]
const ssf = [
    x=>{
        ss[0] += x.toLowerCase()
        if (!"secretinvasion".includes(ss[0]) && !"shark".includes(ss[0]) && !"bangdream".includes(ss[0]) && !"hikari".includes(ss[0])) {
            ss[0] = ""
        } else if (ss[0] == "secretinvasion") {
            ss[0] = ""
            addPopup({
                html: `
                    "Secret Invasion"?<br><br>好的，神秘代码是${ss[1]}<br><br>
                    <b>将代码以存档的形式导入以开始。代码在下一个小时过期！</b>
                `,
                width: 400,
                height: 150,
                otherStyle: {
                    'font-size': "14px",
                },
            })
        } else if (ss[0] == "shark") {
            ss[0] = ""
            addNotify(`Shark!!1!`)
        } else if (ss[0] == "bangdream") {
            ss[0] = ""
            addPopup({
                html: `
                    你在元素周期表上输入了“BanGDream”。
					<br>
					我是一位BanG Dream!少女乐团派对的玩家。
					<br>
					我最喜欢的BanG Dream!乐队是Poppin'Party.
					<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;---loader3229
					<br>
					<a href="https://space.bilibili.com/111116729" target="_blank" style="color:yellow;">我的Bilibili用户空间</a>
					<br>
					<a href="https://game.bilibili.com/bangdream" target="_blank" style="color:yellow;">BanG Dream!国服官网</a>
					<br>
					<a href="https://qq1010903229.github.io/bandoricharts" target="_blank" style="color:yellow;">我的BanG Dream!自制谱列表</a>
					<br>
					<a href="https://bestdori.com/" target="_blank" style="color:yellow;">Bestdori!</a>
					<br>
					<span style="font-size:100%;color:#666666;">答案2是"KiraKiraDokiDoki"</span>
					<br>
					<img src="/incremental-mass-rewritten/images/kasumi.png">
                `,
                width: 500,
                height: 400,
                otherStyle: {
                    'font-size': "14px",
                },
            })
        } else if (ss[0] == "hikari") {
            ss[0] = ""
            addNotify(`光！<br><img style="width: 300px;" src="/incremental-mass-rewritten/images/hikari.png">`)
        }
    },
    _=>{
        let t = Math.floor(date/3600000)
        ss[1] = Math.floor(t**(2*(Math.sin(t**3/Math.PI)+1))).toString(36)
    },
    x=>{
        if (x == ss[1]) {
            localStorage.setItem("imr_secret",ss[1])
            window.open("./hidden.html","_self")
            return true
        }
        return false
    },
]
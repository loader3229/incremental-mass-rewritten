var ss = ["",""]
const ssf = [
    x=>{
        ss[0] += x.toLowerCase()
        if (!"shark".includes(ss[0]) && !"bandori".includes(ss[0])) {
            ss[0] = ""
        } else if (ss[0] == "shark") {
            ss[0] = ""
            addNotify(`Shark!!1!<br><img style="width: 100%; height: 100%;" src="https://i.guim.co.uk/img/media/67451b4b5c64652f11eca069b85013f8b31a4244/1549_893_5174_3105/master/5174.jpg?width=465&quality=45&auto=format&fit=max&dpr=2&s=df139353776471381634b995733c9ebc">`)
        } else if (ss[0] == "bando" || ss[0] == "bandor" || ss[0] == "bandori") {
            ss[0] = ""
            addPopup({
                html: `
                    我猜，你是想在元素周期表上输入“Bandori”。
					<br>
					我是一位BanG Dream!少女乐团派对的玩家。
					<br>
					我最喜欢的BanG Dream!乐队是Poppin'Party.
					<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;---loader3229
					<br>
					<a href="https://space.bilibli.com/111116729" target="_blank">我的Bilibili用户空间</a>
					<br>
					<a href="https://game.bilibli.com/bangdream" target="_blank">BanG Dream!国服官网</a>
					<br>
					<a href="https://qq1010903229.github.io/bandoricharts" target="_blank">我的BanG Dream!自制谱列表</a>
					<br>
					<a href="https://bestdori.com/" target="_blank">Bestdori!</a>
                `,
                width: 500,
                height: 200,
                otherStyle: {
                    'font-size': "14px",
                },
            })
        }
    },
    _=>{
        let t = Math.floor(date/3600000)
        ss[1] = Math.floor(t**(2*(Math.sin(t**3/Math.PI)+1))).toString(36)
    },
    x=>{
        if (x == ss[1]) {
            localStorage.setItem("imr_secret",ss[1])
            window.open("https://qq1010903229.github.io/incremental-mass-rewritten/hidden.html","_self")
            return true
        }
        return false
    },
]
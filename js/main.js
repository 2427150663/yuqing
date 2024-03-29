(function (doc, win) {
    var docEl = doc.documentElement, //html
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize', //浜嬩欢鍚嶇О
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 750) {
                docEl.style.fontSize = '100px';
            }
            else {
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    //doc.addEventListener('DOMContentLoaded', recalc, false);
    recalc();
})(document, window);


//jquery $封装
let $ = function (sel) {
    let len = document.querySelectorAll(sel).length;
    if (len > 1) {
        return document.querySelectorAll(sel);
    }
    return document.querySelector(sel);
};
function validation() {
    if (!window.localStorage.getItem("KnUserName")) {
        window.location.href = "activation.html";
        return;
    }
}

function today() {
    let str = "";
    var d = new Date();
    //星期数组
    var xingqi = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    //一周的第几天
    var day = d.getDay();
    var dateMoney = new Date().toLocaleDateString();
    dateMoney = dateMoney.replace(/\//g, ".");
    str = "今天" + " " + dateMoney + " " + xingqi[day];
    return str;
}

//账户激活
class activation {
    constructor() {
        //验证码
        this.verifyCode = $("#activation .section .ipt .userActivaion");
        this.loginBtn = $("#activation .section .login");
    }
    init() {
        if (this.verifyCode) {
            this.inpChange();
            this.bindEvent();
        }
    }
    bindEvent() {
        this.loginBtn.addEventListener("click", this.activationCode.bind(this));
    }
    inpChange() {
        var txts = this.verifyCode.querySelectorAll("input");
        txts.forEach((x, i) => {
            x.oninput = function () {
                if (x.value.trim().length >= 4) {
                    if (i == 2) {
                        $("#userName").focus();
                        return;
                    }
                    txts[i + 1].focus();
                }

            }
        })
    }
    //验证码验证
    activationCode() {
        let ipt = this.verifyCode.querySelectorAll("input");
        let val = "";
        ipt.forEach((x) => {
            val += x.value;
        })
        if (val.length != 12) {
            alert("激活码输入错误!");
            return
        }
        let user = $("#userName").value.trim();
        if (user == "") {
            alert("请输入姓名!");
            return
        }
        window.localStorage.setItem("KnUserName", user);
        window.location.href = "index.html";
    }
}
//每日舆情列表入口
class indexlist {
    constructor() {
        //列表
        this.optList = $("#index");
    }
    init() {
        if (this.optList) {
            validation();
            this.optList.querySelector(".today").innerHTML = today();
            this.bindEvent();
        }
    }
    bindEvent() {
        this.optList.addEventListener("click", this.unfoldList.bind(this));
    }
    //年月列表展开
    unfoldList(e) {
        var ev = e || window.event;
        let target = ev.target || ev.srcElement;
        if (target.getAttribute("data-id")) {
            window.location.href = `article.html?id=${target.getAttribute("data-id")}`
        }
        if (target.querySelector(".right")) {
            target.querySelector(".right").classList.toggle("turn");
            target.parentNode.parentNode.children[1].classList.toggle("hide");
            return;
        }
        if (target.classList.contains("yleft") || target.classList.contains("rightBtn") || target.classList.contains("right")) {
            if (target.nodeName == "SPAN") {
                target.classList.toggle("turn");
                target.parentNode.parentNode.parentNode.parentNode.children[1].classList.toggle("hide");
            } else {
                target.parentNode.querySelector(".right").classList.toggle("turn");
                target.parentNode.parentNode.parentNode.children[1].classList.toggle("hide");
            }
        }
    }
}
//文章分类
class article {
    constructor() {
        this.article = $("#article");
    }
    init() {
        if (this.article) {
            validation();
            this.article.querySelector(".today").innerHTML = today();
        }
    }
}
//文章详情
class details {
    constructor() {
        this.details = $("#details");
    }
    init() {
        if (this.details) {
            validation();
            this.details.querySelector(".today").innerHTML = today();
        }
    }
}
window.onload = function () {
    //账户激活
    new activation().init();
    //每日网络舆情列表
    new indexlist().init();
    //分类
    new article().init();
    //详情
    new details().init();
}
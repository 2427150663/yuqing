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
        window.localStorage.setItem("userName", user);
        window.location.href = "list.html";
    }
}

//每日舆情列表入口
class list {
    constructor() {
        //列表
        this.optList = $("#list");
    }
    init() {
        if (this.optList) {
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
window.onload = function () {
    //账户激活
    new activation().init();
    //每日网络舆情列表
    new list().init();
}
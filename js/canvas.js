(function () {
    var watermarkConWP = window.localStorage.getItem("KnUserName");
    var a = {
        watermarkConWP: watermarkConWP,
        markFontSizeWP: "20px",
        markFontColorWP: "#000",
        verticalMarkWP: "",
        watermark: function (j, n, c, e) {
            var m = this;
            j ? m.watermarkConWP = j : m.watermarkConWP;
            n ? m.markFontSizeWP = n : m.markFontSizeWP;
            c ? m.markFontColorWP = c : m.markFontColorWP;
            e ? m.verticalMarkWP = e : m.verticalMarkWP;
            var h = document.createElement("canvas");
            h.id = "watermark";
            m.watermarkConWP.length > 20 ? h.width = m.watermarkConWP.length * 12.5 : h.width = 150;
            m.watermarkConWP.length > 20 ? h.height = m.watermarkConWP.length * 5.2 : h.height = 100;
            h.style.display = "none";
            var d = document.createElement("canvas");
            d.id = "repeat-watermark";
            var f = document.body.firstElementChild;
            document.body.insertBefore(d, f);
            document.body.insertBefore(h, f);
            var b = document.getElementById("watermark");
            var l = b.getContext("2d");
            l.clearRect(0, 0, b.width, b.height);
            l.font = m.markFontSizeWP + " ����";
            l.fillStyle = m.markFontColorWP;
            l.globalAlpha = 0.1;
            if (m.verticalMarkWP == "y") {
                l.rotate(20 * Math.PI / 180);
                l.fillText(m.watermarkConWP, 30, m.watermarkConWP.length > 20 ? m.watermarkConWP.length / 5 : 10)
            } else {
                if (m.verticalMarkWP == "h") {
                    l.rotate(0 * Math.PI / 180);
                    l.fillText(m.watermarkConWP, 0, m.watermarkConWP.length > 20 ? m.watermarkConWP.length * 5 : 80)
                } else {
                    l.rotate(-20 * Math.PI / 180);
                    l.fillText(m.watermarkConWP, -20, m.watermarkConWP.length > 20 ? m.watermarkConWP.length * 5 : 80)
                }
            }
            var k = document.getElementById("repeat-watermark");
            k.style.pointerEvents = "none";
            k.style.position = "fixed";
            k.style.left = "0";
            k.style.top = "0";
            k.style.height = document.height;
            k.style.opacity = "1";
            k.style.width = "100%";
            k.style.zIndex = "-100";
            var i = k;
            i.width = document.documentElement.scrollWidth;
            i.height = document.documentElement.scrollHeight;
            ctxr = i.getContext("2d");
            ctxr.clearRect(0, 0, i.width, i.height);
            var g = ctxr.createPattern(i, "repeat");
            ctxr.fillStyle = g;
            ctxr.fillRect(0, 0, i.width, i.height);
            i.style.backgroundImage = 'url("' + l.canvas.toDataURL() + '")'
        }
    };
    a.watermark()
})();
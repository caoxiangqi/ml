
var main = document.querySelector("#main");
var oLis = document.querySelectorAll("#list>li");
var winW = document.documentElement.clientWidth;

var winH = document.documentElement.clientHeight;

var desW = 640;

var desH = 960;

if (winW / winH < desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}
[].forEach.call(oLis, function () {
    var oLi = arguments[0];
    oLi.index = arguments[1];
    oLi.addEventListener("touchstart", start, false);
    oLi.addEventListener("touchmove", move, false);
    oLi.addEventListener("touchend", end, false);
})

function start(e) {
    this.touchStart = e.changedTouches[0].pageY;
}

function move(e) {
    e.preventDefault();
    this.flag = true;
    var touchMove = e.changedTouches[0].pageY;
    var pos = touchMove - this.touchStart;
    var index = this.index;
    [].forEach.call(oLis, function () {
        arguments[0].className = "";
        if (arguments[1] != index) {
            arguments[0].style.display = "none"
        }
        arguments[0].firstElementChild.id = "";
    })
    if (pos > 0) {
        this.prevsIndex = (index == 0 ? oLis.length - 1 : index - 1);
        var duration = -winH + pos;  

    } else if (pos < 0) {
        this.prevsIndex = (index == oLis.length - 1 ? 0 : index + 1);
        var duration = winH + pos;
    }

    oLis[index].style.webkitTransform = "scale(" + (1 - Math.abs(pos) / winH * 1 / 2) + ") translate(0," + pos + "px)";
    oLis[this.prevsIndex].style.webkitTransform = "translate(0," + duration + "px)";
    oLis[this.prevsIndex].style.display = "block";
    oLis[this.prevsIndex].className = "zIndex";
}
function end(e) {
    if (this.flag) {
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevsIndex].style.webkitTransition = "0.5s";
        oLis[this.prevsIndex].addEventListener("webkitTransitionEnd", function () {
            this.style.webkitTransition = "";
            this.firstElementChild.id = "a" + (this.index + 1)
        }, false)
    }
}


document.addEventListener("touchmove", function (e) {
    console.log(e.target.id);
}, false)
/*
window.setTimeout(function(){
    oLis[0].firstElementChild.id = "a1";
},1000)
*/
//音乐播放
var musicBtn = document.getElementById("playbox");
var musicAudio = document.getElementById("audio");
window.setTimeout(function(){
	musicAudio.play();
	musicBtn.className = "btn_music on";
	musicAudio.addEventListener("canplay",function(){
		musicBtn.className = "btn_music on";
	},false);
	musicBtn.addEventListener("touchend",function(){
		if(musicAudio.paused){
			musicAudio.play();
			musicBtn.className = "btn_music on";
			return;
		}
		musicAudio.pause();
		musicBtn.className = "btn_music";
	},false);
},1000)














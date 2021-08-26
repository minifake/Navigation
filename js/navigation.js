//标志初始化
var requestingBgFlag = 0;


// <!-- 一句真言加打字输出 -->

var text = "获取中....";
var pos = 0;
const hitokoto = document.getElementById('hitokoto')
reqHitokoto();

function reqHitokoto() {
	fetch('https://v1.hitokoto.cn')
		.then(response => response.json())
		.then(data => {
			text = data.hitokoto
		})
		.catch(console.error)
}

function reqDuJiTang() {
	fetch('https://api.btstu.cn/yan/api.php')
		.then(response => response.text())
		.then(data => {
			text = data
		})
		.catch(console.error)
}


function typetext() {
	var len = text.length;
	hitokoto.innerText = text.substring(0, pos) + " |";
	if (pos++ == len) {
		hitokoto.innerText = text;
		pos = 0;
	} else {
		setTimeout("typetext()", 120);
	}
}

function reqAndType(e) {
	if (pos == 0) {
		//随机选一个来源
		if(Math.round(Math.random()) == 0){
			reqHitokoto();
		}else{
			reqDuJiTang();
		}
		pos = 0;
		typetext();
	}
	e.stopPropagation(); //阻止事件冒泡
}




// <!-- header图标动画 -->
$('.header-img-huanyihuan').click(function() {
	$('.header-img-huanyihuan').css('animation', 'btnRotate 0.5s 0s ease-in-out forwards');
	setTimeout(function() {
		iconAnimateReset('header-img-huanyihuan');
	}, 599);
});
$('.header-img-pic').click(function() {
	iconShakeGoOn('header-img-pic');

});
$('.header-img-fengche').click(function() {
	$('.header-img-fengche').css('animation', 'btnRotate 0.5s 0s ease-in-out reverse');
	setTimeout(function() {
		iconAnimateReset('header-img-fengche');
	}, 599);
});

function iconShakeOnce(_iconName) {
	$('.' + _iconName).css('animation', 'btnShake 0.5s 0s ease-in-out forwards');
	setTimeout(function() {
		iconAnimateReset(_iconName)
	}, 599);
}

function iconAnimateReset(_iconName) {
	$('.' + _iconName).css('animation', 'None');
}

function iconShakeGoOn(_iconName) {
	$('.' + _iconName).css('animation', 'btnShake 0.5s 0s ease-in-out forwards');
	setTimeout(function() {
		iconShakeOrStop(_iconName)
	}, 599);
}

function iconShakeOrStop(_iconName) {
	iconAnimateReset(_iconName);
	if (requestingBgFlag == 1) {
		setTimeout(function() {
			iconShakeGoOn(_iconName)
		}, 20);
	}
}

// <!-- 更换动态壁纸 -->

//初始化壁纸
var staticOrAnimate = localStorage.getItem("staticOrAnimate");
if (staticOrAnimate == null) {
	staticOrAnimate = 1; //默认动态
}
//动态变量初始化
var animateArray = new Array("blackBubbles.htm", "blackLines.html", "blueWines.htm", "butterflies.htm",
	"coldRainyCity.htm", "colorChanging.htm", "colorfulLinesMouse.htm", "colorfulNumRain.html", "colorWines.html",
	"expanding.html", "fog.html", "fireworks.htm", "greenBubbles.htm", "GreenGrassRainy.html", "litleFireworks.htm",
	"numRain.html", "petals.htm", "pinkBubble.htm", "pinkBubbles.htm", "pinkColor.htm", "redOil.html",
	"shinyBubbles.htm", "sidai.htm", "snowNight.htm", "snowNightChrismasTree.htm", "snowWhiteHouse.htm",
	"starryNight.html", "triangs.htm", "wave.htm", "wines.htm", "yellowBubbles.htm");
var n = localStorage.getItem("animatedIndex"); //根据name取值 
if (n == null) {
	n = 20;
}
//静态变量初始化
var staticBgUrl = localStorage.getItem("staticBgUrl");
if ((staticBgUrl == null) && (staticOrAnimate == 0)) {
	reqStaticBgUrl_s(); //包含了onresizedfun()
} else {
	onresizedfun();
}


function onresizedfun() {
	if (staticOrAnimate == 1) {
		//动态处理
		document.getElementById("bg-iframe").src = "./files/" + animateArray[n];
	} else {
		//静态处理
		document.getElementById("bg-iframe").src = staticBgUrl;
	}
	document.getElementById("bg-iframe").style.display = "Block";
}

//更换动态壁纸 
function turnBg(e) {
	if (staticOrAnimate == 1) {
		n++;
		if (n == (animateArray.length)) n = 0;
		localStorage.setItem("animatedIndex", n); //存值  键name  值 value
	}
	staticOrAnimate = 1;
	localStorage.setItem("staticOrAnimate", staticOrAnimate);
	onresizedfun();
	e.stopPropagation(); //阻止事件冒泡
}


var staticUrlsArray = new Array(
	'https://source.unsplash.com/random/1920x1080',
	'https://source.unsplash.com/collection/827743/1920x1080',     //landscape
	'https://source.unsplash.com/collection/3672442/1920x1080',    //the-sea
	'https://source.unsplash.com/collection/3694365/1920x1080',    //gradient-nation
	'https://source.unsplash.com/collection/4435020/1920x1080',    //desktop
	// 'https://api.btstu.cn/sjbz/?lx=dongman',                        //动漫  被防盗了
);
var s_i = 0;

//更换静态壁纸
function reqStaticBgUrl_s() {
	requestingBgFlag = 1;
	var _url = staticUrlsArray[(s_i++)%(staticUrlsArray.length)]
	fetch(_url)
		.then((res) => {
			localStorage.setItem("staticBgUrl", res.url);
			staticBgUrl = res.url;
			turnStaticBg();
			requestingBgFlag = 0;
		})
		.catch(console.error)
}

function turnStaticBg() {
	staticOrAnimate = 0;
	localStorage.setItem("staticOrAnimate", staticOrAnimate);
	onresizedfun();
}

function turnStaticBg_s(e) {
	if (staticOrAnimate == 0) {
		reqStaticBgUrl_s();
	} else {
		staticOrAnimate = 0;
		localStorage.setItem("staticOrAnimate", staticOrAnimate);
		if (staticBgUrl == null) {
			reqStaticBgUrl_s();
		} else {
			onresizedfun();
		}
	}
	e.stopPropagation(); //阻止事件冒泡

}

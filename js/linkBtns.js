// jQuery (ZUI中的Javascript组件依赖于jQuery) 
// <script src = "http://code.jquery.com/jquery-1.11.0.min.js" > < /script>
var wanOrLan = localStorage.getItem("wanOrLan");
if(wanOrLan == null) wanOrLan = 0;
if(wanOrLan == 1) $('.header-img-Lan').css('display', 'inline');
var in_IP = 'http://' + '192.168.31.62' + ':';
// 搜索引擎列表，自动换行
var mylinks = {
	data: [
		{
			name: 'Nextcloud',
			src: 'icon-nextcloud',
			url: 'https://szhl.minifake.xyz:32515',
			url_in: in_IP + '8086',
		}, {
			name: '宝塔面板',
			src: 'icon-mianban',
			url: 'https://szhl.minifake.xyz:31448',
			url_in: in_IP + '8888',
		}, {
			name: 'Portainer',
			src: 'icon-docker',
			url: 'http://192.168.31.62:9000',  //暂无
			url_in: in_IP + '9000',
		}, {
			name: 'Photo',
			src: 'icon-Photo',
			url: 'http://192.168.31.62:8086',  
			url_in: in_IP + '8086',
		}, {
			name: '百度网盘',
			src: 'icon-baiduwangpan',
			url: 'http://192.168.31.62:5299',
			url_in: in_IP + '5299',
		}, {
			name: '笔记',
			src: 'icon-biji',
			url: 'http://192.168.31.62:8086',
			url_in: in_IP + '8086',
		}, {
			name: '博客',
			src: 'icon-boke',
			url: 'http://192.168.31.62:8086',
			url_in: in_IP + '8086',
		}, {
			name: 'PLEX',
			src: 'icon-plex',
			url: 'https://hao.5iux.cn/',
			url_in: in_IP + '8086',
		}, {
			name: '导航',
			src: 'icon-feiji1',
			url: 'https://hao.5iux.cn/',
			url_in: in_IP + '8086',
		}, {
			name: '导航',
			src: 'icon-daohanglansheji',
			url: 'https://hao.5iux.cn/',
			url_in: in_IP + '8086',
		}
	]
}


for (var i = 0; i < mylinks.data.length; i++) {
	var addList = '<li>' + '<svg class="linkBtn-item-img" aria-hidden="true"><use xlink:href="#' +
		mylinks.data[i].src + '"></use></svg>' + mylinks.data[i].name + '</li>'
	$('.linkBtns-list').append(addList);
}

$('.linkBtns-list li').click(function() {
	var _index = $(this).index();
	if(wanOrLan == 0){
		window.open(mylinks.data[_index].url);
	}else{
		window.open(mylinks.data[_index].url_in);
	}
	
})

var count = 0;
function switchWanOrLanPre(e){
	count++;
	if(count >= 3) {
		switchWanOrLan(e);
		count = 0;
	}else if(count >= 1){
		setTimeout(function(){count = 0},600);
	}
	e.stopPropagation(); 
}

function switchWanOrLan(e){
	if(wanOrLan == 0){
		wanOrLan = 1;
		$('.header-img-Lan').css('display', 'inline')
	}else{
		wanOrLan = 0;
		$('.header-img-Lan').css('display', 'none')
	}
	localStorage.setItem("wanOrLan",wanOrLan);
	e.stopPropagation(); 
}

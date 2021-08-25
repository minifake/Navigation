// jQuery (ZUI中的Javascript组件依赖于jQuery) 
// <script src = "http://code.jquery.com/jquery-1.11.0.min.js" > < /script>

// 搜索引擎列表，自动换行
var mylinks = {
	data: [
		{
			name: 'Nextcloud',
			src: 'icon-nextcloud',
			url: 'http://192.168.31.62:8086'
		}, {
			name: '宝塔面板',
			src: 'icon-mianban',
			url: 'http://192.168.31.62:8888/btpanel'
		}, {
			name: 'Portainer',
			src: 'icon-docker',
			url: 'http://192.168.31.62:9000'
		}, {
			name: 'Photo',
			src: 'icon-Photo',
			url: 'http://192.168.31.62:8086'
		}, {
			name: '百度网盘',
			src: 'icon-baiduwangpan',
			url: 'http://192.168.31.62:5299'
		}, {
			name: '笔记',
			src: 'icon-biji',
			url: 'http://192.168.31.62:8086'
		}, {
			name: '博客',
			src: 'icon-boke',
			url: 'http://192.168.31.62:8086'
		}, {
			name: '导航',
			src: 'icon-daohanglansheji',
			url: 'https://hao.5iux.cn/'
		}, {
			name: '导航',
			src: 'icon-feiji1',
			url: 'https://hao.5iux.cn/'
		}, {
			name: '导航',
			src: 'icon-daohang',
			url: 'https://hao.5iux.cn/'
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
	window.open(mylinks.data[_index].url);
})

// jQuery (ZUI中的Javascript组件依赖于jQuery) 
// <script src = "https://code.jquery.com/jquery-1.11.0.min.js" > < /script>

// 搜索引擎列表，自动换行
var search = {
	data: [
		{
			name: '谷歌',
			src: 'icon-guge',
			url: 'https://www.google.com/search?q='
		}, {
			name: '百度',
			src: 'icon-baidu',
			url: 'https://www.baidu.com/s?wd='
		}, {
			name: 'GitHub',
			src: 'icon-GitHub',
			url: 'https://github.com/search?q='
		}, {
			name: 'Bilibili',
			src: 'icon-bilibili',
			url: 'https://search.bilibili.com/all?keyword='
		}, {
			name: '豆瓣',
			src: 'icon-douban',
			url: 'https://www.douban.com/search?source=suggest&q='
		}, {
			name: '知乎',
			src: 'icon-zhihu',
			url: 'https://www.zhihu.com/search?type=content&q='
		}, {
			name: '微博',
			src: 'icon-weibo',
			url: 'https://s.weibo.com/weibo/'
		},  {
			name: '优酷',
			src: 'icon-youku',
			url: 'https://so.youku.com/search_video/q_'
		}, {
			name: '淘宝',
			src: 'icon-taobao',
			url: 'https://s.taobao.com/search?q='
		}, {
			name: '京东',
			src: 'icon-jingdong',
			url: 'https://search.jd.com/Search?keyword='
		}, {
			name: '天猫',
			src: 'icon-tmall',
			url: 'https://list.tmall.com/search_product.htm?q='
		}, {
			name: '必应',
			src: 'icon-biying',
			url: 'https://cn.bing.com/search?q='
		}, {
			name: '好搜',
			src: 'icon-haosou',
			url: 'https://www.so.com/s?q='
		}, {
			name: '搜狗',
			src: 'icon-sougou',
			url: 'https://www.sogou.com/web?query='
		}, {
			name: '1688',
			src: 'icon-ali1688',
			url: 'https://s.1688.com/selloffer/offer_search.htm?keywords='
		}, {
			name: '小众搜索',
			src: 'icon-mengsou',
			url: 'https://www.caup.cn/search?q='
		}, 
	]
}

// 默认搜索引擎的内容，如果界面修改了需要同步修改
var thisSearchIndex = localStorage.getItem("thisSearchIndex"); //根据name取值

var thisSearch = "https://www.baidu.com/s?wd=";

for (var i = 0; i < search.data.length; i++) {
	var addList = '<li>' + '<svg class="search-engine-item-img" aria-hidden="true"><use xlink:href="#' +
		search.data[i].src + '"></use></svg>' + search.data[i].name + '</li>'
	$('.search-engine-list').append(addList);
}

if ((thisSearchIndex == null) || (thisSearchIndex >= search.data.length) || (thisSearchIndex < 0)) {
	thisSearchIndex = 1;
}

switchEngine(thisSearchIndex);

$('.search-engine-img, .search-engine').hover(function() {
	$('.search-engine').css('display', 'block')
}, function() {
	$('.search-engine').css('display', 'none')
});
$('.search-engine-list li').click(function() {
	var _index = $(this).index();
	switchEngine(_index);
});

$('#txt').keydown(function(ev) {
	// 回车键的处理
	if (ev.keyCode == 13) {
		window.open(thisSearch + $('#txt').val())
		// $('#txt').val('');
		$('#box ul').html('')
	}
})

function switchEngine(_index) {
	var searchNameBtn = document.getElementById("search-engine-img-use");
	searchNameBtn.attributes[0].value = "#" + search.data[_index].src;
	thisSearch = search.data[_index].url;
	localStorage.setItem("thisSearchIndex", _index);
	$('.search-engine').css('display', 'none')
}

$("#search-btn").click(function() {
	var textValue = $('#txt').val();
	if (textValue != '') {
		window.open(thisSearch + textValue)
	}
});

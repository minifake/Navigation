// jQuery (ZUI中的Javascript组件依赖于jQuery) 
// <script src = "https://code.jquery.com/jquery-1.11.0.min.js" > < /script>

// 搜索引擎列表，自动换行
var search = {
	data: [
		{
			name: '谷歌',
			src: 'icon-guge',
			url: 'https://www.google.com/search?q=',
			sugg: 'None'
		}, {
			name: '百度',
			src: 'icon-baidu',
			url: 'https://www.baidu.com/s?wd=',
			sugg: 'https://suggestion.baidu.com/su?p=3&ie=UTF-8&cb=&wd='
		}, {
			name: 'GitHub',
			src: 'icon-GitHub',
			url: 'https://github.com/search?q=',
			sugg: 'None'
		}, {
			name: 'Bilibili',
			src: 'icon-bilibili',
			url: 'https://search.bilibili.com/all?keyword=',
			sugg: 'None'
		}, {
			name: '豆瓣',
			src: 'icon-douban',
			url: 'https://www.douban.com/search?source=suggest&q=',
			sugg: 'None'
		}, {
			name: '知乎',
			src: 'icon-zhihu',
			url: 'https://www.zhihu.com/search?type=content&q=',
			sugg: 'None'
		}, {
			name: '微博',
			src: 'icon-weibo',
			url: 'https://s.weibo.com/weibo/',
			sugg: 'None'
		},  {
			name: '优酷',
			src: 'icon-youku',
			url: 'https://so.youku.com/search_video/q_',
			sugg: 'None'
		}, {
			name: '淘宝',
			src: 'icon-taobao',
			url: 'https://s.taobao.com/search?q=',
			sugg: 'None'
		}, {
			name: '京东',
			src: 'icon-jingdong',
			url: 'https://search.jd.com/Search?keyword=',
			sugg: 'None'
		}, {
			name: '天猫',
			src: 'icon-tmall',
			url: 'https://list.tmall.com/search_product.htm?q=',
			sugg: 'None'
		}, {
			name: '必应',
			src: 'icon-biying',
			url: 'https://cn.bing.com/search?q=',
			sugg: 'None'
		}, {
			name: '好搜',
			src: 'icon-haosou',
			url: 'https://www.so.com/s?q=',
			sugg: 'None'
		}, {
			name: '搜狗',
			src: 'icon-sougou',
			url: 'https://www.sogou.com/web?query=',
			sugg: 'None'
		}, {
			name: '1688',
			src: 'icon-ali1688',
			url: 'https://s.1688.com/selloffer/offer_search.htm?keywords=',
			sugg: 'None'
		}, {
			name: '小众搜',
			src: 'icon-mengsou',
			url: 'https://www.caup.cn/search?q=',
			sugg: 'None'
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

var suggestionIndex = -1;
var originalTxt = '';
$('#txt').keydown(function(ev) {
	// 回车键的处理
	if (ev.keyCode == 13) {
		window.open(thisSearch + $('#txt').val())
		// $('#txt').val('');
		$('#box ul').html('')
	}else if(ev.keyCode == 40){
		//向下箭头处理
		suggestionLiUnhover();
		suggestionIndex++;
		if(suggestionIndex >= suggestions.length){
			suggestionIndex = -1;
			$('#txt').val(originalTxt);
		}else{
			$('#txt').val(suggestions[suggestionIndex]);
			suggestionLiHover();
		}
		//不响应input自带的处理事件
		ev.preventDefault();
	}else if(ev.keyCode == 38){
		// 向上箭头处理
		suggestionLiUnhover();
		suggestionIndex--;
		if(suggestionIndex < -1){
			suggestionIndex = suggestions.length - 1;
		}
		if(suggestionIndex == -1){
			$('#txt').val(originalTxt);
		}else{
			$('#txt').val(suggestions[suggestionIndex]);
			suggestionLiHover();
		}
		//不响应input自带的处理事件
		ev.preventDefault();
	}
})

$('#txt').keyup(function(ev) {
	if((ev.keyCode != 40)&&(ev.keyCode != 38)){
		if($('#txt').val() == ''){
			suggestionHide();
		}else{
			getSuggestion($('#txt').val());
		}
	}
})

$('#txt').blur(function(ev) {
	if($('.search-suggestion').is(":hover") == false){
		suggestionHide();
	}
})

$('#txt').focus(function(ev) {
	if($('#txt').val() != ''){
		getSuggestion($('#txt').val());
	}
})


function switchEngine(_index) {
	var searchNameBtn = document.getElementById("search-engine-img-use");
	searchNameBtn.attributes[0].value = "#" + search.data[_index].src;
	thisSearch = search.data[_index].url;
	thisSearchIndex = _index;
	localStorage.setItem("thisSearchIndex", _index);
	$('.search-engine').css('display', 'none')
}

$("#search-btn").click(function() {
	var textValue = $('#txt').val();
	if (textValue != '') {
		window.open(thisSearch + textValue)
	}
});



var suggestions = [];
function getSuggestion(_text){
	suggestionIndex = -1;
	originalTxt = _text;
	if(search.data[thisSearchIndex].sugg != 'None'){
		
		// fetch(search.data[thisSearchIndex].sugg + _text)
		// 	.then(response => response.obj)
		// 	.then(data => {
		// 		data = data.replace("({q:","{q:").replace("});","};");

		// 	})
		// 	.catch(console.error)
		
		$.ajax({
			url: search.data[thisSearchIndex].sugg + _text,
			dataType: 'jsonp',
			jsonp: 'cb', //回调函数的参数名(键值)key
			success:function(data){
				suggestions = data.s;
				suggestionShow();
			},
			error:function(){
				// do nothing
			}
		})
		
	}
};

function suggestionShow(){
	if(suggestions != '')
	{
		$('.search-suggestion-list').empty();
		for(var i = 0; i < suggestions.length; i++) {
			var addList = '<li>' + suggestions[i] + '</li>'
			$('.search-suggestion-list').append(addList);
		}
		$('.search-suggestion').css('display', 'block');
		$('#txt').css('border-left', '4px solid #0078FF');
		$('#txt').css('border-right', '4px solid #0078FF');
		$('#txt').css('border-top', '4px solid #0078FF');
		$('#txt').css('border-bottom', '3px solid #b0b0b0');
	}
}

function suggestionHide(){
	$('.search-suggestion').css('display', 'None');
	$('#txt').css('border-left', 'None');
	$('#txt').css('border-right', 'None');
	$('#txt').css('border-top', 'None');
	$('#txt').css('border-bottom', 'None');
}

function suggestionLiHover(){
	if(suggestionIndex != -1){
		$(".search-suggestion-list").children("li").eq(suggestionIndex).css("color", "#0078FF");
		$(".search-suggestion-list").children("li").eq(suggestionIndex).css("background-color", "#e7e7e7");
		$(".search-suggestion-list").children("li").eq(suggestionIndex).focus();
	}
}

function suggestionLiUnhover(){
	if(suggestionIndex != -1){
		$(".search-suggestion-list").children("li").eq(suggestionIndex).css("color", "#303030");
		$(".search-suggestion-list").children("li").eq(suggestionIndex).css("background-color", "#ffffff");
		$(".search-suggestion-list").children("li").eq(suggestionIndex).blur();
	}
}

$('.search-suggestion').click(function(ev){
	$('#txt').focus();
})

$('.search-suggestion-list').on("click", "li", function(){
	var text = $(this).text();
	$('#txt').val(text).focus();
})

$('.search-suggestion-list').on("mouseenter", "li", function(){
	suggestionLiUnhover();
	suggestionIndex = -1;
})
// $('#txt')
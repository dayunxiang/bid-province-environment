/**
 * Created by ZhangYE on 2015/11/5.
 */
var commonEffect = function() {
    var homepageSidebar = function(){
		$('.m-sidebar').on('mouseover','.sidebar-subtitle',function(){
            $('.m-sidebar').css('z-index',19);
		});
		$('.m-sidebar').on('mouseleave','.sidebar-subtitle',function(){
            $('.m-sidebar').css('z-index',9);
		});
    }
    /** 通用tab切换 **/
    var tabEffect = function(){
        $('.tab-header>ul>li').click(function(){
            var count = $(this).index();
           $(this).addClass('active').siblings('li').removeClass('active');
            $(this).parent().parent('.tab-header').siblings('.tab-body').children().children('li').hide().eq(count).show();
        });
    }
    /** 首页tab点击型 切换 **/
    var tabClickSwitch = function(){
        $('.floor-tab-click-header>ul>li').click(function(){
            var count = $(this).index();
            $(this).siblings('li').removeClass('active');
            $(this).addClass('active');
            $(this).parents('.floor-header').siblings('.floor-body').find('.floor-tab-content').children('li').hide().eq(count).show();
        });
    }
    /** 首页tab 切换 **/
    var tabSwitch = function(){
        $('.floor-tab-header>ul>li').mouseover(function(){
//			if($(this).parents('.floor-header').parent('li').index()<3){//前三楼有切换效果
				var count = $(this).index();
				$(this).siblings('li').removeClass('active');
				$(this).addClass('active');
				$(this).parents('.floor-tab-header').siblings('.floor-body').find('.floor-tab-content').children('li').hide().eq(count).show();
//			}
        });
    }
    /** 详情页面tab 切换 **/
    var detailTabSwitch = function(){
        $('.detail-tab-title>li').click(function(){
            var count = $(this).index();
            $(this).addClass('active').siblings('li').removeClass('active');
            $(this).parent().siblings('.detail-tab-content').children('li').hide().eq(count).show();
        });
    }

	/** 详情页面城市选择交互 **/
    var citySelect = function(){
        var sPro,sCity,sProCity;
        $('.item-location .form-content>.m-input').mouseover(function(){
            $(this).css('border-bottom-color','#fff');
            $(this).siblings('.city-box').show();
        });
        $('.item-location .box-close').click(function(){
            $(this).parent('.city-box').hide();
            $('.item-location .form-content>.m-input').css('border-bottom-color','#d8d8d8');
        });
        $('.item-location').on('click','.default-city>div',function(){
            sProCity = $(this).find('span').text();
            $('.item-location .form-content>.m-input').val(sProCity).siblings('.city-box').hide();
            $('.item-location .form-content>.m-input').css('border-bottom-color','#d8d8d8');
        });
        $('.item-location').on('click','.pro-list>ul>li',function(){
            sPro = $(this).text();
            $(this).addClass('active').siblings('li').removeClass('active');
            $('.item-location .select-city .tab-header>ul>li').eq(0).text(sPro).removeClass('active');
            $('.item-location .select-city .tab-header>ul>li').eq(1).addClass('active').text('请选择');
            $('.item-location .city-list>ul>li').removeClass('active');
            $('.item-location .select-city .tab-body>ul>li').eq(0).hide();
            $('.item-location .select-city .tab-body>ul>li').eq(1).show();
        });
        $('.item-location').on('click','.city-list>ul>li',function(){
            sCity = $(this).text();
            $(this).addClass('active').siblings('li').removeClass('active');
            $('.item-location .select-city .tab-header>ul>li').eq(1).text(sCity);
            sProCity = sPro + sCity;
            $('.item-location .form-content>.m-input').val(sProCity).siblings('.city-box').hide();
            $('.item-location .form-content>.m-input').css('border-bottom-color','#d8d8d8');
        });
    }
    /** 详情页面商品图片交互 **/
    var detailItemImgList = function(){
        /** 鼠标悬浮切换图片 **/
        $('.item-detail .item-img-content ul li').mouseover(function(){
            $(this).addClass('active').siblings('li').removeClass('active');
            var imgSrc = $(this).find('img').attr('src');
            $(this).parents('.item-img').children('img').attr('src',imgSrc);
            $(this).parents('.item-img').find('.img-magnifier').children('img').attr('src',imgSrc);
        });
        /** 点击箭头移动图片列表 **/
        var imgNum = $('.item-detail .item-img-content>ul>li').length,/** 图片个数 **/
            imgWidth = parseInt($('.item-detail .item-img-content>ul>li').css('width')),/** 单个图片宽度 **/
            imgMargin = 0,/** 单个图片外边距 **/
			imgBorder = parseInt($('.item-detail .item-img-content>ul>li').css('border-width')) * 2,
            imgLeft = 0,/** 当前偏移量 **/
            visibleWidth = parseInt($('.item-detail .item-img-content').css('width')),/** 可视区域宽度 **/
            actualWidth;/** 实际宽度 **/
        if(imgNum > 1){
            imgMargin = parseInt($('.item-detail .item-img-content>ul>li:eq(1)').css('margin-left'));
        }
        actualWidth = imgNum*imgWidth + (imgNum - 1)*imgMargin + imgNum*imgBorder;
        $('.item-detail .item-img-list a').click(function(e){
            e.preventDefault();
        });
        if(actualWidth > visibleWidth){
            $('#img-right').click(function(){
                if(imgLeft <= (visibleWidth - actualWidth)){
                    return false;
                }
                imgLeft = imgLeft - (imgWidth + imgMargin + imgBorder);
                $('.item-detail .item-img-content ul').animate({left:imgLeft+"px"});
            });
            $('#img-left').click(function(){
                if(imgLeft >= 0){
                    return false;
                }
                imgLeft = imgLeft + (imgWidth + imgMargin + imgBorder);
                $('.item-detail .item-img-content ul').animate({left:imgLeft+"px"});
            });
        }
        else{
            $('.item-detail .item-img-list a').addClass('disabled');
        }
        var imgBox = document.getElementById('item-img');
        var maskBox = document.getElementById('item-mask');
        /** 放大图片功能 **/
        $('.item-detail .item-img .img-mask-box').mousemove(function(event){
            /** 遮罩层随鼠标移动 **/
            var pos_x = event.pageX - imgBox.offsetLeft - (maskBox.offsetWidth/2),
                pos_y = event.pageY - imgBox.offsetTop - (maskBox.offsetHeight/2);
            if(pos_x > imgBox.offsetWidth - maskBox.offsetWidth){
                pos_x = imgBox.offsetWidth - maskBox.offsetWidth;
            }else if(pos_x < 0){
                pos_x = 0;
            }
            if(pos_y > imgBox.offsetHeight - maskBox.offsetHeight){
                pos_y = imgBox.offsetHeight - maskBox.offsetHeight;
            }else if(pos_y < 0){
                pos_y = 0;
            }
            maskBox.style.left = (pos_x + 'px');
            maskBox.style.top = (pos_y + 'px');
            /** 放大图片随鼠标移动 **/
            var multiNum = $('.magni-img').width() / $('.img-mask-box').width();
            $('#item-magni').children('img').css('left',-pos_x*multiNum+'px');
            $('#item-magni').children('img').css('top',-pos_y*multiNum+'px');
        });
    }
    /** 回到顶部 **/
    var backTop = function(){
        $("#toTop").click(function(e){
            e.preventDefault();
            $('body,html').animate({scrollTop:0},1000);
            return false;
        });
    }
    /** 列表页面筛选条件交互 **/
    var filterList = function(){
		$('body').on('keydown','.sort-search>input',function(e){
			if(e.keyCode==13){ 
				$(this).siblings('.m-btn').click();
			}
		});
        /** 一二级子类点击切换样式 **/
        /*$('.checked-category .cate-menu .cate-list>li>a').click(function(e){
           e.preventDefault();
            $(this).parent('li').addClass('active').siblings('li').removeClass('active');
            $(this).parents('.cate-list').siblings('.child-cate').text($(this).text());
        });*/
        /** 列表过长显示更多按钮 **/
        $('.filter-list').each(function(){
            var filter_list_height =$(this).children('ul').height();
            if(filter_list_height>$(this).height()){
                $(this).find('.more-switch').show();
            }
        });
        /** 点击更多 **/
        function uniQueue(array){
            var arr=[];
            var m;
            while(array.length>0){
                m=array[0];
                arr.push(m);
                array=$.grep(array,function(n,i){
                    return n==m;
                },true);
            }
            return arr;
        }
        $('.more-switch').click(function(){
            var item_list = $(this).parents('.filter-list').parent('li');//类别列表
            item_list.find('.letter-all').addClass('active');
            item_list.toggleClass('whole');//该栏增加边框
            $(this).parent('.filter-list').toggleClass('height-auto');
            $(this).children('i').toggleClass('fa-angle-down fa-angle-up');
            //生成字母列表
            var letter_arr = [];
            $(this).parent('.filter-list').children('ul').children('li').each(function(){
                sLetter = $(this).attr('data-initial');
                if(sLetter){
                    letter_arr.push(sLetter);
                }
            });
            letter_arr = uniQueue(letter_arr).sort();
            var letter_html = '<li class="active letter-all">所有</li>';
            $.each(letter_arr,function(n,value){
                letter_html = letter_html + '<li>' + value.toUpperCase() + '</li>';
            });
            item_list.find('.filter-letter>ul').html(letter_html);
        });
        /** 更多状态字母悬浮 **/
        $('body').on('mouseover','.filter-letter>ul>li',function(){
            if($(this).hasClass('letter-all')){
                $(this).parents('.filter-letter').siblings('ul').children('li').show();
            }
            else{
                var letter_on = $(this).text();
                $(this).parents('.filter-letter').siblings('ul').children('li').hide().each(function(){
                    var sLetter = $(this).attr('data-initial');
                    if(sLetter == letter_on){
                        $(this).show();
                    }
                });
            }
            $(this).addClass('active').siblings().removeClass('active');
        });
        /** 多选按钮组 **/
        var multi_btn = '<div class="multi-btn">'
            +'<button class="m-btn btn-danger btn-sm multi-admit">确定</button>'
            +'<button class="m-btn btn-default btn-inverse btn-sm multi-cancel">取消</button>'
            +'</div>';
        /** 开启多选状态 **/
        $('.multi-switch').click(function(){
            var filter_list = $(this).siblings('ul');//选项列表
            var item_list = $(this).parents('.filter-list').parent('li');//类别列表
            $(this).after(multi_btn);//添加确定取消按钮
            filter_list.children('li').removeClass('active');//选项去除选中样式
            filter_list.children('li').find('i').addClass('fa fa-square-o');//添加复选框样式
            filter_list.children('.filter-all').hide();//隐藏"不限"选项
            item_list.addClass('multi');//该栏增加边框

            /** 取消其他栏目的多选状态 **/
            item_list.siblings('li').removeClass('multi');//其他栏去掉边框
            item_list.siblings('li').find('ul').children('li').removeClass('active');//其他栏去除选中样式
            item_list.siblings('li').find('ul').find('i').attr('class',null);//其他栏去除复选框样式
            item_list.siblings('li').find('.filter-all').show();//不限状态显示
            item_list.siblings('li').find('li.checked').addClass('active');//多选前的选中项样式添加
            item_list.siblings('li').find('.multi-switch').show();//显示多选开关按钮
            item_list.siblings('li').find('.multi-btn').remove();//删除确定取消按钮
        });
        /** 过滤条件点击状态变化 **/
		$('body').on('click','.filter-list>ul>li:not(.filter-parent):not(.filter-select)',function(){
        //$('.filter-list>ul>li').not('.filter-parent').not('.filter-select').click(function(){
            var bMulti = $(this).parents('.filter-list').parent('li').hasClass('multi');//判断是否是多选
            /** 多选 **/
            if(bMulti){
                $(this).toggleClass('active');
                $(this).find('i').toggleClass('fa-check-square-o fa-square-o');
            }
            /** 单选 **/
            else{
                var item_count = $(this).parents('.filter-list').parent('li').index();//记录过滤项类别
                var item_text = $(this).text();//选中项名称
                var item_data = $(this).attr("data");//选中项code值
                $(this).siblings().removeClass('active checked').find('.filter-children').children('li').removeClass('active');
                $(this).addClass('active checked');
                /** 单选不限 **/
                if($(this).hasClass('filter-all')){//点击"不限"条件后，标签隐藏，清空标签内容
                    var iChecked = 0;//记录已选条件数量
                    $('.tag-list>li').eq(item_count).hide().find('span').text('');//清空该项已选条件内容
                    $('.tag-list>li').eq(item_count).attr("data","");//给标签赋空值
                    $('.tag-list>li').each(function(){
                        if($(this).css('display') != 'none' ){
                            iChecked ++;
                        }
                    });
                    if(iChecked == 0){
                        $('.checked-tag').hide();//若已选条件数量为0，则隐藏
                    }
                }
                /** 单选其他 **/
                else{
                    $('.tag-list>li').eq(item_count).show().find('span').text(item_text);//已选条件内容变化
                    $('.tag-list>li').eq(item_count).attr("data",item_data);//给标签赋选中的data值
                    $('.checked-tag').show();//显示已选条件
                }
				$(".tag-list").trigger('change');
            }
        });
        
        /** 已选条件点击删除 **/
        $('.tag-list>li').click(function(){
            var item_count = $(this).index();//记录过滤项类别
            $('.filter-content>ul>li').eq(item_count).find('li').removeClass('active checked');
            $('.filter-content>ul>li').eq(item_count).find('.filter-all').addClass('active checked');
            $(this).hide().find('span').text('');//隐藏该已选条件
            $(this).attr("data","");//值置空
            var iChecked = 0;//记录已选条件数量
            $('.tag-list>li').each(function(){
                if($(this).css('display') != 'none' ){
                    iChecked ++;
                }
            });
            if(iChecked == 0){
                $('.checked-tag').hide();//若已选条件数量为0，则隐藏
            }
            $(".tag-list").trigger('change');
        });
        /** 已选条件全部清除 **/
        $('.checked-remove-all').click(function(){
            $('.checked-tag').hide();
            $('.tag-list>li').hide().find('span').text('');
            $('.tag-list>li').attr("data","");//值置空
            $('.filter-content>ul>li').find('li').removeClass('active checked');
            $('.filter-content>ul>li').find('.filter-all').addClass('active checked');
            $(".tag-list").trigger('change');
        });
        
        /** 下拉菜单切换 **/
        $('.filter-select select').change(function(){
            var selected_name='';
            var item_count = $(this).parents('.filter-list').parent('li').index();//记录过滤项类别
            $(this).parents('.filter-list').find('.filter-select').each(function(){
                if(selected_name!=''){
                    selected_name = selected_name + '-' + $(this).children('select').children('option:selected').val();
                }
                else{
                    selected_name = $(this).children('select').children('option:selected').val();
                }
            });
            $('.tag-list>li').eq(item_count).show().find('span').text(selected_name);
            $('.checked-tag').show();//显示已选条件
        });
        /** 二级子类悬浮显示 **/
        $('.filter-parent').mouseover(function(){
            var top_distance = $(this).offset().top - $(this).parents('.filter-list').offset().top + $(this).height() - 2;
            var padding_height = parseInt($(this).children('.filter-children').css('padding-top')) + parseInt($(this).children('.filter-children').css('padding-bottom')) ;
            var border_height = parseInt($(this).children('.filter-children').css('border-top-width')) + parseInt($(this).children('.filter-children').css('border-bottom-width'));
            var parent_height = top_distance + $(this).children('.filter-children').height() + padding_height + border_height;
            $(this).children('.filter-children').css('top',top_distance+'px');
            $(this).parents('.filter-list').attr('style','max-height:none;height:'+ parent_height +'px');
        });
        $('.filter-parent').mouseout(function(){
            $(this).parents('.filter-list').attr('style','');
        });
        
        /** 一级类的点击 **/
       $('.filter-parent>span').click(function(){
            var item_count = $(this).parents('.filter-list').parent('li').index();//记录过滤项类别
            var item_text = $(this).parents('.filter-parent').children('span').text();//选中项名称
            var item_data = $(this).attr("data");//选中项code值
            $(this).parents('.filter-parent').addClass('active').siblings('li').removeClass('active');
            $(this).parents('.filter-parent').siblings('li').find('.filter-children').children('li').removeClass('active');
            $(this).siblings().removeClass('active');
			$(this).parent().find('.filter-children').children('li').removeClass('active');
            $(this).addClass('active');
            $('.tag-list>li').eq(item_count).show().find('span').text(item_text);//已选条件内容变化
            $('.tag-list>li').eq(item_count).attr("data",item_data);//给标签赋选中的data值
            $('.checked-tag').show();//显示已选条件
            $(".tag-list").trigger('change');
        });
        
        /** 含二级子类的点击 **/
        $('.filter-parent>ul>li').click(function(){
            var item_count = $(this).parents('.filter-list').parent('li').index();//记录过滤项类别
            var item_parent = $(this).parents('.filter-parent').children('span').text();
            var item_text = item_parent + '-' +$(this).text();//选中项名称
            var item_data = $(this).attr("data");//选中项code值
            $(this).parents('.filter-parent').addClass('active').siblings('li').removeClass('active');
            $(this).parents('.filter-parent').siblings('li').find('.filter-children').children('li').removeClass('active');
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
            $('.tag-list>li').eq(item_count).show().find('span').text(item_text);//已选条件内容变化
            $('.tag-list>li').eq(item_count).attr("data",item_data);//给标签赋选中的data值
            $('.checked-tag').show();//显示已选条件
            $(".tag-list").trigger('change');
        });
        /** 多选点击确定 **/
        $('.filter-content').on('click','.multi-admit',function(){
            var item_count = $(this).parents('.filter-list').parent('li').index();//记录过滤项类别
            var arrChecked = [];//已选项数组
            var sChecked = '';//已选项字符串
            var dataChecked = '';//已选项data值
            var filter_list = $(this).parent('.multi-btn').siblings('ul');//选项列表
            filter_list.children('li').removeClass('checked');
            filter_list.children('li').each(function(){
                if($(this).hasClass('active')){
                    if(sChecked==''){
                        sChecked = $(this).text();
                        dataChecked = $(this).attr("data");//选中项data值
                    }
                    else{
                        sChecked = sChecked + '、' + $(this).text();
                        dataChecked = dataChecked +','+ $(this).attr("data");
                    }
                    arrChecked.push($(this).text());
                    $(this).addClass('checked');
                }
            });
            filter_list.children('li').removeClass('active');//去除选中样式
            filter_list.children('li').find('i').attr('class',null);//去除复选框样式
            filter_list.find('.filter-all').show();//不限状态显示
            filter_list.children('li.checked').addClass('active');//多选的选中项样式添加
            $(this).parents('.filter-list').parent('li').removeClass('multi');//去掉边框
            $(this).parent('.multi-btn').remove();//删除确定取消按钮

            /** 已选条件内容变化 **/
            $('.tag-list>li').eq(item_count).show().find('span').text(sChecked);//已选条件内容变化
            $('.tag-list>li').eq(item_count).attr("data",dataChecked);//设置标签data值
            $('.checked-tag').show();//显示已选条件
            $(".tag-list").trigger('change');
        });
        /** 多选点击取消 **/
        $('.filter-content').on('click','.multi-cancel',function(){
            var filter_list = $(this).parent('.multi-btn').siblings('ul');//选项列表
            filter_list.children('li').removeClass('active');//去除选中样式
            filter_list.children('li').find('i').attr('class',null);//去除复选框样式
            filter_list.find('.filter-all').show();//不限状态显示
            filter_list.children('li.checked').addClass('active');//多选前的选中项样式添加
            $(this).parents('.filter-list').parent('li').removeClass('multi');//去掉边框
            $(this).parent('.multi-btn').remove();//删除确定取消按钮
        });
    }
    /** 列表页面排序切换交互 **/
    var sortStyle = function(){
        $('.sort-list>li').click(function(){
            $(this).addClass('active').siblings('li').removeClass('active');
            $(".sort-list").trigger('change');//列表页面点击排序重新查询数据库，bind在各列表页面中
        });
    }
    /** 列表页面切换列表展现形式 **/
    var listStyle = function(){
        $('.sort-style>div').click(function(){
            $(this).addClass('active').siblings('div').removeClass('active');
            $('.item-list>ul').toggleClass('item-card item-menu');
        });
    }
    /** 我的空间交互功能 **/
    var spaceEffect = function(){
        /** tab切换 **/
        $('.space-tab-header>ul>li').click(function(){
            var count = $(this).index();
           $(this).addClass('active').siblings('li').removeClass('active');
            $(this).parent().parent('.space-tab-header').siblings('.space-tab-content').children().children('li').hide().eq(count).show();
        });
        /** tab按钮状态切换 **/
        $('.space-tab-btn.btn-switch .m-btn').click(function(){
           $(this).removeClass('btn-default').addClass('btn-warning').siblings('.m-btn').removeClass('btn-warning').addClass('btn-default');
        });
    }
	
    /** 搜索下拉列表交互 **/
    var headSearch = function(){
        $('.u-search .u-search-list i').click(function(){
            $('.u-search .u-search-list>ul').slideToggle();
        });
        $('.u-search .u-search-list>ul>li').click(function(){
            $('.u-search .u-search-list>div>span').text($(this).text());
        });
        var bSearch = false;
        $('.u-search .u-search-list>div').mouseover(function(){
            bSearch = true;
        });
        $('.u-search .u-search-list>div').mouseleave(function(){
            bSearch = false;
        });
        $(document).click(function(){
            if(!bSearch){
                $('.u-search .u-search-list>ul').hide();
            }
        });

    }

}();
/** 轮播 **/
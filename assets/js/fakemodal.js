function showfakemodal() {
    $(".fakemodal").show(500);
}
function hidefakemodal() {
    $(".fakemodal").hide(500);
}
// 点击头部系统，将其下面的子系统添加到快捷菜单
function addSubMenu(obj) {
    if ($(".pre-task").is(":hidden")){
        $(".pre-task").show(300);
        $(".main-info-minus28").css("left","300px");
        $(".sub-main-minus58").css("left", "580px");
        
    }
    var bigTitle=$(obj).children("a").text();
    console.log(bigTitle);
    
    var str = $(obj).find(".sub-nav-menu").html();
    var quickMenuWrap = $(".quickmenu");
    var bigstr="";
    bigstr +='<div class="menu">'
        +'<p>'
        + '<span>' + bigTitle+'</span>'
        +'<i class="fa fa-angle-down"></i>'
        +'</p>'
        +'<ul class="sub-menu">'
        + str
        +'</ul>'
        +'</div>';
    quickMenuWrap.append(bigstr);
    slide();
}

slide();
// 菜单栏的折叠
function slide(){
    $(".quickmenu>.menu>p").click(function () {
        //判断对象是显示还是隐藏
        if ($(this).siblings(".sub-menu").is(":hidden")) {
            //表示隐藏
            if (!$(this).siblings(".sub-menu").is(":animated")) {
                $(this).children(".fa-angle-down").css({ 'transform': 'rotate(90deg)' });

                //如果当前没有进行动画，则添加新动画
                $(this).siblings(".sub-menu").animate({
                    height: 'show'
                }, 1000)
                    //siblings遍历div1的元素
                    .end().siblings().find(".sub-menu").hide(1000);
            }
        } else {
            //表示显示
            if (!$(this).siblings(".sub-menu").is(":animated")) {
                $(this).children(".fa-angle-down").css({ 'transform': 'rotate(360deg)' });
                $(this).siblings(".sub-menu").animate({
                    height: 'hide'
                }, 1000)
                    .end().siblings().find(".sub-menu").hide(1000);
            }
        }
    });
}
    

    
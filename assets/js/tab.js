// 国控污染tab切换
$(".pollution-tab>ul>li").click(function () {
    $(this).addClass("active").siblings().removeClass("active");
});
// floatside的切换
$(".floatside>ul>li").click(function () {
    $(this).addClass("active").siblings().removeClass("active");
});

// 按钮行的切换
$(".action-btns>a").click(function () {
    $(this).addClass("active").siblings().removeClass("active");
});
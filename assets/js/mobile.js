// 任务管理
$(".task-manage-wrap>ul>li>p").click(function () {
    $(this).siblings(".task-list").slideToggle();
});
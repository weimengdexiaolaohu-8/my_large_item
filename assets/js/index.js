$(function() {
    getUserInfo()
    var layer = layui.layer
    $("#btnLogout").click(function() {
        layer.confirm('确定要退出吗？', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem("token")
            location.href = "login.html"
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: function(res) {
            if (res.status !== 0) return layui.layer.msg("获取用户失败！")
            renderAvater(res.data)
        },
        // complete: function(res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         localStorage.removeItem("token")
        //         location.href = "login.html"
        //     }
        // }
    });

    function renderAvater(user) {
        var name = user.nickname || user.username
        $("#welcome").html("欢迎&nbsp;&nbsp;" + name)
        if (user.user_pic !== null) {
            $(".layui-nav-img").prop("src", user.user_pic).show()
            $(".text_avater").hide()
        } else {
            $(".layui-nav-img").hide()
            var fisr = name[0].toUpperCase()
            $(".text_avater").html(fisr).show()
        }
    }
}
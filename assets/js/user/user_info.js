$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "请输入1～6个字符之间！"
            }
        }
    });
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function(res) {
                if (res.status !== 0) return layer.msg("获取用户信息失败！")
                form.val("formUserInfo", res.data)
            }
        })
    };
    $("#btnReset").click(function(e) {
        e.preventDefault()
        initUserInfo()
    });
    $(".layui-form").submit(function(e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg("更新用户信息失败！")
                console.log(res);
                layer.msg("更新用户信息成功！")
                window.parent.getUserInfo()
                console.log($(".layui-form").serialize());
            }
        })
    })
})
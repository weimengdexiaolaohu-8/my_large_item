$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value === $("[name='oldPwd']").val()) return "新旧密码不能相同！"
        },
        rePwd: function(value) {
            if (value !== $("[name='newPwd']").val()) return "新密码两次不一致！"
        }
    });
    $("#formPwd").on("submit", function(e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            // data: {
            //     oldPwd: $("[name='oldPwd']").val(),
            //     newPwd: $("[name='newPwd']").val(),
            // },
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg("更新密码失败！" + res.message)
                layer.msg("更新密码成功！")
                $(".layui-form")[0].reset()
            }
        })
    });
})
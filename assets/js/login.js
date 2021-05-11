$(function() {
    // 登陆注册绑定点击事件
    $("#link_reg").on("click", function() {
        $(".reg_box").show()
        $(".login_box").hide()
    });
    $("#link_login").on("click", function() {
        $(".reg_box").hide()
        $(".login_box").show()
    });
    //layui获取form对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        // 验证密码
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 验证确认密码
        repass: function(value) {
            var pwd = $(".reg_box [name='password']").val()
            if (pwd !== value) {
                return "两次密码不一致"
            }
        }
    });
    // form表单绑定提交监听事件
    $("#form_reg").on("submit", function(e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: {
                username: $(".reg_box [name='username']").val(),
                password: $(".reg_box [name='password']").val()
            },

            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg("注册成功,请登录")
                $("#link_login").click()
            }
        });

    })
    $("#form_login").submit(function(e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) return layer.msg(res.messages)
                layer.msg("登陆成功")
                localStorage.setItem("token", res.token)
                location.assign("index.html")
            }
        })
    })
})
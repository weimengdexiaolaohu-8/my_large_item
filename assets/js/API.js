$.ajaxPrefilter(function(option) {
    option.url = "http://api-breakingnews-web.itheima.net" + option.url
        //统一为有权限的接口，设置请求头
    if (option.url.indexOf("/my/") !== -1) {
        option.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }
    //统一配置无身份认证登陆
    option.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            localStorage.removeItem("token")
            location.href = "login.html"
        }
    }
})
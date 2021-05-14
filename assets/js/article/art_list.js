$(function() {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: "",
        state: ""
    };
    template.defaults.imports.dataFormat = function(date) {
        var dt = new Date(date)
        var y = dt.getFullYear()
        var m = dt.getMonth() + 1
        m = m < 10 ? "0" + m : m
        var d = dt.getDay()
        d = d < 10 ? "0" + d : d
        var hh = dt.getHours()
        hh = hh < 10 ? "0" + hh : hh
        var mm = dt.getMinutes()
        mm = mm < 10 ? "0" + mm : mm
        var ss = dt.getSeconds()
        ss = ss < 10 ? "0" + ss : ss
        return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss
    };

    initTable()
    initCate()
    $("#formReFresh").on("submit", function(e) {
        e.preventDefault()
        var cate_id = $("[name='cate_id']").val()
        var state = $("[name='state']").val()
        q.cate_id = cate_id
        q.state = state
        initTable()
    });
    $("body").on("click", ".btn_delete", function() {
        var id = $(".btn_delete").attr("data_id")
        var len = $(".btn_delete").length
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                type: "GET",
                url: "/my/article/delete/" + id,
                success: function(res) {
                    if (res.status !== 0) return layer.msg(res.message)
                    layer.msg(res.message)
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }
            })
            layer.close(index);
        });
    })

    function initTable() {
        $.ajax({
            type: "GET",
            url: "/my/article/list",
            data: q,
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                    // layer.msg(res.message)
                var strhtml = template("artList", res)
                $("#tbody").html(strhtml)
                renderPage(res.total)
            }
        });
    };
    //初始化文章分类
    function initCate() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                var strhtml = template("cateList", res)
                $("[name='cate_id']").html(strhtml)
                form.render()
            }
        })
    };

    function renderPage(total) {
        laypage.render({
            elem: "pageBox",
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function(obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        })
    }
});
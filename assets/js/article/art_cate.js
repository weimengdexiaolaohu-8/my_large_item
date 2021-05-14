$(function() {
    var layer = layui.layer
    var form = layui.form
    var indexAdd = null
    var indexEdit = null
    var indexRemove = null
    initArtCateList();
    $("#btnAddCate").click(function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $("#diaLogAdd").html()
        });
    });
    $("body ").on("submit", "#formAdd", function(e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                initArtCateList();
                layer.msg(res.message)
                layer.close(indexAdd)
            }
        })
    });
    $("#tbody").on("click", ".btn_edit", function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $("#diaLogEdit").html()
        });
        var id = $(this).attr("data-id")
        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + id,
            success: function(res) {
                form.val("formEdit", res.data)
            }
        })
    });
    $("body").on("submit", "#formEdit", function(e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.close(indexEdit)
                initArtCateList();
            }
        })
    });
    $("body").on("click", ".btn_editremove", function() {
        var id = $(this).siblings("[data-id]").attr("data-id")
        indexRemove = layer.confirm(
            '确定删除?', { icon: 3, title: '提示' },
            function(indexRemove) {
                layer.close(indexRemove);
                $.ajax({
                    type: "GET",
                    url: "/my/article/deletecate/" + id,
                    success: function(res) {
                        if (res.status !== 0) return layer.msg(res.message)
                        layer.msg(res.message)
                        initArtCateList()
                    }
                })
            });
    })
});

function initArtCateList() {
    $.ajax({
        type: "GET",
        url: "/my/article/cates",
        success: function(res) {
            if (res.status !== 0) return layer.msg(res.message)
            var strhtml = template("tpl_table", res)
            $("#tbody").empty().html(strhtml)
        }
    })
};
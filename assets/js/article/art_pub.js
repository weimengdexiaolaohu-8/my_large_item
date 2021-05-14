$(function() {
    var layer = layui.layer
    var form = layui.form
    initCate();
    // 初始化富文本编辑器 
    initEditor()

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
    // 1. 初始化图片裁剪器 
    var $image = $('#image');
    // 2. 裁剪选项 
    var options = { aspectRatio: 400 / 280, preview: '.img-preview' };
    // 3. 初始化裁剪区域 
    $image.cropper(options);

    $("#btnSelect").click(function() {
        $("#coverFile").click()
    })
    $("#coverFile").change(function(e) {
        var files = e.target.files
        if (files.length === 0) return
        var newImageURL = URL.createObjectURL(files[0])
        $image.cropper("destroy").attr("src", newImageURL).cropper(options)
    });
    var art_state = "已发布"
    $("#btnSave2").click(function() {
        art_state = "草稿"
    });
    $("#formPud").submit(function(e) {
        e.preventDefault()
        var data = new FormData($("#formPud")[0])
        data.append("state", art_state)
        $image.cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布 
            width: 400,
            height: 280
        }).toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象 
            // 得到文件对象后，进行后续的操作
            data.append("cover_img", blob)
            $.ajax({
                type: "POST",
                url: "/my/article/add",
                data: data,
                contentType: false,
                processData: false,
                success: function(res) {
                    if (res.status !== 0) return layer.msg(res.message)
                    layer.msg(res.message)
                    location.assign("/article/art_list.html")
                }
            })
        });
    })
})
var pageNum = 1, limitNum = 10, totalBut = 0;
var baseUrl = 'http://127.0.0.1:3000';


function getDataList() {
    var data = {
        limitNum,
        pageNum,
        account: $(".accountInp").val(),
        status: $(".selectStaInp").val()
    }
    $.get(baseUrl + '/users/getAdminList', data, function (res) {
        console.log(res)
        totalBut = res.total;
        var strHtml = `<tr>
    <td>#</td>
    <td>账号</td>
    <td>姓名</td>
    <td>手机号</td>
    <td>性别</td>
    <td>备注</td>
    <td>管理员状态</td>
    <td>创建时间</td>
    <td>操作</td>
</tr>`
        for (var i = 0; i < res.data.length; i++) {
            strHtml += `<tr>
         <td>${i + 1}</td>
         <td>${res.data[i].account}</td>
         <td>${res.data[i].name}</td>
         <td>${res.data[i].phone}</td>
         <td>${res.data[i].sex}</td>
         <td>${res.data[i].desc}</td>
         <td class="${res.data[i].status == 1 ? 'blue' : 'red'}">${res.data[i].status == 1 ? '正常' : '禁用'}</td>
         <td>${res.data[i].createTime}</td>
         <td>
         ${res.data[i].status == 1 ? `<span class="blue cursor block" dataId="${res.data[i].account}">停用</span> ` : `<span class="blue cursor start" dataId="${res.data[i].account}">启用</span> 
         <span class="blue cursor update" dataId="${res.data[i].account}">修改密码</span> 
         <span class="blue cursor upUSer" ${res.data[i].account}" dataT ='${JSON.stringify(res.data[i])}'>编辑</span> 
         <span class="blue cursor delect" dataId="${res.data[i].account}">删除</span>`}
         </td>
     </tr>`
        }
        $("#tableData").html(strHtml)

        // 判断数据是否为空，进行提示
        if (strHtml.length > 0) {
            $(".empty").css('display', 'none')
        } else {
            $(".empty").css('display', 'block')
        }
        // 停用管理员
        $(".block").click(function () {
            var _this = this;
            layer.open({
                content: '确定停用吗?'
                , btn: ['确定', '取消']
                , yes: function (index, layero) {
                    //按钮【按钮一】的回调
                    var obj = {
                        oldObj: JSON.stringify({ account: $(_this).attr('dataId') }),
                        obj: JSON.stringify({ status: '2' })
                    }
                    $.post(baseUrl + '/users/updateAdmin', obj, function (res) {
                        console.log(res)
                        foo()
                        flag = true;
                        layer.msg('禁用成功', {
                            time: 1500 //2秒关闭（如果不配置，默认是3秒
                        })
                        layer.close(index)
                    })
                }
                , btn2: function (index, layero) {
                    //按钮【按钮二】的回调

                    //return false 开启该代码可禁止点击该按钮关闭
                }
                , cancel: function () {
                    //右上角关闭回调

                    //return false 开启该代码可禁止点击该按钮关闭
                }
            });
        })

        // 启用管理员
        $(".start").click(function () {
            var _this = this;
            layer.open({
                content: '确定启用吗?'
                , btn: ['确定', '取消']
                , yes: function (index, layero) {
                    //按钮【按钮一】的回调
                    var obj = {
                        oldObj: JSON.stringify({ account: $(_this).attr('dataId') }),
                        obj: JSON.stringify({ status: '1' })
                    }
                    $.post(baseUrl + '/users/updateAdmin', obj, function (res) {
                        console.log(res)
                        foo()
                        flag = true;
                        layer.msg('启用成功', {
                            time: 1500 //2秒关闭（如果不配置，默认是3秒
                        })
                        layer.close(index)
                    })
                }
                , btn2: function (index, layero) {
                    //按钮【按钮二】的回调

                    //return false 开启该代码可禁止点击该按钮关闭
                }
                , cancel: function () {
                    //右上角关闭回调

                    //return false 开启该代码可禁止点击该按钮关闭
                }
            });
        })

        // 修改管理员密码
        $(".update").click(function () {
            var _this = this;
            layer.prompt({
                title: '修改密码'
            },
                function (value, index, elem) {
                    console.log(value)
                    console.log(res)
                    var obj = {
                        oldObj: JSON.stringify({ account: $(_this).attr("dataId") }),
                        obj: JSON.stringify({ password: value })
                    }
                    $.post(baseUrl + '/users/updateAdmin', obj, function (res) {
                        layer.msg('修改成功', {
                            time: 1500 //2秒关闭（如果不配置，默认是3秒
                        })
                        layer.close(index)
                    })
                })
        })
        // 删除管理员
        $(".delect").click(function () {
            var _this = this;
            layer.open({
                content: '确定删除吗?'
                , btn: ['确定', '取消']
                , yes: function (index, layero) {
                    //按钮【按钮一】的回调
                    var obj = {
                        account:$(_this).attr('dataId')
                    }
                    $.post(baseUrl + '/users/removeAdmin', obj, function (res) {
                        console.log(res)
                        foo()
                        flag = true;
                        layer.msg('删除成功', {
                            time: 1500 //2秒关闭（如果不配置，默认是3秒
                        })
                        layer.close(index)
                    })
                }
                , btn2: function (index, layero) {
                    //按钮【按钮二】的回调

                    //return false 开启该代码可禁止点击该按钮关闭
                }
                , cancel: function () {
                    //右上角关闭回调

                    //return false 开启该代码可禁止点击该按钮关闭
                }
            });
        })
               // 编辑修改管理员
               $('.upUSer').click(function () {
                var obj = JSON.parse($(this).attr('dataT'))
                console.log(obj)
                    $('.account2').val(obj.account)
                    $('.name2').val(obj.name)
                    $('.phone2').val(obj.phone)
                    $('.desc2').val(obj.desc)
                    $("input[name^='sex2']")[obj.sex=='男'? 0 : 1].checked = true;
                    layui.form.render();
                    var index = layer.open({
                        type: 1,
                        title: '修改管理',
                        btn: ['确认', '返回'],
                        area: ['50%', '50%'],
                        content: $('#dialog2'),
                        btn1: function (index, layero) {
                            console.log(111)
                            var obj = {
                                name: $('.name2').val(),
                                sex: $('.sex2 input:checked').val(),
                                phone: $('.phone2').val(),
                                desc: $('.desc2').val(),
                            }
                            var oldObj ={
                                account: $('.account2').val(),
                            }
                           var newObj ={
                                oldObj: JSON.stringify(oldObj),
                                obj: JSON.stringify(obj)
                            }
                            console.log(obj)
                            $.post(baseUrl+'/users/updateAdmin',newObj,function(res){
                                console.log(res)
                            layer.close(index);
                                flag =true;
                                foo()
                            layer.msg('修改成功', {
                                time: 1500 //2秒关闭（如果不配置，默认是3秒
                            })
                
                            })
                        },
                        cancel: function () {
                            layer.close(index);
                        }
                    });
                })
})

}

$(".searchBtn").click(function () {
    getDataList()
})

function foo() {
    new Promise(function (rej, res) {
        getDataList()
        rej()
    }).then(function () {
        pageFoo()
    })
}


// 分页器
foo()
var flag = true;
function pageFoo(res) {
    layui.use(['laypage', 'layer'], function () {
        var laypage = layui.laypage
            , layer = layui.layer;
        //完整功能
        laypage.render({
            elem: 'page'
            , count: totalBut //数据总数
            , layout: ['count', 'prev', 'page', 'next']
            , jump: function (obj) {
                pageNum = obj.curr
                if (flag) {
                    flag = false
                } else {
                    getDataList()
                    flag = true;
                }
            }
        });
    });
}

// 新增管理员

$(".addUser").click(function () {
    var obj = {
        account: $(".account").val(''),
        name: $(".name").val(''),
        password: $(".password").val(''),
        phone: $(".phone").val(''),
        sex: $(".sex input:checked").val(''),
        desc: $(".desc").val(''),
    }
    var index = layer.open({
        type: 1,
        title: '添加用户',
        btn: ['确认', '返回'],
        area: ['50%', '50%'],
        content: $('#dialog'),
        btn1: function (index, layero) {
            var obj = {
                account: $(".account").val(),
                name: $(".name").val(),
                password: $(".password").val(),
                phone: $(".phone").val(),
                sex: $(".sex input:checked").val(),
                createTime: timeFun(),
                desc: $(".desc").val(),
                status: "1"
            }
            if (!($(".account").val()) || !($(".password").val())) {
                alert('请输入账号和密码!')
                return false
            } else {
                $.post(baseUrl + '/users/addAdmin', obj, function () {
                    console.log(obj)
                    foo()

                    layer.close(index)
                    layer.msg('添加成功', {
                        time: 1500 //2秒关闭（如果不配置，默认是3秒
                    })
                })
            }

        },
        cancel: function () {
            layer.close(index);
        }
    });
})
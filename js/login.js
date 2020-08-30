var loginUrl = 'http://127.0.0.1:3000'
// 登录页面设置
$(".login_button").click(function(){
    var username = $(".username").val();
    var password = $(".login_password").val();
    console.log(username,password)
    if(!(username) || !(password)){
        alert('请输入账号和密码！')
    }else{
        location.href='user.html'

        // var data = {
        //     username,
        //     password
        // }
        // $.post(loginUrl+'/users/loginIn',data,function(res){
        //     console.log(res.code)
        //     if(res.code == 1000){
        //         sessionStorage.getItem('username',res.data[0].accound)
        //         location.href='user.html'
        //     }else{
        //         alert('账号密码错误，请重试!')
        //     }
        // })
    }
})
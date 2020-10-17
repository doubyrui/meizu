define(['jqurey', 'jqcookie'], function (jqurey, jqcookie) {
    function send() {
        $('.login-login').click(function () {
                var username = $('.ipt-account').val();
                var password = $('.ipt-account').val();
            $.ajax({
                type: 'post',
                url: 'register.php',
                data: {
                    username: username,
                    password: password,
                },
                success: function (result) {
                    var obj = JSON.parse(result)
                    console.log(obj)
                    $('#alter').css('display','flex');
                    var timer = setTimeout(function(){
                        $('#alter').css('display','none');
                    },500)
                    if(obj.code !== 0){
                        $('#alter').css('color','red');
                        $('#alter p').html(obj.msg)
                    }else{
                        $('#alter').css('color','green');
                        $('#alter p').html('注册成功,即将为您跳转至登录页面')
                        timer = setTimeout(function(){
                            // window.location = 'login.html'
                        },2000)
                    }
                    
                },
                error: function (msg) {
                    console.log(msg);
                }
            })
        })
    }

    
    return {
        send,
    }
})
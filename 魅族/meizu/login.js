define(['jqurey', 'jqcookie'], function (jqurey, jqcookie) {
    function send(){
        var username=document.getElementsByClassName("ipt-account")[0]
        var password =document.getElementsByClassName("ipt-account")[0]
        
        $('.login-login').click(function(){
            $.ajax({
                url:'login.php',
                type:'post',
                data:{
                    username:username.value,
                    password:password.value
                },
                success:function(result){
                    var obj = JSON.parse(result);
                    console.log(obj)
                    $('#alter').css('display','flex');
                    var timer = setTimeout(function(){
                        $('#alter').css('display','none');
                    },500)
                    if(obj.code !== 0){
                        $('#alter').css('color','red');
                        $('#alter p').html(obj.msg)
                    }else{
                        clearTimeout(timer)
                        $('#alter').css('color','green');
                        $('#alter p').html('登录成功,即将为您跳转至主页')
                        timer = setTimeout(function(){
                            $('#alter').css('display','none');
                            window.location = 'index.html'
                        },2000)
                    }
                    
                },
                error:function(msg){
                    console.log(msg)
                }
            })
        })
        
    }
    
    return {
        send,
    }
})
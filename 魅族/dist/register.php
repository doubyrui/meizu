<?php
header("Content-type:text/html;charset=utf-8");

    $username = $_POST['username'];
    $password = $_POST['password'];
   
    $arr = array('code' => 0,'msg' => '');


    if(!$username){
        $arr['code'] = 2;
        $arr['msg'] = '用户名不能为空';
        echo json_encode($arr);
        exit;
    }

    if(!$password){
        $arr['code'] = 3;
        $arr['msg'] = '密码不能为空';
        echo json_encode($arr);
        exit;
    }



    $link = mysql_connect('localhost','root','123456');

    if(!$link){
        echo '连接数据库失败';
        exit;
    }

    mysql_set_charset('utf8');

    mysql_select_db('meizu');

    $sql1 = "select * from user where username = '{$username}'";

    $res1 = mysql_query($sql1);

    $row = mysql_fetch_assoc($res1);

    if($row){
        $arr['code'] = 5;
        $arr['msg'] = '该用户名已存在';
        echo json_encode($arr);
        exit;
    }

    // $str = md5(md5(md5(md5($pwd).'zhouhao').'zhou').'hao');

    $sql2 = "insert into user(username,password) values ('{$username}','{$password}')";

    $res2 = mysql_query($sql2);

    if(!$sql2){
        $arr['code'] = 6;
        $arr['msg'] = '注册失败';
        echo json_encode($arr);
        exit;
    }

    $arr['msg'] = '注册成功';
    echo json_encode($arr);

    mysql_close($link);

?>
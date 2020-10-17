define([ 'parabola','jquery','jqcookie'], function (parabola,jqurey, jqcookie) {
    function carMove(){
        $('#car').mouseenter(function () {
            $(this).stop().animate({
                right: 0
            }, 1000)
        }).mouseleave(function () {
            $(this).stop().animate({
                right: -200
            }, 1000)
        })
    }
    function addDatas(){
        $.ajax({
            url: './json/goodslist.json',
            success: function (arr) {
                let str = ``;
                for (let i = 0; i < arr.length; i++) {
                    str += `
                    <div id="commodity">
            <img src="${arr[i].img}" alt="">
            <p id="name">${arr[i].name}</p>
            <p id="txt">${arr[i].txt}</p>
            <p id="pricee">${arr[i].price}</p>
            <button class="join" id="${arr[i].id}">加入购物车</button>
        </div>`
                }
                $('#wrap').html(str);
            },
            error: function (msg) {
                console.log(msg)
            }
        })
    }
    function nodeClick(){
        $('#wrap').on('click', '.join', function () {

            var id = this.id;

            var first = !($.cookie('goods'));
            if (first) {
                $.cookie('goods', JSON.stringify([{
                    id: id,
                    num: 1
                }]), { exrires: 7 })
            } else {
                var cookieArr = JSON.parse($.cookie('goods'));
                var same = false;
                for (var j = 0; j < cookieArr.length; j++) {
                    if (cookieArr[j].id == id) {
                        same = true;
                        break;
                    }
                }
                if (same) {
                    cookieArr[j].num++
                } else {
                    cookieArr.push({
                        id: id,
                        num: 1
                    })
                }
                $.cookie('goods', JSON.stringify(cookieArr), { exrires: 7 });
            }
            addCarData();
            SUM();
            ballMove($(this));
        });

        $('#goods').on('click','#del',function(){
            var id = $(this).closest('.good-box').remove().attr('id');
            var cookieArr = JSON.parse($.cookie('goods'));
            for(var o = 0;o<cookieArr.length;o++){
                if(cookieArr[o].id == id){
                    cookieArr.splice(o,1);
                    break;
                }
            }
            if(cookieArr.length){
                $.cookie('goods',JSON.stringify(cookieArr),{exrires:7});
            }else{
                $.cookie('goods',null)
            }
            SUM();
        })

        $('#goods').on('click','#add',function(){
            var cookieArr = JSON.parse($.cookie('goods'));
            var id = $(this).closest('.good-box').attr('id');
            for(var p = 0;p<cookieArr.length;p++){
                if(cookieArr[p].id == id){
                    cookieArr[p].num++;
                }
            }
            $.cookie('goods',JSON.stringify(cookieArr))
            SUM();
            addCarData();
        })

        $('#goods').on('click','#cut',function(){
            var cookieArr = JSON.parse($.cookie('goods'));
            var id = $(this).closest('.good-box').attr('id');
            for(var q = 0;q<cookieArr.length;q++){
                if(cookieArr[q].id == id){
                    if(cookieArr[q].num == 1){
                        alert('再减就没有了,请点击删除');
                    }else{
                         cookieArr[q].num--;
                    }
                }
            }
            $.cookie('goods',JSON.stringify(cookieArr))
            SUM();
            addCarData();
        })
    }
    function SUM() {
        var cookieStr = JSON.parse($.cookie('goods'));
        var sum = 0;
        if (cookieStr) {
            for (var n = 0; n < cookieStr.length; n++) {
                sum += cookieStr[n].num;
            }
        }
        $('#car-count').html(sum);
        $('.Shopping-cart>.count').html(sum);
    }
    function addCarData() {
        var cookieStr = JSON.parse($.cookie('goods'));
        if (!cookieStr) {
            return;
        }

        $.ajax({
            url:'../json/goodslist.json',
            success: function (arr) {
                var cookieArr = cookieStr;
                var newArr = [];
                for (var k = 0; k < arr.length; k++) {
                    for (var l = 0; l < cookieArr.length; l++) {
                        if (cookieArr[l].id == arr[k].id) {
                            arr[k].num = cookieArr[l].num;
                            newArr.push(arr[k]);
                            break;
                        }
                    }
                }
                var str = ``;
                var str1 = ``;
                var str2 = ``;
                for (var m = 0; m < newArr.length; m++) {
                    str += `<div class="good-box" id="${newArr[m].id}">
                        <div class="good-pic">
        <img style="width: 75px; height: 75px;" src="${newArr[m].img}" alt="">
    </div>
    <div class="right">
        <p class="good-name">${arr[m].name}</p>
        <button id="buy">购买</button>
        <button id="del">删除</button>
        <button id="add">+</button>
        <button id="cut">-</button>
        商品数量<span>${newArr[m].num}</span>
    </div>
</div>`;
                }
                var sum = 0;
                for (let m = 0; m < newArr.length; m++){
                    str1 += `<div class="main-goods">
                    <div class="main-goodsname">
                        <img class="goodsimg" src="${newArr[m].img}" alt="">
                        <p class="goodsname">${newArr[m].name}</p>
                    </div>
                    <div class="main-goodsprice">
                        <p class="goodsprice">${newArr[m].price}</p>
                    </div>
                    <div class="main-number">
                    <div class="main-number-big" id="${newArr[m].id}">
                        <button class="add">+</button>
                        <div class="goodsnumber">${newArr[m].num}</div>
                        <button class="red">-</button>
                    </div>
                    </div>
                    <div class="main-operation">
                        <button id="${newArr[m].id}" class="Del">删除</button>
                    </div>
                </div>`
                var Price = newArr[m].price.substr(1);
                sum += Price * newArr[m].num
                }
                str3 = `<div>
                <div class="amount">应付金额:</div>
                <div class="money">￥${sum}</div>
                <div class="settlement"><a href="settlement.html">结算</a> </div>
            </div>`
               
                $('.pay-hear').html(str3)
                $('#goods').html(str);
                $('.main').html(str1);

            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }
    function ballMove(oBtn){
        $("#ball").css({
          left: $(oBtn).offset().left,
          top: $(oBtn).offset().top,
          display: 'block'
        })
        console.log($(oBtn).offset().left)
        var oIcon = document.querySelector('.icon-car');
        var oCart = document.querySelector('.Shopping-cart>span');
        if(oIcon){
            var offsetX = $(".icon-car").offset().left - $("#ball").offset().left;
            var offsetY =  $(".icon-car").offset().top - $("#ball").offset().top;
        }else if(oCart){
            var offsetX = $(".Shopping-cart>span").offset().left - $("#ball").offset().left;
            var offsetY =  $(".Shopping-cart>span").offset().top - $("#ball").offset().top;
        }
        
        console.log(offsetX,offsetY)
        var bool = new Parabola({
          el: "#ball",
          offset: [offsetX, offsetY],
          duration: 500,
          curvature: 0.001,
          autostart: true,
          callback: function(){
            $("#ball").hide();
          }
        })
        // bool.start();
      }
return {
    addCarData,
    addDatas,
    SUM,
    carMove,
    nodeClick,
    ballMove
}
})
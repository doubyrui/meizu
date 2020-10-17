define(['goodslist','jquery','jqcookie'],function(goodslist,jquery,jqcookie){
    function nodeClick() {
        first()
        function first() {
            var first = !($.cookie('goods'));
            if (first) {
                str = `<tr><td style="height:80px;line-height:80px">购物车是空的</td></tr>`
                $('.main-goods').html(str);
            }
            else {
                goodslist.addCarData();
            }
        }

        $('.main').on('click', '.add', function () {
            var id = $(this).parent().attr('id')
            console.log(id)
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
            goodslist.addCarData();
        })

        $('.main').on('click', '.red', function () {
            var cookieArr = JSON.parse($.cookie('goods'));
            var id = $(this).parent().attr('id')
            for (var q = 0; q < cookieArr.length; q++) {
                if (cookieArr[q].id == id) {
                    if (cookieArr[q].num == 1) {
                        alert('再减就没有了,请点击删除');
                    } else {
                        cookieArr[q].num--;
                    }
                }
            }
            $.cookie('goods', JSON.stringify(cookieArr));
            goodslist.addCarData();
        })

        $('.main').on('click', '.Del', function () {
            var id = $(this).attr('id');
            console.log(id)
            var cookieArr = JSON.parse($.cookie('goods'));
            for (var o = 0; o < cookieArr.length; o++) {
                if (cookieArr[o].id == id) {
                    cookieArr.splice(0, 1);
                    break;
                }
            }
            if (cookieArr.length) {
                $.cookie('goods', JSON.stringify(cookieArr), { exrires: 7 });
            } else {
                $.cookie('goods', null)
            }
            first();
        })
    }
    return{
        nodeClick,
    }
})
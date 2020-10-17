require.config({
    // paths:{
    //     jqurey:'jquery-1.11.3',
    //     jqcookie:'jquery.cookie',
    //     goodslist:'goodslist'
    // },
    paths: {
        jquery: 'jquery-1.11.3',
        jqcookie: 'jquery.cookie',
        goodslist:'goodslist',
        parabola:'parabola'
    },
    shim: {
        "jqcookie": ['jquery'],
        "goodslist": ['jquery'],
        parabola: {
            exports: "_"
        }
    }
})

require(['goodslist'], function (goodslist) {
    goodslist.addDatas();
    goodslist.addCarData();
    goodslist.SUM();
    goodslist.carMove();
    goodslist.nodeClick();
})
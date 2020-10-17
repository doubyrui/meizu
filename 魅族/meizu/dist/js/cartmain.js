require.config({
    paths:{
        jquery:'jquery-1.11.3',
        jqcookie:'jquery.cookie',
        goodslist:'goodslist',
        cart:'cart'
    },
    shim:{
        'jqcookie':['jquery']
    }
})

require(['cart','goodslist'],function(cart,goodslist){
    goodslist.addCarData();
    cart.nodeClick();
})
define(['jqurey', 'jqcookie'], function (jqurey, jqcookie) {
    function login() {
        timer = null;
        $('.login').mouseenter(function () {
            clearTimeout(timer)

            $('.login-denglu').css('display', 'block');
            $(this).mouseleave(function () {
                var timer = setTimeout(function () {
                    $('.login-denglu').css('display', 'none')
                }, 1000)
                $('.login-denglu').mouseenter(function () {
                    clearTimeout(timer)
                    $(this).css('display', 'block')
                })
            })
            
        })
        // var oBig = document.getElementsByClassName('login')[0];
        // var oSmall = document.getElementsByClassName('login-denglu')[0];
        // oBig.onmouseout = function () {
        //     var timer = setTimeout(function () {
        //         oSmall.style.display = 'none'
        //     }, 100)
        //     oBig.onmouseover = function () {
        //         oSmall.style.display = 'block';
        //         clearTimeout(timer)
        //     }
        //     oSmall.onmouseover = function () {
        //         this.style.display = 'block'
        //     }
        // }
    }
    function nav() {
        $('.head-heart-nav-1').mouseenter(function () {
            $('.table').css('height', '266px')
            $('.table-heart').css('height', '182px')
            $('.table-heart').find('li').css('display', 'block')

        }).mouseleave(function () {
            $('.table').css('height', '0px')
            $('.table-heart').css('height', '0px')
        })
        $('.table').mouseenter(function () {
            $('.table').css('height', '266px')
            $('.table-heart').css('height', '182px')
        }).mouseleave(function () {
            $('.table').css('height', '0px')
            $('.table-heart').css('height', '0px')
        })
    }
    function tab(){
        $(function(){
            var aBtns = $(".head-heart-nav").find(".head-heart-nav-1");
            var aDivs = $(".table-heart").find("ul");
            aBtns.mouseover(function(){
              aBtns.attr("class", "");
              aDivs.css("display", 'none');
              aDivs.eq($(this).index()).css("display", 'block');
            })
          })
    }
    function details() {
        $("#small")
            .mouseenter(function () {
                $("#mark,#big").show();
            })
            .mouseleave(function () {
                $("#mark,#big").hide();
            })
            .mousemove(function (ev) {
                var l = ev.clientX - $(this).offset().left - 100;
                l = Math.max(0, l);
                l = Math.min(l, 360);
                var t = ev.clientY - $(this).offset().top - 100;
                t = Math.max(0, t);
                t = Math.min(t, 360);
                $("#mark").css({
                    left: l,
                    top: t
                })
                $("#big img").css({
                    left: -2 * l,
                    top: -2 * t
                })
            })
    }
    function banner() {
        const oBanner = document.querySelector(".banner");
        const oUl = document.querySelector(".banner .imgBox");
        const aBtns = document.querySelectorAll(".banner .pointBox li");
        const LeftANDRightBtn = document.querySelectorAll(".leftRightTabs a");
        let iNow = 1;
        let timer = null;
        let isRunning = false;
        timerInner();
        for (var i = 0; i < aBtns.length; i++) {
            aBtns[i].index = i;
            aBtns[i].onclick = function () {
                iNow = this.index + 1;
                tab();
            };
        }
        function timerInner() {
            timer = setInterval(function () {
                iNow++;
                tab();
            }, 2000);
        }
        function tab() {
            console.log(iNow);
            for (var i = 0; i < aBtns.length; i++) {
                aBtns[i].className = "";
            }
            if (iNow == aBtns.length + 1) {
                aBtns[0].className = "active";
            } else if (iNow == 0) {
                aBtns[aBtns.length - 1].className = "active";
            } else {
                console.log(aBtns[iNow - 1])
                aBtns[iNow - 1].className = "active";
            }
            isRunning = true;

            startMove(oUl, { left: iNow * -1920 }, function () {
                if (iNow >= aBtns.length + 1) {
                    iNow = 1;
                    oUl.style.left = "-1920px";
                } else if (iNow <= 0) {
                    iNow = 5;
                    oUl.style.left = iNow * -1920 + "px";
                }
                isRunning = false;
            });
        }

        oBanner.onmouseenter = function () {
            clearInterval(timer);
        };
        oBanner.onmouseleave = function () {
            timerInner();
        };
        LeftANDRightBtn[0].onclick = function () {
            if (!isRunning) {
                iNow--;
                tab();
            }
            return false;
        };
        LeftANDRightBtn[1].onclick = function () {
            if (!isRunning) {
                iNow++;
                tab();
            }
            return false;
        };
    }
    function startMove(node, cssObj, complete) {
        clearInterval(node.timer);
        node.timer = setInterval(function () {
            var isEnd = true;
            for (var attr in cssObj) {
                var iTarget = cssObj[attr];
                var iCur = null;
                if (attr == "opacity") {
                    iCur = parseInt(parseFloat(getStyle(node, "opacity")) * 100);
                } else {
                    iCur = parseInt(getStyle(node, attr))
                }
                var speed = (iTarget - iCur) / 8;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (attr == "opacity") {
                    iCur += speed;
                    node.style.opacity = iCur / 100;
                    node.style.filter = `alpha(opacity=${iCur})`;
                } else {
                    node.style[attr] = iCur + speed + 'px';
                }
                if (iCur != iTarget) {
                    isEnd = false;
                }
            }
            if (isEnd) {
                clearInterval(node.timer);
                if (complete) {
                    complete.call(node);
                }
            }
        }, 30);
    }
    function getStyle(node, cssStyle) {
        if (node.currentStyle) {
            return node.currentStyle[cssStyle];
        } else {
            return getComputedStyle(node)[cssStyle];
        }
    }
    function indexAjax() {
        $.ajax({
            url: '../json/phone-box1.json',
            success: function (arr) {
                let str = ``;
                for (let i = 0; i < arr.length; i++) {
                    str += `<a href="details.html?id#${arr[i].id}">
                    <li class="phone8 bag1">
                    <p class="zi1">${arr[i].name}</p>
                    <p class="zi2">${arr[i].txt}</p>
                    <p class="zi3">${arr[i].price}</p>
                    <img src="${arr[i].img}" alt="">
                </li>
                </a>`
                }
                $('.phone-box1 ul').html(str);
            },
            error: function (msg) {
                console.log(msg)
            }
        })
        $.ajax({
            url: '../json/phone.json',
            success: function (arr) {
                let str = ``;
                for (let i = 0; i < arr.length; i++) {
                    str += `<a href="details.html?id#${arr[i].id}"><li class="phone9">
                    <img src="${arr[i].img}" alt="">
                    <p class="zi4">${arr[i].name}</p>
                    <p class="zi5">${arr[i].txt}</p>
                    <p class="zi6">${arr[i].price}</p>
                </li></a>`
                }
                $('.phone-box2 ul').html(str);
            },
            error: function (msg) {
                console.log(msg)
            }
        })
        $.ajax({
            url: '../json/goods.json',
            success: function (arr) {
                let str = ``;
                for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < arr[i].length; j++) {
                        str += ``
                        if (arr[i][j].img) {
                            str += `<a href="details.html?id#${arr[i][j].id}"><li class="ej-1-1"><img src="${arr[i][j].img}" class="img-q" alt="">
                            <p class="ej-1-1-zi1">${arr[i][j].name}</p>
                            <p class="ej-1-1-zi2">${arr[i][j].txt}</p>
                            <p class="ej-1-1-zi3">${arr[i][j].price}</p>
                        </li></a>`
                        } else {
                            str += `<a href="details.html?id#${arr[i][j].id}"><li class="ej-1-1 ej-1-d${i + 1}"><p class="ej-1-d-zi1">${arr[i][j].name}</p>
                            <p class="ej-1-d-zi2">${arr[i][j].txt}</p>
                            <p class="ej-1-d-zi3">${arr[i][j].price}</p>
                        </li></a>`
                        }
                    }
                }
                $('.ej-1 ul').html(str);
            },
            error: function (msg) {
                console.log(msg)
            }
        })
        $.ajax({
            url: '../json/pj.json',
            success: function (arr) {
                let str = ``;
                for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < arr[i].length; j++) {
                        str += ``
                        if (arr[i][j].img) {
                            str += `<a href="details.html?id#${arr[i][j].id}"><li class="pj-1-1"><img src="${arr[i][j].img}" class="img-q" alt="">
                            <p class="ej-1-1-zi1">${arr[i][j].name}</p>
                            <p class="ej-1-1-zi2">${arr[i][j].txt}</p>
                            <p class="ej-1-1-zi3">${arr[i][j].price}</p>
                        </li></a>`
                        } else {
                            str += `<a href="details.html?id#${arr[i][j].id}"><li class="pj-1-1 pj-1-d${i + 1}"><p class="ej-1-d-zi1">${arr[i][j].name}</p>
                            <p class="ej-1-d-zi2">${arr[i][j].txt}</p>
                            <p class="ej-1-d-zi3">${arr[i][j].price}</p>
                        </li></a>`
                        }
                    }
                }
                $('.pj-1 ul').html(str);
            },
            error: function (msg) {
                console.log(msg)
            }
        })
        $.ajax({
            url: '../json/sh.json',
            success: function (arr) {
                let str = ``;
                for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < arr[i].length; j++) {
                        str += ``
                        if (arr[i][j].img) {
                            str += `<a href="details.html?id#${arr[i][j].id}"><li class="sh-1-1"><img src="${arr[i][j].img}" class="img-q" alt="">
                            <p class="ej-1-1-zi1">${arr[i][j].name}</p>
                            <p class="ej-1-1-zi2">${arr[i][j].txt}</p>
                            <p class="ej-1-1-zi3">${arr[i][j].price}</p>
                        </li></a>`
                        } else {
                            str += `<a href="details.html?id#${arr[i][j].id}"><li class="sh-1-1 sh-1-d${i + 1}"><p class="ej-1-d-zi1">${arr[i][j].name}</p>
                            <p class="ej-1-d-zi2">${arr[i][j].txt}</p>
                            <p class="ej-1-d-zi3">${arr[i][j].price}</p>
                        </li></a>`
                        }
                    }
                }
                $('.sh-1 ul').html(str);
            },
            error: function (msg) {
                console.log(msg)
            }
        })
        $.ajax({
            url: '../json/tabphone.json',
            success: function (arr) {
                let str = ``;
                for (let i = 0; i < arr.length; i++) {
                    str += `<a href="details.html?id#${arr[i].id}"><li>
                    <img src="${arr[i].img}" alt="">
                    <p>${arr[i].name}</p>
                    <p>${arr[i].price}</p>
                </li></a>`
                }
                $('.tab-u1').html(str);
            },
            error: function (msg) {
                console.log(msg)
            }
        })
        $.ajax({
            url: '../json/tabej.json',
            success: function (arr) {
                let str = ``;
                for (let i = 0; i < arr.length; i++) {
                    str += `<a href="details.html?id#${arr[i].id}"><li>
                    <img src="${arr[i].img}" alt="">
                    <p>${arr[i].name}</p>
                    <p>${arr[i].price}</p>
                </li></a>`
                }
                $('.tab-u2').html(str);
            },
            error: function (msg) {
                console.log(msg)
            }
        })
        $.ajax({
            url: '../json/tabpj.json',
            success: function (arr) {
                let str = ``;
                for (let i = 0; i < arr.length; i++) {
                    str += `<a href="details.html?id#${arr[i].id}"><li>
                    <img src="${arr[i].img}" alt="">
                    <p>${arr[i].name}</p>
                    <p>${arr[i].price}</p>
                </li></a>`
                }
                $('.tab-u3').html(str);
            },
            error: function (msg) {
                console.log(msg)
            }
        })
        $.ajax({
            url: '../json/tabsh.json',
            success: function (arr) {
                let str = ``;
                for (let i = 0; i < arr.length; i++) {
                    str += `<a href="details.html?id#${arr[i].id}"><li>
                    <img src="${arr[i].img}" alt="">
                    <p>${arr[i].name}</p>
                    <p>${arr[i].price}</p>
                </li></a>`
                }
                $('.tab-u4').html(str);
            },
            error: function (msg) {
                console.log(msg)
            }
        })
       
    }

    return {
        login,
        nav,
        banner,
        indexAjax,
        details,
        tab
    }
})
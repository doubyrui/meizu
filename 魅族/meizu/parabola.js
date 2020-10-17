;
(function () {
    var _$ = function (_this) {
        return _this.constructor == jQuery ? _this : $(_this);
    };

    function now() {
        return +new Date();
    }


    function toInteger(text) {
        text = parseInt(text);
        return isFinite(text) ? text : 0;
    }

    var Parabola = function (options) {
        this.initialize(options);
    };
    Parabola.prototype = {
        constructor: Parabola,
        /**
    
         * @classDescription 
         * @param {Object} options 
         */
        initialize: function (options) {
            this.options = this.options || this.getOptions(options);
            var ops = this.options;
            if (!this.options.el) {
                return;
            }
            this.$el = _$(ops.el);
            this.timerId = null;
            this.elOriginalLeft = toInteger(this.$el.css("left"));
            this.elOriginalTop = toInteger(this.$el.css("top"));

            if (ops.targetEl) {
                this.driftX = toInteger(_$(ops.targetEl).css("left")) - this.elOriginalLeft;
                this.driftY = toInteger(_$(ops.targetEl).css("top")) - this.elOriginalTop;
            } else {
                this.driftX = ops.offset[0];
                this.driftY = ops.offset[1];
            }
            this.duration = ops.duration;
            // 澶勭悊鍏紡甯搁噺
            this.curvature = ops.curvature;
          
            this.b = ( this.driftY - this.curvature * this.driftX * this.driftX ) / this.driftX;

            
            if (ops.autostart) {
                this.start();
            }
        },

        getOptions: function (options) {
            if (typeof options !== "object") {
                options = {};
            }
            options = $.extend({}, defaultSetting, _$(options.el).data(), (this.options || {}), options);

            return options;
        },
       
        domove: function (x, y) {

            this.$el.css({
                position: "absolute",
                left: this.elOriginalLeft + x,
                top: this.elOriginalTop + y
            });

            return this;
        },

        step: function (now) {
            var ops = this.options;
            var x, y;
            if (now > this.end) {
                // 杩愯缁撴潫
                x = this.driftX;
                y = this.driftY;
                this.domove(x, y);
                this.stop();
                if (typeof ops.callback === 'function') {
                    ops.callback.call(this);
                }
            } else {
                //x 姣忎竴姝ョ殑X杞寸殑浣嶇疆
                x = this.driftX * ((now - this.begin) / this.duration);
                //姣忎竴姝ョ殑Y杞寸殑浣嶇疆y = a*x*x + b*x + c;   c==0;
                y = this.curvature * x * x + this.b * x;

                this.domove(x, y);
                if (typeof ops.stepCallback === 'function') {
                    ops.stepCallback.call(this,x,y);
                }
            }
            return this;
        },

        setOptions: function (options) {
            this.reset();
            if (typeof options !== "object") {
                options = {};
            }
            this.options = $.extend(this.options,options);
            this.initialize(this.options);
            return this;
        },

        start: function () {
            var self = this;
            // 璁剧疆璧锋鏃堕棿
            this.begin = now();
            this.end = this.begin + this.duration;
            if (this.driftX === 0 && this.driftY === 0) {
                return;
            }
            /*timers.push(this);
             Timer.start();*/
            if (!!this.timerId) {
                clearInterval(this.timerId);
                this.stop();
            }
            this.timerId = setInterval(function () {
                var t = now();
                self.step(t);

            }, 13);
            return this;
        },

        reset: function (x, y) {
            this.stop();
            x = x ? x : 0;
            y = y ? y : 0;
            this.domove(x, y);
            return this;
        },

        stop: function () {
            if (!!this.timerId) {
                clearInterval(this.timerId);

            }
            return this;
        }
    };
    var defaultSetting = {
        el: null,
        //鍋忕Щ浣嶇疆
        offset: [0, 0],
        //缁堢偣鍏冪礌锛岃繖鏃跺氨浼氳嚜鍔ㄨ幏鍙栬鍏冪礌鐨刲eft銆乼op锛岃缃簡杩欎釜鍙傛暟锛宱ffset灏嗗け鏁�
        targetEl: null,
        //杩愬姩鐨勬椂闂达紝榛樿500姣
        duration: 500,
        //鎶涚墿绾挎洸鐜囷紝灏辨槸寮洸鐨勭▼搴︼紝瓒婃帴杩戜簬0瓒婂儚鐩寸嚎锛岄粯璁�0.001
        curvature: 0.001,
        //杩愬姩鍚庢墽琛岀殑鍥炶皟鍑芥暟
        callback: null,
        // 鏄惁鑷姩寮€濮嬶紝榛樿涓篺alse
        autostart: false,
        //杩愬姩杩囩▼涓墽琛岀殑鍥炶皟鍑芥暟
        stepCallback: null
    };
    window.Parabola = Parabola;
})();
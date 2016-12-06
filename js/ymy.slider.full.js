/**
 * easy silder jQuery plugin
 * 基于css3动画的简单轮播插件
 * by @yumengyuan
 * create 2016/12/6
 * last update 2016/12/6
 * version @1.0
 */
(function ($) {
    var flag = true,
        now = 0,
        auto

    /*******************************************************************************************************************/
    // 插件入口
    $.fn.easySlider = function (options) {
        var $element = $(this),
            instance,
        // 调用
        instance = new easySlider($element, options)
        instance._init()
    }
    /*******************************************************************************************************************/
    // 构造函数
    var easySlider = function ($element, settings) {
        let _this = this
        // 合并默认参数和实际参数
        _this.options = $.extend({}, _this.options, settings);
        _this.element = $element
    }
    /*******************************************************************************************************************/
    // 内置默认参数
    easySlider.prototype.options = {
        /*默认自动创建切换按钮*/
        autoButton: true,
        /*轮播切换时间*/
        duration: 1,
        /*自动轮播停留时间*/
        stay: 5
    };
    /*******************************************************************************************************************/
    // 初始化
    easySlider.prototype._init = function () {
        let _this = this,
            element = _this.element,
            ops  = _this.options
        let imgBox = _this._createElement()
        easySlider.prototype.imgBox = imgBox
        if(ops.autoButton) {
            let button = _this._createButton()
            _this._bind(button.left, button.right)
        }else {
            console.log($(ops.left))
            _this._bind($(ops.left), $(ops.right))
        }
        _this._autoPlay()
    }
    /*******************************************************************************************************************/
    // 自动生成图片节点
    easySlider.prototype._createElement = function () {
        let _this = this,
            element = _this.element,
            ops  = _this.options,
            img0 = $("<div class='slider-img-0'></div>"),
            img1 = $("<div class='slider-img-1'></div>"),
            img2 = $("<div class='slider-img-2'></div>")

        //  初始化图片
        img1.css({ backgroundImage: `url(${ops.imgs[0]})` })
        element.append(img0, img1, img2)
        return { img0, img1, img2 }
    }
    /*******************************************************************************************************************/
    // 创建切换按钮
    easySlider.prototype._createButton = function () {
        let _this = this,
            element = _this.element
        /* 创建左按钮 */
        let left = $('<span class="slider-left"> <i class="slider-iconfont">&#xe61f;</i></span>')
        /* 创建右按钮 */
        let right = $('<span class="slider-right"> <i class="slider-iconfont">&#xe61f;</i></span>')
        element.append(left, right)
        return { left, right }
    }
    /*******************************************************************************************************************/
    // 绑定事件
    easySlider.prototype._bind = function (left, right) {
        let _this = this,
            element = _this.element
        /* 向左切换按钮 */
        left.on('click', function () {
            if(flag) {
                _this._left()
            }
        })
        /* 向右切换按钮 */
        right.on('click', function () {
            if(flag) {
                _this._right()
            }
        })
        /* 移入轮播图，自动轮播关闭 */
        element.on('mouseover',function () {
            clearInterval(auto)
        })
        /* 移出轮播图，自动轮播关闭 */
        element.on('mouseout',function () {
            _this._autoPlay()
        })
    }
    /*******************************************************************************************************************/
    // 向左切换
    easySlider.prototype._left = function () {
        let _this = this,
            ops  = _this.options,
            imgs = ops.imgs,
            { img0, img1, img2 } =  _this.imgBox
        flag = false
        /* 动画执行前准备工作 */
        if(now == imgs.length - 1){
            img2.css({ backgroundImage: `url(${imgs[0]})` })
        }else {
            img2.css({ backgroundImage: `url(${imgs[now+1]})` })
        }
        /* 执行动画 */
        img0.css({ webkitAnimation: `slider-moveLeft ${ops.duration}s forwards` })
        img1.css({ webkitAnimation: `slider-moveLeft ${ops.duration}s forwards` })
        img2.css({ webkitAnimation: `slider-moveLeft ${ops.duration}s forwards` })
        setTimeout(function () {
            /* 动画结束还原 */
            if(now == imgs.length - 1){
               img1.css({ backgroundImage: `url(${imgs[0]})` })
               now = 0
            }else {
               img1.css({ backgroundImage: `url(${imgs[now+1]})` })
               now++
            }
            img0.css({ webkitAnimation: "slider-moveOut 0s forwards" })
            img1.css({ webkitAnimation: "slider-moveOut 0s forwards" })
            img2.css({ webkitAnimation: "slider-moveOut 0s forwards" })
            flag = true
        },ops.duration*1000)
    }
    /*******************************************************************************************************************/
    // 向右切换
    easySlider.prototype._right = function () {
        let _this = this,
            ops  = _this.options,
            imgs = ops.imgs,
            { img0, img1, img2 } =  _this.imgBox,
        flag = false
        /* 动画执行前准备工作 */
        if(now == 0){
            img0.css({ backgroundImage: `url(${imgs[imgs.length - 1]})` })
        }else {
            console.log('1')
            img0.css({ backgroundImage: `url(${imgs[now-1]})` })
        }
        /* 执行动画 */
        img0.css({ webkitAnimation: `slider-moveRight ${ops.duration}s forwards` })
        img1.css({ webkitAnimation: `slider-moveRight ${ops.duration}s forwards` })
        img2.css({ webkitAnimation: `slider-moveRight ${ops.duration}s forwards` })
        setTimeout(function () {
            /* 动画结束还原 */
            if(now == 0){
               img1.css({ backgroundImage: `url(${imgs[imgs.length - 1]})` })
               now = imgs.length - 1
            }else {
               img1.css({ backgroundImage: `url(${imgs[now-1]})` })
               now--
            }
            img0.css({ webkitAnimation: "slider-moveOut 0s forwards" })
            img1.css({ webkitAnimation: "slider-moveOut 0s forwards" })
            img2.css({ webkitAnimation: "slider-moveOut 0s forwards" })
            flag = true
        }, ops.duration*1000)
    }
    /*******************************************************************************************************************/
    // 自动轮播
    easySlider.prototype._autoPlay = function () {
        var _this = this,
            ops = _this.options
        auto = setInterval(function () {
            _this._left()
        },ops.stay*1000)

    }

})(window.jQuery)

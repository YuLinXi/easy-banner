/**
 * easy silder jQuery plugin
 * 基于css3动画的简单轮播插件
 * by @yumengyuan
 * create 2016/12/6
 * last update 2016/12/6
 */

(function ($) {
    var flag = true,
        now = 0

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
        var _this = this
        // 合并默认参数和实际参数
        _this.options = $.extend({}, _this.options, settings);
        _this.element = $element
    }
    /*******************************************************************************************************************/
    // 内置默认参数
    easySlider.prototype.options = {
        /*默认自动创建切换按钮*/
        autoButton: true,
        /*轮播手动切换时间*/
        handDuration: 1000,
        /*自动轮播切换时间*/
        autoDuration: 2000,
    };
    /*******************************************************************************************************************/
    // 初始化
    easySlider.prototype._init = function () {
        var _this = this,
            element = _this.element,
            ops  = _this.options
        var imgBox = _this._createElement()
        easySlider.prototype.imgBox = imgBox
        if(ops.autoButton) {
            _this._createButton()
        }else {
            console.log($(ops.left))
            _this._bind($(ops.left), $(ops.right))
        }
    }
    /*******************************************************************************************************************/
    // 自动生成图片节点
    easySlider.prototype._createElement = function () {
        var _this = this,
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
        var _this = this,
            element = _this.element
    }
    /*******************************************************************************************************************/
    // 绑定事件
    easySlider.prototype._bind = function (left, right) {
        var _this = this,
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
    }
    /*******************************************************************************************************************/
    // 向左切换
    easySlider.prototype._left = function () {
        var _this = this,
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
        img0.css({ webkitAnimation: "slider-moveLeft 2s forwards" })
        img1.css({ webkitAnimation: "slider-moveLeft 2s forwards" })
        img2.css({ webkitAnimation: "slider-moveLeft 2s forwards" })

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
        },2000)
    }
    /*******************************************************************************************************************/
    // 向右切换
    easySlider.prototype._right = function () {
        var _this = this,
            ops  = _this.options,
            imgs = ops.imgs,
            { img0, img1, img2 } =  _this.imgBox
        flag = false
        /* 动画执行前准备工作 */
        if(now == 0){
            img0.css({ backgroundImage: `url(${imgs[imgs.length - 1]})` })
        }else {
            img0.css({ backgroundImage: `url(${imgs[now-1]})` })
        }
        /* 执行动画 */
        img0.css({ webkitAnimation: "slider-moveRight 2s forwards" })
        img1.css({ webkitAnimation: "slider-moveRight 2s forwards" })
        img2.css({ webkitAnimation: "slider-moveRight 2s forwards" })
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
        },2000)
    }

})(window.jQuery)

# 基于CSS3动画的简单jQuery轮播插件

关于API、更多参数配置可以查看源码ymy.slider.full.js 文件，有详细的注释。
### 更新历史
- 2016.12.06 第一次提交，实现简单手动动无缝轮播功能。
    1. 可自定义切换按钮和自动创建。
    2. 轮播图片根据盒子节点的宽高进行自适应。
- 等待更新...

### 快速使用
```
    <style>
        .box {
            width: 100%;   
            height: 500px;
            overflow: hidden;
            position: relative;
        }
    </style>  
     
    <script>
        $('.box').easySlider({
            imgs: imgs,
            left: '.left',
            right: '.right',
        })
    <script>
```

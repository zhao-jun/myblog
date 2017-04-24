import React from  'react';
import "./CanvasBg.scss";

// import imgOne from 'http://www.zandooy.com/HomeLarge.png';
import Footer from '../Footer/Footer';

export class CanvasBg extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        this.updateCanvas();
    }

/*    updateCanvas() {
        const ctx = this.canvas.getContext('2d');

        var that = this;

        var imgs=new Image();
        imgs.src='./2.png';

        //设置宽高
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight - 150;
        imgs.onload=function()
        {
            ctx.drawImage(imgs,0,0);
        };



        var canvasWidth = window.innerWidth,
            canvasHeight = window.innerHeight - 150;
        //参数
        var dots = {
            num:parseInt(window.innerWidth/6), //粒子数
            distance:60,  //粒子相距的距离为50连线
            arr:[]  //粒子实例对象数组
        };

        var mousePosition = {
            x : -100,
            y : -100
        };

        //粒子类
        function Dot() {
            this.x = Math.random() * canvasWidth;
            this.y = Math.random() * canvasHeight;

            //x，y方向移动速度，不能为0
            this.vx = (-.5 + Math.random()) || 0.5;
            this.vy = (-.5 + Math.random()) || 0.5;
            //半径
            this.radius = Math.random()*8 +2 ;
            //粒子颜色
            // this.color = 'hsl('+Math.random()*360+',100%,50%)';
            this.color  = 'rgba(204, 204, 204, 0.4)';
        }

        Dot.prototype.draw = function () {
            ctx.beginPath();
            //设置颜色
            ctx.fillStyle = this.color;
            ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
            ctx.fill();
        };

        //粒子数组
        function createDots(){
            for (var i = 0; i < dots.num; i++) {
                dots.arr.push(new Dot);
            }
        }

        function moveDots() {

            for (var i = 0; i < dots.num; i++) {
                //超出范围则改变方向
                if(dots.arr[i].x <= 0 || dots.arr[i].x >= canvasWidth){
                    dots.arr[i].vx = -dots.arr[i].vx;
                }
                if(dots.arr[i].y <= 0 || dots.arr[i].y >= canvasHeight){
                    dots.arr[i].vy = -dots.arr[i].vy;
                }
                dots.arr[i].x += dots.arr[i].vx;
                dots.arr[i].y += dots.arr[i].vy;
            }
        }

        function drawDots() {
            ctx.drawImage(imgs,0,0);
            for(var i=0;i<dots.num;i++){
                dots.arr[i].draw();
            }
        }

/!*        //距离小于30绘制线
        function connectDots() {
            for (var i=0;i<dots.num;i++){
                for(var j=1;j<dots.num;j++){
                    if((Math.abs(dots.arr[i].x-dots.arr[j].x) <= dots.distance) && (Math.abs(dots.arr[i].y-dots.arr[j].y) <= dots.distance)){
                        if((Math.abs(dots.arr[i].x-mousePosition.x) <= 30) && (Math.abs(dots.arr[i].y-mousePosition.y) <= 30)){
                            ctx.beginPath();
                            ctx.strokeStyle = dots.arr[i].color;
                            ctx.moveTo(dots.arr[i].x,dots.arr[i].y);
                            ctx.lineTo(dots.arr[j].x,dots.arr[j].y);
                            ctx.stroke();
                            ctx.closePath();
                        }
                    }
                }
            }
        }*!/
        //小于距离连线
        function connectDots() {
            for (var i=0;i<dots.num;i++){
                for(var j=1;j<dots.num;j++){
                    if((Math.abs(dots.arr[i].x-dots.arr[j].x) <= dots.distance) && (Math.abs(dots.arr[i].y-dots.arr[j].y) <= dots.distance)){
                        ctx.beginPath();
                        ctx.strokeStyle = dots.arr[i].color;
                        ctx.moveTo(dots.arr[i].x,dots.arr[i].y);
                        ctx.lineTo(dots.arr[j].x,dots.arr[j].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        }
        //鼠标所在连线
        function drawLines() {
            for (var i=0;i<dots.num;i++){
                if((Math.abs(dots.arr[i].x-mousePosition.x) <= 1.5 * dots.distance) && (Math.abs(dots.arr[i].y-mousePosition.y) <= 1.5 * dots.distance)){
                    ctx.beginPath();
                    ctx.strokeStyle = dots.arr[i].color;
                    ctx.moveTo(dots.arr[i].x,dots.arr[i].y);
                    ctx.lineTo(mousePosition.x,mousePosition.y);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
        //鼠标所在圆点
        function drawCircle() {
            ctx.beginPath();
            ctx.arc(mousePosition.x, mousePosition.y, 8, 0, 360);
            ctx.closePath();
            ctx.fillStyle = 'rgba(204, 204, 204, 0.4)';
            ctx.fill();
        }



        function animateDots(){
/!*            that.canvas.width = window.innerWidth;
            that.canvas.height = window.innerHeight - 150;
            canvasWidth = window.innerWidth;
            canvasHeight = window.innerHeight - 150;*!/
            //清空
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            moveDots();
            connectDots();
            drawLines();
            drawDots();
            drawCircle();
            requestAnimationFrame(animateDots);
        }

        this.canvas.addEventListener('mousemove',function(e){
            mousePosition.x = e.offsetX;
            mousePosition.y = e.offsetY;
        });
        this.canvas.addEventListener('mouseleave',function(e){
            mousePosition.x = -100;
            mousePosition.y = -100;
        });
        this.canvas.addEventListener('touchmove',function(e){
            mousePosition.x = e.changedTouches[0].offsetX;
            mousePosition.y = e.changedTouches[0].offsetY;
        });
        this.canvas.addEventListener('touchend',function(e){
            mousePosition.x = -100;
            mousePosition.y = -100;
        });

        createDots();
        requestAnimationFrame(animateDots);
    }*/
    updateCanvas(){
        window.requestAnimationFrame = ( function() {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function( callback ) {
                    window.setTimeout( callback, 1000 / 60 );
                };
        })();


        var that = this;
        var image = {
            'back': { 'url':'http://www.zandooy.com/HomeLarge.png', 'img':null }
            // 'front': { 'url':two, 'imgs':null }
        };

        var canvas = {
            'temp':null,
            'draw':null
        };

        var mouseDown = false;

        function getEventCoords(e) {
            if(e.changedTouches){
                return {
                    pageX : e.changedTouches[0].pageX,
                    pageY : e.changedTouches[0].pageY
                }
            }
            return {
                pageX : e.pageX,
                pageY : e.pageY
            }
        }

        function getLocalCoords(elem,coords) {
            var ox = 0, oy = 0;
            while (elem != null) {
                ox += elem.offsetLeft;
                oy += elem.offsetTop;
                elem = elem.offsetParent;
            }
            return { 'x': coords.pageX - ox, 'y': coords.pageY - oy };
        }

        function fullAmount(ctx,can,stride) {
            var i, l;
            // var ctx = can.getContext('2d');
            var count, total;
            var pixels, pdata;

            // if (!stride || stride < 1) { stride = 1; }

            // 每个像素，都存在着四方面的信息，即 RGBA 值
            stride *= 4;

            pixels = ctx.getImageData(0, 0, can.width, can.height);
            pdata = pixels.data;
            l = pdata.length;

            total = l / stride|0;

            for (i = count = 0; i < l; i += stride) {
                if (pdata[i] != 0) {
                    count++;
                }
            }
            return count / total;
        }



        let main , tempctx , mainctx,num;

        function recompositeCanvases() {

            main = that.canvas;

            canvas.temp.width = canvas.temp.width;

            //tempctx是画在遮盖图上面的，然后再在tempctx上利用globalCompositeOperation画出原图，因为canvas.draw暂时为空，所以看不到原图，只能看到遮盖图
            //从底到上分别为遮盖图，canvas.temp/canvas.draw，原图，然后移动画在canvas.draw上

            tempctx = canvas.temp.getContext('2d');
            mainctx = main.getContext('2d');

            tempctx.drawImage(canvas.draw , 0, 0);
            // tempctx.save();
            tempctx.globalCompositeOperation = 'source-atop';
            canvas.temp.width >  canvas.temp.height ?
            tempctx.drawImage(image.back.img, 0, 0,canvas.temp.width,image.back.img.height/image.back.img.width*canvas.temp.height)
                :
            tempctx.drawImage(image.back.img, 0, 0,image.back.img.width/image.back.img.height*canvas.temp.width,canvas.temp.height);
            // tempctx.restore();

            //默认source-over
            var canvasWidth = window.innerWidth,
                canvasHeight = window.innerHeight - 110;
            //参数
            var dots = {
                num:parseInt(window.innerWidth/6), //粒子数
                distance:60,  //粒子相距的距离为50连线
                arr:[]  //粒子实例对象数组
            };

            var mousePosition = {
                x : -100,
                y : -100
            };

            //粒子类
            function Dot() {
                this.x = Math.random() * canvasWidth;
                this.y = Math.random() * canvasHeight;

                //x，y方向移动速度，不能为0
                this.vx = (-.5 + Math.random()) || 0.5;
                this.vy = (-.5 + Math.random()) || 0.5;
                //半径
                this.radius = Math.random()*8 +2 ;
                //粒子颜色
                // this.color = 'hsl('+Math.random()*360+',100%,50%)';
                this.color  = 'rgba(204, 204, 204, 0.4)';
            }

            Dot.prototype.draw = function () {
                mainctx.beginPath();
                //设置颜色
                mainctx.fillStyle = this.color;
                mainctx.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
                mainctx.fill();
            };

            //粒子数组
            function createDots(){
                for (var i = 0; i < dots.num; i++) {
                    dots.arr.push(new Dot);
                }
            }

            function moveDots() {

                for (var i = 0; i < dots.num; i++) {
                    //超出范围则改变方向
                    if(dots.arr[i].x <= 0 || dots.arr[i].x >= canvasWidth){
                        dots.arr[i].vx = -dots.arr[i].vx;
                    }
                    if(dots.arr[i].y <= 0 || dots.arr[i].y >= canvasHeight){
                        dots.arr[i].vy = -dots.arr[i].vy;
                    }
                    dots.arr[i].x += dots.arr[i].vx;
                    dots.arr[i].y += dots.arr[i].vy;
                }
            }

            function drawDots() {
                for(var i=0;i<dots.num;i++){
                    dots.arr[i].draw();
                }
                //设置字体样式
                mainctx.font = "50px Courier New";
                //设置字体填充颜色
                mainctx.fillStyle = "rgba(204, 204, 204, 1)";
                //开始绘制文字
                num?
                mainctx.fillText( num + '%', window.innerWidth/2 - 40, window.innerHeight/2 - 50):
                mainctx.fillText( '涂一涂吧', window.innerWidth/2 - 110, window.innerHeight/2 - 50);
                mainctx.drawImage(canvas.temp, 0, 0);
            }

            //小于距离连线
            function connectDots() {
                for (var i=0;i<dots.num;i++){
                    for(var j=1;j<dots.num;j++){
                        if((Math.abs(dots.arr[i].x-dots.arr[j].x) <= dots.distance) && (Math.abs(dots.arr[i].y-dots.arr[j].y) <= dots.distance)){
                            mainctx.beginPath();
                            mainctx.strokeStyle = dots.arr[i].color;
                            mainctx.moveTo(dots.arr[i].x,dots.arr[i].y);
                            mainctx.lineTo(dots.arr[j].x,dots.arr[j].y);
                            mainctx.stroke();
                            mainctx.closePath();
                        }
                    }
                }
            }
            //鼠标所在连线
            function drawLines() {
                for (var i=0;i<dots.num;i++){
                    if((Math.abs(dots.arr[i].x-mousePosition.x) <= 1.5 * dots.distance) && (Math.abs(dots.arr[i].y-mousePosition.y) <= 1.5 * dots.distance)){
                        mainctx.beginPath();
                        mainctx.strokeStyle = dots.arr[i].color;
                        mainctx.moveTo(dots.arr[i].x,dots.arr[i].y);
                        mainctx.lineTo(mousePosition.x,mousePosition.y);
                        mainctx.stroke();
                        mainctx.closePath();
                    }
                }
            }
            //鼠标所在圆点
            function drawCircle() {
                mainctx.beginPath();
                mainctx.arc(mousePosition.x, mousePosition.y, 8, 0, 360);
                mainctx.closePath();
                mainctx.fillStyle = 'rgba(204, 204, 204, 0.4)';
                mainctx.fill();
            }


            function animateDots(){
                //切换路由判断
                if(that.canvas){
                    if(that.canvas.width != window.innerWidth || that.canvas.height != window.innerHeight - 110){
                        that.canvas.width = window.innerWidth;
                        that.canvas.height = window.innerHeight - 110;
                        canvasWidth = window.innerWidth;
                        canvasHeight = window.innerHeight - 110;
                    }
                }

                //清空
                mainctx.clearRect(0, 0, canvasWidth, canvasHeight);
                moveDots();
                connectDots();
                drawLines();
                drawDots();
                drawCircle();
                requestAnimationFrame(animateDots);

            }

            main.addEventListener('mousemove',function(e){
                mousePosition.x = e.offsetX;
                mousePosition.y = e.offsetY;
            });
            main.addEventListener('mouseleave',function(e){
                mousePosition.x = -100;
                mousePosition.y = -100;
            });
            main.addEventListener('touchmove',function(e){
                //防止前进后退
                e.preventDefault();
                mousePosition.x = e.changedTouches[0].offsetX;
                mousePosition.y = e.changedTouches[0].offsetY;
            });
            main.addEventListener('touchend',function(e){
                mousePosition.x = -100;
                mousePosition.y = -100;
            });

            createDots();
            requestAnimationFrame(animateDots);

        }
        
        
        function recompositeRepeat() {

            canvas.temp.width = canvas.temp.width;

            tempctx.drawImage(canvas.draw , 0, 0);
            tempctx.save();
            tempctx.globalCompositeOperation = 'source-atop';
            // tempctx.drawImage(image.back.imgs, 0, 0,window.innerWidth,image.back.imgs.height/image.back.imgs.height*window.innerWidth);
            canvas.temp.width >  canvas.temp.height*1.5?
                tempctx.drawImage(image.back.img, 0, 0,canvas.temp.width,image.back.img.height/image.back.img.width*canvas.temp.width)
                :
                tempctx.drawImage(image.back.img, 0, 0,image.back.img.width/image.back.img.height*canvas.temp.height,canvas.temp.height);

            tempctx.restore();
            mainctx.drawImage(canvas.temp, 0, 0);
            // num =fullAmount(tempctx,canvas.temp,2000) * 100|0;
            // requestAnimationFrame(recompositeRepeat);

        }





        function scratchLine(can, x, y,fresh) {
            var ctx = can.getContext('2d');

            //firefox下影响性能
/*            ctx.shadowBlur=1;
            ctx.shadowColor="black";*/

            ctx.lineWidth = 45;
            ctx.lineCap = ctx.lineJoin = 'round';
            //可以是任何不透明的颜色，这样让原图显示出来
            ctx.strokeStyle = '#f2f2f2';

            if (fresh) {
                ctx.beginPath();
                //ctx.moveTo(x+0.01, y);
            }

            ctx.lineTo(x,y);
            ctx.stroke();
            //ctx.closePath();
        }

        function setupCanvases() {
            var ctx = that.canvas;
            ctx.onOff = true;

            ctx.width = window.innerWidth;
            ctx.height = window.innerHeight - 110;

            canvas.temp = document.createElement('canvas');
            canvas.draw = document.createElement('canvas');
            canvas.temp.width = canvas.draw.width = ctx.width;
            canvas.temp.height = canvas.draw.height = ctx.height;

            requestAnimationFrame(recompositeCanvases);
            // recompositeCanvases();

            function mousedown_handler(e) {
                var local = getLocalCoords(ctx, getEventCoords(e));
                mouseDown = true;

                scratchLine(canvas.draw, local.x, local.y, true);
                // recompositeRepeat();
                requestAnimationFrame(recompositeRepeat);




                return false;
            }

            function mousemove_handler(e) {


                //降低计算频率，避免卡顿
                if(ctx.onOff){
                    ctx.onOff = false;
                    setTimeout(function () {
                        num =fullAmount(tempctx,canvas.temp,64) * 100|0;
                        ctx.onOff = true;
                    },500)
                }

                if (!mouseDown) { return true; }

                var local = getLocalCoords(ctx, getEventCoords(e));

                scratchLine(canvas.draw, local.x, local.y, false);
                // recompositeRepeat();
                requestAnimationFrame(recompositeRepeat);
                return false;
            }

            function mouseup_handler(e) {
                // num =fullAmount(tempctx,canvas.temp,64) * 100|0;

/*                if(num>10){
                    //清空画布
                    // canvas.draw.height=canvas.draw.height;
                    var ctx=canvas.draw.getContext("2d");
                    ctx.clearRect(0,0,window.innerWidth,window.innerHeight-110);
                }*/

                if (mouseDown) {
                    mouseDown = false;
                    return false;
                }


                return true;
            }

            ctx.addEventListener('mousedown',mousedown_handler);
            ctx.addEventListener('touchstart',mousedown_handler);

            document.addEventListener('mousemove', mousemove_handler);
            document.addEventListener('touchmove', mousemove_handler);

            document.addEventListener('mouseup', mouseup_handler);
            document.addEventListener('touchend', mouseup_handler);

        }


        function loadImages() {
            var loadCount = 0;
            var loadTotal = 0;

            function imageLoaded(e) {
                loadCount++;

                if (loadCount >= loadTotal) {
                    setupCanvases();
                }
            }

            for (var k in image) if (image.hasOwnProperty(k))
                loadTotal++;

            for (var k in image) if (image.hasOwnProperty(k)) {
                var oImg =  document.createElement('img');
                image[k].img =oImg;
                //最后载入图片
                oImg.addEventListener('load', imageLoaded);
                image[k].img.src = image[k].url;
            }
        }
        loadImages();
    }

    render(){
        return (
            <div>
                <div className="canvas">
                    <canvas ref={ref=>{this.canvas=ref}} />
                </div>
                <Footer />
            </div>
        )
    }
}

export default CanvasBg;
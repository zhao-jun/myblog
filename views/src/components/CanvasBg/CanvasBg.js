import React from  'react';
import "./CanvasBg.scss";



export class CanvasBg extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        this.updateCanvas();
    }

    updateCanvas() {
        const ctx = this.canvas.getContext('2d');

        //设置宽高
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        var canvasWidth = window.innerWidth,
            canvasHeight = window.innerHeight;
        //参数
        var dots = {
            num:500, //粒子数
            distance:50,  //粒子相距的距离为50连线
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
            this.radius = Math.random()*2;
            //粒子颜色
            this.color = 'hsl('+Math.random()*360+',100%,50%)';
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
            for(var i=0;i<dots.num;i++){
                dots.arr[i].draw();
            }
        }

        //距离小于30绘制线
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
        }

        function animateDots(){
            //清空
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            moveDots();
            connectDots();
            drawDots();
            requestAnimationFrame(animateDots);
        }

        this.canvas.addEventListener('mousemove',function(e){
            mousePosition.x = e.pageX;
            mousePosition.y = e.pageY;
        });
        this.canvas.addEventListener('mouseleave',function(e){
            mousePosition.x = -100;
            mousePosition.y = -100;
        });

        createDots();
        requestAnimationFrame(animateDots);

    }

    render(){
        return (
            <div className="canvas">
                <canvas ref={ref=>{this.canvas=ref}} />
            </div>
        )
    }
}

export default CanvasBg;
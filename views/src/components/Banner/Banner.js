import React from  'react';
import './Banner.scss';


export class Banner extends React.Component{
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.title.addEventListener('mousemove',this.parallaxMousemove.bind(this));
        this.title.addEventListener('mouseout',this.parallaxMouseout.bind(this));

    }
    parallaxMousemove(e){
        const ANGLE = 45;
        let w = this.title.clientWidth;
        let h = this.title.clientHeight;
        let y = (e.offsetX - w * 0.5) / w * ANGLE;
        let x = (1 - (e.offsetY - h * 0.5)) / h * ANGLE;
        this.title.style.transform = `perspective(300px) 
                                       rotateX(${x}deg)
                                       rotateY(${y}deg)`;
    }

    parallaxMouseout(){
        this.title.style.transform = `perspective(300px) 
                                       rotateY(0deg)
                                       rotateX(0deg)`;
    }

    render(){
        const {title} = this.props;
        return(
            <div className="banner">
                <p  ref={ref=>{this.title=ref}}>{title || 'BLOG'}</p>
            </div>
        )
    }
}


/*const Banner = ({title}) => (
    <div className="banner">
        <p>{title || 'BLOG'}</p>
    </div>
);*/

export default Banner;
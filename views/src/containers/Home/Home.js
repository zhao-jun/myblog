import React from  'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import './Home.scss';

import {explodeAni } from '../../actions/index';

import one from './home.jpg';

import CanvasBg from '../../components/CanvasBg/CanvasBg';
import Footer from '../../components/Footer/Footer';


export class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    explode(){
        var that = this;
        const {actions} = this.props;
        this.home.style.width = 0;
        actions.explodeAni('explodeShow',true);

        let divWidth,divHeight,column;
        if(window.innerWidth>window.innerHeight){
            column = 6;
            divWidth = window.innerWidth/6|0;
            divHeight = (window.innerHeight-110)/5|0;
        } else {
            column = 5;
            divWidth = window.innerWidth/5|0;
            divHeight = (window.innerHeight-110)/6|0;
        }

        this.xs = [];
        this.ys = [];
        this.zs = [];
        this.xvs = [];
        this.yvs = [];
        this.zvs = [];
        this.xa = 0;
        this.ya = 0.6;
        this.za = 0.2;
        for (var i = 0; i< 30;i++){
            this.xs[i] = 0;
            this.ys[i] = 0;
            this.zs[i] = 0;
            //[-1,1]
            var xFactor = 3 * (2 * divWidth*(i%column) - window.innerWidth + divWidth/2) / window.innerWidth;
            var yFactor = (2 * divHeight*(i/column|0) - window.innerHeight  ) / window.innerHeight;
            this.xvs[i] = (10 + Math.floor(Math.random() * 100)) * xFactor;
            this.yvs[i] = (10 + Math.floor(Math.random() * 100)) * yFactor;
            this.zvs[i] = -10 + Math.floor(Math.random() * 100);
        }


        function updateAll () {
            for(var i = 0;i < 30;i++){
                that.xvs[i] += that.xa;
                that.yvs[i] += that.ya;
                that.zvs[i] += that.za;
                that.xs[i] += that.xvs[i];
                that.ys[i] += that.yvs[i];
                that.zs[i] -= that.zvs[i];
            }
            actions.explodeAni('explodeAni',{'xs':that.xs,'ys':that.ys,'zs':that.zs});
        }
        updateAll();

        let onOff = setInterval(()=>updateAll(),50);
        setTimeout(function () {
            // that.home.style.display = 'none';
            actions.explodeAni('explodeReset',false);
            that.home.style.width = "100%";
            clearInterval(onOff);
        },1000)
    }

    render() {
        const {explodeAniData,actions} = this.props;

        let explodeDiv=[],divWidth,divHeight,column;
        if(window.innerWidth>window.innerHeight){
            column = 6;
            divWidth = window.innerWidth/6|0;
            divHeight = (window.innerHeight-110)/5|0;
        } else {
            column = 5;
            divWidth = window.innerWidth/5|0;
            divHeight = (window.innerHeight-110)/6|0;
        }
        for (var i = 0; i< 30;i++){
            explodeDiv.push(<div key={i} className="explode" style={{width:divWidth+'px',height:divHeight+'px',left:divWidth*(i%column)+'px',top:divHeight*(i/column|0)+'px',backgroundPositionX:-divWidth*(i%column)+'px',backgroundPositionY:-divHeight*(i/column|0)+'px', transform:'translate3d(' + explodeAniData.xs[i] + 'px, ' + explodeAniData.ys[i] + 'px, ' + explodeAniData.zs[i] + 'px) rotateX(' +5* explodeAniData.ys[i] + 'deg) rotateY(' +  5* explodeAniData.xs[i] + 'deg)'}}></div>)
        }
        return (
            <div className="homeWrap">
                <div className="home" style={{display:explodeAniData.reset?"flex":"none"}} ref={ref=>{this.home=ref}} onClick={()=>this.explode()}>
                    {
                        explodeAniData.show ?
                            explodeDiv
                            :
                            null
                    }
                    <h2>Welcome</h2>
                    <p className="describe">My Friend</p>
                </div>
                <CanvasBg one={one} explodeAni={actions.explodeAni} explodeAniData={explodeAniData} />
                <Footer />
            </div>
        )
    }
}

/*const Home = () => (
    <div className="homeWrap">
        <div className="home">
            <div className="bomb" style={{}}></div>
        </div>
        <CanvasBg one={one} />
        <Footer />
    </div>
);*/

const mapStateToProps = state => ({
    explodeAniData:state.explodeAniData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({explodeAni}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
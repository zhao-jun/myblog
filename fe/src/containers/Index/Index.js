import React from  'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import {modBoxAction,getUserInfo,chatBox } from '../../actions/index';
import {_alert,loadingBar } from '../../actions/index';
import {loginSubmit} from '../../actions/index';

import Loading from '../../components/Loading/Loading'
import Header from '../../components/Header/Header';
import ModalBox from '../../components/ModalBox/ModalBox';
import TipsBox from '../../components/TipsBox/TipsBox';
// import Footer from '../../components/Footer/Footer';

import './index.scss';


export class Index extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        // this.props.actions.loadingBar('loadingBar',true);
/*        document.body.style.margin = "0px";
        // 这是防止页面被拖拽
        document.body.addEventListener('touchmove', (ev) => {
            ev.preventDefault();
        });*/
    }

    componentDidMount(){
        this.props.actions.loadingBar('loadingBar',false);
    }

    render() {
        const {modBoxData,loginBoxData,tipsBoxData,actions,loadingBarData} = this.props;
        return (
            <div className="index">
                <div style={{"WebkitFilter":modBoxData.isShow?"blur(3px)":"none"}}>
                    <Header modBoxAction={actions.modBoxAction} loginBoxData={loginBoxData}
                            loginSubmit={actions.loginSubmit} getUserInfo={actions.getUserInfo}
                            chatBox={actions.chatBox} _alert={actions._alert} />
                    <ReactCSSTransitionGroup
                        transitionName="transitionWrapper"
                        className="mainContent"
                        component="section"
                        transitionEnterTimeout={800}
                        transitionLeaveTimeout={800}>
                        <section key={this.props.location.pathname}
                                 style={{position:"absolute", width: "100%"}}>
                            {this.props.children}
                        </section>
                    </ReactCSSTransitionGroup>
                </div>
                <Loading loadingBarData={loadingBarData} />

                <ModalBox modBoxData={modBoxData} modBoxAction={actions.modBoxAction}
                          _alert={actions._alert} loginSubmit={actions.loginSubmit}/>
                <TipsBox tipsBoxData={tipsBoxData}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    modBoxData:state.modBoxData,
    tipsBoxData:state.tipsBoxData,
    loginBoxData:state.loginBoxData,
    loadingBarData:state.loadingBarData,
    explodeAniData:state.explodeAniData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({modBoxAction,_alert,loginSubmit,getUserInfo,chatBox,loadingBar}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);


/*
<ReactCSSTransitionGroup
    transitionName="transitionWrapper"
    component="section"
    transitionEnterTimeout={500}
    transitionLeaveTimeout={500}>
    <section key={this.props.location.pathname}
             style={{position:"absolute", width: "100%"}}>
        {this.props.children}
    </section>
</ReactCSSTransitionGroup>*/

/*
<section className="mainContent">
    {this.props.children}
</section>*/

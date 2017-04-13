import React from  'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import {modBoxAction,getUserInfo,chatBox } from '../../actions/index';
import {_alert,loadingBar } from '../../actions/index';
import {loginSubmit} from '../../actions/index';

import Loading from '../../components/Loading/Loading'
import Header from '../../components/Header/Header';
import ModalBox from '../../components/ModalBox/ModalBox';
import TipsBox from '../../components/TipsBox/TipsBox';
import Footer from '../../components/Footer/Footer';

import './index.scss';


export class Index extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        // this.props.actions.loadingBar('loadingBar',true);
    }

    componentDidMount(){
        this.props.actions.loadingBar('loadingBar',false);
    }

    render() {
        const {modBoxData,loginBoxData,tipsBoxData,actions,loadingBarData} = this.props;
        return (
            <div className="index">
                <Loading loadingBarData={loadingBarData} />
                <div style={{"WebkitFilter":modBoxData.isShow?"blur(3px)":"none"}}>
                    <Header modBoxAction={actions.modBoxAction} loginBoxData={loginBoxData}
                            loginSubmit={actions.loginSubmit} getUserInfo={actions.getUserInfo}
                            chatBox={actions.chatBox}/>

                    <section className="mainContent">
                        {this.props.children}
                    </section>
                </div>
                <ModalBox modBoxData={modBoxData} modBoxAction={actions.modBoxAction}
                          _alert={actions._alert} loginSubmit={actions.loginSubmit}/>
                <TipsBox tipsBoxData={tipsBoxData}/>
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    modBoxData:state.modBoxData,
    tipsBoxData:state.tipsBoxData,
    loginBoxData:state.loginBoxData,
    loadingBarData:state.loadingBarData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({modBoxAction,_alert,loginSubmit,getUserInfo,chatBox,loadingBar}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
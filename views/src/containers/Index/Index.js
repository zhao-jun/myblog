import React from  'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import {modBoxAction,getUserInfo } from '../../actions/index';
import {_alert } from '../../actions/index';
import {loginSubmit} from '../../actions/index';

import Header from '../../components/Header/Header';
import ModalBox from '../../components/ModalBox/ModalBox';
import TipsBox from '../../components/TipsBox/TipsBox';
import Footer from '../../components/Footer/Footer';

import './index.scss';

const Index = (props) => (
    <div className="index">
        <div style={{"WebkitFilter":props.modBoxData.isShow?"blur(3px)":"none"}}>
            <Header modBoxAction={props.actions.modBoxAction} loginBoxData={props.loginBoxData} loginSubmit={props.actions.loginSubmit} getUserInfo={props.actions.getUserInfo} />
            
            <section className="mainContent">
                {props.children}
            </section>
        </div>
        <ModalBox modBoxData = {props.modBoxData} modBoxAction={props.actions.modBoxAction} _alert ={props.actions._alert} loginSubmit={props.actions.loginSubmit} />
        <TipsBox tipsBoxData={props.tipsBoxData} />
        <Footer />
    </div>
);

const mapStateToProps = state => ({
    modBoxData:state.modBoxData,
    tipsBoxData:state.tipsBoxData,
    loginBoxData:state.loginBoxData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({modBoxAction,_alert,loginSubmit,getUserInfo}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
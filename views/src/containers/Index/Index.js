import React from  'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import {modBoxAction,getUserInfo } from '../../actions/modBoxAction';
import {_alert } from '../../actions/modBoxAction';
import {loginSubmit} from '../../actions/modBoxAction';

import Header from '../../components/Header/Header';
import Banner from '../../components/Banner/Banner';
import ModalBox from '../../components/ModalBox/ModalBox';
import TipsBox from '../../components/TipsBox/TipsBox';

const Index = (props) => (
    <div>
        <Header modBoxAction={props.actions.modBoxAction} loginBoxData={props.loginBoxData} loginSubmit={props.actions.loginSubmit} getUserInfo={props.actions.getUserInfo} />
        <Banner />
        <div>
            {props.children}
        </div>
        <ModalBox modBoxData = {props.modBoxData} modBoxAction={props.actions.modBoxAction} _alert ={props.actions._alert} loginSubmit={props.actions.loginSubmit} />
        <TipsBox tipsBoxData={props.tipsBoxData} />
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
import React from  'react';
import Login from '../Login/Login';
import Register from '../Register/Register';

import './ModalBox.scss';

const ModalBox = ({modBoxData,modBoxAction,_alert,loginSubmit}) => (
    <div className="modalBox" style={{"display":modBoxData.isShow?"block":"none"}}>
        { modBoxData.type == 'LOGIN_SHOW'? <Login modBoxAction={modBoxAction} _alert={_alert} loginSubmit={loginSubmit} /> : <Register modBoxAction={modBoxAction} _alert={_alert} loginSubmit={loginSubmit} /> }
    </div>
);

export default ModalBox;
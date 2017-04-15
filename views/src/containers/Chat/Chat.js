import React from  'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory,Link } from 'react-router'

import ChatUserList from '../../components/ChatUserList/ChatUserList';
import ChatMessage from './../../components/ChatMessage/ChatMessage';
import ChatInfo from './../../components/ChatInfo/ChatInfo';
import Footer from '../../components/Footer/Footer';


import {_alert,chatBox,chatList} from '../../actions/index';

import clearImg from './clear.png';

import io from 'socket.io-client'
export let socket = io.connect('http://localhost:3000');

import './Chat.scss';

export class Chat extends React.Component{
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        // console.log(socket);
        const {loginBoxData,actions} = this.props;
        if(!loginBoxData.name) {
            browserHistory.push('/');
            actions._alert('请先登录');
            return false;
        }

        //防止切换路由重复注册
        socket.removeListener('message');
        socket.removeListener('login');
        socket.removeListener('logout');


        socket.emit('login', {name:loginBoxData.name});

        socket.on('login',function (data) {
            //登录消息和登录列表
            actions.chatBox("sendMessage",data);
            actions.chatList("chatList",data);
        });
/*        socket.on('redirect',function () {
            browserHistory.push('/');
            actions._alert('请先登录');
        });*/
        socket.on('message',function(data){
            actions.chatBox("sendMessage",data);
        });


        socket.on('logout',function (data) {
            actions.chatBox("sendMessage",data);
            actions.chatList("chatList",data);
        });
    }

    componentDidMount(){
        this.resetScroll();
    }
    componentDidUpdate(){
/*        const {loginBoxData,actions} = this.props;
        if(!loginBoxData.name) {
            browserHistory.push('/');
            actions._alert('请先登录');
            return false;
        }*/
        this.resetScroll();
    }


    resetScroll(){
        let scrollTop=this.chatWindow.scrollHeight-this.chatWindow.clientHeight;
        this.chatWindow.scrollTop=scrollTop > 0 ? scrollTop : 0;
    }
    

    chatSend(){
        const {loginBoxData,actions} = this.props;
        if(!this.chatInput.value.trim()){
            actions._alert('请输入内容');
            return;
        }
        socket.emit('message',{name:loginBoxData.name,message:this.chatInput.value,time:this.formatDate()});
        this.chatInput.value='';
    }

    formatDate () {
        const date = new Date();
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}  ${date.getHours()}:${this.fillTo(date.getMinutes())}:${this.fillTo(date.getSeconds())}`;
    }
    fillTo (str) {
        return String(str).length < 2 ? `0${str}` : str;
    }

    chatClear(){
        const {actions} = this.props;
        actions.chatBox("chatClear");
    }

/*    isShow(show){
        this.userInfo.style.display=show;
    }*/
    messageSync(){
        if(window.innerWidth > 600) {
            this.chatInput.style.height = 120 + 'px';
            return;
        }
        //此步为了让删减的时候高度改变
        this.chatInput.style.height = 30 + 'px';
        this.chatInput.style.height = this.chatInput.scrollHeight + 'px';
        this.resetScroll()
        
    }


    render(){
        const {chatBoxData,loginBoxData,chatListData} = this.props;
        return(
            <div>
            <div className='chatwrap'>
                <div className="chat">
                <div className="chatList">
                    <input className="tab-open" type="radio" id="tab-1" name="tab" aria-hidden="true" hidden="" defaultChecked={true} />
                    <input className="tab-open" type="radio" id="tab-2" name="tab" aria-hidden="true" hidden="" />
                    <label htmlFor="tab-1" className="tab-bullet tab-bullet-one"></label>
                    <label htmlFor="tab-2" className="tab-bullet tab-bullet-two"></label>
                    <div className="tab-item tab-1">
                        <div className="chatTalkList">聊天窗口</div>
                    </div>
                    <div className="tab-item tab-2">
                        <ChatUserList chatListData={chatListData} />
                    </div>
                </div>
                <div className="chatMain">


                    <ul className="chatWindow" ref={ref=>{this.chatWindow=ref}}>
                        <li className="userLength">当前{chatListData.onlineUsers.length}人</li>
                        {
                            chatBoxData.map((data,index)=>(
                                (data.name == 'system')?
                                    <ChatInfo key={index} data={data} />:<ChatMessage key={index} data={data} loginBoxData={loginBoxData} />
                            ))
                        }
                    </ul>
                    <div className="chatBtns">
                        <img src={clearImg} className="chatClear" onClick={()=>this.chatClear()} />
                    </div>
                    <div className="chatText">
                        <textarea className="chatInput" rows="1" ref={ref=>{this.chatInput=ref}} onChange={()=>this.messageSync()} onKeyDown ={(e)=>{e.keyCode==13&&e.ctrlKey==1?this.chatSend():null}}>
                        </textarea>
                        <button className="chatSend" onClick={()=>this.chatSend()}>发送</button>
                        <div className="chatTip">按下Ctrl+Enter发送</div>
                        <div className="chatSend-app" onClick={()=>{this.chatSend();this.messageSync()}}></div>
                    </div>
                </div>
            </div>
            </div>
            <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loginBoxData:state.loginBoxData,
    chatBoxData:state.chatBoxData,
    chatListData:state.chatListData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({_alert,chatBox,chatList}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);


/*
<div className="userInfo"  ref={ref=>{this.userInfo=ref}}>
    <p className="userInfoTitle">详细信息</p>
    <imgs className="avatar" src={avatar} />
    <button className="sendMsg">发送消息</button>
</div>*/

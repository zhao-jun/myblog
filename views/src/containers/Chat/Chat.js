import React from  'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router'

import ChatList from './../../components/ChatList/ChatList';
import ChatMessage from './../../components/ChatMessage/ChatMessage';
import ChatInfo from './../../components/ChatInfo/ChatInfo';

import {_alert,chatBox,chatList} from '../../actions/index';

import io from 'socket.io-client'
let socket = io.connect('http://localhost:80');

import './Chat.scss';

export class Chat extends React.Component{
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        const {loginBoxData,actions} = this.props;
        if(!loginBoxData.name) {
            browserHistory.push('/');
            actions._alert('请先登录');
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

    render(){
        const {chatBoxData,loginBoxData,chatListData} = this.props;
        return(
            <section className="chat">
                <ChatList chatListData={chatListData} />
                <div className="chatMain">
                    <ul className="chatWindow" ref={ref=>{this.chatWindow=ref}}>
                        {
                            chatBoxData.map((data,index)=>(
                                (data.name == 'system')?
                                <ChatInfo key={index} data={data} />:<ChatMessage key={index} data={data} loginBoxData={loginBoxData} />
                                ))
                        }
                    </ul>
                    <div className="chatBtns">
                        <button className="chatClear" onClick={()=>this.chatClear()}>清空</button>
                    </div>
                    <div className="chatText">
                        <textarea className="chatInput" ref={ref=>{this.chatInput=ref}} placeholder="输入">
                        </textarea>
                        <button className="chatSend" onClick={()=>this.chatSend()}>发送</button>
                    </div>
                </div>
            </section>
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
import React from  'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory,Link } from 'react-router'

import ChatUserList from '../../components/ChatUserList/ChatUserList';
import ChatMessage from './../../components/ChatMessage/ChatMessage';
import ChatInfo from './../../components/ChatInfo/ChatInfo';

import {_alert,chatBox,chatList} from '../../actions/index';

import userImg from './user.png';
import chatImg from './chat.png';
import avatar from '../../styles/avatar.png';

import io from 'socket.io-client'
let socket = io.connect('http://localhost:80');

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

    isShow(show){
        this.userInfo.style.display=show;
    }

    render(){
        const {chatBoxData,loginBoxData,chatListData} = this.props;
        return(
            <section className="chat">
                <div className="chatList">
                    <input className="tab-open" type="radio" id="tab-1" name="tab" aria-hidden="true" hidden="" defaultChecked={true} />
                    <input className="tab-open" type="radio" id="tab-2" name="tab" aria-hidden="true" hidden="" />
                    <label htmlFor="tab-1" className="tab-bullet tab-bullet-one" onClick={()=>this.isShow('none')}><img src={chatImg} /></label>
                    <label htmlFor="tab-2" className="tab-bullet tab-bullet-two" onClick={()=>this.isShow('block')}><img src={userImg} /></label>
                    <div className="tab-item tab-1">
                        聊天窗口
                    </div>
                    <div className="tab-item tab-2">
                        <ChatUserList chatListData={chatListData} />
                    </div>
                </div>

                <div className="chatMain">
                    <div className="userInfo"  ref={ref=>{this.userInfo=ref}}>
                        <p className="userInfoTitle">详细信息</p>
                        <img className="avatar" src={avatar} />
                        <p></p>
                        <button className="sendMsg">发送消息</button>
                    </div>

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
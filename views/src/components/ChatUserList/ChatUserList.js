import React from  'react';
import './ChatUserList.scss';
import avatar from '../../styles/avatar.png';

const ChatUserList = ({chatListData}) => (
    <div className="chatUserList">
        <p>在线用户列表</p>
        <ul>
            {
            chatListData.onlineUsers.map((data,index)=>(
                <li className="chatItem" key={index}>
                    <img className="chatAvatar" src={avatar} />
                    <span className="chatName" >{data}</span>
                </li>
            ))
        }
        </ul>
    </div>
);

export default ChatUserList;
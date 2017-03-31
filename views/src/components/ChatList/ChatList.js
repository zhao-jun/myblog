import React from  'react';
import './ChatList.scss';
import avatar from '../../styles/avatar.png';

const ChatList = ({chatListData}) => (
    <ul className="chatList">
        {
        chatListData.onlineUsers.map((data,index)=>(
            <li className="chatItem" key={index}>
                <img className="chatAvatar" src={avatar} />
                <span className="chatName" >{data}</span>
            </li>
        ))
    }
    </ul>
);

export default ChatList;
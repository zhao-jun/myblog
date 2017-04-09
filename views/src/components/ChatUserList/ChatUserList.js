import React from  'react';
import './ChatUserList.scss';
import avatar from '../../styles/avatar.png';

const ChatUserList = ({chatListData}) => (
    <div className="chatUserList">
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
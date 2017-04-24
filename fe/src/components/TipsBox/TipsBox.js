import React from  'react';
import './TipsBox.scss';

const TipsBox = ({tipsBoxData}) => (
    <div className="tipsBox" style={{ "display": tipsBoxData.message ? "block" : "none"}}>
        <span className="content">{tipsBoxData.message}</span>
    </div>
);

export default TipsBox;
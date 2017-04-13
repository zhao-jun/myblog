import React from  'react';
import './Loading.scss';



const Loading = ({loadingBarData}) => (
    <div className="loading" style={{'display':loadingBarData.display?'flex':'none'}}>
        <div className="rect rect1"></div>
        <div className="rect rect2"></div>
        <div className="rect rect3"></div>
        <div className="rect rect4"></div>
        <div className="rect rect5"></div>
    </div>
);

export default Loading;
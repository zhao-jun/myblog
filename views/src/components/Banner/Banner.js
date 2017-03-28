import React from  'react';
import './Banner.scss';


const Banner = ({title}) => (
    <div className="banner">
        <p>{title || 'BLOG'}</p>
    </div>
);

export default Banner;
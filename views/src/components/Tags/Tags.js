import React from  'react';
import { Link } from 'react-router';

import './Tags.scss';

export class Tags extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {getBlogData, blogBoxData} = this.props;
        let tagList = [],sum = 0;
        for (let i in blogBoxData.tags){
            sum += blogBoxData.tags[i];
            tagList.push(<li className='tag-item' key={i}><Link to={"/blog?category="+i} onClick={()=>getBlogData('?category='+i)} className="link">{i}</Link><span className="num">{blogBoxData.tags[i]}</span></li>)
        }
        return (
            <div className="tags">
                <h3>Tags</h3>
                <ul>
                    <li className='tag-item'><Link to="/blog" onClick={()=>getBlogData()} className="link">all</Link><span className="num">{sum}</span>
                    </li>
                    {tagList}
                </ul>
            </div>
        )
    }
}

export default Tags;
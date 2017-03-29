import React from  'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Banner from './../../components/Banner/Banner';
import './Blog.scss';

import BlogItem from './../../components/BlogItem/BlogItem';
import Tags from './../../components/Tags/Tags';

import {getBlogData,_alert,article} from '../../actions/index';

export class Blog extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.actions.getBlogData(location.search);
        console.log(this.props.blogBoxData);
    }

    render(){
        const {blogBoxData,loginBoxData,actions} = this.props;
        return (
            <div>
                <Banner />
                <div className="blogWrap">
                    <ul className="blog">
                        {
                            blogBoxData.blog.map((blog,index)=>(
                                <BlogItem key={index} blog={blog} getBlogData={actions.getBlogData} />
                            ))
                        }
                    </ul>
                    <Tags getBlogData={actions.getBlogData} />
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    loginBoxData:state.loginBoxData,
    blogBoxData:state.blogBoxData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({getBlogData,_alert,article}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
import React from  'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import './Blog.scss';

import BlogItem from './../../components/BlogItem/BlogItem';
import Tags from './../../components/Tags/Tags';
import Footer from '../../components/Footer/Footer';

import {getBlogData,_alert,article} from '../../actions/index';

export class Blog extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.actions.getBlogData(location.search);
    }
    
    render(){
        const {blogBoxData,actions} = this.props;
        return (
            <div>
                <div className="blogBanner">
                    <p><span className="title">BLOG</span><span className="subtitle">一个博客 一种生活</span></p>
                </div>
                <div className="blogWrap">

                    <ul className="blog">
                        {
                            blogBoxData.blog.map((blog,index)=>(
                                <BlogItem key={index} blog={blog} getBlogData={actions.getBlogData} />
                            ))
                        }
                    </ul>
                    <Tags getBlogData={actions.getBlogData} blogBoxData={blogBoxData} />
                </div>
                <Footer />
            </div>
        )
    }
}


const mapStateToProps = state => ({
    blogBoxData:state.blogBoxData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({getBlogData,_alert,article}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
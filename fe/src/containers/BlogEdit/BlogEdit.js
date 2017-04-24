import React from  'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';


import './BlogEdit.scss';

import {blogEditSubmit,blogEdit } from '../../actions/index';

export class BlogEdit extends React.Component{
    constructor(props) {
        super(props);
}
    componentWillMount(){
        if(this.props.loginBoxData.name != 'admin')
            browserHistory.push('/');
    }

    handleSubmit(){
        const {blogEditSubmit} = this.props.actions;

        let formData=new FormData(this.form);
        blogEditSubmit(formData);
    }
    render(){
        const {blogEditData,actions} = this.props;
        return (
            <form className="blogEdit" ref={el=>{this.form=el}} >
                <div className="createItem">
                    <label htmlFor="title">文章标题</label>
                    <input type="text" id="title" className="title" ref={el=>{this.title=el}} onChange={(e)=>actions.blogEdit("blogEditTitle",e.target.value)} name="title" placeholder="请输入文章标题" value={blogEditData.title || ''} />
                </div>
                <div className="createItem">
                    <label htmlFor="subtitle">文章副标题</label>
                    <input type="text" id="subtitle" className="subtitle" ref={el=>{this.title=el}} onChange={(e)=>actions.blogEdit("blogEditSubtitle",e.target.value)} name="subtitle" placeholder="请输入副标题" value={blogEditData.subtitle || ''} />
                </div>
                <div className="createItem">
                    <label htmlFor="category">文章分类</label>
                    <input type="text" id="category" className="category" ref={el=>{this.title=el}} onChange={(e)=>actions.blogEdit("blogEditCategory",e.target.value)} name="category" placeholder="请输入分类" value={blogEditData.category || ''} />
                </div>
                <div className="editor clearfix">
                    <div className="myEditor">
                        <label htmlFor="content">文章内容</label>
                        <textarea placeholder="支持markdown" onChange={(e)=>actions.blogEdit("blogEditPreview",e.target.value)} ref={el=>{this.content=el}} rows="30" name="content" id="content" value={blogEditData.origin || ''}></textarea>
                    </div>
                    <div className="editor-preview">
                        <div className="preview" htmlFor="preview">预览</div>
                        <div className="preview-content" dangerouslySetInnerHTML={{__html:blogEditData.content}}></div>
                    </div>
                </div>
                <input type="button" className="createBtn" value="更新blog" onClick={()=>{this.handleSubmit()}} />
            </form>
        )
    }
}

const mapStateToProps = state => ({
    blogEditData:state.blogEditData,
    loginBoxData:state.loginBoxData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({blogEditSubmit,blogEdit}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogEdit);
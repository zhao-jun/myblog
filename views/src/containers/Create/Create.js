import React from  'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';


import './Create.scss';

import {createSubmit,blogPreview } from '../../actions/index';

export class Create extends React.Component{
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        if(this.props.loginBoxData.name != 'admin')
        browserHistory.push('/');
    }

    handleSubmit(){
        const {createSubmit} = this.props.actions;

        let formData=new FormData(this.form);
        createSubmit(formData);
    }
    render(){
        const {blogPreviewData,actions} = this.props;
        return (
            <form className="create" ref={el=>{this.form=el}} >
                <div className="createItem">
                    <label htmlFor="title">文章标题</label>
                    <input type="text" id="title" className="title" ref={el=>{this.title=el}} onChange={(e)=>actions.blogPreview("blogTitle",e.target.value)} name="title" placeholder="请输入文章标题" value={blogPreviewData.title || ''} />
                </div>
                <div className="createItem">
                    <label htmlFor="subtitle">文章副标题</label>
                    <input type="text" id="subtitle" className="subtitle" ref={el=>{this.subtitle=el}} onChange={(e)=>actions.blogPreview("blogSubtitle",e.target.value)} name="subtitle" placeholder="请输入副标题" />
                </div>
                <div className="createItem">
                    <label htmlFor="category">文章分类</label>
                    <input type="text" id="category" className="category" ref={el=>{this.category=el}} onChange={(e)=>actions.blogPreview("blogCategory",e.target.value)} name="category" placeholder="请输入分类" />
                </div>
                <div className="editor clearfix">
                    <div className="myEditor">
                        <label htmlFor="content">文章内容</label>
                        <textarea placeholder="支持markdown" onChange={(e)=>actions.blogPreview("blogPreview",e.target.value)} ref={el=>{this.content=el}} rows="30" name="content" id="content" value={blogPreviewData.origin || ''}></textarea>
                    </div>
                    <div className="editor-preview">
                        <div className="preview" htmlFor="preview">预览</div>
                        <div className="preview-content" dangerouslySetInnerHTML={{__html:blogPreviewData.content}}></div>
                    </div>
                </div>
                <input type="button" className="createBtn" value="发布blog" onClick={()=>{this.handleSubmit()}} />
            </form>
        )
    }
}

const mapStateToProps = state => ({
    blogPreviewData:state.blogPreviewData,
    loginBoxData:state.loginBoxData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({createSubmit,blogPreview}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
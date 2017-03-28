import React from  'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import './Publish.scss';

import {_alert,publishSubmit,preview } from '../../actions/index';

export class Publish extends React.Component{
    constructor(props) {
        super(props);
    }


    handleSubmit(){
        const {_alert,publishSubmit} = this.props.actions;
        let titleValue=this.title.value.trim(),
            contentValue=this.content.value.trim();
        if(titleValue.length<5){
            _alert("标题最少5个字");
            return
        }
        if(titleValue.length>15){
            _alert("标题最多15个字");
            return
        }
        if(contentValue.length<20){
            _alert("内容最少20个字");
            return
        }

        let formData=new FormData(this.form);
        publishSubmit(formData);
    }
    render(){
        const {previewData,actions} = this.props;
        return (
            <form className="publish" ref={el=>{this.form=el}} >
                <div className="publishItem">
                    <label htmlFor="title">文章标题</label>
                    <input type="text" id="title" className="title" ref={el=>{this.title=el}} onChange={(e)=>actions.preview("title",e.target.value)} name="title" placeholder="请输入文章标题,5-15字" value={previewData.title || ''} />
                </div>
                <div className="editor clearfix">
                    <div className="myEditor">
                        <label htmlFor="content">文章内容</label>
                        <textarea placeholder="支持markdown,最少20个字" onChange={(e)=>actions.preview("preview",e.target.value)} ref={el=>{this.content=el}} rows="30" name="content" id="content" value={previewData.origin || ''}></textarea>
                    </div>
                    <div className="editor-preview">
                        <div className="preview" htmlFor="preview">预览</div>
                        <div className="preview-content" dangerouslySetInnerHTML={{__html:previewData.content}} ref={el=>{this.preview=el}}></div>
                    </div>
                </div>
                <input type="button" className="publishBtn" value="发布文章" onClick={()=>{this.handleSubmit()}} />
            </form>
        )
    }
}

const mapStateToProps = state => ({
    previewData:state.previewData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({_alert,publishSubmit,preview}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Publish);
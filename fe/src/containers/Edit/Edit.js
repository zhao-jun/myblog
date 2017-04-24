import React from  'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import './edit.scss';

import {_alert,editSubmit,edit } from '../../actions/index';

export class Edit extends React.Component{
    constructor(props) {
        super(props);
    }


    handleSubmit(){
        const {_alert,editSubmit} = this.props.actions;
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
        editSubmit(formData);
    }
    render(){
        const {editData,actions} = this.props;
        return (
            <form className="edit" ref={el=>{this.form=el}} >
                <div className="publishItem">
                    <label htmlFor="title">文章标题</label>
                    <input type="text" id="title" className="title" ref={el=>{this.title=el}} onChange={(e)=>actions.edit("editTitle",e.target.value)} name="title" placeholder="请输入文章标题,5-15字" value={editData.title || ''} />
                </div>
                <div className="editor clearfix">
                    <div className="myEditor">
                        <label htmlFor="content">文章内容</label>
                        <textarea placeholder="支持markdown,最少20个字" onChange={(e)=>actions.edit("editPreview",e.target.value)} ref={el=>{this.content=el}} rows="30" name="content" id="content" value={editData.origin || ''}></textarea>
                    </div>
                    <div className="editor-preview">
                        <div className="preview" htmlFor="preview">预览</div>
                        <div className="preview-content" dangerouslySetInnerHTML={{__html:editData.content}} ref={el=>{this.preview=el}}></div>
                    </div>
                </div>
                <input type="button" className="publishBtn" value="更新文章" onClick={()=>{this.handleSubmit()}} />
            </form>
        )
    }
}

const mapStateToProps = state => ({
    editData:state.editData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({_alert,editSubmit,edit}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
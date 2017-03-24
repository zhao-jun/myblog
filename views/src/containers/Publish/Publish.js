import React from  'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import './Publish.scss';

import {_alert,publishSubmit } from '../../actions/modBoxAction';

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
        if(contentValue.length<20){
            _alert("内容最少20个字");
            return
        }
        let formData=new FormData(this.form);
        publishSubmit(formData);
    }
    render(){
        return (
            <form className="publish" ref={el=>{this.form=el}} >
                <div className="publishItem">
                    <label htmlFor="title">文章标题</label>
                    <input type="text" id="title" className="title" ref={el=>{this.title=el}} name="title" placeholder="请输入文章标题,最少5个字" />
                </div>
                <div className="publishItem">
                    <label htmlFor="content">文章内容</label>
                    <textarea placeholder="请输入文章内容,最少20个字" ref={el=>{this.content=el}} rows="10" name="content" id="content"></textarea>
                </div>
                <input type="button" className="publishBtn" value="发布文章" onClick={()=>{this.handleSubmit()}} />
            </form>
        )
    }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({_alert,publishSubmit}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Publish);
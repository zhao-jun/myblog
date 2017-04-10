import React from  'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router';

import './BlogArticle.scss';

import avatar from '../../styles/avatar.png';
import Banner from '../../components/Banner/Banner';
import Tags from '../../components/Tags/Tags';

import {blogArticle,_alert,blogCommentSubmit,blogCommentDelete,blogEdit,blogArticleDelete,modBoxAction} from '../../actions/index';


export class BlogArticle extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.actions.blogArticle(location.pathname.slice(1));
        console.log(this.props.blogArticleBoxData)
    }

    blogCommentSubmit() {
        const{_alert,blogCommentSubmit}  = this.props.actions;
        let contentValue = this.content.value.trim();
        if (contentValue.length == 0) {
            _alert("留言内容不能为空");
            return
        }
        let formData = new FormData(this.comment);
        blogCommentSubmit(formData);
        this.content.value='';
    }


    render(){
        const {blogArticleBoxData,actions,loginBoxData} = this.props;
        let article = blogArticleBoxData.article;
        return (
            <div>
                <Banner title={article.title} subtitle={article.subtitle}/>
                <div className="blogWrap">
                    <div className="blogArticle">
                        <article>
                            <div className="main">
                                <p className="content markdown" dangerouslySetInnerHTML={{__html:article.contentMarked}}></p>
                                <div className="info">
                                    <span>发布时间：{article.date}</span>
                                    <span className="editArt" style={{display:loginBoxData.name=='admin'?'inline':'none'}}><Link to={location.pathname+'/edit'} className="link" onClick={()=>actions.blogEdit("blogEdit",article)}>编辑</Link></span>
                                    <span className="delArt" style={{display:loginBoxData.name=='admin'?'inline':'none'}} onClick={()=>actions.blogArticleDelete()}>删除</span>
                                </div>
                            </div>
                        </article>
                        <div className="comment">
                            <ul>
                                {
                                    blogArticleBoxData.comments.map((comment,index)=>(
                                        <div key={index} className="comment-item">
                                            <div className="left">
                                                <img className="avatar" src={avatar} />
                                                <p className="author">{comment.author.name}</p>
                                            </div>
                                            <div className="main">
                                                <p className="commentMain">{comment.content}</p>
                                                <p className="info">
                                                    <span className='author-app'>{comment.author.name}</span>
                                                    <span>{comment.date}</span>
                                                    <span className="delete" onClick={()=>actions.blogCommentDelete(comment._id)} style={{display:comment.author.name==loginBoxData.name ||loginBoxData.name == 'admin'?"block":"none"}}>删除</span>
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </ul>
                            <form className="commentForm"  ref={ref=>{this.comment=ref}}>
                                {
                                    loginBoxData.name?
                                        <img className="photo" src={avatar} alt={loginBoxData.name} />:
                                        <p className="loginComment" onClick={()=>actions.modBoxAction('loginShow')}>登录后留言</p>
                                }
                                <div className="input-text">
                                    <textarea className="content" name="content" ref={ref=>{this.content=ref}} placeholder="畅所欲言"></textarea>
                                    <div className="submit" onClick={()=>this.blogCommentSubmit()}>留言</div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <Tags />
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    loginBoxData:state.loginBoxData,
    blogArticleBoxData:state.blogArticleBoxData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({blogArticle,_alert,blogCommentSubmit,blogCommentDelete,blogEdit,blogArticleDelete,modBoxAction}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(BlogArticle);
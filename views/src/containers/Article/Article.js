import React from  'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router';


import './Article.scss';
import avatar from '../../styles/avatar.png';
import Banner from '../../components/Banner/Banner';

import {article,_alert,commentSubmit,commentDelete,edit,articleDelete,modBoxAction} from '../../actions/index';


export class Article extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.actions.article(location.pathname.slice(1));
        // console.log(this.props.loginBoxData.name);
    }

    commentSubmit() {
        const{_alert,commentSubmit}  = this.props.actions;
        let contentValue = this.content.value.trim();
        if (contentValue.length == 0) {
            _alert("留言内容不能为空");
            return
        }
        let formData = new FormData(this.comment);
        commentSubmit(formData);
        this.content.value='';
    }


    render(){
        const {articleBoxData,actions,loginBoxData} = this.props;
        let article = articleBoxData.article;
        return (
            <div>
                <Banner />
                <div className="retBtnWrap"><Link to="/Page" className="retBtn link">返回</Link></div>
                <div className="article">
                    <article>
                        <div className="left">
                            <img className="avatar" src={avatar} />
                            <p className="author">{article.author.name}</p>
                        </div>
                        <div className="main">
                            <h1>{article.title}</h1>
                            <p className="content" dangerouslySetInnerHTML={{__html:article.contentMarked}}></p>
                            <div className="info">
                                <span className='author-app'>{article.author.name}</span>
                                <span>发布时间：{article.date}</span>
                                <span className="editArt" style={{display:loginBoxData.name==article.author.name?'inline':'none'}}><Link to={location.pathname+'/edit'} className="link" onClick={()=>actions.edit("edit",article)}>编辑</Link></span>
                                <span className="delArt" style={{display:loginBoxData.name==article.author.name || loginBoxData.name == 'admin'?'inline':'none'}} onClick={()=>actions.articleDelete()}>删除</span>
                            </div>

                        </div>
                    </article>
                    <div className="comment">
                        <ul>
                            {
                                articleBoxData.comments.map((comment,index)=>(
                                    <div key={index} className="comment-item">
                                        <div className="left">
                                            <img className="avatar" src={avatar} />
                                            <p className="author">{comment.author.name}</p>
                                        </div>
                                        <div className="main">
                                            <p className="content">{comment.content}</p>
                                            <p className="info">
                                                <span className='author-app'>{comment.author.name}</span>
                                                <span>{comment.date}</span>
                                                <span className="delete" onClick={()=>actions.commentDelete(comment._id)} style={{display:(comment.author.name==loginBoxData.name || loginBoxData.name == "admin")?"block":"none"}}>删除</span>
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
                                <div className="submit" onClick={()=>this.commentSubmit()}>留言</div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    loginBoxData:state.loginBoxData,
    articleBoxData:state.articleBoxData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({article,_alert,commentSubmit,commentDelete,edit,articleDelete,modBoxAction}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);
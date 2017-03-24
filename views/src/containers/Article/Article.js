import React from  'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import './Article.scss';
import avatar from '../../styles/avatar.png';

import {article,_alert,commentSubmit,commentDelete} from '../../actions/modBoxAction';


export class Article extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.actions.article(location.pathname.slice(1));
        console.log(this.props.pageBoxData);
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
            <div className="article">
                <article>
                    <div className="left">
                        <img className="avatar" src={avatar} />
                        <p className="author">{article.author.name}</p>
                    </div>
                    <div className="main">
                        <h1>{article.title}</h1>
                        <div className="edit">
                            <span>删除</span>
                            <span>编辑</span>
                        </div>
                        <p className="content">{article.content}</p>
                        <div className="info">
                            <span className='author-app'>{article.author.name}</span>
                            <span>发布时间：{article.date}</span>
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
                                        <p className="delete" onClick={()=>actions.commentDelete(comment._id)} style={{display:comment.author.name==loginBoxData.name?"block":"none"}}>删除</p>
                                        <p className="content">{comment.content}</p>
                                        <p className="info">
                                            <span className='author-app'>{comment.author.name}</span>
                                            <span>{comment.date}</span>
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
                                <p>登录后留言</p>
                        }
                        <div className="input-text">
                            <textarea className="content" name="content" ref={ref=>{this.content=ref}} placeholder="畅所欲言"></textarea>
                            <div className="submit" onClick={()=>this.commentSubmit()}>留言</div>
                        </div>
                    </form>
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
    actions: bindActionCreators({article,_alert,commentSubmit,commentDelete}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);
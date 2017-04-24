import React from  'react';
import './Pagination.scss';
import { Link } from 'react-router';
import { browserHistory } from 'react-router'


export class Pagination extends React.Component {
    constructor(props){
        super(props);
    }
    previousPage(search){
        const {_alert,getPageData,pageBoxData} = this.props;
        //后端增加页码参数p
        var p =pageBoxData.p;
/*        if(/p=\d+/.test(search)){
            //不改变原字符串
            var newSearch = search.replace(/p=\d+/g,function ($1) {
                var arr = [...$1];
                if(arr[$1.length-1]-1>0){
                    var i = arr[$1.length-1]=arr[$1.length-1]-1;
                    getPageData("?p="+i);
                    browserHistory.push({pathname: 'page',query:{p:i}});
                }else {
                    _alert('已经是第一页了');
                }
                return arr.join('');
            });
        } else{
            _alert('已经是第一页了');
        }*/
        p=Math.max(0,p-1);
        if(p>=1){
            getPageData(this.changePage(p));
            // {pathname: 'page',query:{p:p}}
            browserHistory.push("/page"+this.changePage(p));
        } else {
            p=1;
            _alert('已经是第一页了');
        }
    }
    nextPage(search){
        const {_alert,getPageData,pageBoxData} = this.props;
/*        if(/p=\d+/.test(search)){
            //不改变原字符串
            var newSearch = search.replace(/p=\d+/g,function ($1) {
                var arr = [...$1];
                if(arr[$1.length-1]<pageBoxData.limitNum){
                    var i = arr[$1.length-1]=arr[$1.length-1]-0+1;
                    getPageData("?p="+i);
                    browserHistory.push({pathname: 'page',query:{p:i}});
                }else {
                    _alert('已经是最后一页了');
                }
                return arr.join('');
            });
        } else{
            getPageData("?p=2");
            browserHistory.push({pathname: 'page',query:{p:2}});
        }*/

        //后端增加页码参数p
        let p =pageBoxData.p,
            limitNum = pageBoxData.limitNum;
        p = Math.min(limitNum+1,p+1);
        if(p<=limitNum){
            getPageData(this.changePage(p));
            browserHistory.push("/page"+this.changePage(p));
        }else {
            p=limitNum;
            _alert('已经是最后一页了');
        }
    }

    changePage(i){
        if(location.search){
            return /p=\d+/.test(location.search) ?
             location.search.replace(/p=\d+/,function (match) {
                return ("p="+i);
            }): (location.search + "&&p=" + i);
        } else {
            return ('?p='+i)
        }

    }

    render(){
        const {getPageData,pageBoxData} = this.props;
        let pageTmp=[],
            limitNum = pageBoxData.limitNum,
            p = pageBoxData.p;
        if(limitNum<=7 || p<4 ){
            for(let i=1;i<=Math.min(limitNum,7);i++){
                pageTmp.push(<li key={i}><Link to={"/page" + this.changePage(i)} className="link" onClick={()=>getPageData(this.changePage(i))} activeClassName="active">{i}</Link></li>)
            }
        } else if(limitNum>7){
            for(let i=Math.min(p+3,limitNum)-6;i<=Math.min(p+3,limitNum);i++){
                pageTmp.push(<li key={i}><Link to={"/page" + this.changePage(i)} className="link" onClick={()=>getPageData(this.changePage(i))} activeClassName="active">{i}</Link></li>)
            }
        }
        return (
            <ul className="pagination">
                {pageBoxData.p==1?null:
                <li className="prev" onClick={()=>this.previousPage(location.search)}>上一页</li>
                }
                {pageTmp}
                {pageBoxData.p == pageBoxData.limitNum?null:
                    <li className="next" onClick={()=>this.nextPage(location.search)}>下一页</li>
                }
            </ul>
        )
    }
}

export default Pagination;
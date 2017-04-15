import React from  'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router';
import Banner from '../../components/Banner/Banner';
import PageItem from '../../components/PageItem/PageItem';
import Pagenation from '../../components/Pagination/Pagination';
import Footer from '../../components/Footer/Footer';

import './Page.scss';


import {getPageData,_alert,article} from '../../actions/index';

export class Page extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.actions.getPageData(location.search);
        // console.log(this.props.pageBoxData);
    }

    render(){
        const {pageBoxData,loginBoxData,actions} = this.props;
        return (
            <div>
                <Banner title={'coding'} />
                <div className="page">
                    <ul className="pageList">
                        {
                            pageBoxData.page.map((page,index)=>(
                                <PageItem key={index} page={page} loginBoxData={loginBoxData} />
                            ))
                        }
                    </ul>
                    <Link to="/publish" className="pubBtn link">发表</Link>
                    <Pagenation getPageData={actions.getPageData} _alert={actions._alert} pageBoxData={pageBoxData} getPageData={actions.getPageData} />
                </div>
                <Footer />
                </div>
        )
    }
}


const mapStateToProps = state => ({
    loginBoxData:state.loginBoxData,
    pageBoxData:state.pageBoxData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({getPageData,_alert,article}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
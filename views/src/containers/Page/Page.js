import React from  'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Banner from '../../components/Banner/Banner';
import PageItem from '../../components/PageItem/PageItem';
import Pagenation from '../../components/Pagination/Pagination';

import './Page.scss';


import {getPageData,_alert,article} from '../../actions/index';

export class Page extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.actions.getPageData(location.search);
        console.log(this.props.pageBoxData);
    }

    render(){
        const {pageBoxData,loginBoxData,actions} = this.props;
        return (
            <div>
                <Banner title={'随便写写'} />
                <div className="page">
                    <ul className="pageList">
                        {
                            pageBoxData.page.map((page,index)=>(
                                <PageItem key={index} page={page} loginBoxData={loginBoxData} />
                            ))
                        }
                    </ul>
                    <Pagenation getPageData={actions.getPageData} _alert={actions._alert} pageBoxData={pageBoxData} getPageData={actions.getPageData} />
                </div>
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
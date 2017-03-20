import React from  'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import PageItem from '../../components/PageItem/PageItem';
import Pagenation from '../../components/Pagination/Pagination';

import './Page.scss';

import {getPageData,_alert} from '../../actions/modBoxAction';

export class Page extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.props.actions.getPageData(location.search);
        console.log(this.props.PageBoxData);
    }

    render(){
        const {PageBoxData,actions} = this.props;
        return (
            <div className="page">
                <ul className="pageList">
                    {
                        PageBoxData.page.map((page,index)=>(
                            <PageItem key={index} page={page} />
                        ))
                    }
                </ul>
                <Pagenation getPageData={actions.getPageData} _alert={actions._alert} PageBoxData={PageBoxData}   />
            </div>
        )
    }
}


const mapStateToProps = state => ({
    PageBoxData:state.PageBoxData
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({getPageData,_alert}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
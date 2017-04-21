import React from 'react';
import { connect } from 'react-redux';
import * as DashboardActions from '../../actions/dashboard';


const mapStateToProps = (
    state,
    ownProps
) => ({
    active: ownProps.filterName === state.manifestFilter
});

const mapStateToDispatch = (
    dispatch,
    ownProps
) => ({
    onClick: (e) => {
        e.preventDefault()
        dispatch(
            DashboardActions.setManifestFilter(ownProps.filterName)
        )
    }
});

const Filter = ( props ) => {
    const { active, text, onClick } = props;
    return active
        ? (<li className="active">
            <a href="#" onClick={e=>e.preventDefault()}>{ text } <span className="sr-only">(current)</span></a>
          </li>)
        : <li><a href="#" onClick={ onClick }>{ text }</a></li>
}

export default connect(mapStateToProps, mapStateToDispatch)(Filter);
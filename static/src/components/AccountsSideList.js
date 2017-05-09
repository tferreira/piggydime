import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/accounts';

function mapStateToProps(state) {
    return {
        data: state.accounts.data,
        token: state.auth.token,
        loaded: state.accounts.loaded,
        isFetching: state.accounts.isFetching,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


@connect(mapStateToProps, mapDispatchToProps)
export default class AccountsSideList extends React.Component {
    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const token = this.props.token;
        this.props.fetchAccountsData(token);
    }

    renderAccountsList( accounts ) {
        const rows = accounts.map((row) => {
            return (
                <li key={'account-' + row.id}>
                    <p>{row.label}</p>
                    <p>{row.bank}</p>
                    <p>{row.iban}</p>
                    <p>{row.bic}</p>
                </li>
            )
        })
        return rows
    }

    render() {
        return (
            <div>
                {!this.props.loaded
                    ? <h1>Loading data...</h1>
                    :
                    <div>
                        <h1>Your accounts</h1>
                        <h1>
                            <ul>{this.renderAccountsList(this.props.data)}</ul>
                        </h1>
                    </div>
                }
            </div>
        );
    }
}

AccountsSideList.propTypes = {
    fetchAccountsData: React.PropTypes.func,
    loaded: React.PropTypes.bool,
    data: React.PropTypes.any,
    token: React.PropTypes.string,
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { getJenkinsJobs } from '../actions/jenkins';

class Home extends Component {

    componentWillMount() {
        this.props.getJenkinsJobs();
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    render() {
        console.log(this.props.jenkins.jobs);
        return (
            <div className="container" style={{ marginTop: '50px', width: '700px' }}>
                <h2 style={{ marginBottom: '40px' }}> Welcome {localStorage.getItem('name')}</h2>

            </div>
        );
    }
}

Home.propTypes = {
    getJenkinsJobs: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    jenkins: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    getJenkinsJobs: bindActionCreators(getJenkinsJobs, dispatch),
});


const mapStateToProps = (state) => ({
    auth: state.auth,
    jenkins: state.jenkins
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
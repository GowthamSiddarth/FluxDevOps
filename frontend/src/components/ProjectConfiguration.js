import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { getJobDetails } from "../actions/jenkins";

class ProjectConfiguration extends Component {

    componentWillMount() {
        this.props.getJobDetails(this.props.match.params.projectName);
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    render() {
        console.log(this.props);
        return (
            <div>
                {this.props.match.params.projectName}
                {this.props.jenkins.buildCommand}
                {this.props.jenkins.deployCommand}
            </div>
        );
    }
}

ProjectConfiguration.propTypes = {
    getJobDetails: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    jenkins: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    getJobDetails: bindActionCreators(getJobDetails, dispatch),
});

const mapStateToProps = (state) => ({
    auth: state.auth,
    jenkins: state.jenkins,
    errors: state.errors,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectConfiguration));
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

class ProjectConfiguration extends Component {

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    render() {
        return (
            <div>
                {this.props.match.params.projectName}
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
    jenkins: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectConfiguration));
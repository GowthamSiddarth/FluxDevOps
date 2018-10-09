import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { getJenkinsJobs } from '../actions/jenkins';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

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
                <h2 style={{ marginBottom: '40px', marginLeft: '200px' }}> Welcome {localStorage.getItem('name')}</h2>
                <ListGroup  style={{ marginBottom: '80px' }}>
                    {
                        this.props.jenkins.jobs ?
                            this.props.jenkins.jobs.map((job) => {
                                return <ListGroupItem href={job.url}>{job.name}</ListGroupItem>;
                            }) : null
                    }
                </ListGroup>
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
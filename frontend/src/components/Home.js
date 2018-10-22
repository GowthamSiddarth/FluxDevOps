import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { getJenkinsJobs } from '../actions/jenkins';
import { HorizontalCenterView } from '../views/HorizontalCenterView';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';

import { scheduleBuild } from '../actions/jenkins';

class Home extends Component {

    constructor() {
        super();

        this.navigateToProjectLocation = this.navigateToProjectLocation.bind(this);
        this.scheduleBuild = this.scheduleBuild.bind(this);
        this.editJobConfiguration = this.editJobConfiguration.bind(this);
    }

    componentWillMount() {
        this.props.getJenkinsJobs();
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    navigateToProjectLocation() {
        this.props.history.push('/projectDetails');
    }

    scheduleBuild(e) {
        e.preventDefault();
        const job = {
            jobName: e.target.getAttribute('data-jobname'),
        };

        this.props.scheduleBuild(job);
        window.open(e.target.getAttribute('data-joburl'), '_blank').focus();
    }

    editJobConfiguration(e) {
        e.preventDefault();
        console.log("Edit Job Configuration");
    }

    render() {
        return (
            <HorizontalCenterView>
                <div className="container" style={{ marginTop: '50px' }}>
                    <HorizontalCenterView left="4" center="4" right="4">
                        {/* <Button bsStyle="primary" onClick={this.props.history.push('/projectLocation')}>Create New Job</Button> */}
                        <Button bsStyle="primary" onClick={this.navigateToProjectLocation}>Create New Job</Button>
                    </HorizontalCenterView>
                    <ListGroup style={{ marginBottom: '80px', marginTop: '20px' }}>
                        {
                            this.props.jenkins.jobs && Array.isArray(this.props.jenkins.jobs) ?
                                this.props.jenkins.jobs.map((job) => {
                                    return (
                                        <ListGroupItem style={{ display: 'flex', alignItems: 'center' }} key={job.name} href={job.url}>
                                            <span>{job.name}</span>
                                            <Button
                                                style={{ position: 'absolute', right: 80 }}
                                                bsStyle="success"
                                                data-jobname={job.name}
                                                data-joburl={job.url}
                                                onClick={this.scheduleBuild}>
                                                Build
                                                </Button>
                                            <Button
                                                style={{ position: 'absolute', right: 20 }}
                                                bsStyle="warning"
                                                data-jobname={job.name}
                                                data-joburl={job.url}
                                                onClick={this.editJobConfiguration}>
                                                Edit
                                                </Button>
                                        </ListGroupItem>);
                                }) : null
                        }
                    </ListGroup>
                </div>
            </HorizontalCenterView>
        );
    }
}

Home.propTypes = {
    getJenkinsJobs: PropTypes.func.isRequired,
    scheduleBuild: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    jenkins: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    getJenkinsJobs: bindActionCreators(getJenkinsJobs, dispatch),
    scheduleBuild: bindActionCreators(scheduleBuild, dispatch),
});


const mapStateToProps = (state) => ({
    auth: state.auth,
    jenkins: state.jenkins
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
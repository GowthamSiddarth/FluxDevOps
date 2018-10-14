import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { getJenkinsJobs } from '../actions/jenkins';
import { HorizontalCenterView } from '../views/HorizontalCenterView';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';

class Home extends Component {

    constructor() {
        super();

        this.navigateToProjectLocation = this.navigateToProjectLocation.bind(this);
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
                                    return <ListGroupItem key={job.name} href={job.url}>{job.name}</ListGroupItem>;
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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

import { Button } from 'react-bootstrap';
import { UncontrolledAlert } from "reactstrap";
import { HorizontalCenterView } from '../views/HorizontalCenterView';

import { createNewJob } from '../actions/jenkins';

class ProjectDetails extends Component {

    constructor() {
        super();

        this.state = {
            projectLocationType: 'default',
            projectLocation: '',
            projectName: '',
            projectType: 'default',
            buildCommand: 'mvn -Dmaven.test.failure.ignore clean package',
            deployCommand: '',
            deploymentMode: '',
            portNumber: '',
            submitButtonIsDisabled: true,
            errors: {},
        }

        this.handleProjectLocationTypeChange = this.handleProjectLocationTypeChange.bind(this);
        this.handleProjectLocationChange = this.handleProjectLocationChange.bind(this);
        this.handleProjectTypeChange = this.handleProjectTypeChange.bind(this);
        this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
        this.handleBuildCommandChange = this.handleBuildCommandChange.bind(this);
        this.handleDeployCommandChange = this.handleDeployCommandChange.bind(this);
        this.handleDeploymentModeChange = this.handleDeploymentModeChange.bind(this);
        this.handlePortNumberChange = this.handlePortNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    isFormValid() {
        return this.state.projectLocationType !== 'default' &&
            this.state.projectLocation.trim().length !== 0 &&
            this.state.projectName.trim().length !== 0 &&
            this.state.projectType !== 'default' &&
            this.state.buildCommand.trim().length !== 0 &&
            this.state.deployCommand.trim().length !== 0 &&
            this.state.deploymentMode.trim().length !== 0 &&
            this.state.portNumber.trim().length !== 0;
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const project = {
            projectLocationType: this.state.projectLocationType,
            projectLocation: this.state.projectLocation,
            projectName: this.state.projectName,
            projectType: this.state.projectType,
            buildCommand: this.state.buildCommand,
            deployCommand: this.state.deployCommand,
            deploymentMode: this.state.deploymentMode,
            portNumber: this.state.portNumber,
        };

        this.props.createNewJob(project, this.props.history);
    }

    handleProjectLocationTypeChange(e) {
        e.preventDefault();
        this.setState({
            projectLocationType: e.target.value,
        }, () => {
            this.setState({
                submitButtonIsDisabled: !this.isFormValid()
            })
        });
    }

    handleProjectLocationChange(e) {
        e.preventDefault();
        this.setState({
            projectLocation: e.target.value,
        }, () => {
            this.setState({
                submitButtonIsDisabled: !this.isFormValid()
            })
        });
    }

    handleProjectNameChange(e) {
        e.preventDefault();
        this.setState({
            projectName: e.target.value,
        }, () => {
            this.setState({
                submitButtonIsDisabled: !this.isFormValid()
            })
        });
    }

    handleProjectTypeChange(e) {
        e.preventDefault();
        this.setState({
            projectType: e.target.value,
        }, () => {
            this.setState({
                submitButtonIsDisabled: !this.isFormValid()
            })
        });
    }

    handleBuildCommandChange(e) {
        e.preventDefault();
        this.setState({
            buildCommand: e.target.value,
        }, () => {
            this.setState({
                submitButtonIsDisabled: !this.isFormValid()
            });
        });
    }

    handleDeployCommandChange(e) {
        e.preventDefault();
        this.setState({
            deployCommand: e.target.value,
        }, () => {
            this.setState({
                submitButtonIsDisabled: !this.isFormValid()
            });
        });
    }

    handleDeploymentModeChange(e) {
        e.preventDefault();
        this.setState({
            deploymentMode: e.target.value,
        }, () => {
            this.setState({
                submitButtonIsDisabled: !this.isFormValid()
            })
        });
    }

    handlePortNumberChange(e) {
        e.preventDefault();
        this.setState({
            portNumber: e.target.value,
        }, () => {
            this.setState({
                submitButtonIsDisabled: !this.isFormValid()
            })
        });
    }

    render() {
        const { errors } = this.state;
        return (
            <div style={{ marginTop: '50px', marginBottom: '80px' }}>
                <HorizontalCenterView left="3" center="6" right="3">
                    <form onSubmit={this.handleSubmit} >
                        <div className="form-group">
                            <select
                                className={classnames('form-control form-control-md', {
                                    'is-invalid': errors.projectLocationType
                                })}
                                onChange={this.handleProjectLocationTypeChange}>
                                <option value="default">Select Project Location Type</option>
                                <option value="perforce">Perforce</option>
                                <option value="github">Github</option>
                            </select>
                            {errors.projectLocationType && (<div className="invalid-feedback">{errors.projectLocationType}</div>)}
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Enter Project Location"
                                className={classnames('form-control form-control-md', {
                                    'is-invalid': errors.projectLocation
                                })}
                                name="projectLocation"
                                onChange={this.handleProjectLocationChange}
                                value={this.state.projectLocation}
                            />
                            {errors.projectLocation && (<div className="invalid-feedback">{errors.projectLocation}</div>)}
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Enter Project Name"
                                className={classnames('form-control form-control-md', {
                                    'is-invalid': errors.projectName
                                })}
                                name="projectName"
                                onChange={this.handleProjectNameChange}
                                value={this.state.projectName}
                            />
                            {errors.projectName && (<div className="invalid-feedback">{errors.projectName}</div>)}
                        </div>
                        <div className="form-group">
                            <select
                                className={classnames('form-control form-control-md', {
                                    'is-invalid': errors.projectType
                                })}
                                onChange={this.handleProjectTypeChange}>
                                <option value="default">Select Project Type</option>
                                <option value="Maven">Maven</option>
                                <option value="NPM">NPM</option>
                            </select>
                            {errors.projectType && (<div className="invalid-feedback">{errors.projectType}</div>)}
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Enter Build Command"
                                className={classnames('form-control form-control-md', {
                                    'is-invalid': errors.buildCommand
                                })}
                                name="buildCommand"
                                onChange={this.handleBuildCommandChange}
                                value={this.state.buildCommand}
                            />
                            <UncontrolledAlert color="info">
                                This is the default build command which we'll be using. You can edit it according to your project
                                    </UncontrolledAlert>
                            {errors.buildCommand && (<div className="invalid-feedback">{errors.buildCommand}</div>)}
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Enter Deploy Command"
                                className={classnames('form-control form-control-md', {
                                    'is-invalid': errors.deployCommand
                                })}
                                name="deployCommand"
                                onChange={this.handleDeployCommandChange}
                                value={this.state.deployCommand}
                            />
                            {errors.deployCommand && (<div className="invalid-feedback">{errors.deployCommand}</div>)}
                        </div>
                        <div className="form-group">
                            <select
                                className={classnames('form-control form-control-md', {
                                    'is-invalid': errors.deploymentMode
                                })}
                                onChange={this.handleDeploymentModeChange}>
                                <option value="default">Select Deployment Mode</option>
                                <option value="jboss">Jboss</option>
                                <option value="tomcat">Tomcat</option>
                                <option value="jar">Simple Jar</option>
                            </select>
                            {errors.deploymentMode && (<div className="invalid-feedback">{errors.deploymentMode}</div>)}
                        </div>
                        <div className="form-group">
                            <input
                                type="number"
                                placeholder="Enter Port Number of Application"
                                className={classnames('form-control form-control-md', {
                                    'is-invalid': errors.portNumber
                                })}
                                name="portNumber"
                                min="3000"
                                max="65535"
                                onChange={this.handlePortNumberChange}
                                value={this.state.portNumber}
                            />
                            {errors.portNumber && (<div className="invalid-feedback">{errors.portNumber}</div>)}
                        </div>
                        <Button type="submit" disabled={this.state.submitButtonIsDisabled}>Submit</Button>
                    </form>
                </HorizontalCenterView>
            </div>
        );
    }
}

ProjectDetails.propTypes = {
    createNewJob: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    jenkins: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    createNewJob: bindActionCreators(createNewJob, dispatch),
});

const mapStateToProps = (state) => ({
    auth: state.auth,
    jenkins: state.jenkins,
    errors: state.errors,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectDetails));
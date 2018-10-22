import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

import { Button } from 'react-bootstrap';
import { UncontrolledAlert } from "reactstrap";
import { HorizontalCenterView } from '../views/HorizontalCenterView';

import { createNewProject } from '../actions/project';
import { createNewJob } from '../actions/jenkins';

class ProjectDetails extends Component {

    constructor() {
        super();

        this.state = {
            projectLocationType: '',
            projectLocation: '',
            projectName: '',
            projectType: '',
            buildCommand: 'mvn -Dmaven.test.failure.ignore clean package',
            submitButtonIsDisabled: true,
            errors: {},
        }

        this.handleProjectLocationTypeChange = this.handleProjectLocationTypeChange.bind(this);
        this.handleProjectLocationChange = this.handleProjectLocationChange.bind(this);
        this.handleProjectTypeChange = this.handleProjectTypeChange.bind(this);
        this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
        this.handleBuildCommandChange = this.handleBuildCommandChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    isFormValid() {
        console.log("projectLocationType = " + this.state.projectLocationType);
        console.log("projectLocation = " + this.state.projectLocation);
        console.log("projectName = " + this.state.projectName);
        console.log("projectType = " + this.state.projectType);
        console.log("buildCommand = " + this.state.buildCommand);

        return this.state.projectLocationType !== 'default' &&
            this.state.projectLocation.length !== 0 &&
            this.state.projectName.length !== 0 &&
            this.state.projectType !== 'default' &&
            this.state.buildCommand.length !== 0
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
            projectLocation: this.state.projectLocation,
            projectType: this.state.projectType,
            projectName: this.state.projectName,
        };
        const job = {
            jobName: this.state.projectName,
        }

        this.props.createNewJob(job);
        this.props.createNewProject(project, this.props.history);
    }

    handleProjectLocationTypeChange(e) {
        e.preventDefault();
        this.setState({
            projectLocationType: e.target.value,
        });
    }

    handleProjectLocationChange(e) {
        e.preventDefault();
        this.setState({
            projectLocation: e.target.value.trim(),
            submitButtonIsDisabled: !this.isFormValid(),
        });
    }

    handleProjectNameChange(e) {
        e.preventDefault();
        this.setState({
            projectName: e.target.value.trim(),
            submitButtonIsDisabled: !this.isFormValid(),
        });
    }

    handleProjectTypeChange(e) {
        e.preventDefault();
        this.setState({
            projectType: e.target.value,
            submitButtonIsDisabled: !this.isFormValid(),
        });
    }

    handleBuildCommandChange(e) {
        e.preventDefault();
        this.setState({
            buildCommand: e.target.value.trim(),
            submitButtonIsDisabled: !this.isFormValid(),
        })
    }

    render() {
        const { errors } = this.state;
        return (
            <div style={{ marginTop: '50px' }}>
                <HorizontalCenterView left="4" center="4" right="4">
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
                        <Button type="submit" disabled={this.state.submitButtonIsDisabled}>Submit</Button>
                    </form>
                </HorizontalCenterView>
            </div>
        );
    }
}

ProjectDetails.propTypes = {
    createNewProject: PropTypes.func.isRequired,
    createNewJob: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    createNewProject: bindActionCreators(createNewProject, dispatch),
    createNewJob: bindActionCreators(createNewJob, dispatch),
});

const mapStateToProps = (state) => ({
    auth: state.auth,
    project: state.project,
    errors: state.errors,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectDetails));
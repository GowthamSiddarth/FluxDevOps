import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

import { Button } from 'react-bootstrap';
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
            buildCommand: 'mvn -Dmaven.test.failure.ignore clean package',
            errors: {},
            projectLocationIsHidden: true,
            projectNameIsHidden: true,
            projectTypeIsHidden: true,
            buildCommandIsHidden: true,
        }

        this.handleProjectLocationTypeChange = this.handleProjectLocationTypeChange.bind(this);
        this.handleProjectLocationChange = this.handleProjectLocationChange.bind(this);
        this.handleProjectTypeChange = this.handleProjectTypeChange.bind(this);
        this.handleProjectNameChange = this.handleProjectNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        if (e.target.value !== 'default') {
            this.setState({
                projectLocationType: e.target.value,
                projectLocationIsHidden: false,
            });
        } else {
            this.setState({
                projectLocationType: e.target.value,
                projectLocationIsHidden: true,
                projectNameIsHidden: true,
                projectTypeIsHidden: true,
            })
        }
    }

    handleProjectTypeChange(e) {
        e.preventDefault();
        if (e.target.value !== 'default') {
            this.setState({
                projectType: e.target.value,
                buildCommandIsHidden: false,
            });
        } else {
            this.setState({
                projectType: e.target.value,
                buildCommandIsHidden: true,
            });
        }
    }

    handleProjectLocationChange(e) {
        e.preventDefault();
        if (e.target.value.length !== 0) {
            this.setState({
                projectLocation: e.target.value,
                projectNameIsHidden: false,
            });
        } else {
            this.setState({
                projectLocation: e.target.value,
                projectNameIsHidden: true,
            })
        }
    }

    handleProjectNameChange(e) {
        e.preventDefault();
        if (e.target.value.length !== 0) {
            this.setState({
                projectName: e.target.value,
                projectTypeIsHidden: false,
            });
        } else {
            this.setState({
                projectName: e.target.value,
                projectTypeIsHidden: true,
            })
        }
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
                        {
                            !this.state.projectLocationIsHidden &&
                            (
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
                            )
                        }
                        {
                            !this.state.projectNameIsHidden &&
                            (
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
                            )
                        }
                        {
                            !this.state.projectTypeIsHidden &&
                            (
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
                            )
                        }
                        {
                            !this.state.buildCommandIsHidden &&
                            (
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="Enter Build Command"
                                        className={classnames('form-control form-control-md', {
                                            'is-invalid': errors.buildCommand
                                        })}
                                        name="buildCommand"
                                        onChange={this.handleProjectNameChange}
                                        value={this.state.buildCommand}
                                    />
                                    {errors.buildCommand && (<div className="invalid-feedback">{errors.buildCommand}</div>)}
                                </div>
                            )
                        }
                        <Button type="submit" disabled={this.state.buildCommandIsHidden}>Submit</Button>
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
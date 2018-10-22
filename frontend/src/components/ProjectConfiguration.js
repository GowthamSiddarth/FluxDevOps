import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import classnames from "classnames";

import { Button } from "react-bootstrap";

import { getJobDetails } from "../actions/jenkins";
import { HorizontalCenterView } from '../views/HorizontalCenterView';

class ProjectConfiguration extends Component {

    constructor(props) {
        super(props);

        this.state = {
            buildCommand: '',
            deployCommand: '',
            errors: {},
            submitButtonIsDisabled: true,
        }

        this.handleBuildCommandChange = this.handleBuildCommandChange.bind(this);
        this.handleDeployCommandChange = this.handleDeployCommandChange.bind(this);
    }

    componentWillMount() {
        this.props.getJobDetails(this.props.match.params.projectName);
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    isFormValid() {
        return this.state.buildCommand.length !== 0 &&
            this.state.deployCommand.length !== 0;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.jenkins) {
            this.setState({
                buildCommand: nextProps.jenkins.buildCommand,
                deployCommand: nextProps.jenkins.deployCommand,
            }, () => {
                this.setState({
                    submitButtonIsDisabled: !this.isFormValid()
                })
            })
        }
    }

    handleBuildCommandChange(e) {
        e.preventDefault();
        this.setState({
            buildCommand: e.target.value.trim(),
        }, () => {
            this.setState({
                submitButtonIsDisabled: !this.isFormValid()
            })
        });
    }

    handleDeployCommandChange(e) {
        e.preventDefault();
        this.setState({
            deployCommand: e.target.value.trim(),
        }, () => {
            this.setState({
                submitButtonIsDisabled: !this.isFormValid()
            })
        });
    }

    render() {
        const errors = this.state.errors
        return (
            <div style={{ marginTop: '50px', marginBottom: '80px' }}>
                <HorizontalCenterView left="3" center="6" right="3">
                    <HorizontalCenterView left="4" center="4" right="4">
                        <h5 style={{ marginBottom: '50px' }}>{this.props.match.params.projectName}</h5>
                    </HorizontalCenterView>
                    <form >
                        <div className="form-group">
                            <label htmlFor="buildCommand">Change Build Command</label>
                            <input
                                type="text"
                                placeholder="Enter build command"
                                className={classnames('form-control form-control-md', {
                                    'is-invalid': errors.projectLocation
                                })}
                                name="buildCommand"
                                onChange={this.handleBuildCommandChange}
                                value={this.state.buildCommand}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="deployCommand">Change Deploy Command</label>
                            <input
                                type="text"
                                placeholder="Enter deploy command"
                                className={classnames('form-control form-control-md', {
                                    'is-invalid': errors.projectLocation
                                })}
                                name="deployCommand"
                                onChange={this.handleDeployCommandChange}
                                value={this.state.deployCommand}
                            />
                        </div>
                        <Button type="submit" disabled={this.state.submitButtonIsDisabled}>Submit</Button>
                    </form>
                </HorizontalCenterView>
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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

import { Button } from 'react-bootstrap';
import { HorizontalCenterView } from '../views/HorizontalCenterView';

import { createNewProject } from '../actions/project';

class ProjectLocation extends Component {

    constructor() {
        super();

        this.state = {
            projectLocation: '',
            errors: {},
        }

        this.handleChange = this.handleChange.bind(this);
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
            projectLocation: this.state.projectLocation
        };
        this.props.createNewProject(project, this.props.history);
    }

    handleChange(e) {
        this.setState({
            projectLocation: e.target.value
        });
    }

    render() {
        const { errors } = this.state;
        return (
            <div style={{ marginTop: '50px' }}>
                <HorizontalCenterView left="4" center="4" right="4">
                    <form onSubmit={this.handleSubmit} >
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Enter Project Location"
                                className={classnames('form-control form-control-lg', {
                                    'is-invalid': errors.projectLocation
                                })}
                                name="projectLocation"
                                onChange={this.handleChange}
                                value={this.state.projectLocation}
                            />
                            {errors.projectLocation && (<div className="invalid-feedback">{errors.projectLocation}</div>)}
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </HorizontalCenterView>
            </div>
        );
    }
}

ProjectLocation.propTypes = {
    createNewProject: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
    createNewProject: bindActionCreators(createNewProject, dispatch),
});

const mapStateToProps = (state) => ({
    auth: state.auth,
    project: state.project,
    errors: state.errors,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectLocation));
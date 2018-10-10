import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { HorizontalCenterView } from '../views/HorizontalCenterView';

import { createNewProject } from '../actions/project';

class ProjectLocation extends Component {

    constructor() {
        super();

        this.state = {
            projectLocation: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createNewProject(this.state.projectLocation);
    }

    handleChange(e) {
        this.setState({
            projectLocation: e.target.value
        });
    }

    render() {
        return (
            <div style={{ marginTop: '50px' }}>
                <HorizontalCenterView left="4" center="4" right="4">
                    <form onSubmit={this.handleSubmit} >
                        <FormGroup controlId="formBasicText">
                            <ControlLabel>Enter project location</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.projectLocation}
                                placeholder="Enter text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
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
};

const mapDispatchToProps = (dispatch) => ({
    createNewProject: bindActionCreators(createNewProject, dispatch),
});

const mapStateToProps = (state) => ({
    auth: state.auth,
    project: state.project,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectLocation));
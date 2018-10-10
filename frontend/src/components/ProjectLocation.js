import React, { Component } from 'react';

import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import { HorizontalCenterView } from '../views/HorizontalCenterView';

class ProjectLocation extends Component {

    constructor() {
        super();

        this.state = {
            projectLocation: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
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

export default ProjectLocation;
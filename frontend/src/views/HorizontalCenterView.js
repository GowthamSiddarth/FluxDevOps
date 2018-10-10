import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

export class HorizontalCenterView extends Component {

    constructor() {
        super();

        this.state = {
            left: 2,
            center: 8,
            right: 2
        }
    }

    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col xs={1} md={this.props.left ? parseInt(this.props.left) : parseInt(this.state.left)}></Col>
                    <Col xs={4} md={this.props.center ? parseInt(this.props.center) : parseInt(this.state.center)}>{this.props.children}</Col>
                    <Col xs={1} md={this.props.right ? parseInt(this.props.right) : parseInt(this.state.right)}></Col>
                </Row>
            </Grid>
        );
    }
}
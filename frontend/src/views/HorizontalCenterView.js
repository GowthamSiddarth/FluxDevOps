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
                    <Col xs={1} md={this.props.left ? this.props.left : this.state.left}></Col>
                    <Col xs={4} md={this.props.center ? this.props.center : this.state.center}>{this.props.children}</Col>
                    <Col xs={1} md={this.props.right ? this.props.right : this.state.right}></Col>
                </Row>
            </Grid>
        );
    }
}
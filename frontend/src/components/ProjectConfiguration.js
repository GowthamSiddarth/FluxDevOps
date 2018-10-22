import React, { Component } from 'react';

class ProjectConfiguration extends Component {    

    render() {
        return (
            <div>
                {this.props.match.params.projectName}
            </div>
        );
    }
}

export default ProjectConfiguration;
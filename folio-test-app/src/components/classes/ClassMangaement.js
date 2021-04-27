import React from 'react';
import ClassesForm from './ClassesForm';

class ClassManagement extends React.Component {
    render() {
        return (
            <div>

                <ClassesForm id={this.props.match.params.id} />

            </div>
        )
    }
}

export default ClassManagement;
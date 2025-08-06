import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faCheck } from '@fortawesome/free-solid-svg-icons';

class Footer extends Component {
    render() {
        const { isEditMode, onToggleEdit } = this.props; // Destructure the props

        return (
            <div className="footer-fab" onClick={onToggleEdit}>
                <div className="b-bg">
                    <FontAwesomeIcon icon={isEditMode ? faCheck : faPencilAlt} size="lg" />
                </div>
            </div>
        );
    }
}

export default Footer;

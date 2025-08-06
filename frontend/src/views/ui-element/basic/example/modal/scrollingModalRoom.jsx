import React, { useState, useEffect } from "react";
import { Modal, ModalBody, Form, FormGroup, Label, Input, Button } from "reactstrap";
import RoomValidation from "../../../../../FormValidations/roomValidation"; // Import your room validation form
import HallValidation from "../../../../../FormValidations/hallValidation"; // Import your hall validation form

const ScrollingModal = ({ isOpen, toggle, addType, onSubmit }) => {
    const [formData, setFormData] = useState({});
    const [validationError, setValidationError] = useState(false);

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setValidationError(false);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(formData).some(field => !field)) {
            setValidationError(true);
            return;
        }
        onSubmit(formData);
        toggle(); // Close modal after submission
    };

    // Clear form data when modal closes
    useEffect(() => {
        if (!isOpen) {
            setFormData({});
        }
    }, [isOpen]);

    return (
        <Modal isOpen={isOpen} toggle={toggle} size="lg">
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    {addType === 'addRoom' && <RoomValidation formData={formData} onChange={handleChange} />}
                    {addType === 'addHall' && <HallValidation formData={formData} onChange={handleChange} />}
                    {validationError && <p className="text-danger">All fields are required.</p>}
                    <Button type="submit" color="primary">Submit</Button>
                </Form>
            </ModalBody>
        </Modal>
    );
};

export default ScrollingModal;

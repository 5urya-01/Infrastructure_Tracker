import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import YourFormComponent from "./YourFormComponent"; // Replace with your actual form component

const VerticalModal = () => {
  const [showModal, setShowModal] = useState(false);

  const confirmAction = () => {
    // Handle the action confirmation logic here
    console.log("Action confirmed");
    setShowModal(false); // Close the modal
  };

  return (
    <div>
      <Button color="primary" onClick={() => setShowModal(true)}>
        Open Vertical Modal
      </Button>

      <Modal isOpen={showModal} toggle={() => setShowModal(false)} centered>
        <ModalHeader toggle={() => setShowModal(false)}>Vertical Modal</ModalHeader>
        <ModalBody>
          <YourFormComponent />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={confirmAction}>Confirm</Button>
          <Button color="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default VerticalModal;

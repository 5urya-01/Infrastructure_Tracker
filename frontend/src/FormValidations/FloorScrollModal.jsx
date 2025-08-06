import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import FloorValidation from "./floorValidation"; // Import your FloorValidation component

const YourComponent = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const confirmAddNewFloor = () => {
    // Handle confirmation logic here, e.g., submitting data
    setShowAddModal(false); // Close the modal after confirming
  };

  return (
    <div>
      <Button color="primary" onClick={() => setShowAddModal(true)}>
        Add New Floor
      </Button>

      <Modal isOpen={showAddModal} toggle={() => setShowAddModal(false)} centered>
        <ModalHeader toggle={() => setShowAddModal(false)}>Add New Floor</ModalHeader>
        <ModalBody className="modal-body">
          <FloorValidation />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={confirmAddNewFloor}>Confirm</Button>
          <Button color="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default YourComponent;

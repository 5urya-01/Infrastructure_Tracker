import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import BuildingValidation from '../../../../../FormValidations/buildingValidation'; // Update path accordingly

const  ScrollingModal = ({ isOpen, toggle, building, onSave }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} scrollable size="lg">
      <ModalHeader toggle={toggle}>
        {building ? 'Edit Building' : 'Add Building'}
      </ModalHeader>
      <ModalBody>
        <BuildingValidation building={building} onSave={onSave} /> {/* Full size form inside modal */}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

export default ScrollingModal;

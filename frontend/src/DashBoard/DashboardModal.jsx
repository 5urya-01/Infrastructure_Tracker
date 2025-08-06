import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const DashboardModal = ({ isOpen, toggle, onSelect }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} className="modal-dialog-centered">
      <ModalHeader toggle={toggle}>Select Dashboard Type</ModalHeader>
      <ModalBody>
        <Button color="primary" onClick={() => onSelect('item-wise')}>
          Item Wise
        </Button>
        <Button color="secondary" onClick={() => onSelect('place-wise')} style={{ marginLeft: '10px' }}>
          Place Wise
        </Button>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default DashboardModal;

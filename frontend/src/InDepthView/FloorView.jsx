import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from 'axios';
import FloorValidation from '../FormValidations/floorValidation';
import DashboardModal from "../DashBoard/DashboardModal";
import Footer from '../layout/footer/index';
import './InDepthView.css';

function Floor() {
  const location = useLocation();
  const { buildingId } = useParams(); 
  const [filteredFloorData, setFilteredFloorData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [showFloorValidationModal, setShowFloorValidationModal] = useState(false); 
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [floorToEdit, setFloorToEdit] = useState(null); 
  const [floorToDelete, setFloorToDelete] = useState(null);
  const [isDashboardModalOpen, setIsDashboardModalOpen] = useState(false);

  const toggleDashboardModal = () => setIsDashboardModalOpen(!isDashboardModalOpen);

  const handleDashboardSelect = (type) => {
    toggleDashboardModal();
    const currentPath = location.pathname;
    const targetPath = type === 'item-wise' ? '/itemwise' : '/placewise';

    // Redirect only if the target path isn't already in the URL
    if (!currentPath.endsWith(targetPath)) {
      const url = `${location.pathname.replace(/\/(itemwise|placewise)$/, '')}${targetPath}`;
      window.location.href = url;
    }
  };

  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL + "/getFloorDetails/" + `${buildingId}`)
      .then((res) => {
        setFilteredFloorData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [buildingId]);

  const showAlert = (message) => {
    setAlerts((prevAlerts) => [...prevAlerts, message]);
    setTimeout(() => {
      setAlerts((prevAlerts) => prevAlerts.slice(1));
    }, 3000); 
  };

  const handleAddNewFloor = () => {
    setFloorToEdit(null);
    setShowFloorValidationModal(true);
  };

  const handleEditFloor = (floor) => {
    setFloorToEdit(floor); 
    setShowFloorValidationModal(true);
  };

  const handleSaveFloor = () => {
    axios.get(process.env.REACT_APP_BACKEND_URL + "/getFloorDetails/" + `${buildingId}`)
      .then((res) => {
        setFilteredFloorData(res.data);
        showAlert(floorToEdit ? "Floor updated successfully!" : "New floor added successfully!");
      })
      .catch((err) => {
        console.error("Error refreshing data:", err);
      });
    setShowFloorValidationModal(false);
  };
  
  const handleDelete = (floorId) => {
    axios.post(process.env.REACT_APP_BACKEND_URL + "/deleteFloorDetails", { "floorId" : floorId })
      .then(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL + "/getFloorDetails/" + `${buildingId}`)
          .then((res) => {
            setFilteredFloorData(res.data);
            showAlert("Floor deleted successfully!");
          })
          .catch((err) => console.error("Error refreshing data:", err));
      })
      .catch((err) => console.error("Error deleting floor:", err));
  
    setShowDeleteConfirmationModal(false);
  };
  

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
    showAlert(isEditMode ? "Edit mode deactivated!" : "Edit mode activated!");
  };

  const confirmDelete = (floorId) => {
    setFloorToDelete(floorId);
    setShowDeleteConfirmationModal(true);
  };

  return (
    <div>
      {/* Alert Container in the top-right corner */}
      <div className="alert-container" >
        {alerts.map((alert, index) => (
          <Alert 
            key={index} 
            color="success" 
            fade={false}
            className="alert"

          >
            {alert}
          </Alert>
        ))}
      </div>
      
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <Button color="primary" onClick={toggleDashboardModal}>
          View Dashboard
        </Button>
      </div>
      <h1 className="main-head">{buildingId} Floor's</h1>
      <div className="floor-wrap-container">
        {filteredFloorData.map((floor) => (
          <div key={floor.floorId} className="floor-card-wrapper">
            <div className="room-card">
              <Link to={`${location.pathname}/${floor.floorId}`} className="floor-card-link">
                <div className="room-card">
                  <h2>Floor {floor.floorNo}</h2>
                  <p>Code: {floor.floorId}</p>
                  <p>Incharge: {floor.floorInCharge}</p>
                </div>
              </Link>
              {isEditMode && (
                <>
                  <Button color="danger" className="delete-button" onClick={() => confirmDelete(floor.floorId)}>
                    X
                  </Button>
                  <Button color="success" className="edit-button" onClick={() => handleEditFloor(floor)}>
                    Edit
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
        {isEditMode && (
          <div className="floor-card plus-card-floor-room" onClick={handleAddNewFloor}>
            <h1>+</h1>
          </div>
        )}
      </div>

      <Modal isOpen={showFloorValidationModal} toggle={() => setShowFloorValidationModal(false)} centered size="lg">
        <ModalHeader toggle={() => setShowFloorValidationModal(false)}>
          {floorToEdit ? "Edit Floor" : "Add New Floor"}
        </ModalHeader>
        <ModalBody>
          <FloorValidation floor={floorToEdit} onSubmit={handleSaveFloor} />
        </ModalBody>
      </Modal>

      <Modal isOpen={showDeleteConfirmationModal} toggle={() => setShowDeleteConfirmationModal(false)} centered size="lg">
        <ModalHeader toggle={() => setShowDeleteConfirmationModal(false)}>
          Delete Confirmation
        </ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this floor?</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => handleDelete(floorToDelete)}>Delete</Button>
          <Button color="secondary" onClick={() => setShowDeleteConfirmationModal(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <DashboardModal
        isOpen={isDashboardModalOpen}
        toggle={toggleDashboardModal}
        onSelect={handleDashboardSelect}
      />
      <Footer isEditMode={isEditMode} onToggleEdit={toggleEditMode} />

    </div>
  );
}

export default Floor;

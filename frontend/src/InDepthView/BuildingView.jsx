import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert } from "reactstrap";
import buildingsData from "../assets/FakeData/BuildingData";
import Footer from '../layout/footer/index';
import BuildingValidation from '../FormValidations/buildingValidation';
import "./InDepthView.css";
import axios from 'axios'
// const defaultImage = "path/to/defaultImage.jpg"; // Set a path to your default image

function InDepthView() {
  const location = useLocation();
  const [buildings, setBuildings] = useState([]);
  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL + "/getBuildingDetails")
      .then((res) => {
        setBuildings(res.data)
      })
      .catch((err) => {
        console.error(err);
      });
    
  },[])
  const [modal, setModal] = useState(false);
  const [buildingToDelete, setBuildingToDelete] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [buildingToEdit, setBuildingToEdit] = useState(null);

  const toggleModal = () => setModal(!modal);

  const handleDeleteClick = (building) => {
    setBuildingToDelete(building);
    setShowDeleteModal(true);
  };

  const confirmDelete = async() => {
    setBuildings(buildings.filter(building => building.buildingId !== buildingToDelete.buildingId));
    axios.post(process.env.REACT_APP_BACKEND_URL + "/deleteBuildingDetails",{buildingId : buildingToDelete.buildingId})
      .then((res) => {
        setBuildings(res.data)
      })
      .catch((err) => {
        console.error(err);
      });
    addAlert(`Building "${buildingToDelete.buildingName}" deleted successfully!`, "success");
    setShowDeleteModal(false);
    setBuildingToDelete(null);
  };

  const addAlert = (message, type) => {
    setAlerts((prevAlerts) => [...prevAlerts, { message, type }]);
    setTimeout(() => {
      removeAlert(message);
    }, 3000);
  };

  const removeAlert = (message) => {
    setAlerts((prevAlerts) => prevAlerts.filter(alert => alert.message !== message));
  };

  const toggleEditMode = () => {
    if (isEditMode) {
      addAlert("Changes made successfully!", "success");
    }
    setIsEditMode(prev => !prev);
  };

  const handleAddNewCard = () => {
    setBuildingToEdit(null);
    setModal(true);
  };

  const handleSaveNewCard = (newBuilding) => {
    const buildingWithDefaults = {
      ...newBuilding,
      image: newBuilding.imageFile ? URL.createObjectURL(newBuilding.imageFile) : "xyz",
    };

    setBuildings([...buildings, buildingWithDefaults]);
    addAlert("New building added successfully!", "success");
    setModal(false);
    console.log('New Building Data:', buildingWithDefaults);
  };

  const handleEditClick = (building) => {
    console.log(building);
    const buildingData = buildings.find(b => b.buildingId === building.buildingId);
    setBuildingToEdit(buildingData);
    setModal(true);
  };

  const handleSaveChanges = (updatedBuilding) => {
    setBuildings(buildings.map(b => b.buildingId === updatedBuilding.buildingId ? updatedBuilding : b));
    addAlert(`Building "${updatedBuilding.buildingName}" updated successfully!`, "success");
    setModal(false);
    setBuildingToEdit(null);
  };

  return (
    <>
      <h1 className="main-head">All Building's</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "27px", justifyContent: "center" }}>
        {buildings.map((building) => (
          <div key={`${building.buildingId}-${building.buildingName}`} className="building-card" style={{ position: 'relative' }}>
            <Link to={`${location.pathname}/${building.buildingId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div>
                <img src={"http://localhost:7000/" + building.buildingImage || ""} alt={building.buildingName} />
                <div className="buildingName">{building.buildingName}</div>
                <div className="smalltext">
                  <div><b>Incharge:</b>&nbsp;&nbsp;&nbsp;&nbsp;{building.buildingInCharge}</div>
                  <div><b>Code:</b>&nbsp;&nbsp;&nbsp;&nbsp;{building.buildingId}</div>
                  <div>Latitude: {building.buildingLocation.latitude}<br /> Longitude: {building.buildingLocation.longitude}</div>
                </div>
              </div>
            </Link>
            {isEditMode && (
              <>
                <Button
                  color="danger"
                  className="delete-button"
                  onClick={() => handleDeleteClick(building)}
                >
                  X
                </Button>
                <Button
                  color="primary"
                  className="edit-button"
                  onClick={() => handleEditClick(building)}
                >
                  Edit
                </Button>
              </>
            )}
          </div>
        ))}
        {isEditMode && (
          <div className="building-card plus-card" onClick={handleAddNewCard}>
            <h1>+</h1>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteModal} toggle={() => setShowDeleteModal(false)} centered>
        <ModalHeader toggle={() => setShowDeleteModal(false)}>Confirm Deletion</ModalHeader>
        <ModalBody>
          Are you sure you want to delete "{buildingToDelete?.buildingName}"?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={confirmDelete}>Delete</Button>
          <Button color="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* Scrolling Modal for Add/Edit Form */}
      <Modal isOpen={modal} toggle={() => setModal(false)} centered size="lg">
        <ModalHeader toggle={() => setModal(false)}>
          {buildingToEdit ? `Edit Building "${buildingToEdit.buildingName}"` : "Add New Building"}
        </ModalHeader>
        <ModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <BuildingValidation
            building={buildingToEdit}
            onSave={buildingToEdit ? handleSaveChanges : handleSaveNewCard}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 9999 }}>
        {alerts.map((alert, index) => (
          <Alert key={index} color={alert.type} style={{ marginBottom: '10px' }}>
            {alert.message}
          </Alert>
        ))}
      </div>

      <Footer isEditMode={isEditMode} onToggleEdit={toggleEditMode} />
    </>
  );
}

export default InDepthView;

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert, Input } from "reactstrap";
import Footer from '../layout/footer/index';
import AssetValidation from '../FormValidations/assetValidation';
import "../InDepthView/InDepthView.css";
import axios from 'axios';

function StoreRoom() {
  const location = useLocation();
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [modal, setModal] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assetToEdit, setAssetToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://localhost:7000/getStoreItemDetails")
      .then((res) => {
        setAssets(res.data);
        setFilteredAssets(res.data); // Initialize filteredAssets
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const filtered = assets.filter(asset => 
      asset.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAssets(filtered);
  }, [searchTerm, assets]);

  const toggleModal = () => setModal(!modal);

  const handleDeleteClick = (asset) => {
    setAssetToDelete(asset);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setAssets(assets.filter(asset => asset.itemId !== assetToDelete.itemId));
    addAlert(`Asset "${assetToDelete.itemName}" deleted successfully!`, "success");
    setShowDeleteModal(false);
    setAssetToDelete(null);
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
    setAssetToEdit(null);
    setModal(true);
  };

  const handleSaveNewCard = (newAsset) => {
    const assetWithDefaults = {
      ...newAsset,
      image: newAsset.imageFile ? URL.createObjectURL(newAsset.imageFile) : "xyz",
    };

    setAssets([...assets, assetWithDefaults]);
    addAlert("New asset added successfully!", "success");
    setModal(false);
  };

  const handleEditClick = (asset) => {
    const assetData = assets.find(a => a.itemId === asset.itemId);
    setAssetToEdit(assetData);
    setModal(true);
  };

  const handleSaveChanges = (updatedAsset) => {
    setAssets(assets.map(a => a.itemId === updatedAsset.itemId ? updatedAsset : a));
    addAlert(`Asset "${updatedAsset.itemName}" updated successfully!`, "success");
    setModal(false);
    setAssetToEdit(null);
  };

  return (
    <>
      <h1 className="main-head">All Assets</h1>

      {/* Search Bar */}
      <div style={{ marginBottom: '20px', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Input 
          type="text" 
          placeholder="Search by item name..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '400px' }} // Adjust width to match the card layout
        />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "27px", justifyContent: "center" }}>
        {filteredAssets.map((asset) => (
          <div key={`${asset.itemId}-${asset.itemName}`} className="asset-card" style={{ position: 'relative' }}>
            <Link to={`${location.pathname}/${asset.itemId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="asset-details">
                <div className="room-text">{asset.itemName || asset.assetType}</div>
                <div className="asset-info">
                  <div className="asset-id"><strong>Asset ID:</strong> {asset.itemId}</div>
                  <div className="asset-condition"><strong>Condition:</strong> {asset.condition}</div>
                  <div className="asset-company"><strong>Company:</strong> {asset.company}</div>
                  {asset.consumption && (
                    <div className="asset-consumption"><strong>Consumption:</strong> {asset.consumption}</div>
                  )}
                </div>
              </div>
            </Link>
            {isEditMode && (
              <>
                <Button color="danger" className="delete-button" onClick={() => handleDeleteClick(asset)}>X</Button>
                <Button color="primary" className="edit-button" onClick={() => handleEditClick(asset)}>Edit</Button>
              </>
            )}
          </div>
        ))}
        {isEditMode && (
          <div className="asset-card plus-card-asset" onClick={handleAddNewCard}>
            <h1>+</h1>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteModal} toggle={() => setShowDeleteModal(false)} centered>
        <ModalHeader toggle={() => setShowDeleteModal(false)}>Confirm Deletion</ModalHeader>
        <ModalBody>
          Are you sure you want to delete "{assetToDelete?.itemName}"?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={confirmDelete}>Delete</Button>
          <Button color="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* Scrolling Modal for Add/Edit Form */}
      <Modal isOpen={modal} toggle={() => setModal(false)} centered size="lg">
        <ModalHeader toggle={() => setModal(false)}>
          {assetToEdit ? `Edit Asset "${assetToEdit.itemName}"` : "Add New Asset"}
        </ModalHeader>
        <ModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <AssetValidation
            asset={assetToEdit}
            onSave={assetToEdit ? handleSaveChanges : handleSaveNewCard}
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

export default StoreRoom;

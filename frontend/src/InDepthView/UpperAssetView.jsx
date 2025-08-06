import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import Footer from "../layout/footer/index";
import DashboardModal from "../DashBoard/DashboardModal";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import AssetValidation from "../FormValidations/assetValidation";
import AssetEditForm from "../FormValidations/assetEditValidation";
import "./InDepthView.css";

function UpperAsset() {
  const { roomId } = useParams();
  const location = useLocation();
  const [filteredAssetData, setFilteredAssetData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [showAssetValidationModal, setShowAssetValidationModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [assetToEdit, setAssetToEdit] = useState(null);
  const [assetToDelete, setAssetToDelete] = useState(null);
  const [isDashboardModalOpen, setIsDashboardModalOpen] = useState(false);

  const toggleDashboardModal = () => setIsDashboardModalOpen(!isDashboardModalOpen);

  const handleDashboardSelect = (type) => {
    toggleDashboardModal();
    const currentPath = location.pathname;
    const targetPath = type === "item-wise" ? "/itemwise" : "/placewise";

    if (!currentPath.endsWith(targetPath)) {
      const url = `${location.pathname.replace(/\/(itemwise|placewise)$/, "")}${targetPath}`;
      window.location.href = url;
    }
  };

  const itemName = location.state?.itemName;

  useEffect(() => {
    if (!itemName) return;

    axios
      .get(`http://localhost:7000/getAssetDetails/${roomId}`)
      .then((res) => {
        const filteredAssets = res.data.filter((asset) => asset.itemName === itemName);
        setFilteredAssetData(filteredAssets);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [roomId, itemName]);

  const showAlert = (message) => {
    setAlerts((prevAlerts) => [...prevAlerts, message]);
    setTimeout(() => {
      setAlerts((prevAlerts) => prevAlerts.slice(1));
    }, 3000);
  };

  const handleAddNewAsset = () => {
    setAssetToEdit(null);
    setShowAssetValidationModal(true);
  };

  const handleEditAsset = (asset) => {
    setAssetToEdit(asset);
    setShowAssetValidationModal(true);
  };

  const handleSaveAsset = (newAsset) => {
    if (newAsset.status === "Instock") {
      newAsset = {
        ...newAsset,
        buildingId: "",
        floorId: "",
        roomId: "",
        hallId: "",
        location: "",
      };
    }

    if (assetToEdit) {
      setFilteredAssetData((prevAssets) =>
        prevAssets.map((asset) =>
          asset.itemId === assetToEdit.itemId ? newAsset : asset
        )
      );
      showAlert("Asset updated successfully!");
    } else {
      const newAssetId = String(filteredAssetData.length + 1).padStart(5, "0");
      setFilteredAssetData((prevAssets) => [
        ...prevAssets,
        { ...newAsset, itemId: newAssetId },
      ]);
      showAlert("New asset added successfully!");
    }
    setShowAssetValidationModal(false);
  };

  const handleDelete = (assetId) => {
    const updatedAssets = filteredAssetData.filter((asset) => asset.itemId !== assetId);
    setFilteredAssetData(updatedAssets);
    showAlert("Asset deleted successfully!");
    setShowDeleteConfirmationModal(false);
  };

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
    showAlert(isEditMode ? "Edit mode deactivated!" : "Edit mode activated!");
  };

  const confirmDelete = (assetId) => {
    setAssetToDelete(assetId);
    setShowDeleteConfirmationModal(true);
  };

  return (
    <div>
      <div className="alert-container">
        {alerts.map((alert, index) => (
          <Alert key={index} color="success" fade={false} className="alert">
            {alert}
          </Alert>
        ))}
      </div>

      <div style={{ position: "absolute", top: "20px", right: "20px" }}>
        <Button color="primary" onClick={toggleDashboardModal}>
          View Dashboard
        </Button>
      </div>

      <h1 className="main-head">Assets with Item Name:</h1>

      <div className="floor-wrap-container">
        {filteredAssetData.length > 0 ? (
          filteredAssetData.map((asset) => (
            <div key={asset.itemName} className="asset-card-wrapper">
              <div className="asset-card">
                <div className="asset-details">
                  <div className="asset-info">
                    <div className="room-text">{asset.itemName || asset.assetType}</div>
                    <div className="asset-id"><strong>Asset ID:</strong> {asset.itemId}</div>
                    <div className="asset-condition"><strong>Condition:</strong> {asset.condition}</div>
                    <div className="asset-company"><strong>Company:</strong> {asset.company}</div>
                    {asset.consumption && (
                      <div className="asset-consumption"><strong>Consumption:</strong> {asset.consumption}</div>
                    )}
                  </div>
                </div>

                {isEditMode && (
                  <>
                    <Button color="danger" className="delete-button" onClick={() => confirmDelete(asset.itemId)}>
                      X
                    </Button>
                    <Button color="success" className="edit-button" onClick={() => handleEditAsset(asset)}>
                      Edit
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No assets found for this item name.</p>
        )}

        {isEditMode && (
          <div className="asset-card plus-card-asset" onClick={handleAddNewAsset}>
            <h1>+</h1>
          </div>
        )}
      </div>

      <Modal isOpen={showAssetValidationModal} toggle={() => setShowAssetValidationModal(false)} centered size="lg">
        <ModalHeader toggle={() => setShowAssetValidationModal(false)}>
          {assetToEdit ? "Edit Asset" : "Add New Asset"}
        </ModalHeader>
        <ModalBody>
          {assetToEdit ? (
            <AssetEditForm asset={assetToEdit} onSubmit={handleSaveAsset} isEditMode={true} />
          ) : (
            <AssetValidation asset={null} onSubmit={handleSaveAsset} isEditMode={false} />
          )}
        </ModalBody>
      </Modal>

      <Modal isOpen={showDeleteConfirmationModal} toggle={() => setShowDeleteConfirmationModal(false)} centered size="lg">
        <ModalHeader toggle={() => setShowDeleteConfirmationModal(false)}>
          Delete Confirmation
        </ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this asset?</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => handleDelete(assetToDelete)}>Delete</Button>
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

export default UpperAsset;
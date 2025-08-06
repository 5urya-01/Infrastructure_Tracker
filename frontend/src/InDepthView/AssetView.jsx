import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";
import axios from "axios";
import AssetValidation from "../FormValidations/assetValidation";
import Footer from "../layout/footer/index";
import DashboardModal from "../DashBoard/DashboardModal";
import { useParams, useLocation, useHistory } from "react-router-dom"; // Use useHistory for v5
import "./InDepthView.css";

function Asset() {
  const location = useLocation();
  const { roomId } = useParams();
  const history = useHistory(); // Initialize useHistory
  const [groupedAssetData, setGroupedAssetData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [showAssetValidationModal, setShowAssetValidationModal] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);
  const [assetToEdit, setAssetToEdit] = useState(null);
  const [assetToDelete, setAssetToDelete] = useState(null);
  const [isDashboardModalOpen, setIsDashboardModalOpen] = useState(false);

  const toggleDashboardModal = () => setIsDashboardModalOpen(!isDashboardModalOpen);

  const showAlert = (message) => {
    setAlerts((prevAlerts) => [...prevAlerts, message]);
    setTimeout(() => {
      setAlerts((prevAlerts) => prevAlerts.slice(1));
    }, 3000);
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + `/getAssetDetails/${roomId}`)
      .then((res) => {
        const groupedData = res.data.reduce((acc, asset) => {
          if (!acc[asset.itemName]) {
            acc[asset.itemName] = [];
          }
          acc[asset.itemName].push(asset);
          return acc;
        }, {});
        setGroupedAssetData(groupedData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [roomId]);

  const handleAddNewAsset = () => {
    setAssetToEdit(null); // Set form to empty for new asset
    setShowAssetValidationModal(true);
  };

  const handleEditAsset = (asset) => {
    setAssetToEdit(asset); // Set form with asset data for editing
    setShowAssetValidationModal(true);
  };

  const handleSaveAsset = (newAsset) => {
    setGroupedAssetData((prevGroupedData) => {
      const updatedData = { ...prevGroupedData };
      const itemName = newAsset.itemName;

      if (assetToEdit) {
        // Update existing asset
        updatedData[itemName] = updatedData[itemName].map((asset) =>
          asset.itemId === assetToEdit.itemId ? { ...asset, ...newAsset } : asset
        );
        showAlert("Asset updated successfully!");
      } else {
        // Add new asset
        const newAssetId = String(
          Object.values(updatedData).flat().length + 1
        ).padStart(5, "0"); // Generate ID like 00001
        const assetWithId = { ...newAsset, itemId: newAssetId };
        if (!updatedData[itemName]) {
          updatedData[itemName] = [];
        }
        updatedData[itemName].push(assetWithId);
        showAlert("New asset added successfully!");
      }
      return updatedData;
    });
    setShowAssetValidationModal(false);
  };

  const handleDelete = (assetId) => {
    setGroupedAssetData((prevGroupedData) => {
      const updatedData = { ...prevGroupedData };
      Object.keys(updatedData).forEach((key) => {
        updatedData[key] = updatedData[key].filter(
          (asset) => asset.itemId !== assetId
        );
        if (updatedData[key].length === 0) {
          delete updatedData[key];
        }
      });
      return updatedData;
    });
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

  // Handle card click to navigate to LowerAsset page with itemId
  const handleCardClick = (itemId, itemName) => {
    history.push({
      pathname: `${location.pathname}/${itemName}`,
      state: { itemName }, // Passing itemName as state
    });
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
      <h1 className="main-head">This is the Asset</h1>
      <div className="floor-wrap-container">
        {Object.keys(groupedAssetData).map((itemName) => (
          <div key={itemName} className="asset-card-wrapper">
            <div className="asset-card" onClick={() => handleCardClick(groupedAssetData[itemName][0].itemId, itemName)}>
              <div className="asset-details">
                <div className="room-text">{itemName}</div>
                <div className="asset-info">
                  <div className="asset-count">
                    <strong>Count:</strong> {groupedAssetData[itemName].length}
                  </div>
                </div>
              </div>
              {isEditMode && (
                <>
                  <Button
                    color="danger"
                    className="delete-button"
                    onClick={() => confirmDelete(groupedAssetData[itemName][0].itemId)}
                  >
                    X
                  </Button>
                  <Button
                    color="success"
                    className="edit-button"
                    onClick={() => handleEditAsset(groupedAssetData[itemName][0])}
                  >
                    Edit
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
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
          <AssetValidation asset={assetToEdit} onSubmit={handleSaveAsset} />
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
          <Button color="danger" onClick={() => handleDelete(assetToDelete)}>
            Delete
          </Button>
          <Button color="secondary" onClick={() => setShowDeleteConfirmationModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <DashboardModal isOpen={isDashboardModalOpen} toggle={toggleDashboardModal} />
      <Footer isEditMode={isEditMode} onToggleEdit={toggleEditMode} />
    </div>
  );
}

export default Asset;

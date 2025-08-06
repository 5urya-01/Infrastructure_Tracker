import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./InDepthView.css";
import Footer from "../layout/footer/index";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import DashboardModal from "../DashBoard/DashboardModal";
import RoomValidation from "../FormValidations/roomValidation";
import HallValidation from "../FormValidations/hallValidation";
import BasicAlert from "../views/ui-element/basic/example/alerts/basicAlerts";
import axios from "axios";

function Room() {
  const location = useLocation();
  const building = useParams();
  const [rooms, setRooms] = useState([]);
  const [halls, setHalls] = useState([]);
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
    axios.get(process.env.REACT_APP_BACKEND_URL + "/getRoomDetails/" + `${building.floorId}`)
      .then((res) => {
        console.log(res)
        setRooms(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get(process.env.REACT_APP_BACKEND_URL + "/getHallDetails/" + `${building.floorId}`)
      .then((res) => {
        console.log(res)
        setHalls(res.data);
      })
      .catch((err) => {
        console.error(err)
      });
  }, [building.floorId]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [roomToEdit, setRoomToEdit] = useState(null);
  const [isHallMode, setIsHallMode] = useState(false);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleAddNewRoom = () => {
    setRoomToEdit(null);
    setIsHallMode(false);
    setShowAddModal(true);
  };

  const handleAddNewHall = () => {
    setRoomToEdit(null);
    setIsHallMode(true);
    setShowAddModal(true);
  };

  const addNewRoomOrHall = (data) => {
	if (isHallMode) {
		axios.get(process.env.REACT_APP_BACKEND_URL + "/getHallDetails/" + `${building.floorId}`)
		.then((res) => {
			console.log(res)
			setHalls(res.data);
		})
		.catch((err) => {
			console.error(err)
		});
		if (roomToEdit) {
		  showAlert("Hall updated successfully!");
		} else {
		  showAlert("New hall added successfully!");
		}
	  } 
	  else {
		axios.get(process.env.REACT_APP_BACKEND_URL + "/getRoomDetails/" + `${building.floorId}`)
		.then((res) => {
			console.log(res)
			setRooms(res.data);
		})
		.catch((err) => {
			console.log(err);
		});
		if (roomToEdit) {
		  showAlert("Room updated successfully!");
		} else {
		  showAlert("New room added successfully!");
		}
	  }
	  

    setShowAddModal(false);
    setRoomToEdit(null);
  };

  const prepareDeleteRoom = (roomId) => {
    const isHall = halls.some(hall => hall.hallId === roomId);
    setIsHallMode(isHall);
    setRoomToDelete(roomId);
    setShowDeleteModal(true);
  };

  const confirmDeleteRoom = () => {
    if (isHallMode) {
      axios.post(process.env.REACT_APP_BACKEND_URL + "/deleteHallDetails", { hallId: roomToDelete })
        .then((res) => {
			axios.get(process.env.REACT_APP_BACKEND_URL + "/getHallDetails/" + `${building.floorId}`)
			.then((res) => {
				console.log(res)
				setHalls(res.data);
			})
			.catch((err) => {
				console.error(err)
			});
          
        })
        .catch((err) => {
          console.log(err);
        });
      showAlert("Hall deleted successfully!");
    } 
	else {
		axios.post(process.env.REACT_APP_BACKEND_URL + "/deleteRoomDetails", { roomId: roomToDelete })
			.then((res) => {
				axios.get(process.env.REACT_APP_BACKEND_URL + "/getRoomDetails/" + `${building.floorId}`)
				.then((res) => {
				console.log(res)
				setRooms(res.data);
				})
				.catch((err) => {
				console.log(err);
				});
			})
			.catch((err) => {
			console.log(err);
			});
      showAlert("Room deleted successfully!");
    }
    setShowDeleteModal(false);
    setRoomToDelete(null);
  };

  const handleEditRoom = (room) => {
    setRoomToEdit(room);
    setIsHallMode(false);
    setShowAddModal(true);
  };

  const handleEditHall = (hall) => {
    setRoomToEdit(hall);
    setIsHallMode(true);
    setShowAddModal(true);
  };

  const showAlert = (message) => {
    setAlerts([...alerts, { message, type: "success" }]);
    setTimeout(() => {
      setAlerts(alerts => alerts.slice(1));
    }, 3000);
  };

  useEffect(() => {
    if (alerts.length > 0) {
      const timer = setTimeout(() => {
        setAlerts(alerts => alerts.slice(1));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alerts]);

  return (
    <>
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <Button color="primary" onClick={toggleDashboardModal}>
          View Dashboard
        </Button>
      </div>
      <h1 className="main-head">Room Section</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "27px" , justifyContent: "center"}}>
      {rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room.roomId} className="room-card">
              <Link to={`${location.pathname}/${room.roomId}`}>
                <div className="room-card">
                  <div className="room-text">Room {room.roomNo}</div>
                  <div>Room ID: {room.roomId}</div>
                </div>
              </Link>
              {isEditMode && (
                <>
                  <Button color="danger" className="delete-button" onClick={() => prepareDeleteRoom(room.roomId)}>X</Button>
                  <Button color="success" className="edit-button" onClick={() => handleEditRoom(room)}>Edit</Button>
                </>
              )}
              <div className="Anitopbar"></div>
              <div className="Anibotbar"></div>
            </div>
          ))
        ) : (
          <div>No rooms are available on this floor.</div>
        )}
        {isEditMode && (
          <div className="floor-card plus-card-floor-room" onClick={handleAddNewRoom}>
            <h1>+</h1>
          </div>
        )}
      </div>

      <h1 className="main-head">Hall section</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "27px",justifyContent: "center" }}>
      {halls.length > 0 ? (
          halls.map((hall) => (
            <div key={hall.hallId} className="room-card">
              <Link to={`${location.pathname}/${hall.hallId}`}>
                <div className="room-card">
                  <div className="room-text">Hall {hall.hallName}</div>
                  <div>Hall ID: {hall.hallId}</div>
                </div>
              </Link>
              {isEditMode && (
                <>
                  <Button color="danger" className="delete-button" onClick={() => prepareDeleteRoom(hall.hallId)}>X</Button>
                  <Button color="success" className="edit-button" onClick={() => handleEditHall(hall)}>Edit</Button>
                </>
              )}
            </div>
          ))
        ) : (
          <div>No halls are available on this floor.</div>
        )}
        {isEditMode && (
          <div className="floor-card plus-card-floor-room" onClick={handleAddNewHall}>
            <h1>+</h1>
          </div>
        )}
      </div>

      <Footer isEditMode={isEditMode} onToggleEdit={toggleEditMode} />

      <Modal 
        isOpen={showAddModal} 
        toggle={() => setShowAddModal(false)} 
        centered 
        size="lg" 
        scrollable 
        style={{ maxHeight: "90vh" }}
      >
        <ModalBody>
          <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
            {isHallMode ? (
              <HallValidation onSubmit={addNewRoomOrHall} initialData={roomToEdit} />
            ) : (
              <RoomValidation onSubmit={addNewRoomOrHall} initialData={roomToEdit} />
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={showDeleteModal} toggle={() => setShowDeleteModal(false)} centered>
        <ModalBody>
          Are you sure you want to delete the {isHallMode ? 'hall' : 'room'} with ID {roomToDelete}?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={confirmDeleteRoom}>Delete</Button>
          <Button color="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <div className="alert-container">
        {alerts.map((alert, index) => (
          <BasicAlert key={index} type={alert.type} message={alert.message} />
        ))}
      </div>
      <DashboardModal
        isOpen={isDashboardModalOpen}
        toggle={toggleDashboardModal}
        onSelect={handleDashboardSelect}
      />
    </>
  );
}

export default Room;

import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Input,
  FormGroup,
  Label,
  Form,
  Button,
  FormFeedback,
} from "reactstrap";

const RoomValidation = ({ initialData, onSubmit }) => {
  const [buildingName, setBuildingName] = useState(initialData ? initialData.buildingName : "");
  const [buildingId, setBuildingId] = useState(initialData ? initialData.buildingId : "");
  const [floorNo, setFloorNo] = useState(initialData ? initialData.floorNo : "");
  const [floorId, setFloorId] = useState(initialData ? initialData.floorId : "");
  const [roomNo, setRoomNo] = useState(initialData ? initialData.roomNo : "");
  const [roomId, setRoomId] = useState(initialData ? initialData.roomId : "");
  const [formValid, setFormValid] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [prev, setPrev] = useState(initialData);

  useEffect(() => {
    if (!initialData) {
      setIsAddMode(true);
    } else {
      setIsEditMode(true);
      setPrev(initialData);
      setBuildingName(initialData.buildingName);
      setBuildingId(initialData.buildingId);
      setFloorNo(initialData.floorNo);
      setFloorId(initialData.floorId);
      setRoomNo(initialData.roomNo);
      setRoomId(initialData.roomId);
    }
  }, [initialData]);

  useEffect(() => {
    const isValid = buildingName && buildingId && floorNo && floorId && roomNo && roomId;
    setFormValid(isValid);
  }, [buildingName, buildingId, floorNo, floorId, roomNo, roomId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      buildingName,
      buildingId,
      floorNo,
      floorId,
      roomNo,
      roomId,
    };
    console.log(formData);
    console.log(prev)
    if (isAddMode) {
      axios.post(process.env.REACT_APP_BACKEND_URL + "/addRoomDetails", formData)
        .then(() => {
          onSubmit();
        })
        .catch((err) => {
          console.error(err);
        });
    }

    if (isEditMode) {
      axios.post(process.env.REACT_APP_BACKEND_URL + "/updateRoomDetails", {
        previousData: prev,
        updatedData: formData,
      })
        .then(() => {
          onSubmit();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label>Enter the Building Name:</Label>
            <Input
              type="text"
              placeholder="Building Name"
              name="buildingName"
              value={buildingName}
              onChange={(e) => setBuildingName(e.target.value)}
              invalid={!buildingName}
              disabled={isEditMode}
            />
            <FormFeedback>This field is required.</FormFeedback>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Enter the Building ID:</Label>
            <Input
              type="text"
              placeholder="Building ID"
              name="buildingId"
              value={buildingId}
              onChange={(e) => setBuildingId(e.target.value)}
              invalid={!buildingId}
              disabled={isEditMode}
            />
            <FormFeedback>This field is required.</FormFeedback>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Enter the Floor Name:</Label>
            <Input
              type="text"
              placeholder="Floor Name"
              name="floorNo"
              value={floorNo}
              onChange={(e) => setFloorNo(e.target.value)}
              invalid={!floorNo}
            />
            <FormFeedback>This field is required.</FormFeedback>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Enter the Floor ID:</Label>
            <Input
              type="text"
              placeholder="Floor ID"
              name="floorId"
              value={floorId}
              onChange={(e) => setFloorId(e.target.value)}
              invalid={!floorId}
            />
            <FormFeedback>This field is required.</FormFeedback>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Enter the Room Number:</Label>
            <Input
              type="text"
              placeholder="Room Number"
              name="roomNo"
              value={roomNo}
              onChange={(e) => setRoomNo(e.target.value)}
              invalid={!roomNo}
            />
            <FormFeedback>This field is required.</FormFeedback>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Enter the Room ID:</Label>
            <Input
              type="text"
              placeholder="Room ID"
              name="roomId"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              invalid={!roomId}
            />
            <FormFeedback>This field is required.</FormFeedback>
          </FormGroup>
        </Col>
      </Row>
      <Button type="submit" color="primary" disabled={!formValid} style={{ width: "100%" }}>
        {isEditMode ? "Update Room" : "Add Room"}
      </Button>
    </Form>
  );
};

export default RoomValidation;

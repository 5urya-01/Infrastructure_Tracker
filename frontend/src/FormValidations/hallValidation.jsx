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

const HallValidation = ({ initialData, onSubmit }) => {
  const [buildingName, setBuildingName] = useState(initialData ? initialData.buildingName : "");
  const [buildingId, setBuildingId] = useState(initialData ? initialData.buildingId : "");
  const [floorNo, setFloorNo] = useState(initialData ? initialData.floorNo : "");
  const [floorId, setFloorId] = useState(initialData ? initialData.floorId : "");
  const [hallName, setHallName] = useState(initialData ? initialData.hallName : "");
  const [hallId, setHallId] = useState(initialData ? initialData.hallId : "");
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
      setHallName(initialData.hallName);
      setHallId(initialData.hallId);
    }
  }, [initialData]);

  useEffect(() => {
    const isValid = buildingName && buildingId && floorNo && floorId && hallName && hallId;
    setFormValid(isValid);
  }, [buildingName, buildingId, floorNo, floorId, hallName, hallId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      buildingName,
      buildingId,
      floorNo,
      floorId,
      hallName,
      hallId,
    };
    console.log(formData);
    console.log(prev)
    if (isAddMode) {
      axios.post(process.env.REACT_APP_BACKEND_URL + "/addHallDetails", formData)
        .then(() => {
          onSubmit();
        })
        .catch((err) => {
          console.error(err);
        });
    }

    if (isEditMode) {
      axios.post(process.env.REACT_APP_BACKEND_URL + "/updateHallDetails", {
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
            <Label>Enter the Hall Number:</Label>
            <Input
              type="text"
              placeholder="Hall Number"
              name="hallName"
              value={hallName}
              onChange={(e) => setHallName(e.target.value)}
              invalid={!hallName}
            />
            <FormFeedback>This field is required.</FormFeedback>
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Enter the Hall ID:</Label>
            <Input
              type="text"
              placeholder="Hall ID"
              name="hallId"
              value={hallId}
              onChange={(e) => setHallId(e.target.value)}
              invalid={!hallId}
            />
            <FormFeedback>This field is required.</FormFeedback>
          </FormGroup>
        </Col>
      </Row>
      <Button type="submit" color="primary" disabled={!formValid} style={{ width: "100%" }}>
        {isEditMode ? "Update Hall" : "Add Hall"}
      </Button>
    </Form>
  );
};

export default HallValidation;

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Input, FormGroup, Label, Form, Button, FormFeedback } from "reactstrap";

const FloorValidation = ({ floor, onSubmit }) => {
  const [buildingName, setBuildingName] = useState(floor ? floor.buildingName : "");
  const [buildingId, setBuildingId] = useState(floor ? floor.buildingId : "");
  const [floorNo, setfloorNo] = useState(floor ? floor.floorNo : "");
  const [floorId, setFloorId] = useState(floor ? floor.floorId : "");
  const [floorInCharge, setFloorInCharge] = useState(floor ? floor.floorInCharge : "");
  const [formValid, setFormValid] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [prev, setPrev] = useState(floor);

  useEffect(() => {
    if (!floor) {
      setIsAddMode(true);
    } else {
      setIsEditMode(true);
      setPrev(floor);
      setBuildingName(floor.buildingName);
      setBuildingId(floor.buildingId);
      setfloorNo(floor.floorNo);
      setFloorId(floor.floorId);
      setFloorInCharge(floor.floorInCharge);
    }
  }, [floor]);

  useEffect(() => {
    const isValid = buildingName && buildingId && floorNo && floorId && floorInCharge;
    setFormValid(isValid);
  }, [buildingName, buildingId, floorNo, floorId, floorInCharge]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      buildingName,
      buildingId,
      floorNo,
      floorId,
      floorInCharge,
    };

    if (isAddMode) {
      axios.post(process.env.REACT_APP_BACKEND_URL + "/addFloorDetails", formData)
        .then(() => {
          onSubmit();
        })
        .catch((err) => {
          console.error(err);
        });
    }

    if (isEditMode) {
      axios.post(process.env.REACT_APP_BACKEND_URL + "/updateFloorDetails", {
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
      <FormGroup>
        <Label>Enter the Building Name:</Label>
        <Input
          type="text"
          name="buildingName"
          value={buildingName}
          invalid={!buildingName}
          onChange={(e) => setBuildingName(e.target.value)}
          disabled={isEditMode}
        />
        <FormFeedback>This field is required.</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Enter the Building ID:</Label>
        <Input
          type="text"
          name="buildingId"
          value={buildingId}
          invalid={!buildingId}
          onChange={(e) => setBuildingId(e.target.value)}
          disabled={isEditMode}
        />
        <FormFeedback>This field is required.</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Enter the Floor Name:</Label>
        <Input
          type="text"
          name="floorNo"
          value={floorNo}
          invalid={!floorNo}
          onChange={(e) => setfloorNo(e.target.value)}
        />
        <FormFeedback>This field is required.</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Enter the Floor ID:</Label>
        <Input
          type="text"
          name="floorId"
          value={floorId}
          invalid={!floorId}
          onChange={(e) => setFloorId(e.target.value)}
        />
        <FormFeedback>This field is required.</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Enter Floor Incharge Name:</Label>
        <Input
          type="text"
          name="floorInCharge"
          value={floorInCharge}
          invalid={!floorInCharge}
          onChange={(e) => setFloorInCharge(e.target.value)}
        />
        <FormFeedback>This field is required.</FormFeedback>
      </FormGroup>
      <Button type="submit" color="primary" disabled={!formValid} style={{ width: "100%" }}>
        Submit
      </Button>
    </Form>
  );
};

export default FloorValidation;

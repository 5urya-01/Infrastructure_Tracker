import React, { useState, useEffect, useRef, forwardRef } from "react";
import { Row, Col, Input, FormGroup, Label, Form, Button, FormFeedback } from "reactstrap";
import axios from 'axios';

// Create a custom FileInput component that forwards the ref
const FileInput = forwardRef((props, ref) => (
  <input type="file" {...props} ref={ref} style={{ display: "none" }} />
));

const BuildingValidation = ({ building, onSave }) => {
  const isEditMode = !!building;
  const isAddMode = !building;

  const [formData, setFormData] = useState({
    buildingName: "",
    buildingId: "",
    buildingInCharge: "",
    buildingLocation: { latitude: "", longitude: "" },
    imageFile: null,
    imageUrl: "",
  });

  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        buildingName: building.buildingName || "",
        buildingId: building.buildingId || "",
        buildingInCharge: building.buildingInCharge || "",
        buildingLocation: building.buildingLocation || { latitude: "", longitude: "" },
        imageFile: null,
        imageUrl: process.env.REACT_APP_BACKEND_URL + building.buildingImage || "", // Set imageUrl from the backend image field
      });
    }
  }, [isEditMode, building]);

  const validateField = (name, value) => {
    let error = "";
    if (!value || value === "") {
      error = "This field is required.";
    }
    return error;
  };

  const validateForm = () => {
    const newErrors = {};
    newErrors.buildingName = validateField("buildingName", formData.buildingName);
    newErrors.buildingId = validateField("buildingId", formData.buildingId);
    newErrors.buildingInCharge = validateField("buildingInCharge", formData.buildingInCharge);
    newErrors.latitude = validateField("latitude", formData.buildingLocation.latitude);
    newErrors.longitude = validateField("longitude", formData.buildingLocation.longitude);

    setErrors(newErrors);
    const isValid = !Object.values(newErrors).some((error) => error !== "");
    setFormValid(isValid);
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const changeHandler = (e) => {
    const { name, value, files } = e.target;
    if (name === "files" && files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        imageFile: files[0],
        imageUrl: URL.createObjectURL(files[0]), // Update imageUrl with the selected file
      }));
    } else if (name === "latitude" || name === "longitude") {
      setFormData((prevData) => ({
        ...prevData,
        buildingLocation: { ...prevData.buildingLocation, [name]: value },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValid) {
      const data = new FormData();
      data.append("buildingName", formData.buildingName);
      data.append("buildingId", formData.buildingId);
      data.append("buildingInCharge", formData.buildingInCharge);
      data.append("longitude", formData.buildingLocation.longitude); // Send longitude separately
      data.append("latitude", formData.buildingLocation.latitude); // Send latitude separately

      // Append the image file only if it exists
      if (formData.imageFile) {
        data.append("buildingImage", formData.imageFile);
      }

      try {
        if (isAddMode) {
          // Send POST request with the form data
          console.log(data);
          const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "/addBuildingDetails", data)
          console.log(response);
        } else {
          const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "/updateBuildingDetails", data)
          console.log(response);
        }
        onSave(formData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.error("File input reference is not set.");
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ width: "100%", height: "100%" }}>
      <FormGroup>
        <Label>Enter the Building Name:</Label>
        <Input
          type="text"
          placeholder="Building Name"
          name="buildingName"
          value={formData.buildingName}
          invalid={!!errors.buildingName}
          onChange={changeHandler}
        />
        <FormFeedback>{errors.buildingName}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Enter the Building ID:</Label>
        <Input
          type="text"
          placeholder="Building ID"
          name="buildingId"
          value={formData.buildingId}
          invalid={!!errors.buildingId}
          onChange={changeHandler}
        />
        <FormFeedback>{errors.buildingId}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label>Enter Building Incharge Name:</Label>
        <Input
          type="text"
          placeholder="Building Incharge"
          name="buildingInCharge"
          value={formData.buildingInCharge}
          invalid={!!errors.buildingInCharge}
          onChange={changeHandler}
        />
        <FormFeedback>{errors.buildingInCharge}</FormFeedback>
      </FormGroup>
      <Row>
        <Col>
          <FormGroup>
            <Label>Building Latitude:</Label>
            <Input
              type="text"
              placeholder="Latitude"
              name="latitude"
              value={formData.buildingLocation.latitude}
              invalid={!!errors.latitude}
              onChange={changeHandler}
            />
            <FormFeedback>{errors.latitude}</FormFeedback>
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>Building Longitude:</Label>
            <Input
              type="text"
              placeholder="Longitude"
              name="longitude"
              value={formData.buildingLocation.longitude}
              invalid={!!errors.longitude}
              onChange={changeHandler}
            />
            <FormFeedback>{errors.longitude}</FormFeedback>
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label>Building Image</Label>
        
        {isAddMode && (
          <div>
            <Input
              type="file"
              name="files"
              accept=".jpg, .jpeg, .png"
              onChange={changeHandler}
            />
          </div>
        )}

        {formData.imageUrl && isEditMode && (
          <div style={{ marginTop: '10px', cursor: 'pointer' }} onClick={handleImageClick}>
            <img 
              src={ formData.imageUrl} 
              alt="Selected" 
              style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', marginTop: '10px' }} 
            />
            <small>Click the image to change it.</small>
          </div>
        )}

        {isEditMode && (
          <FileInput
            name="files"
            accept=".jpg, .jpeg, .png"
            onChange={changeHandler}
            ref={fileInputRef}
          />
        )}
      </FormGroup>
      <Button type="submit" color="primary" disabled={!formValid}>
        {isEditMode ? "Update Building" : "Add Building"}
      </Button>
    </Form>
  );
};

export default BuildingValidation;

import React, { useState, useEffect } from "react";
import { Row, Col, Input, FormGroup, Label, Button, Alert } from "reactstrap";

const AssetForm = () => {
  const [form, setForm] = useState({
    itemName: "",
    buildingId: "",
    floorId: "",
    roomId: "",
    hallId: "",
    itemId: "",
    company: "",
    consumption: "",
    warranty: "",
    category: "",
    status: "",
    condition: "",
    location: "",
  });
  const [properties, setProperties] = useState({});
  const [customProperties, setCustomProperties] = useState([]);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [itemNumber, setItemNumber] = useState(1);
  const [assetTypeSelected, setAssetTypeSelected] = useState(false);
  const defaultProperties = {
    Fan: { Wings: "", Star: "", Color: "" },
    Table: { Size: "", Material: "", Color: "" },
    Projector: { Brand: "", Resolution: "", Type: "", Brightness: "" },
    Chair: { Material: "", Color: "" },
    Light: { Type: "", Color: "", Star: "" },
    AC: { Brand: "", Color: "" },
    Bench: { Material: "", Color: "", Design: "" },
    CCTV: { Brand: "", Resolution: "", Storage: "", Framerate: "" },
    TV: { Brand: "", Color: "" },
    Gangboxes: { Brand: "", Color: "" },
    HDMISplitter: { Brand: "", Color: "" },
  };
  useEffect(() => {
    if (form.assetType && defaultProperties[form.assetType]) {
      setProperties(defaultProperties[form.assetType]);
      setAssetTypeSelected(true);
    } else {
      setProperties({});
      setAssetTypeSelected(false);
    }
    setCustomProperties([]);
    updateItemId();
  }, [form.assetType]);
  useEffect(() => {
    updateItemId();
  }, [form.buildingId, form.floorId, form.roomId, form.hallId, form.itemName]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...form, [name]: value };
    if (name === "status" && value === "Inuse") {
      updatedForm = {
        ...updatedForm,
        buildingId: "",
        floorId: "",
        roomId: "",
        hallId: "",
        location: "",
      };
    } else if (name === "location") {
      if (value === "Room") {
        updatedForm = { ...updatedForm, roomId: "", hallId: null };
      } else if (value === "Hall") {
        updatedForm = { ...updatedForm, hallId: "", roomId: null };
      }
    } else if (name === "assetType" && value !== "Others") {
      updatedForm = { ...updatedForm, itemName: value };
    }
    setForm(updatedForm);
  };
  const updateItemId = () => {
    const { buildingId, floorId, roomId, hallId, itemName } = form;
    let idComponents = [];
    if (buildingId) idComponents.push(buildingId);
    if (floorId) idComponents.push(floorId);
    if (roomId) {
      idComponents.push(roomId);
    } else if (hallId) {
      idComponents.push(hallId);
    }
    if (itemName) {
      idComponents.push(itemName);
    }
    const newItemId = `${idComponents.join("")}${itemNumber}`;
    setForm((prevForm) => ({
      ...prevForm,
      itemId: newItemId,
    }));
  };
  const handlePropertyChange = (name, value, isCustom, index) => {
    if (isCustom) {
      const newCustomProperties = [...customProperties];
      newCustomProperties[index][name] = value;
      setCustomProperties(newCustomProperties);
    } else {
      setProperties({ ...properties, [name]: value });
    }
  };
  const addProperty = () => {
    setCustomProperties([...customProperties, { propertyName: "", propertyValue: "" }]);
  };
  const deleteProperty = (index) => {
    const newCustomProperties = customProperties.filter((_, i) => i !== index);
    setCustomProperties(newCustomProperties);
  };
  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ["itemId", "company", "category", "status", "condition"];
    requiredFields.forEach((field) => {
      if (!form[field]) {
        newErrors[field] = `${field} is required.`;
      }
    });
    if (form.category === "Electrical" && !form.consumption) {
      newErrors.consumption = "Consumption is required for Electrical category.";
    }
    if (form.status === "Inuse") {
      if (!form.buildingId) newErrors.buildingId = "Building ID is required.";
      if (!form.floorId) newErrors.floorId = "Floor ID is required.";
      if (form.location === "Room" && !form.roomId) newErrors.roomId = "Room ID is required.";
      if (form.location === "Hall" && !form.hallId) newErrors.hallId = "Hall ID is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = {
        ...form,
        properties: {
          ...properties,
          ...customProperties.reduce(
            (acc, prop) => ({
              ...acc,
              [prop.propertyName]: prop.propertyValue,
            }),
            {}
          ),
        },
      };
      console.log("Form submitted:", formData);
      setSubmissionSuccess(true);
      setItemNumber(itemNumber + 1);
      resetForm();
    }
  };
  const resetForm = () => {
    setForm({
      itemName: "",
      buildingId: "",
      floorId: "",
      roomId: "",
      hallId: "",
      itemId: "",
      company: "",
      consumption: "",
      warranty: "",
      category: "",
      status: "",
      condition: "",
      location: "",
    });
    setProperties({});
    setCustomProperties([]);
    setErrors({});
    setAssetTypeSelected(false);
  };
  return (
    <div>
      {submissionSuccess && <Alert color="success">Form submitted successfully!</Alert>}
      <form onSubmit={handleSubmit}>
        <Row>
          <Col md="6">
            <FormGroup>
              <Label for="assetType">Asset Type</Label>
              <Input
                type="select"
                name="assetType"
                id="assetType"
                onChange={handleChange}
              >
                <option value="">Select</option>
                {Object.keys(defaultProperties).map((type) => (
                  <option key={type}>{type}</option>
                ))}
                <option>Others</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label for="category">Category</Label>
              <Input
                type="select"
                name="category"
                id="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Electrical</option>
                <option>Non-Electrical</option>
              </Input>
              {errors.category && <div className="text-danger">{errors.category}</div>}
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <FormGroup>
              <Label for="status">Status</Label>
              <Input
                type="select"
                name="status"
                id="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Instock</option>
                <option>Inuse</option>
              </Input>
              {errors.status && <div className="text-danger">{errors.status}</div>}
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label for="condition">Condition</Label>
              <Input
                type="select"
                name="condition"
                id="condition"
                value={form.condition}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Working</option>
                <option>not Working</option>
              </Input>
              {errors.condition && <div className="text-danger">{errors.condition}</div>}
            </FormGroup>
          </Col>
        </Row>
        {form.status === "Inuse" && (
          <div>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label for="buildingId">Building ID</Label>
                  <Input
                    type="text"
                    name="buildingId"
                    id="buildingId"
                    value={form.buildingId}
                    onChange={handleChange}
                  />
                  {errors.buildingId && <div className="text-danger">{errors.buildingId}</div>}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="floorId">Floor ID</Label>
                  <Input
                    type="text"
                    name="floorId"
                    id="floorId"
                    value={form.floorId}
                    onChange={handleChange}
                  />
                  {errors.floorId && <div className="text-danger">{errors.floorId}</div>}
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="location">Location</Label>
                  <Input
                    type="select"
                    name="location"
                    id="location"
                    value={form.location}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option>Room</option>
                    <option>Hall</option>
                  </Input>
                </FormGroup>
              </Col>
              {form.location === "Room" && (
                <Col md="6">
                  <FormGroup>
                    <Label for="roomId">Room ID</Label>
                    <Input
                      type="text"
                      name="roomId"
                      id="roomId"
                      value={form.roomId || ""}
                      onChange={handleChange}
                    />
                    {errors.roomId && <div className="text-danger">{errors.roomId}</div>}
                  </FormGroup>
                </Col>
              )}
              {form.location === "Hall" && (
                <Col md="6">
                  <FormGroup>
                    <Label for="hallId">Hall ID</Label>
                    <Input
                      type="text"
                      name="hallId"
                      id="hallId"
                      value={form.hallId || ""}
                      onChange={handleChange}
                    />
                    {errors.hallId && <div className="text-danger">{errors.hallId}</div>}
                  </FormGroup>
                </Col>
              )}
            </Row>
          </div>
        )}
        {form.category === "Electrical" && (
          <Row className="mb-4">
            <Col md="6">
              <FormGroup>
                <Label for="consumption">Consumption</Label>
                <Input
                  type="text"
                  name="consumption"
                  id="consumption"
                  value={form.consumption}
                  onChange={handleChange}
                />
                {errors.consumption && <div className="text-danger">{errors.consumption}</div>}
              </FormGroup>
            </Col>
          </Row>
        )}
        <Row>
          <Col md="6">
            <FormGroup>
              <Label for="itemId">Item ID</Label>
              <Input
                type="text"
                name="itemId"
                id="itemId"
                value={form.itemId}
                readOnly
              />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label for="itemName">Item Name</Label>
              <Input
                type="text"
                name="itemName"
                id="itemName"
                value={form.itemName}
                onChange={handleChange}
              />
              {errors.itemName && <div className="text-danger">{errors.itemName}</div>}
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label for="company">Company</Label>
              <Input
                type="text"
                name="company"
                id="company"
                value={form.company}
                onChange={handleChange}
              />
              {errors.company && <div className="text-danger">{errors.company}</div>}
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label for="warranty">Warranty</Label>
              <Input
                type="text"
                name="warranty"
                id="warranty"
                value={form.warranty}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <div className="border p-3 mb-4" style={{ backgroundColor: "#f9f9f9" }}>
          <h5 className="mt-4">Properties</h5>
          <Row className="mb-2">
            {Object.keys(properties).map((key) => (
              <Col md="4" key={key}>
                <FormGroup>
                  <Label for={key}>{key}</Label>
                  <Input
                    type="text"
                    name={key}
                    id={key}
                    value={properties[key]}
                    onChange={(e) => handlePropertyChange(key, e.target.value, false)}
                  />
                </FormGroup>
              </Col>
            ))}
          </Row>
          {customProperties.map((property, index) => (
            <Row key={index} className="mb-2 align-items-end">
              <Col md="4">
                <FormGroup>
                  <Label for={`propertyName-${index}`}>Property Name</Label>
                  <Input
                    type="text"
                    name="propertyName"
                    id={`propertyName-${index}`}
                    value={property.propertyName}
                    onChange={(e) => handlePropertyChange("propertyName", e.target.value, true, index)}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label for={`propertyValue-${index}`}>Property Value</Label>
                  <Input
                    type="text"
                    name="propertyValue"
                    id={`propertyValue-${index}`}
                    value={property.propertyValue}
                    onChange={(e) => handlePropertyChange("propertyValue", e.target.value, true, index)}
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <Button type="button" color="danger" onClick={() => deleteProperty(index)}>
                  Delete
                </Button>
              </Col>
            </Row>
          ))}
          <Button
            type="button"
            color="secondary"
            onClick={addProperty}
            disabled={!assetTypeSelected} // Enable only if an asset type is selected
          >
            Add Property
          </Button>
        </div>
        <div style={{ textAlign: "right" }}>
          <Button type="submit" color="success">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AssetForm;

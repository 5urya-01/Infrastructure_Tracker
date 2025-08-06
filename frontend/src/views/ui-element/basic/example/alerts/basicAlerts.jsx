// Example of a basic alert component if needed
import React from 'react';
import { Alert } from 'reactstrap';

const BasicAlert = ({ type, message }) => {
  return (
    <Alert color={type} style={{ position: 'relative', marginBottom: '10px' }}>
      {message}
    </Alert>
  );
};

export default BasicAlert;

import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertMessage = ({ type = 'success', message, onClose }) => {
  return (
    <Alert variant={type} onClose={onClose} dismissible>
      {message}
    </Alert>
  );
};

export default AlertMessage;

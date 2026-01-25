import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ServiceCard = ({ icon, title, description, onClick }) => {
  return (
    <Card className="h-100 shadow-sm hover" style={{ cursor: 'pointer' }}>
      <Card.Body className="text-center">
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>
        <Card.Title>{title}</Card.Title>
        <Card.Text className="text-muted">{description}</Card.Text>
        <Button variant="primary" onClick={onClick}>
          Learn More
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ServiceCard;

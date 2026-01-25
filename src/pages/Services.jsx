import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      name: 'CCTV Camera Systems',
      icon: '📹',
      description: 'Complete CCTV installation with HD cameras, DVRs, and monitoring systems.',
      details: [
        'HD & 4K camera options',
        ' 24/7 monitoring setup',
        'Night vision capability',
        'Cloud storage integration',
      ],
    },
    {
      id: 2,
      name: 'Networking Solutions',
      icon: '🌐',
      description:
        'Enterprise networking with LAN, WAN, and infrastructure setup.',
      details: [
        'LAN/WAN setup',
        'Fiber optic installation',
        'Network security',
        'Managed services',
      ],
    },
    {
      id: 3,
      name: 'Wi-Fi Solutions',
      icon: '📡',
      description: 'High-speed wireless coverage for homes and businesses.',
      details: [
        '5G Wi-Fi setup',
        'Wide area coverage',
        'Multi-access points',
        'Performance optimization',
      ],
    },
    {
      id: 4,
      name: 'IT Systems & Servers',
      icon: '🖥️',
      description: 'Server installation, configuration, and management services.',
      details: [
        'Server setup',
        'Data center solutions',
        'Backup systems',
        'System monitoring',
      ],
    },
    {
      id: 5,
      name: 'Biometric Systems',
      icon: '👤',
      description: 'Fingerprint and facial recognition systems for access control.',
      details: [
        'Access control systems',
        'Time tracking',
        'Security integration',
        'Multi-unit setup',
      ],
    },
    {
      id: 6,
      name: 'Security Systems',
      icon: '🔐',
      description: 'Comprehensive alarm and intrusion detection systems.',
      details: [
        'Intrusion alarms',
        'Motion sensors',
        'Alert notifications',
        'Professional monitoring',
      ],
    },
    {
      id: 7,
      name: 'Installation Services',
      icon: '🔧',
      description: 'Professional installation of all security and IT equipment.',
      details: [
        'Expert technicians',
        'Proper cable management',
        'System testing',
        'Documentation',
      ],
    },
    {
      id: 8,
      name: 'Support & Maintenance',
      icon: '🛠️',
      description: 'Ongoing support and maintenance for all systems.',
      details: [
        '24/7 helpline',
        'Preventive maintenance',
        'Quick repairs',
        'Regular updates',
      ],
    },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="bg-primary text-white py-4">
        <Container>
          <h1 className="mb-0">Our Services</h1>
          <p className="lead mb-0">
            Comprehensive CCTV, networking, and IT solutions for your business
          </p>
        </Container>
      </div>

      {/* Services Grid */}
      <Container className="py-5">
        <Row>
          {services.map((service) => (
            <Col md={6} lg={4} key={service.id} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                    {service.icon}
                  </div>
                  <Card.Title>{service.name}</Card.Title>
                  <Card.Text className="text-muted">
                    {service.description}
                  </Card.Text>
                  <ul className="list-unstyled mb-4">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="mb-2">
                        ✓ {detail}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="primary"
                    onClick={() => navigate('/booking')}
                    className="w-100"
                  >
                    Book This Service
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* CTA */}
      <div className="bg-light py-5">
        <Container className="text-center">
          <h2 className="mb-4">Need Custom Solutions?</h2>
          <p className="lead mb-4">
            Contact us for tailored packages that fit your specific needs
          </p>
          <Button
            size="lg"
            variant="primary"
            onClick={() => navigate('/contact')}
          >
            Get Consultation
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default Services;

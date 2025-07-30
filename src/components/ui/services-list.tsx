import React, { useEffect } from 'react';

interface Service {
  title: string;
  longdescription: string;
  image: string;
  url: string;
  duration: string;
}

interface ServicesListProps {
  services: Service[];
  sectionTag?: string;
}

export const ServicesList: React.FC<ServicesListProps> = ({ 
  services, 
  sectionTag = "Services" 
}) => {
  useEffect(() => {
    // Trigger fade-in animations after component mounts
    const items = document.querySelectorAll('.service-list-item.fade-in');
    items.forEach(item => {
      item.classList.add('scroll-active');
    });
  }, []);

  return (
    <div className="services-list-container">
      <div className="services-list">
        {services.map((service, index) => (
          <div key={index} className={`service-list-item fade-in delay-${index * 100}`}>
            <div className="service-list-card">
              <a href={service.url} className="service-list-card-link">
                <div 
                  className="service-list-card-image" 
                  style={{ backgroundImage: `url('${service.image}')` }}
                >
                  <div className="service-card-header">
                    <div className="section-tag">{sectionTag}</div>
                    <h3 className="service-card-title sans-serif">{service.title}</h3>
                  </div>
                  
                </div>
              </a>
            </div>
            <div className="service-list-content">
              <p className="service-list-duration">Duration: {service.duration}</p>
              <p className="service-list-description">{service.longdescription}</p>
              <div className="service-list-footer">
                <a href={service.url} className="button button-primary">
                  Book Now
                  <img src="/images/offsitelink.svg" alt="External link" width="16" height="16" style={{ marginLeft: '0.5rem', filter: 'brightness(0) saturate(100%) invert(100%)' }} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 
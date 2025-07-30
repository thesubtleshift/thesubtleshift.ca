import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { XIcon } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  longdescription?: string;
  duration?: string;
  image: string;
  url: string;
  htmlSections?: string[];
}

interface ServicesCarouselProps {
  services: Service[];
  sectionTag?: string;
}

export const ServicesCarousel: React.FC<ServicesCarouselProps> = ({ 
  services, 
  sectionTag = "Services" 
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (carouselRef.current?.contains(e.target as Node)) {
        // Only handle horizontal scroll when shift is held or when deltaX is present
        if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
          e.preventDefault();
          carouselRef.current.scrollLeft += e.deltaX || e.deltaY;
        }
      }
    };

    const handleModalClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };

    document.addEventListener('wheel', handleScroll, { passive: false });
    document.addEventListener('keydown', handleModalClose);

    return () => {
      document.removeEventListener('wheel', handleScroll);
      document.removeEventListener('keydown', handleModalClose);
    };
  }, []);

  useEffect(() => {
    if (activeModal !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModal]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'auto' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'auto' });
    }
  };

  const openModal = (index: number) => {
    setActiveModal(index);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleCardClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    openModal(index);
  };

  const handleInfoClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    openModal(index);
  };

  const activeService = activeModal !== null ? services[activeModal] : null;
  
  // Debug log when modal opens
  if (activeService) {
    console.log('Active service:', activeService.title);
    console.log('Has HTML sections:', !!activeService.htmlSections);
    console.log('Number of sections:', activeService.htmlSections?.length || 0);
  }

  const modal = (
    <AnimatePresence>
      {activeModal !== null && activeService && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0,
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className="service-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button 
              className="service-modal-close-button"
              onClick={closeModal}
            >
              <XIcon className="service-modal-close-icon" />
            </motion.button>
            <div className="service-modal-content">
              {/* Service Header */}
              <div className="service-modal-header">
                <div className="section-tag">
                  {sectionTag}
                </div>
                <h2 className="section-title">
                  {activeService.title}
                </h2>
                <div className="service-modal-summary">
                      <p className="service-modal-summary-text">
                        {activeService.description}
                      </p>
                    </div>
              </div>
              
              {/* Service Content */}
              {activeService.htmlSections && activeService.htmlSections.map((htmlContent, index) => (
                <div key={index} className="service-modal-body">
                  <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                </div>
              ))}
              
              {/* Action Buttons */}
              <div className="service-modal-actions">
                  <a 
                    href={activeService.url} 
                    className="service-modal-button service-modal-button-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeModal();
                    }}
                  >
                    Book This Service
                    <img 
                      src="/images/offsitelink.svg" 
                      alt="External link" 
                      className="service-modal-button-icon"
                      style={{ 
                        marginLeft: '0.5rem', 
                        filter: 'brightness(0) saturate(100%) invert(100%)' 
                      }} 
                    />
                  </a>
                  <button 
                    onClick={closeModal}
                    className="service-modal-button service-modal-button-outline"
                  >
                    Close
                  </button>
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="services-carousel-container">
      <div className="services-carousel" ref={carouselRef}>
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div 
              className="service-card-link cursor-pointer"
              onClick={(e) => handleCardClick(e, index)}
            >
              <div 
                className={`service-card-image fade-in delay-${index * 100}`}
                style={{ backgroundImage: `url('${service.image}')` }}
              >
                <div className="service-card-header">
                  <div className="section-tag">{sectionTag}</div>
                  <h3 className="service-card-title sans-serif">{service.title}</h3>
                </div>
                <div className="service-card-footer">
                  <button 
                    className="service-info-button" 
                    aria-label={`More information about ${service.title}`}
                    onClick={(e) => handleInfoClick(e, index)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-nav">
        <div className="carousel-arrows">
          <button 
            className="carousel-prev" 
            aria-label="Previous services"
            onClick={scrollLeft}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button 
            className="carousel-next" 
            aria-label="Next services"
            onClick={scrollRight}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
      {mounted && typeof window !== 'undefined' && createPortal(modal, document.body)}
    </div>
  );
}; 
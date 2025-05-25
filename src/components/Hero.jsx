import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function Hero() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  // Array of background images to cycle through
  const images = [
    '/images/banner_home.png',
    '/images/banner_home1.jpg'
  ];

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % images.length;
      if (heroRef.current) {
        heroRef.current.style.backgroundImage = `url('${images[idx]}')`;
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleFindDoctorClick = () => {
    navigate('/find-doctors');
  };

  const handleRequestAppointmentClick = () => {
    navigate('/request-appointment');
  };
  return (
    <section id="hero" ref={heroRef}>
      <div className="hero-content">
        <h1 className="animated-text">
          Welcome to <span className="connectu">ConnectU</span><span className="health">Health</span>
        </h1>
        <p>Experience seamless healthcare access with our dynamic platform.</p>
        <div className="box-container">
        <div className="box request-appointment-link" onClick={handleRequestAppointmentClick}>
            <img src="/images/request_appointment.png" alt="Request Appointment" 
            onError={() => console.log("Failed to load request_appointment.png")}/>
            <p>Request Appointment</p>
          </div>
          <div className="box find-doctor-link" onClick={handleFindDoctorClick}>
            <img src="/images/find_doctor.png" alt="Find Doctor"
            onError={() => console.log("Failed to load find_doctor.png")} />
            <p>Find Doctor</p>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default Hero;
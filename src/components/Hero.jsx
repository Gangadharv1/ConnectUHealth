import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  const handleFindDoctorClick = () => {
    navigate('/find-doctors');
  };

  const handleRequestAppointmentClick = () => {
    navigate('/request-appointment');
  };
  return (
    <section id="hero">
      <div className="hero-content">
        <h1 className="animated-text">Welcome to ConnectUhealth</h1>
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
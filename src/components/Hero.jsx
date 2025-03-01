import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section id="hero">
      <div className="hero-content">
        <h1 className="animated-text">Welcome to ConnectUhealth</h1>
        <p>Experience seamless healthcare access with our dynamic platform.</p>
        <div className="box-container">
          <Link to="/request-appointment" className="box request-appointment-link">
            <img src="/images/request_appointment.png" alt="Request Appointment" 
            onError={() => console.log("Failed to load request_appointment.png")} 
            />
            <p>Request Appointment</p>
          </Link>
          <Link to="/#find-doctors" className="box">
            <img src="/images/find_doctor.png" alt="Find Doctor" 
            onError={() => console.log("Failed to load find_doctor.png")}
            />
            <p>Find Doctor</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleDepartmentsClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToDepartments: true } });
    } else {
      const departmentsSection = document.getElementById('departments');  
      if (departmentsSection) {
        departmentsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleAboutUsClick = (e) => {
    e.preventDefault();
   
      navigate('/', { state: { scrollToAboutUs: true } });
    
  };

  return (
    <header id="header">
      <div className="logo">
        <Link to="/">
          <img src="/images/logo.webp" alt="ConnectUhealth Logo" />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/about-us" onClick={handleAboutUsClick}>About Us</Link>
          </li>
          <li>
            <Link to="/" onClick={handleDepartmentsClick}>Departments</Link>
          </li>
          <li>
            <Link to="/request-appointment" className="request-appointment-link">Request Appointment</Link>
          </li>
          <li>
            <Link to="/find-doctors" className="find-doctor-link">Find Doctors</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}




export default Header;
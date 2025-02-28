import { Link, useLocation } from 'react-router-dom';

function Header({ toggleAboutUs }) {
  const location = useLocation();

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
            <Link to="/#about-us" onClick={toggleAboutUs}>
              About Us
            </Link>
          </li>
          <li><Link to="/#departments">Departments</Link></li>
          <li><Link to="/request-appointment" className="request-appointment-link">Request Appointment</Link></li>
          <li><Link to="/#find-doctors">Find Doctors</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;


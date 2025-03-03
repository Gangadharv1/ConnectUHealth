import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import DoctorProfiles from '../components/DoctorProfiles';
import AppointmentModal from '../components/AppointmentModal';
import Footer from '../components/Footer';

function RequestAppointment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [autoOpenSlots, setAutoOpenSlots] = useState(false);
  
  const [autoOpenCalendar, setAutoOpenCalendar] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const specialty = params.get('specialty');
    const doctor = params.get('doctor');
    if (specialty) setSelectedSpecialty(specialty);
    if (doctor) {
      setSelectedDoctor(doctor);
      setIsModalOpen(true);
      setAutoOpenSlots(true);
      if (location.state?.autoOpenCalendar) {
        setAutoOpenCalendar(true);
      }
    }
    
  }, [location.search, location.state]);

  const specialties = [
    'Cardiology', 'Neurology', 'Orthopedics', 'Nephrology', 'Gynecology',
    'General Surgery', 'Medicine', 'Cancer Care', 'Gastrology'
  ];

  const doctors = [
    'Dr. Deepak', 'Dr. Ravi Kumar', 'Dr. Sanket', 'Dr. Suman', 'Dr. Sara',
    'Dr. Dharam', 'Dr. Prapul', 'Dr. Pradeep', 'Dr. Sushanth'
  ];

  const doctorProfileMap = {
    'Dr. Deepak': 'Cardiology',
    'Dr. Ravi Kumar': 'Neurology',
    'Dr. Sanket': 'Orthopedics',
    'Dr. Suman': 'Nephrology',
    'Dr. Sara': 'Gynecology',
    'Dr. Dharam': 'General Surgery',
    'Dr. Prapul': 'Medicine',
    'Dr. Pradeep': 'Cancer Care',
    'Dr. Sushanth': 'Gastrology'
  };

  const specialtyMap = {
    'Cardiology': 'Cardiology',
    'Neurology': 'Neurology',
    'Orthopedics': 'Orthopedics',
    'Nephrology': 'Nephrology',
    'Gynecology': 'Gynecology',
    'General Surgery': 'Surgery',
    'Medicine': 'Medicine',
    'Cancer Care': 'Care',
    'Gastrology': 'Gastrology'
  };

  const handleSpecialtyChange = (e) => {
    setSelectedSpecialty(e.target.value);
    setSelectedDoctor('');
  };

  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value);
    setSelectedSpecialty('');
  };

  const selectedDoctorSpecialty = selectedDoctor ? doctorProfileMap[selectedDoctor] : '';

  return (
    <>
      <Header />
      <main>
        <section id="appointment-dropdown" className="content-section">
          <h2>Request an Appointment</h2>
          <div className="dropdown-container">
            <div className="dropdown">
              <label htmlFor="specialty">Specialty:</label>
              <select id="specialty" value={selectedSpecialty} onChange={handleSpecialtyChange}>
                <option value="">Select Specialty</option>
                {specialties.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
            <span>OR</span>
            <div className="dropdown">
              <label htmlFor="doctor">Doctor:</label>
              <select id="doctor" value={selectedDoctor} onChange={handleDoctorChange}>
                <option value="">Select Doctor</option>
                {doctors.map(doc => (
                  <option key={doc} value={doc}>{doc}</option>
                ))}
              </select>
            </div>
          </div>
        </section>
        <DoctorProfiles 
          selectedDepartment={selectedSpecialty ? specialtyMap[selectedSpecialty] : doctorProfileMap[selectedDoctor]}
          showAll={false}
        />
        <AppointmentModal 
          isOpen={isModalOpen} 
          onClose={() => {
            setIsModalOpen(false);
            setAutoOpenSlots(false);
            navigate('/request-appointment');
          }}
          autoOpenSlots={autoOpenSlots}
          doctorName={selectedDoctor || 'Unknown'}
          specialty={selectedDoctorSpecialty || 'Unknown'}
        />
      </main>
      <Footer />
    </>
  );
}

export default RequestAppointment;
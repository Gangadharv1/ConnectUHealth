import { useNavigate } from 'react-router-dom';

function DoctorProfiles({ selectedDepartment, showAll }) {
  const navigate = useNavigate();
  const doctors = [
    { id: 'Cardiology', name: 'Dr. Deepak', specialty: 'Cardiology', img: '/images/cardiology_doctor.jpg' },
    { id: 'Neurology', name: 'Dr. Ravi Kumar', specialty: 'Neurology', img: '/images/neurology_doctor.jpg' },
    { id: 'Orthopedics', name: 'Dr. Sanket', specialty: 'Orthopedics', img: '/images/orthopedics_doctor.jpg' },
    { id: 'Nephrology', name: 'Dr. Suman', specialty: 'Nephrology', img: '/images/nephrology_doctor.jpg' },
    { id: 'Gynecology', name: 'Dr. Sara', specialty: 'Gynecology', img: '/images/gynecology_doctor.jpg' },
    { id: 'General_surgery', name: 'Dr. Dharaam', specialty: 'General Surgery', img: '/images/general_surgery_doctor.jpg' },
    { id: 'Medicine', name: 'Dr. Prapul', specialty: 'General Medicine', img: '/images/general_medicine_doctor.jpg' },
    { id: 'Cancer_care', name: 'Dr. Pradeep', specialty: 'Cancer Care', img: '/images/cancer_care_doctor.jpg' },
    { id: 'Gastrology', name: 'Dr. Sushanth', specialty: 'Gastrology', img: '/images/gastroenterology_doctor.jpg' },
  ];

  const filteredDoctors = showAll ? doctors : doctors.filter(doc => doc.id === selectedDepartment);

  const handleBookAppointment = (doctorName, specialty) => {
    navigate(`/request-appointment?doctor=${encodeURIComponent(doctorName)}`, {
      state: { autoOpenCalendar: true }
    });
  };
  if (!filteredDoctors.length) return null;

  return (
    <section id="doctor-profiles" className="content-section" style={{ display: filteredDoctors.length ? 'block' : 'none' }}>
      <h2>Doctor Profiles</h2>
      <div className="profiles">
        {filteredDoctors.map(doc => (
          <div key={doc.id} id={doc.id} className="profile-card">
            <img src={doc.img} alt={doc.specialty} className="doctor-photo" />
            <h2 className="doctor-name">{doc.name}</h2>
            <p className="specialty">{doc.specialty}</p>
            <button
              className="appointment-button"
              onClick={() => handleBookAppointment(doc.name, doc.specialty)}
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DoctorProfiles;
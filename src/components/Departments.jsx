import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function Departments({ setSelectedDepartment }) {
  const navigate = useNavigate();
  const departmentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (departmentRef.current) {
        const element = departmentRef.current;
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const departments = [
    { id: 'Cardiology', name: 'Cardiology', img: '/images/cardiology.png' },
    { id: 'Neurology', name: 'Neurology', img: '/images/neurology.png' },
    { id: 'Orthopedics', name: 'Orthopedics', img: '/images/orthopedics.png' },
    { id: 'Nephrology', name: 'Nephrology', img: '/images/nephrology.png' },
    { id: 'Gynecology', name: 'Gynecology', img: '/images/gynecology.png' },
    { id: 'Surgery', name: 'General Surgery', img: '/images/general_surgery.png' },
    { id: 'Medicine', name: 'Medicine', img: '/images/general_medicine.png' },
    { id: 'Care', name: 'Cancer Care', img: '/images/cancer_care.png' },
    { id: 'Gastrology', name: 'Gastrology', img: '/images/gastro.png' },
  ];
  
  const handleDepartmentClick = (deptId) => {
    setSelectedDepartment(deptId);
    const doctorProfilesSection = document.getElementById('doctor-profiles');
    if (doctorProfilesSection) {
      doctorProfilesSection.scrollIntoView({ behavior: 'smooth' });
    }
    navigate('/#doctor-profiles');
  };

  return (
    <section id="departments" className="content-section" ref={departmentRef}>
      <div className="department-info">
        <h2>Centres Of Excellence</h2>
        <p>Explore our various departments to find the care you need.</p>
      </div>
      <div className="department-container">
        {departments.map(dept => (
          <div
            key={dept.id}
            id={dept.id}
            className="department-box"
            onClick={() => handleDepartmentClick(dept.id)}
          >
            <img src={dept.img} alt={dept.name} />
            <p>{dept.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Departments;
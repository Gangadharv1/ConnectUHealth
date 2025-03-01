import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Departments from '../components/Departments';
import DoctorProfiles from '../components/DoctorProfiles';
import AboutUs from '../components/AboutUs';
import Footer from '../components/Footer';

function Home() {
  const location = useLocation();
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isAboutUsVisible, setIsAboutUsVisible] = useState(false);

  useEffect(() => {
    if (location.state?.scrollToDepartments) {
      const departmentsSection = document.getElementById('departments');
      if (departmentsSection) {
        departmentsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }

    if (location.state?.scrollToAboutUs) {
      console.log("Scrolling to AboutUs and making visible");
      setIsAboutUsVisible(true);
      const aboutUsSection = document.getElementById('about-us');
      if (aboutUsSection) {
        aboutUsSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.log("AboutUs section not found");
      }
    }
  }, [location.state]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Departments setSelectedDepartment={setSelectedDepartment} />
        <DoctorProfiles selectedDepartment={selectedDepartment} showAll={false} />
        <AboutUs className={isAboutUsVisible ? 'visible' : 'hidden'} />
      </main>
      <Footer />
    </>
  );
}

export default Home;
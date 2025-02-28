import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Departments from '../components/Departments';
import DoctorProfiles from '../components/DoctorProfiles';
import AboutUs from '../components/AboutUs';
import Footer from '../components/Footer';

function Home() {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showAllDoctors, setShowAllDoctors] = useState(false);
  const [isAboutUsVisible, setIsAboutUsVisible] = useState(false);


  const toggleAboutUs = (e) => {
    e.preventDefault(); 
    setIsAboutUsVisible((prev) => !prev);
    if (!isAboutUsVisible) {
      setTimeout(() => {
        document.getElementById('about-us').scrollIntoView({ behavior: 'smooth' });
      }, 100); 
    }
  };

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Departments setSelectedDepartment={setSelectedDepartment} />
        <DoctorProfiles 
          selectedDepartment={selectedDepartment} 
          showAll={showAllDoctors}
        />
       <AboutUs isVisible={isAboutUsVisible} />
      </main>
      <Footer />
    </>
  );
}

export default Home;
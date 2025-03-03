import { useState, useEffect } from 'react';
import Header from '../components/Header';
import DoctorProfiles from '../components/DoctorProfiles';
import Footer from '../components/Footer';

function FindDoctors() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log("FindDoctors rendered");
    setTimeout(() => {
      setIsVisible(true);
      console.log("FindDoctors isVisible set to true");
    }, 100);
  }, []);

  return (
    <>
      <Header />
      <main>
        <DoctorProfiles showAll={true} className={isVisible ? 'visible' : 'hidden'} />
      </main>
      <Footer />
    </>
  );
}

export default FindDoctors;
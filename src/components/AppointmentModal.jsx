import { useState, useEffect } from 'react';

function AppointmentModal({ isOpen, onClose, autoOpenSlots, autoOpenCalendar, doctorName, specialty }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [step, setStep] = useState(autoOpenCalendar ? 'calendar' : 'calendar');
  const [errors, setErrors] = useState({ fullName: '', mobile: '' });
  const availableSlots = ["10:00AM", "11:00AM", "12:00PM", "03:00PM", "04:00PM"];

  useEffect(() => {
    if (autoOpenSlots && isOpen) {
      const today = new Date().toISOString().split("T")[0];
      setSelectedDate(today);
      setStep('slots');
    }
    if (autoOpenCalendar && isOpen) {
      setStep('calendar');
    }

  }, [autoOpenSlots, autoOpenCalendar, isOpen]);;

  const generateCalendar = () => {
    const today = new Date();
    const days = [];  
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date.toISOString().split("T")[0]);
    setStep('slots');
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setStep('form');
   
  };

  const handleNext = () => {
    if (selectedSlot) setStep('form');
  };

  const validateForm = (formData) => {
    const fullName = formData.get('fullName');
    const mobile = formData.get('mobile');
    const newErrors = { fullName: '', mobile: '' };
    let isValid = true;


    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(fullName)) {
      newErrors.fullName = 'Name should only contain letters and spaces';
      isValid = false;
    }
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
      newErrors.mobile = 'Mobile number must be exactly 10 digits';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    if (!validateForm(formData)) {
      return;
    }

    const booking = {
      date: selectedDate,
      time: selectedSlot,
      fullName: formData.get('fullName'),
      age: formData.get('age'),
      mobile: formData.get('mobile'),
    };

    const formattedDate = new Date(selectedDate).toLocaleDateString('en-IN', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });

   
    alert(
      `Dear ${booking.fullName}, your appointment is confirmed with ${doctorName}, ${specialty}, on ${formattedDate} at ${booking.time} at ConnectUHealth.`
    );

    console.log(booking); 
    onClose();
  };

  const resetBooking = () => {
    setSelectedDate(null);
    setSelectedSlot(null);
    setStep('calendar');
    setErrors({ fullName: '', mobile: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>×</span>
        {step === 'calendar' && (
          <div id="calendar">
            {generateCalendar().map((date, index) => (
              <div
                key={index}
                className={`calendar-day ${selectedDate === date.toISOString().split("T")[0] ? 'selected' : ''}`}
                onClick={() => handleDateSelect(date)}
              >
                {date.toLocaleDateString("en-US", { weekday: "short", day: "numeric" })}
              </div>
            ))}
          </div>
        )}
        {step === 'slots' && (
          <div id="slot-container">
            <h3>Select Time Slot</h3>
            <div id="time-slots">
              {availableSlots.map(slot => (
                <div
                  key={slot}
                  className={`time-slot ${selectedSlot === slot ? 'selected' : ''}`}
                  onClick={() => handleSlotSelect(slot)}
                >
                  {slot}
                </div>
              ))}
            </div>
            <button id="next-btn" onClick={handleNext} disabled={!selectedSlot}>
              Next
            </button>
          </div>
        )}
        {step === 'form' && (
          <form id="patient-form" onSubmit={handleSubmit}>
            <div>
              <input type="text" name="fullName" placeholder="Full Name" required />
              {errors.fullName && <p style={{ color: 'red', fontSize: '12px' }}>{errors.fullName}</p>}
            </div>
            <div>
              <input type="number" name="age" placeholder="Age" required />
            </div>
            <div>
              <input type="tel" name="mobile" placeholder="Mobile" required />
              {errors.mobile && <p style={{ color: 'red', fontSize: '12px' }}>{errors.mobile}</p>}
            </div>
            <button type="submit">Book Appointment</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AppointmentModal;
import { useState, useEffect } from 'react';

function AppointmentModal({ isOpen, onClose, doctorName, specialty }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [step, setStep] = useState('calendar');
  const [errors, setErrors] = useState({ fullName: '', mobile: '' });
  const availableSlots = ["10:00AM", "11:00AM", "12:00PM", "03:00PM", "04:00PM"];

  const generateCalendar = () => {
    const today = new Date();
    const days = [];
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Generate 30 days from today
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date: date.toISOString().split("T")[0],
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        weekday: date.toLocaleDateString("en-US", { weekday: "long" })
      });
    }
    return days;
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setStep('slots');
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setStep('form');
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

  useEffect(() => {
    if (!isOpen) {
      resetBooking();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>×</span>
        {step === 'calendar' && (
          <div id="calendar">
            <h3>Select Date</h3>
            <div className="calendar-grid">
              {generateCalendar().map((day, index) => (
                <div
                  key={index}
                  className={`calendar-day ${selectedDate === day.date ? 'selected' : ''}`}
                  onClick={() => handleDateSelect(day.date)}
                >
                  <div>{day.weekday.substring(0, 3)}</div>
                  <div>{day.day}</div>
                  <div>{new Date(day.date).toLocaleString('default', { month: 'short' })}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 'slots' && (
          <div id="slot-container">
            <h3>Select Time Slot for {new Date(selectedDate).toLocaleDateString()}</h3>
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
            <button onClick={() => setStep('calendar')}>Back</button>
          </div>
        )}
        {step === 'form' && (
          <form id="patient-form" onSubmit={handleSubmit}>
            <h3>Patient Details</h3>
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
            <button type="button" onClick={() => setStep('slots')}>Back</button>
            <button type="submit">Book Appointment</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AppointmentModal;
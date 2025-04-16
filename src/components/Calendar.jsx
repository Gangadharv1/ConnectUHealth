import React, { useState } from 'react';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const styles = {
    calendarDay: {
      padding: '15px',
      textAlign: 'center',
      cursor: 'pointer',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
    },
    selected: {
      backgroundColor: '#4CAF50',
      color: 'white',
      borderRadius: '50%',
    },
    today: {
      border: '2px solid #4CAF50',
      borderRadius: '50%',
    },
    empty: {
      padding: '15px',
    },
    calendarContainer: {
      maxWidth: '600px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
    },
    calendarHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    calendarGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: '5px',
    },
    weekday: {
      textAlign: 'center',
      padding: '10px',
      fontWeight: 'bold',
    },
    timeSlotsContainer: {
      marginTop: '20px',
    },
    timeSlotsTitle: {
      marginBottom: '10px',
      fontSize: '1.1rem',
    },
    timeSlotsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '10px',
    },
    timeSlot: {
      padding: '10px',
      textAlign: 'center',
      border: '1px solid #ddd',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const days = [];

    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} style={styles.empty}></div>
      );
    }

    // Add days of the month
    for (let day = 1; day <= lastDate; day++) {
      const date = new Date(year, month, day);
      const isSelected = selectedDate && 
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear();
      
      const isToday = new Date().toDateString() === date.toDateString();

      const dayStyle = {
        ...styles.calendarDay,
        ...(isSelected ? styles.selected : {}),
        ...(isToday ? styles.today : {})
      };

      days.push(
        <div 
          key={day}
          onClick={() => handleDateClick(date)}
          style={dayStyle}
        >
          {day}
        </div>
      );
    }

    return days;
  };


  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotClick = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    console.log('Selected date and time:', {
      date: selectedDate?.toLocaleDateString(),
      time: timeSlot
    });
  };

  const renderTimeSlots = () => {
    if (!selectedDate) return null;

    const timeSlots = Array.from({ length: 16 }, (_, i) => {
      const hour = Math.floor(i / 2) + 9;
      const minute = i % 2 === 0 ? "00" : "30";
      const ampm = hour >= 12 ? "PM" : "AM";
      const hour12 = hour > 12 ? hour - 12 : hour;
      return `${hour12}:${minute} ${ampm}`;
    });

    return (
      <div className="time-slots-container">
        <div className="time-slots-title">
          Select Time for {selectedDate.toLocaleDateString()}
        </div>
        <div className="time-slots-grid">
          {timeSlots.map((timeSlot) => (
            <div
              key={timeSlot}
              className={`time-slot ${selectedTimeSlot === timeSlot ? 'selected' : ''}`}
              onClick={() => handleTimeSlotClick(timeSlot)}
            >
              {timeSlot}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={styles.calendarContainer}>
      <div style={styles.calendarHeader}>
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} style={styles.weekday}>{day}</div>
        ))}
      </div>
      <div style={styles.calendarGrid}>
        {renderCalendar()}
      </div>
      {renderTimeSlots()}
    </div>
  );
}

export default Calendar; 
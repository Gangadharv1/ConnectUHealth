import React, { useState } from 'react';
import './Calendar.css';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

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
        <div key={`empty-${i}`} className="calendar-day empty"></div>
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

      days.push(
        <div 
          key={day}
          onClick={() => handleDateClick(date)}
          className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
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
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar-weekdays">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="weekday">{day}</div>
        ))}
      </div>
      <div className="calendar-grid">
        {renderCalendar()}
      </div>
      {renderTimeSlots()}
    </div>
  );
}

export default Calendar; 
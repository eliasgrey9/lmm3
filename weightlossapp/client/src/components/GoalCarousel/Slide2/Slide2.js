import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import style from "./slide2.module.css";

const Slide2 = ({ deadlineDate, setDeadlineDate }) => {
  const handleDateChange = (date) => {
    setDeadlineDate(date);
  };

  // Calculate the maximum allowed date (90 days from the current day)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 90);

  return (
    <div className={style.container}>
      <h2 className={style.heading}>
        ...the end of{" "}
        <span className={style.purpleText}>
          {deadlineDate.toLocaleDateString()}
        </span>{" "}
        or else...
      </h2>
      <Calendar
        className={style.calendar}
        s
        onChange={handleDateChange}
        value={deadlineDate}
        minDate={new Date()}
        maxDate={maxDate}
      />
    </div>
  );
};

export default Slide2;

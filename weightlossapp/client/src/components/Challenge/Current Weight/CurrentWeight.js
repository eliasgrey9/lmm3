import React, { useEffect, useState } from "react";
import style from "./currentWeight.module.css";

const CurrentWeight = ({ currentParticipants, userId, units }) => {
  const [currentParticipant, setCurrentParticipant] = useState({});
  useEffect(() => {
    const matchingParticipant = currentParticipants.find((participant) => {
      return parseInt(participant.userId) === parseInt(userId);
    });

    if (matchingParticipant) {
      setCurrentParticipant(matchingParticipant);
    }
  }, [currentParticipants, userId]);

  return (
    <div className={style.container}>
      <div className={style.containerTitle}>CURRENT WEIGHT</div>
      <div className={style.weight}>
        {currentParticipant.currentWeight} {units}
      </div>
      <div className={style.inputContainer}>
        <input placeholder="Enter new weight" className={style.input}></input>
      </div>
      <div className={style.buttonContainer}>
        <button className={style.updateBtn}>Update Weight</button>
      </div>
    </div>
  );
};

export default CurrentWeight;

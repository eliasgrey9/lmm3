import React from "react";
import style from "./challengeDescription.module.css";

const ChallengeDescription = () => {
  return (
    <div className={style.container}>
      <div className={style.challengeTitle}>CHALLENGE</div>
      <div className={style.challengeHeading}>The Gymnator</div>
      <div className={style.descriptionContainer}>
        <div className={style.challengeDescription}>
          BE THE FIRST TO LOSE 20 LBS, EACH LOSER WILL GIFT YOU THE DOLLAR VALUE
          OF 1 MONTH FREE GYM MEMBERSHIP TO YOUR CURRENT GYM!
        </div>
      </div>
    </div>
  );
};

export default ChallengeDescription;

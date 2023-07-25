import React, { useState, useEffect } from "react";
import CircleProgress from "./CircleProgress";
import style from "./progress.module.css";

const Progress = () => {
  const [playersProgress, setPlayersProgress] = useState([
    { name: "Elias Grey", percent: 25 },
    { name: "John Doe", percent: 42 },
    { name: "Mary Jane", percent: 17 },
    { name: "Fairy Jerry", percent: 87 },
  ]);

  useEffect(() => {
    const sortAndFillPlayers = () => {
      // Sort the array in descending order based on the percentage
      const sortedPlayers = [...playersProgress].sort(
        (b, a) => b.percent - a.percent
      );

      // Check if the array has less than 4 players and fill the empty spots with {name:"", percent:0}
      const requiredPlayers = 4 - sortedPlayers.length;
      if (requiredPlayers > 0) {
        for (let i = 0; i < requiredPlayers; i++) {
          sortedPlayers.push({ name: "", percent: 0 });
        }
      }

      setPlayersProgress(sortedPlayers);
    };

    sortAndFillPlayers();
  }, []); // Empty dependency array ensures useEffect runs only once during initial render

  return (
    <div className={style.container}>
      <div className={style.containerTitle}>PROGRESS</div>
      <div className={style.pieCharts}>
        {playersProgress.map((player, index) => {
          // Check if the player name is not empty before rendering
          if (player.name !== "") {
            return (
              <div key={index} className={style.pieChart}>
                <div className={style.playerName}>{player.name}</div>
                <CircleProgress percentage={player.percent} />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Progress;

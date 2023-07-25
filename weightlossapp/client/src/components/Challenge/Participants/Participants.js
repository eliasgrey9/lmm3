import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import style from "./participants.module.css";

const Participants = () => {
  const navigate = useNavigate();

  const [currentUserId, setCurrentUserId] = useState(0);
  const [participants, setParticipants] = useState([
    {
      name: "John Doe",
      poundsLeft: 11.6,
      id: 4,
    },
    {
      name: "Fairy Jerry",
      id: 3,
      poundsLeft: 2.6,
    },
    {
      name: "Mary Jane",
      id: 2,
      poundsLeft: 16.6,
    },
    {
      name: "Elias Grey",
      poundsLeft: 15,
      id: 1,
    },
  ]);
  const API_URL = process.env.REACT_APP_API_URL;
  const { userId } = useParams(0);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("authToken");
      const options = { headers: { Authorization: `Bearer ${token}` } };
      if (userId) {
        try {
          const response = await axios.get(
            `${API_URL}/api/users/checkUser/${userId}`,
            options
          );

          if (response) {
            // User is signed in and the ID matches
            setCurrentUserId(response.data.id);
          } else {
            // User is not signed in or the ID doesn't match
            navigate("/home/guest"); // Redirect the user to the guest page
          }
        } catch (error) {
          if (error.response && error.response.status === 401) {
            navigate("/home/guest"); // Redirect the user to the guest page
          } else {
            console.error(error);
          }
        }
      }
    };

    checkUser();
  }, [userId, navigate]);

  useEffect(() => {
    // Sort the array in descending order based on the poundsLeft
    const sortedParticipants = [...participants].sort(
      (b, a) => b.poundsLeft - a.poundsLeft
    );

    // Check if the array has less than 4 participants and fill the empty spots with {name:"", poundsLeft:0}
    const requiredParticipants = 4 - sortedParticipants.length;
    if (requiredParticipants > 0) {
      for (let i = 0; i < requiredParticipants; i++) {
        sortedParticipants.push({ name: "", poundsLeft: 100, id: 0 });
      }
    }

    setParticipants(sortedParticipants);
  }, []);

  return (
    <div className={style.container}>
      <div className={style.containerTitle}>PARTICIPANTS</div>
      <div className={style.labelsContainer}>
        <div className={style.labels}>
          <div className={style.label}>POSITION</div>
          <div className={style.label}>NAME</div>
          <div className={style.label}>WEIGHT LEFT</div>
          <div className={style.label}>MOVE</div>
          <div className={style.label}>COST</div>
        </div>
      </div>
      <div className={style.participantsContainer}>
        <div className={style.participants}>
          {participants.map((participant, index) => (
            <div
              className={
                participant.id === currentUserId
                  ? style.currentParticipant
                  : style.participant
              }
              key={participant.id}
            >
              <div className={style.participantRowItem}>{index + 1}</div>
              {participant.id > 0 ? (
                <>
                  <div className={style.participantRowItem}>
                    {participant.name}
                  </div>
                  <div className={style.participantRowItem}>
                    {participant.poundsLeft}
                  </div>

                  {participant.id === currentUserId ? (
                    <>
                      <div className={style.participantRowItem}>
                        <button className={style.moveBtn}>Buy shield</button>
                      </div>
                      <div className={style.participantRowItem}>3 credits</div>
                    </>
                  ) : (
                    <>
                      <div className={style.participantRowItem}>
                        <button className={style.moveBtn}>Add 1 lb</button>
                      </div>
                      <div className={style.participantRowItem}>1 credit</div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <div className={style.emptyParticipantContainer}>
                    <div className={style.btnContainer}>
                      <button className={style.joinBtn}>Join now</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Participants;

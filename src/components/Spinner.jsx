import React, { useState } from "react";
import PopUp from "./PopUp";

const Spinner = () => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [data, setData] = useState("");
  const [winner, setWinner] = useState("");

  const winnerNames = [
    { min: 0, max: 30, winner: "Jasim" },
    { min: 31, max: 90, winner: "Ibrahim" },
    { min: 91, max: 150, winner: "Rifat" },
    { min: 151, max: 210, winner: "Teebro" },
    { min: 211, max: 270, winner: "Jisan" },
    { min: 271, max: 330, winner: "Jasim" },
    { min: 331, max: 360, winner: "Ibrahim" },
  ];

  const winnerNames2 = [
    { winner: "Ibrahim" },
    { winner: "Jasim" },
    { winner: "Jisan" },
    { winner: "Teebro" },
    { winner: "Rifat" },
  ];

  const handlePopUp = (value) => {
    setOpenPopUp(value);
  };

  const handleRotation = () => {
    let min = 0;
    let max = 355;
    let degree = Math.floor(Math.random() * (max - min + 1)) + min;

    document.getElementById(
      "circleId"
    ).style.transform = `rotate(${degree}deg)`;

    console.log("* degree:", degree);

    let result;
    winnerNames.filter((name) => {
      if (name?.min >= degree && degree <= name?.max) {
        console.log("* name:", name);
        result = name.winner;
      }
    });
    console.log("* Winner:", result);

    setTimeout(() => {
        console.log("* openPopUp:if", openPopUp);
        setOpenPopUp(true);
        setData(result || 'Not available.');
    }, 5000);
  };
  console.log("* openPopUp:", openPopUp);
  return (
    <div className="spinner_main">
      <div className="name_block_mobile">
        <h4>Add Name</h4>
        <div className="names">
          {[...Array(5)].map((name, i) => (
            <p>name-{i + 1}</p>
          ))}
        </div>
      </div>

      <div className="spinner_block">
        <ul id="circleId" className={`circle`}>
          {winnerNames2.map((item, index) => (
            <li>
              <div>{item?.winner}</div>
            </li>
          ))}
        </ul>

        <div className="arrow"></div>

        <div className="name_block">
          <h4>Add Name</h4>
          <div className="names">
            {winnerNames2.map((name, i) => (
              <p>{name?.winner}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="spin_button" onClick={handleRotation}>
        Spin it!
      </div>

      {openPopUp && <PopUp data={data} handlePopUp={handlePopUp} />}
    </div>
  );
};

export default Spinner;
// ``

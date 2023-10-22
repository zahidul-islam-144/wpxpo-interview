import React, { useState } from "react";
import PopUp from "./PopUp";

const initialValue = [
  { min: 0, max: 72, winner: "Jasim" },
  { min: 72, max: 144, winner: "Ibrahim" },
  { min: 144, max: 216, winner: "Rifat" },
  { min: 216, max: 288, winner: "Teebro" },
  { min: 288, max: 360, winner: "Jisan" },
];

const Spinner = () => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [data, setData] = useState("Not available");
  const [currRotation, setCurrRotation] = useState(0);
  const [firstTimeLoad, setFirstTimeLoad] = useState(false);
  const [winnerNames2, setWinnerNames2] = useState(initialValue);

  const winnerNames = [
    { winner: "Jasim" },
    { winner: "Ibrahim" },
    { winner: "Rifat" },
    { winner: "Teebro" },
    { winner: "Jisan" },
  ];

  const handlePopUp = (value) => {
    setOpenPopUp(value);
  };

  const handleRotation = (prevDegree) => {
    let min = 0;
    let max = 360;
    let degree = Math.floor(Math.random() * (max - min + 1)) + min;

    document.getElementById(
      "circleId"
    ).style.transform = `rotate(${degree}deg)`;

    console.log("* degree:", degree);

    let positive = firstTimeLoad ? (prevDegree > degree ? false : true) : true;
    console.log("🇧🇩 ~ positive:", positive);
    let diff = Math.abs(prevDegree - degree);
    console.log("🇧🇩 ~  diff:", diff);
    setCurrRotation(degree);
    setFirstTimeLoad(true);

    let result;
    let tempState = [...winnerNames2];
    winnerNames2.filter((item, index) => {
      // console.log('winnerNames2', winnerNames2)
      // console.log('tempState', tempState)
      if (positive) {
        console.log("if");
        if (item.min + diff > 360 || item.max + diff > 360) {
          if (item.min + diff > 360)
            tempState[index].min = item.min + diff - 360;
          else tempState[index].min = item.min + diff;
          if (item.max + diff > 360)
            tempState[index].max =
              index === winnerNames2.length - 1
                ? item.max + diff - 360 - 1
                : item.max + diff - 360;
          else tempState[index].max = item.max + diff;
        } else {
          tempState[index].min = item.min + diff;
          tempState[index].max = item.max + diff;
        }
      } else {
        console.log("else");
        if (item.min - diff < 0 || item.max - diff < 0) {
          if (item.min - diff < 0) tempState[index].min = item.min - diff + 360;
          else tempState[index].min = item.min - diff;
          if (item.max - diff < 0)
            tempState[index].max =
              index === 1 ? item.max + diff + 360 + 1 : item.max - diff + 360;
          else tempState[index].max = item.max - diff;
        } else {
          tempState[index].min = item.min - diff;
          tempState[index].max = item.max - diff;
        }
      }

      return true;
    });
    setWinnerNames2(tempState);
    console.log("FINAL:", winnerNames2);

    winnerNames2.filter((item, index) => {
      if (item?.min <= 90 && 90 <= item?.max) {
        // console.log('* item:', item)
        result = item.winner;
      }

      return true;
    });

    setData(result);
    setTimeout(() => {
      if (result) {
        setOpenPopUp(true);
      } else {
        setOpenPopUp(false);
        setData("Not available.");
      }
    }, 5000);
  };

  return (
    <div className="spinner_main">
      <div className="name_block_mobile">
        <h4>Add Name</h4>
        <div className="names">
          {winnerNames.map((winner, i) => (
            <p>{winner?.winner}</p>
          ))}
        </div>
      </div>

      <div className="spinner_block">
        <ul id="circleId" className={`circle`}>
          {winnerNames2.map((item, index) => (
            <li key={index}>
              <div>{item?.winner}</div>
            </li>
          ))}
        </ul>

        <div className="arrow"></div>

        <div className="name_block">
          <h4>Add Name</h4>
          <div className="names">
            {winnerNames.map((winner, i) => (
              <p>{winner?.winner}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="spin_button" onClick={() => handleRotation(currRotation)}>
        Spin it!
      </div>

      {openPopUp && <PopUp data={data} handlePopUp={handlePopUp} />}
    </div>
  );
};

export default Spinner;

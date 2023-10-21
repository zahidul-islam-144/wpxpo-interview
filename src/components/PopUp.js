import React from "react";

const PopUp = ({ data, handlePopUp }) => {
  return (
    <div className="popup_block">
      <div className="close" onClick={() => handlePopUp(false)}>
        Close
      </div>
      {data}
    </div>
  );
};

export default PopUp;

import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import * as roomHandler from "../../realtimeCommunication/roomHandler";

const CreateRoomButton = ({ isUserInRoom }) => {
  const createNewRoomHandler = () => {
    // creating a new room and sending info to the server abt it
    roomHandler.createNewRoom();
  };

  return (
    <Button
      disabled={isUserInRoom} //button is disabled if value is true 
      onClick={createNewRoomHandler}
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "16px",
        margin: 0,
        padding: 0,
        minWidth: 0,
        marginTop: "10px",
        color: "white",
        backgroundColor: "#5865F2",
      }}
    >
      <AddIcon />
    </Button>
  );
};

export default CreateRoomButton;

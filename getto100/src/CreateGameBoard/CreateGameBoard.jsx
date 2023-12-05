import React, { useState } from "react";
import ActionButtons from "../ActionButtons/ActionButtons";

function CreateGameBoard(props) {

    const [gamer, setGamer] = useState(props.stateCurrentPlayers);
//להוסיף את הכפתורים
//
    return (
        <>
            <h3>Hi {props.stateCurrentPlayers.currentPlayer.name}</h3>
            <h2>Number: {number}</h2>
            <h3>Steps: {props.stateCurrentPlayers.steps}</h3>
            <ActionButtons stateCurrentPlayers={props.stateCurrentPlayers} setStateCurrentPlayers={props.setStateCurrentPlayers}
                           activePlayer ={props.activePlayer}  setStateActivePlayer={props.setStateActivePlayer}
                           numberPlayers={props.numberPlayers}/>
            <h4>{props.stateCurrentPlayers.currentPlayer.name}'s scores: </h4>
        </>
    );
}
export default CreateGameBoard; 
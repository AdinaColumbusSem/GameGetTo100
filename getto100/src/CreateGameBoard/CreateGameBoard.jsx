import React, { useState } from "react";
import ActionButtons from "../ActionButtons/ActionButtons";

function CreateGameBoard(props) {
    return (
        <>
            <h3>Hi {props.stateCurrentPlayers.currentPlayer.name}</h3>
            <h2>Number: {props.stateCurrentPlayers.currentNumber}</h2>
            <h3>Steps: {props.stateCurrentPlayers.steps}</h3>
            <ActionButtons stateCurrentPlayers = {props.stateCurrentPlayers} setStateCurrentPlayers={props.setStateCurrentPlayers}/>
            <h4>{props.stateCurrentPlayers.currentPlayer.name}'s scores: </h4>
        </>
    );
}
export default CreateGameBoard; 
import React from "react";


function CreateGameBoard(props) {
    return (
        <>
            <h3>Hi {props.stateCurrentPlayers.currentPlayer.name}</h3>
            <h2>Number: {props.stateCurrentPlayers.currentNumber}</h2>
            <h4>{props.stateCurrentPlayers.currentPlayer.name}'s scores: </h4>
        </>
    );
}
export default CreateGameBoard; 
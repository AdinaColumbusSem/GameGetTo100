import React, { useState } from "react";

function Game(props) {

    function SatartGame() {
        props.setStateGameActive(true);
        console.log(props.activePlayer)
        props.stateCurrentPlayers[props.activePlayer].active = true;
        props.setStateCurrentPlayers(cur => [...cur]);
    }

    if (props.gameActive) {
        props.stateCurrentPlayers[props.activePlayer].active = true;
    }

    return (
        <>
            <button onClick={SatartGame}>Start</button>
        </>
    );
}

export default Game;

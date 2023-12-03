import React, { useState } from "react";


function UpdateLocalStorage(props) {
    let Players = JSON.parse(localStorage.getItem('PlayersArr'));
    if (Players)
        Players.find(player => player.name == props.currentPlayer.name && player.email == props.currentPlayer.email) ?
            props.setStateCurrentPlayers(cur => [...cur, { stateCurrentPlayers: player, currentNumber: Math.floor(Math.random() * (100)), steps: 0, active: true }]) : addPlayerToGame()
    else
        addPlayerToGame();


    function addPlayerToGame() {
        if (!Players)
            Players = [];
        Players.push(props.currentPlayer);
        localStorage.setItem('PlayersArr', JSON.stringify(Players));
        props.setStateCurrentPlayers(cur => [...cur, { currentPlayer: props.currentPlayer, currentNumber: Math.floor(Math.random() * (100)), steps: 0, active: true }])

    }

    return (<>

    </>);
}

export default UpdateLocalStorage;
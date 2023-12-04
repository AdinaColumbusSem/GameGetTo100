import React, { useState } from "react";


function UpdatePlayer(props) {

    let Players = JSON.parse(localStorage.getItem('PlayersArr'));
    if (Players)
        Players.find(player => player.name == props.currentPlayer.name && player.email == props.currentPlayer.email) != undefined ?
            props.setStateCurrentPlayers(cur => [...cur, { currentPlayer: props.currentPlayer, currentNumber: Math.floor(Math.random() * (100)), steps: 0, active: false }])
            : addNewPlayer();
    else
        addNewPlayer();


    function addNewPlayer() {
        if (!Players)
            Players = [];
        Players.push(props.currentPlayer);
        localStorage.setItem('PlayersArr', JSON.stringify(Players));
        props.setStateCurrentPlayers(cur => [...cur, { currentPlayer: props.currentPlayer, currentNumber: Math.floor(Math.random() * (100)), steps: 0, active: false }])

    }

    return (<>

    </>);
}

export default UpdatePlayer;
import React, { useState } from "react";


function UpdateLocalStorage(props) {
    let Players = JSON.parse(localStorage.getItem('PlayersArr'));
    if (Players)
        Players.find(player => player.name == props.currentPlayer.name && player.email == props.currentPlayer.email) ?
            props.setStateCurrentPlayers(cur => [...cur, { currentPlayer: player, currentNumber: Math.floor(Math.random()* (100)) }]) : addPlayerToGame()
    else
        addPlayerToGame();


    function addPlayerToGame() {
        if (!Players)
            Players = [];
        Players.push(props.currentPlayer);
        localStorage.setItem('PlayersArr', JSON.stringify(Players));
        props.setStateCurrentPlayers(cur => [...cur, { currentPlayer: props.currentPlayer, currentNumber: Math.floor(Math.random()* (100))}])

    }

    return (<>

    </>);
}

export default UpdateLocalStorage;
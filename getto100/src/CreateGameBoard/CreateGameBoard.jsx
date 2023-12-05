import React, { useState } from "react";
import './CreateGameBoard.css'

function CreateGameBoard(props) {

    const { CurrentPlayer, updateActivePlayer, updateWinner } = props;

    const Actions = ['-1', '+1', '*2', "/2"];
    const actionButtons = Actions.map((btn, i) =>
        <button key={i} onClick={() => onClickActionBtn(btn)}>{btn}</button>);

    const winBtns = ['new Game', 'Quit'];
    const winButtons = winBtns.map((btn, i) =>
        <button key={i} onClick={() => onClickWinBtn(btn)}>{btn}</button>);

    function onClickActionBtn(btn) {
        if (CurrentPlayer.active) {
            let newNumber;
            switch (btn) {
                case '-1': newNumber = CurrentPlayer.number - 1;
                    break;
                case '+1': newNumber = CurrentPlayer.number + 1;
                    break;
                case '*2': newNumber = CurrentPlayer.number * 2;
                    break;
                case '/2': newNumber = Math.floor(CurrentPlayer.number / 2);
                    break;
            }
            newNumber != 100 ? updateActivePlayer(newNumber) : win();
        }
    }

    function win() {
        activeStyle = { display: 'none' };
        winBtnsStyle = { display: 'block' }
    }
    
    function onClickWinBtn(btn) {
        updateWinner(btn);
    }

    return (
        <>
            <h3>Hi {CurrentPlayer.player.name}</h3>
            <h2>Number: {CurrentPlayer.number}</h2>
            <h3>Steps: {CurrentPlayer.steps}</h3>
            {actionButtons}
            {winButtons}
            <h4>{CurrentPlayer.player.name}'s scores: </h4>
            {CurrentPlayer.results.map(result => result)}
        </>
    );
}

export default CreateGameBoard; 
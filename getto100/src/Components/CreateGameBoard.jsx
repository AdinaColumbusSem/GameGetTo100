import React, { useState } from "react";
import './Game/Game.css';

function CreateGameBoard(props) {

    const [styleActiveBtn, setStyleActiveBtn] = useState({ display: 'inline'  })
    const [styleWinBtn, setStyleWinBtn] = useState({ display: 'none' })

    const { CurrentPlayer, updateActivePlayer, updateWinner } = props;

    const Mstyle = CurrentPlayer.active ? { boxShadow: ' rgb(0 166 237) 0.01px 2px 7px' } : { boxShadow: 'none'};

    const Actions = ['-1', '+1', '*2', "/2"];
    const actionButtons = Actions.map((btn, i) =>
        <button key={i} style={styleActiveBtn} onClick={() => onClickActionBtn(btn)}>{btn}</button>);

    const winBtns = ['new Game', 'Quit'];
    const winButtons = winBtns.map((btn, i) =>
        <button key={i} style={styleWinBtn} onClick={() => onClickWinBtn(btn)}>{btn}</button>);


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
            updateActivePlayer(newNumber)
            if (newNumber == 100) {
                setStyleActiveBtn({ display: 'none' });
                setStyleWinBtn({ display: 'inline' });
            }
        }
    }

    function onClickWinBtn(btn) {
        updateWinner(btn);
        setStyleActiveBtn({ display: 'inline' });
        setStyleWinBtn({ display: 'none' });
    }

    return (
        <>
            
            <div style={Mstyle} className='gameBoard'>
                <h3>Hi {CurrentPlayer.player.name}</h3>
                <h2>Number: {CurrentPlayer.number}</h2>
                <h3>Steps: {CurrentPlayer.steps}</h3>
                {actionButtons}
                {winButtons}
                <h4>{CurrentPlayer.player.name}'s scores:{CurrentPlayer.player.results.map(result => result + ',')}</h4>
            </div>
        </>
    );
}

export default CreateGameBoard; 
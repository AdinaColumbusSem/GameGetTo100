import React from "react";

function ActionButtons(props) {
    const Actions = ['-1', '+1', '*2', "/2"]

    function onClickBtn(btn) {
        if (props.stateCurrentPlayers.active) {
            let newNumber;
            switch (btn) {
                case '-1': newNumber = props.stateCurrentPlayers.currentNumber - 1;
                    break;
                case '+1': newNumber = props.stateCurrentPlayers.currentNumber + 1;
                    break;
                case '*2': newNumber = props.stateCurrentPlayers.currentNumber * 2;
                    break;
                case '/2': newNumber = props.stateCurrentPlayers.currentNumber / 2;
                    break;
            }
            props.setStateCurrentPlayers([])
            props.stateCurrentPlayers.map(player => {
                (player.stateCurrentPlayers.name == props.currentPlayer.name && player.stateCurrentPlayers.email == props.currentPlayer.email ) ?
                    props.setStateCurrentPlayers(cur => [...cur,  { currentPlayer: props.currentPlayer, currentNumber:newNumber, steps: steps+1, active: false }]) :
                    props.setStateCurrentPlayers(cur => [...cur, player])})
            }

    }



        const actionButtons = Actions.map((btn, i) =>
            <button key={i} onClick={() => onClickBtn(btn)}>{btn}</button>);
        return (
            <>
                {actionButtons}
            </>
        );
    }

    export default ActionButtons;
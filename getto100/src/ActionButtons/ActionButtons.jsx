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
                case '/2': newNumber = Math.floor(props.stateCurrentPlayers.currentNumber / 2);
                    break;
            }
            updateActivePlayer(newNumber)
        }
    }

    function updateActivePlayer(newNumber) {
        props.stateCurrentPlayers.currentNumber = newNumber;
        props.stateCurrentPlayers.steps += 1;
        props.stateCurrentPlayers.active = false;
        props.setStateCurrentPlayers(cur => [...cur]);
    
        props.setStateActivePlayer((props.activePlayer + 1) % props.numberPlayers);
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


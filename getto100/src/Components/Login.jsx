import React from "react";
import './Game/Game.css';

function Login(props) {

    const {addNewPlayer } = props;

    function AddPlayer() {
        let playerName = prompt("Please enter your name");
        let playerEmail = prompt("Please enter your email")
        if (playerName == null || playerName == "" || playerEmail == null || playerEmail == "") 
            alert("Invalid Player")
        else {
            let currentPlayer = { name: playerName, email: playerEmail, results: [] };
            addNewPlayer(currentPlayer);
        }
    }

    return (
        <>
            <button className='openBtn' onClick={AddPlayer}>Add player</button>
        </>
    );
}


export default Login;
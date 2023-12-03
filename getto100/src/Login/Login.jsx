import React from "react";
import CreateGameBoard from "../CreateGameBoard/CreateGameBoard"
import UpdateLocalStorage from '../UpdateLocalStorage/UpdateLocalStorage'


function Login(props) {

    function AddPlayer() {
        let playerName = prompt("Please enter your name");
        let playerPassword = prompt("Please enter your password")
        if (playerName == null || playerName == "" || playerPassword == null || playerPassword == "") {
            alert("Invalid Player")
        }
        else {
            let currentPlayer = { name: playerName, password: playerPassword, results: [] };
            UpdateLocalStorage({setStateCurrentPlayers:props.setStateCurrentPlayers,currentPlayer:currentPlayer})
        }
    }

    return (
        <>
            <button onClick={AddPlayer}>Add player</button>
        </>
    );
}


export default Login;
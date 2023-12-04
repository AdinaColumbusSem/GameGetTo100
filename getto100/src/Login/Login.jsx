import React from "react";
import CreateGameBoard from "../CreateGameBoard/CreateGameBoard"
import UpdatePlayer from '../UpdatePlayer/UpdatePlayer'


function Login(props) {

    function AddPlayer() {
        if (props.gameActive) {
            alert("The Game started, can't adding players")
            return;
        }
        let playerName = prompt("Please enter your name");
        let playerEmail = prompt("Please enter your email")
        if (playerName == null || playerName == "" || playerEmail == null || playerEmail == "") {
            alert("Invalid Player")
        }
        else {
            let currentPlayer = { name: playerName, email: playerEmail, results: [] };
            UpdatePlayer({ setStateCurrentPlayers: props.setStateCurrentPlayers, currentPlayer: currentPlayer })
        }

    }

    return (
        <>
            <button onClick={AddPlayer}>Add player</button>
        </>
    );
}


export default Login;
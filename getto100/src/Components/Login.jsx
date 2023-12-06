import React from "react";

function Login(props) {

    const { gameActive , addNewPlayer } = props;

    function AddPlayer() {
        if (gameActive) {
            alert("The Game started, can't adding players")
            return;
        }
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
            <button onClick={AddPlayer}>Add player</button>
        </>
    );
}


export default Login;
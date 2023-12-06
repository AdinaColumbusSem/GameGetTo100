import React ,{useState} from 'react';
import Login from './Login'
import CreateGameBoard from './CreateGameBoard';

function Game() {
    const [currentPlayers, setCurrentPlayers] = useState([]);
    const [gameActive, setGameActive] = useState(false);
    const [activePlayerIndex, setActivePlayerIndex] = useState(0);

    function handlerNewPlayer(currentPlayer) {
        let Players = JSON.parse(localStorage.getItem('PlayersArr'));
        let findPlayer = Players ? Players.find(player => player.name == currentPlayer.name && player.email == currentPlayer.email) : undefined;
        if (findPlayer == undefined) {
            Players = Players ? Players : [];
            Players.push(currentPlayer);
            localStorage.setItem('PlayersArr', JSON.stringify(Players));
            setCurrentPlayers(cur => [...cur, { player: currentPlayer, number: Math.floor(Math.random() * (100)), steps: 0, active: false }])
        }
        else
            setCurrentPlayers(cur => [...cur, { player: findPlayer, number: Math.floor(Math.random() * (100)), steps: 0, active: false }])
    }

    function handlerActivePlayer(newNumber) {
        const newArray = [...currentPlayers];
        newArray[activePlayerIndex] = { ...newArray[activePlayerIndex], number: newNumber, steps: newArray[activePlayerIndex].steps + 1, active: false }
        const nextPlayerIndex = (activePlayerIndex + 1) % currentPlayers.length;
        if (newNumber != 100)
            newArray[nextPlayerIndex] = { ...newArray[nextPlayerIndex], active: true }
        setActivePlayerIndex(nextPlayerIndex);
        setCurrentPlayers(newArray)
    }

    function SatartGame() {
        if (!gameActive) {
            setGameActive(true);
            const newArray = [...currentPlayers];
            newArray[0] = { ...newArray[0], active: true }
            setCurrentPlayers(newArray)
        }
    }

    function handlerWinButtons(btn) {
        const curPlayerIndex = activePlayerIndex != 0 ? activePlayerIndex - 1 : currentPlayers.length - 1;
        const newArray = [...currentPlayers];
        let score = newArray[curPlayerIndex].steps;
        updateLocalStorage(score, newArray[curPlayerIndex].player);
        switch (btn) {
            case 'new Game':
                let newPlayer = newArray[curPlayerIndex].player;
                newPlayer = { name: newPlayer.name, email: newPlayer.email, results: [...newPlayer.results, score] }
                newArray[curPlayerIndex] = { player: newPlayer, number: Math.floor(Math.random() * (100)), steps: 0, active: false }
                newArray[activePlayerIndex] = { ...newArray[activePlayerIndex], active: true }
                break;
            case 'Quit':
                newArray.splice(curPlayerIndex, 1);
                if (activePlayerIndex != 0) {
                    newArray[activePlayerIndex - 1] = { ...newArray[activePlayerIndex - 1], active: true }
                    setActivePlayerIndex(activePlayerIndex - 1);
                } else
                    newArray[activePlayerIndex] = { ...newArray[activePlayerIndex], active: true }
                break;
        }
        setCurrentPlayers(newArray);
    }

    function updateLocalStorage(score, curPlayer) {
        let Players = JSON.parse(localStorage.getItem('PlayersArr'));
        Players.map(player => (player.name == curPlayer.name && player.email == curPlayer.email) ?
            player.results.push(score) : player);
        localStorage.setItem('PlayersArr', JSON.stringify(Players));
    }

    let gameBoard = currentPlayers.map((player, i) =>
        <CreateGameBoard key={i} CurrentPlayer={player} updateActivePlayer={handlerActivePlayer} updateWinner={handlerWinButtons} />)

    return (<>
        <Login gameActive={gameActive} addNewPlayer={handlerNewPlayer} />
        <button onClick={SatartGame}>Start</button>
        {gameBoard}
    </>);

}
export default Game;
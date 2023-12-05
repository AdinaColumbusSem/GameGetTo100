import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Login/Login'
import CreateGameBoard from './CreateGameBoard/CreateGameBoard'
import Game from './Game/Game'

function App() {

  const [currentPlayers, setCurrentPlayers] = useState([]);
  const [gameActive, setGameActive] = useState(false);
  const [activePlayer, setActivePlayer] = useState(0);


  function handlerNewPlayer(currentPlayer) {
    let Players = JSON.parse(localStorage.getItem('PlayersArr'));
    if (Players)
      Players.find(player => player.name == currentPlayer.name && player.email == currentPlayer.email) == undefined ?? Players.push(currentPlayer);
    else
      Players.push(currentPlayer);
    localStorage.setItem('PlayersArr', JSON.stringify(Players));
    setCurrentPlayers(cur => [...cur, { currentPlayer: currentPlayer, currentNumber: Math.floor(Math.random() * (100)), steps: 0, active: false }])
  }

  let gameBoard = currentPlayers.map((player, i) =>
    <CreateGameBoard key={i} stateCurrentPlayers={player} setStateCurrentPlayers={setCurrentPlayers}
      activePlayer={activePlayer} setStateActivePlayer={setActivePlayer} numberPlayers={currentPlayers.length} updateGamer={(hh) => {
        setStateCurrentPlayers(cur => [...cur]);

        setStateActivePlayer((props.activePlayer + 1) % props.numberPlayers);
      }}
    />)

  return (
    <>
      <Login gameActive={gameActive} addNewPlayer={handlerNewPlayer} />

      <Game stateCurrentPlayers={currentPlayers} setStateCurrentPlayers={setCurrentPlayers}
        gameActive={gameActive} setStateGameActive={setGameActive}
        activePlayer={activePlayer} />
      {gameBoard}
    </>
  );
}

export default App

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
  console.log(currentPlayers)
  console.log(activePlayer)
  let gameBoard = currentPlayers.map((player, i) =>
    <CreateGameBoard key={i} stateCurrentPlayers={player} setStateCurrentPlayers={setCurrentPlayers}
      activePlayer={activePlayer} setStateActivePlayer={setActivePlayer} numberPlayers = {currentPlayers.length}
    />)
  return (
    <>
      <Login setStateCurrentPlayers={setCurrentPlayers} gameActive={gameActive} />
      <Game stateCurrentPlayers={currentPlayers} setStateCurrentPlayers={setCurrentPlayers}
        gameActive={gameActive} setStateGameActive={setGameActive}
        activePlayer={activePlayer} />
      {gameBoard}
    </>
  );
}

export default App

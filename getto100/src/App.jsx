import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Login/Login'
import CreateGameBoard from './CreateGameBoard/CreateGameBoard'

function App() {
  const [currentPlayers, setCurrentPlayers] = useState([])
  console.log(currentPlayers)
  let gameBoard = currentPlayers.map((player, i) =>
    <CreateGameBoard key={i} stateCurrentPlayers={player} setStateCurrentPlayers={setCurrentPlayers} />)
  return (
    <>
      <Login setStateCurrentPlayers={setCurrentPlayers} />
      {gameBoard}
    </>
  );
}

export default App

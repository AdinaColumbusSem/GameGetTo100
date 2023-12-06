import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './Login/Login'
import CreateGameBoard from './CreateGameBoard/CreateGameBoard'

function App() {

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
      setCurrentPlayers(cur => [...cur, { player: currentPlayer, number: Math.floor(Math.random() * (100)), steps: 0, active: false, results: [] }])
    }
    else
      setCurrentPlayers(cur => [...cur, { player: currentPlayer, number: Math.floor(Math.random() * (100)), steps: 0, active: false, results: findPlayer.results }])
  }

  function handlerActivePlayer(newNumber) {
    const newArray = [...currentPlayers];
    newArray[activePlayerIndex] = { ...newArray[activePlayerIndex], number: newNumber, steps: newArray[activePlayerIndex].steps + 1, active: false }
    const nextPlayerIndex = (activePlayerIndex + 1) % currentPlayers.length;
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
    const newArray = [...currentPlayers];
    let score = currentPlayers[activePlayerIndex].steps + 1;
    let Players = JSON.parse(localStorage.getItem('PlayersArr'));
    Players.map(player => (player.name ==  newArray[activePlayerIndex].currentPlayer.name && player.email == newArray[activePlayerIndex].currentPlayer.email) ?
      player.results.push(score) : player);
    localStorage.setItem('PlayersArr', JSON.stringify(Players));
   
    switch (btn) {
      case 'new Game':
        newArray[activePlayerIndex] = { ...newArray[activePlayerIndex], number: Math.floor(Math.random() * (100)), steps: 0, active: false, results: newArray[activePlayerIndex].results.push(score) }
        setActivePlayerIndex((activePlayerIndex + 1) % currentPlayers.length);
        break;
      case 'Quit':
        newArray.splice(activePlayerIndex, 1);
        break;
    }
    setCurrentPlayers(newArray)
  }

  let gameBoard = currentPlayers.map((player, i) =>
    <CreateGameBoard key={i} CurrentPlayer={player} updateActivePlayer={handlerActivePlayer} updateWinner ={handlerWinButtons} />)

  return (
    <>
      <Login gameActive={gameActive} addNewPlayer={handlerNewPlayer} />
      <button onClick={SatartGame}>Start</button>
      {gameBoard}
    </>
  );
}

export default App

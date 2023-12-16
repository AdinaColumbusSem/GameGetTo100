import React, { useState,useEffect  } from 'react';
import Login from './Login'
import CreateGameBoard from './CreateGameBoard';
import './game.css';

function Game() {
    const [currentPlayers, setCurrentPlayers] = useState([]);
    const [gameActive, setGameActive] = useState(false);
    const [activePlayerIndex, setActivePlayerIndex] = useState(0);
    const [topPlayers, setTopPlayers] = useState([]);
    console.log(topPlayers);
    function settopPlayersFunc(player){
        setTopPlayers(cur=>[...cur,player]);
    }
    function topPlayersfunc() {
        let Players = JSON.parse(localStorage.getItem('PlayersArr'));
        for (let i = 0; i < 3; i++) {
            let minPlayerIndex=minAverageScores(Players);
            if( minPlayerIndex!=-1){
                settopPlayersFunc(Players[minPlayerIndex]);
                Players.splice(minPlayerIndex, 1);
            }
           
        }
    }

    function minAverageScores(arr) {
        let minPlayer={avg:Infinity,index:-1}
        for (let i = 0; i < arr.length; i++) {
            if (averageScores(arr[i].results)!=null &&averageScores(arr[i].results)<minPlayer.avg) {
                minPlayer.avg = averageScores(arr[i].results);
                minPlayer.index = i;
            }
        }
        return minPlayer.index;
    }


    function averageScores(arr) {
        let sum = 0;
        if (arr!=undefined&&arr.length) {
            arr.map(element => {
                sum += element;
            });
            return sum / arr.length;
        }
        return null;
    }


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
        newArray[activePlayerIndex] = { ...newArray[activePlayerIndex], number: newNumber, steps: newArray[activePlayerIndex].steps + 1, active: true }
        const nextPlayerIndex = (activePlayerIndex + 1) % currentPlayers.length;
        if (newNumber != 100) {
            newArray[activePlayerIndex] = { ...newArray[activePlayerIndex], active: false }
            newArray[nextPlayerIndex] = { ...newArray[nextPlayerIndex], active: true }
        }
        setActivePlayerIndex(nextPlayerIndex);
        setCurrentPlayers(newArray)
    }

    function SatartGame() {
        if (currentPlayers.length == 0) {
            alert('There are no players, to start the game please login')
            history.go(0);
        }
        else if (!gameActive) {
            setGameActive(true);
            const newArray = [...currentPlayers];
            newArray[0] = { ...newArray[0], active: true }
            topPlayersfunc();
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
                currentPlayers.length == 1 ? history.go(0) : '';
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
        <h1>get to <br />1️⃣0️⃣0️⃣</h1>
        <h1>top players: {topPlayers.map(player=>(player.name+" "))}</h1>
        <div className='openBtns'>
            <Login gameActive={gameActive} addNewPlayer={handlerNewPlayer} />
            <button className='openBtn' onClick={SatartGame}>Start</button>
        </div>
        <div className='allBoards'>
            {gameBoard}
        </div>
    </>);

}
export default Game;
import React, { useRef, useState } from 'react'
import './TicTacToe.css';

let data = ["", "", "", "", "", "", "", "", ""];

// const checkData = (data) => {
//   if (data.length === 0) {
//     for (let i = 0; i < 9; i++) {
//       data.push("");
//     }
//   } else {
//     data = [];
//     for (let i = 0; i < 9; i++) {
//       data.push("");
//     }
//   }
// }

// checkData(data);



export const TicTacToe = () => {

  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let winnerName = useRef(null);
  
  let myArr = useRef(null)
  let myArr1 = useRef(null)
  let myArr2 = useRef(null)
  let myArr3 = useRef(null) 
  let myArr4 = useRef(null)
  let myArr5 = useRef(null)
  let myArr6 = useRef(null) 
  let myArr7 = useRef(null) 
  let myArr8 = useRef(null);

  let myArray = [myArr, myArr1, myArr2, myArr3, myArr4, myArr5, myArr6, myArr7, myArr8];

  
  
  const myFunc = (elm, num) => {
    if (lock) return 0;
    if (count%2 == 0) {
      elm.target.innerHTML = `<p>X</p>`;
      data[num] = "X";
      setCount(++count);
    }
    else {
      elm.target.innerHTML = `<p>O</p>`;
      data[num] = "O";
      setCount(++count);
    }
    winner();
  }


  const winner = () => {
    if ((data[0] === data[1] && data[1] === data[2] && data[2] !== "") || 
    (data[3] === data[4] && data[4] === data[5] && data[5] !== "") ||
    (data[6] === data[7] && data[7] === data[8] && data[8] !== "") || 
    (data[0] === data[3] && data[3] === data[6] && data[6] !== "") ||
    (data[1] === data[4] && data[4] === data[7] && data[7] !== "") ||
    (data[2] === data[5] && data[5] === data[8] && data[8] !== "") ||
    (data[0] === data[4] && data[4] === data[8] && data[8] !== "") ||
    (data[2] === data[4] && data[4] === data[6] && data[6] !== "")
    ) {
      win(data)
    }  
  }

  const win = (winnerPlayer) => {
    setLock(true)
    if (winnerPlayer) {
      console.log(winnerPlayer);
      winnerName.current.innerHTML = 'YOU WON THE GAME!<br/>DO YOU WANNA PLAY THE GAME AGAIN?'
    }
  }
  const refresh = () => {
    setLock(false)
    let data = ["", "", "", "", "", "", "", "", ""];
    winnerName.current.innerHTML = ""
    myArray.map((e) => { 
       e.current.innerHTML = "";
    });
  }

  return (
    <div className='container'>
      <h1 className="name">EA ESports, It is in the GAME!</h1>
      <br />
      <h2 className='name1'>X will always start the game</h2>
      <h3 className='name3' ref={winnerName}></h3>
      <div className='gameBoard'>
        <div className='row1'>
          <div className='column' ref={myArr} onClick={(e) => {myFunc(e, 0)}}></div>
          <div className='column' ref={myArr1} onClick={(e) => {myFunc(e, 1)}}></div>
          <div className='column' ref={myArr2} onClick={(e) => {myFunc(e, 2)}}></div>
        </div>
        <div className='row2'>
          <div className='column' ref={myArr3} onClick={(e) => {myFunc(e, 3)}}></div>
          <div className='column' ref={myArr4} onClick={(e) => {myFunc(e, 4)}}></div>
          <div className='column' ref={myArr5} onClick={(e) => {myFunc(e, 5)}}></div>
        </div>
        <div className='row2'>
          <div className='column' ref={myArr6} onClick={(e) => {myFunc(e, 6)}}></div>
          <div className='column' ref={myArr7} onClick={(e) => {myFunc(e, 7)}}></div>
          <div className='column' ref={myArr8} onClick={(e) => {myFunc(e, 8)}}></div>
        </div>
      </div>
      <button className='refresh' onClick={() => {refresh()}}>
        Reset
      </button>
    </div>
  )
}

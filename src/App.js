import { Die } from "./components/Die";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  
  /*helper function*/
  
  const generateNewDie = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  const allNewDice = () => {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
        newDice.push(generateNewDie())
      }
      return newDice
  }

  const holdDice = id => {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
      {...die, isHeld: !die.isHeld} : 
      die;
    }))
  }

  const rollDice = () => {
    if(!tenzies){
      setDice(oldDice => oldDice.map(die =>{
        return die.isHeld ?
        die: generateNewDie()
    }))} else {
      setTenzies(false)
      setDice(allNewDice)
    }
  }
  
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value;
    const allSame = dice.every(die => die.value === firstValue)
    if(allHeld && allSame){
      setTenzies(true);
    }
  }, [dice])
  
  const diceElements = dice.map(die =>(
  <Die 
    key={die.id} 
    value={die.value} 
    isHeld={die.isHeld}
    holdDice={() => holdDice(die.id)}
    />
  ))

  return ( 
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button
      className="btn-roll"
      onClick={rollDice}
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;

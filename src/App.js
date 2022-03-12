import React, { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';
import Modal from './components/Modal';

import './App.css';
import { GiLockedChest, GiSandsOfTime } from 'react-icons/gi';

const items = [
  { src: 'helmet' },
  { src: 'potion' },
  { src: 'ring' },
  { src: 'scroll' },
  { src: 'shield' },
  { src: 'sword' },
];
const cards = [...items, ...items];

function App() {
  const [shuffledCards, setShuffledCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [select, setSelect] = useState(0);
  const [choiceOne, setChoiceOne] = useState({});
  const [choiceTwo, setChoiceTwo] = useState({});
  const [hit, setHit] = useState(0);
  const [countdownTimer, setCountdownTimer] = useState(6000);
  const [isStart, setIsStart] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const shuffleCards = () => {
    if (matchedCards.length > 0) {
      matchedCards.map(id => document.getElementById(id).classList.remove('flip'));
    } else if (hit > 0) {
      document.getElementById(choiceOne.id).classList.remove('flip');
    }
    setShuffledCards(cards.sort(() => 0.5 - Math.random()));
    setSelect(0);
    setChoiceOne({});
    setChoiceTwo({});
    setHit(0)
    setMatchedCards([]);
    setCountdownTimer(6000);
    setShowModal(false);
  }

  const handleClick = (card, id, idx) => {
    if (countdownTimer !== 0 && !showModal) {
      setHit(prv => prv + 1);

      if (hit === 0) { setIsStart(true) }

      if (!document.getElementById(id).classList.contains('flip') && select < 2) {
        document.getElementById(id).classList.toggle('flip');
        if (choiceOne.src === undefined) {
          setChoiceOne({ ...card, id, idx });
          setSelect(prev => prev + 1);
        } else if (choiceTwo.src === undefined) {
          setChoiceTwo({ ...card, id, idx });
          setSelect(prev => prev + 1);
        } 
      }
    }

  }

  const turnCards = () => {
    if (choiceOne.src === choiceTwo.src) {
      setMatchedCards(prev => [...prev, choiceOne.id, choiceTwo.id])
    } else {
      document.getElementById(choiceOne.id).classList.toggle('flip');
      document.getElementById(choiceTwo.id).classList.toggle('flip');
    }
    setSelect(0)
    setChoiceOne({})
    setChoiceTwo({})
  };

  const checkGame = () => {
    if (matchedCards.length === 2) {
      setIsStart(false);
      setCountdownTimer(prev=>prev)
      setShowModal(true);
    }
  }

  useEffect(() => {
    if (isStart) {      
      const timer = () => {
        setCountdownTimer((prev) => {
          if (prev > 0) {
            return prev - 100;
          } else if (prev === 0) {
            clearInterval(intervalId);
            return prev;
          }
        });
      };
      const intervalId = setInterval(timer, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }

  }, [isStart]);


  useEffect(() => {
    if (select > 1) {
      setTimeout(() => {
        turnCards();
      }, 1000);
    }
    checkGame();
  }, [select]);

  useEffect(() => {
    shuffleCards();
  }, [])

  return (
    <div className='App'>
      <header>
        <div className="info">
          <div>
            <h1>🏴‍☠️  looting the treasure chest</h1>
          </div>
          <div>
            <button
              onClick={() => shuffleCards()}
              className='btn'
            >
              New Game
            </button>
          </div>
        </div>

      </header>
      {showModal ? <Modal /> : null}
      <div className='card-column'>
        {shuffledCards.map((card, idx) =>
          <SingleCard
            key={idx}
            card={card}
            id={`${card.src}${idx}`}
            idx={idx}
            handleClick={handleClick}
          />)}
      </div>

      <div className='info'>
        <div className='cell'>
          <h3><GiLockedChest /> Hits: {hit}</h3>
        </div>
        <div className='cell'>
          <h3><GiSandsOfTime /> Timer: {countdownTimer === 0 ? 'time up!' : countdownTimer / 100}</h3>
        </div>

      </div>
    </div>
  )
};

export default App;

import './App.css';

import React, { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';
import Modal from './components/Modal';
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
  const [choiceOne, setChoiceOne] = useState({});
  const [choiceTwo, setChoiceTwo] = useState({});
  const [matchedCards, setMatchedCards] = useState([])
  const [choice, setChoice] = useState(0);
  const [hit, setHit] = useState(0);
  const [countdown, setCountdown] = useState(6000);
  const [isStart, setIsStart] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const shuffleCards = () => {
    if (matchedCards.length > 0) {
      matchedCards.map(id => document.getElementById(id).classList.remove('flip'))
    }
    setShuffledCards(cards.sort(() => 0.5 - Math.random()));
    setChoice(0);
    setChoiceOne({});
    setChoiceTwo({});
    setHit(0)
    setMatchedCards([]);
    setCountdown(6000);
    setShowModal(false);
  }

  const handleClick = (card, id, idx) => {
    if (countdown !== 0 && !showModal) {
      setHit(prv => prv + 1);

      if (hit === 0) { setIsStart(true) }

      if (!document.getElementById(id).classList.contains('flip') && choice < 2) {
        document.getElementById(id).classList.toggle('flip');
        if (choiceOne.src === undefined) {
          setChoiceOne({ ...card, id, idx });
          setChoice(prev => prev + 1);
          console.log('choice 1');
        } else if (choiceTwo.src === undefined) {
          setChoiceTwo({ ...card, id, idx });
          setChoice(prev => prev + 1);
        } 
      }
    }

  }

  const turnCards = () => {
    if (choiceOne.src === choiceTwo.src) {
      setMatchedCards(prev => [...prev, choiceOne.id, choiceTwo.id])
      setChoice(0)
      setChoiceOne({})
      setChoiceTwo({})
    } else {
      document.getElementById(choiceOne.id).classList.toggle('flip');
      document.getElementById(choiceTwo.id).classList.toggle('flip');
      setChoice(0)
      setChoiceOne({})
      setChoiceTwo({})
    }
  };


  const checkGame = () => {
    if (matchedCards.length === 2) {
      setIsStart(false);
      setCountdown(prev=>prev)
      setShowModal(true);
    }
  }

  useEffect(() => {
    if (isStart) {      
      const timer = () => {
        setCountdown((prev) => {
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
    if (choice > 1) {
      setTimeout(() => {
        turnCards();
      }, 1000);
    }
    checkGame();
  }, [choice]);

  useEffect(() => {
    shuffleCards();
  }, [])

  return (
    <div className='App'>
      <header>
        <div className="info">
          <div>
            <h1>🏴‍☠️  looting the treasure box</h1>
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
          <h3><GiSandsOfTime /> Timer: {countdown === 0 ? 'time up!' : countdown / 100}</h3>
        </div>

      </div>
    </div>
  )
};

export default App;

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

function App() {
  const [shuffledCards, setShuffledCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [select, setSelect] = useState(0);
  const [choiceOne, setChoiceOne] = useState({});
  const [choiceTwo, setChoiceTwo] = useState({});
  const [hit, setHit] = useState(20);
  const [countdownTimer, setCountdownTimer] = useState('');
  const [isStart, setIsStart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [announce, setAnnounce] = useState('')
  const [time, setTime] = useState(0);

  const shuffleCards = () => {
    if(new Date().getTime() - time > 1000) {
    if (matchedCards.length > 0) {
      matchedCards.map(id => document.getElementById(id).classList.remove('flip'));
    } else if (select === 1) {
      document.getElementById(choiceOne.id).classList.remove('flip');
    } else if (select === 2) {
      document.getElementById(choiceOne.id).classList.remove('flip');
      document.getElementById(choiceTwo.id).classList.remove('flip');
    }
    setShuffledCards([...items, ...items]
      .sort(() => 0.5 - Math.random())
      .map((card) => ({ ...card, id: Math.random() }))
    );

    setSelect(0);
    setChoiceOne({});
    setChoiceTwo({});
    setHit(20);
    setMatchedCards([]);
    setCountdownTimer(3000);
    setShowModal(false);
    setAnnounce('');
    } else {
      setAnnounce('calm down');
      setShowModal(true);
      setIsStart(false);
    }

  }

  const handleClick = (card) => {
    if (countdownTimer !== 0 && !showModal) {
      if (hit === 20) { setIsStart(true) };
      setHit(prv => prv - 1);
      if (!document.getElementById(card.id).classList.contains('flip') && select < 2) {
        document.getElementById(card.id).classList.toggle('flip');
        (choiceOne.src === undefined) ? setChoiceOne({ ...card }) : setChoiceTwo({ ...card });
        setSelect(prev => prev + 1);
      }
    }
    setTime(prev=> new Date().getTime())
  }

  const turnCards = () => {
    if (choiceOne.src === choiceTwo.src) {
      setMatchedCards(prev => [...prev, choiceOne.id, choiceTwo.id])
    } else {
      document.getElementById(choiceOne.id).classList.toggle('flip');
      document.getElementById(choiceTwo.id).classList.toggle('flip');
    }
    setSelect(0);
    setChoiceOne({});
    setChoiceTwo({});
  };

  const checkGame = () => {
    if (matchedCards.length === 12) {
      setIsStart(false);
      setAnnounce('congratulations');
      setShowModal(true);
    };

    if (countdownTimer === 0) {
      setIsStart(false);
      setAnnounce('time up');
      setShowModal(true);
    };

    if (hit <= 0) {
      setIsStart(false);
      setAnnounce('no more chance');
      setShowModal(true);
    };
  }

  //shuffle cards init
  useEffect(() => {
    shuffleCards();
  }, [])

  // watch countdown number
  useEffect(() => {
    checkGame();
  }, [countdownTimer])

  // timer set/clean
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
      return () => clearInterval(intervalId);
    }
  }, [isStart]);

  //flip back cards
  useEffect(() => {
    if (select > 1) {
      setTimeout(() => {
        turnCards();
      }, 1000);
    }
    checkGame();
  }, [select]);

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
      {showModal ? <Modal announce={announce} /> : null}
      <div className='card-column'>
        {shuffledCards.map((card, idx) =>
          <SingleCard
            key={idx}
            card={card}
            handleClick={handleClick}
          />)}
      </div>

      <div className='info'>
        <div className='cell'>
          <h3><GiLockedChest /> Chance: {Math.floor(hit / 2)}</h3>
        </div>
        <div className='cell'>
          <h3><GiSandsOfTime /> Timer: {countdownTimer / 100}</h3>
        </div>

      </div>
    </div>
  )
};

export default App;

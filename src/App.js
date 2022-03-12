import React, { useState, useEffect } from 'react';
import SingleCard from './components/SingleCard';
import Modal from './components/Modal';

import './App.css';
import { GiLockedChest, GiSandsOfTime } from 'react-icons/gi';

const items = [
  { src: 'helmet', matched: false },
  { src: 'potion', matched: false },
  { src: 'ring', matched: false },
  { src: 'scroll', matched: false },
  { src: 'shield', matched: false },
  { src: 'sword', matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState(0);
  const [select, setSelect] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [tern, setTern] = useState(20);
  const [countdownTimer, setCountdownTimer] = useState('');
  const [isStart, setIsStart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [announce, setAnnounce] = useState('')
  const [time, setTime] = useState(0);

  const shuffleCards = () => {
    const shuffledCards = [...items, ...items]
      .sort(() => 0.5 - Math.random())
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);

    setSelect(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTern(10);
    setMatchedCards(0);
    setCountdownTimer(3000);
    setShowModal(false);
    setAnnounce('');

  }

  const handleClick = (card) => {
    if (new Date().getTime() - time > 300) {
      if (countdownTimer !== 0 && !showModal) {
        
        if (tern === 10) { setIsStart(true) };
          if (select < 2) {
          choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
          setSelect(prev => prev + 1);
        }
      }
      setTime( new Date().getTime())
    }
    else {
      setAnnounce('calm down');
      setShowModal(true);
      setIsStart(false);
    }
  }

  const turnCards = () => {
    setSelect(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTern(prv => prv - 1);
  };

  //shuffle cards init
  useEffect(() => {
    shuffleCards();
  }, [])

  // check Game progress
  useEffect(() => {

    if (matchedCards === 6) {
      setIsStart(false);
      setAnnounce('congratulations');
      setShowModal(true);
    };

    if (countdownTimer === 0) {
      setIsStart(false);
      setAnnounce('time up');
      setShowModal(true);
    };

    if (tern <= 0) {
      setIsStart(false);
      setAnnounce('no more chance');
      setShowModal(true);
    };
  }, [countdownTimer, tern, matchedCards])

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
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setMatchedCards(prev => prev+1)
        setCards(prev => {
          return prev.map(card => {
          if (choiceOne.src === card.src) {
            return { ...card, matched: true}; 
          } else {
            return card;
          }
          })})
          setSelect(0);
      } else {
        setTimeout(() => {
          turnCards();
        }, 1000);
      }
    }

  }, [choiceOne, choiceTwo]);

  return (
    <div className='App'>
      <header className="info">
        <h1>🏴‍☠️  looting the treasure</h1>
        <button className='btn'
          onClick={() => shuffleCards()}
        >
          New Game
        </button>
      </header>

      {showModal ? <Modal announce={announce} /> : null}

      <div className='card-column'>
        {cards.map(card =>
          <SingleCard
            key={card.id}
            card={card}
            handleClick={handleClick}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />)}
      </div>

      <footer className='info'>
        <h3><GiLockedChest /> Chance: {tern}</h3>
        <h3><GiSandsOfTime /> Timer: {countdownTimer / 100}</h3>
      </footer>

    </div>
  )
};

export default App;

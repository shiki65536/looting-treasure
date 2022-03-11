import './SingleCard.css';
import React from 'react'

function SingleCard({ card, handleClick, id, idx }) {
    const cardHandle = () => {
        handleClick(card, id, idx)
    }

    return (
        <div
            className='single-card'
            id={id}
            onClick={cardHandle}
        >

            <div className='front'>
                <img src={`./img/${card.src}-1.png`} alt={card} />
            </div>
            <div className='back'>
                <img src='./img/cover.png' alt='cover' />
            </div>
            
        </div>
    )
}

export default SingleCard
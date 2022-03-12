import './SingleCard.css';
import React from 'react'

function SingleCard({ card, handleClick, flipped, disable }) {
    const cardHandle = () => { if(!disable){handleClick(card)} }

    return (

        <div className={flipped ? 'flip single-card' : 'single-card'}
            id={card.id}
            onClick={cardHandle}
        >
            {/* <div className={flipped ? 'flip' : ''}> */}
                <div className='front'>
                    <img src={`./img/${card.src}-1.png`} alt={card} />
                </div>

                <div className='back'>
                    <img src='./img/cover.png' alt='cover' />
                </div>
            {/* </div> */}

        </div>
    )
}

export default SingleCard
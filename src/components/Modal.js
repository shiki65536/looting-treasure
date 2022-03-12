import React from 'react';
import './Modal.css';

function Modal() {
  return (
    <div className='modal'>
      <div className='message'>congratulations!</div>
      
      <div className="animation">
        <div className='confetti-container anim-y anim-y-1'>
          <div className='confetti anim-x anim-x-1 col-1 delay'></div>
        </div>
        <div className='confetti-container anim-y anim-y-1'>
          <div className='confetti anim-x anim-x-2 col-2'></div>
        </div>
        <div className='confetti-container anim-y anim-y-1 delay'>
          <div className='confetti anim-x anim-x-3 col-3 delay'></div>
        </div>

        <div className='confetti-container anim-y anim-y-2'>
          <div className='confetti anim-x anim-x-1 col-4'></div>
        </div>
        <div className='confetti-container anim-y anim-y-2 delay'>
          <div className='confetti anim-x anim-x-2 col-5 delay'></div>
        </div>
        <div className='confetti-container anim-y anim-y-2'>
          <div className='confetti anim-x anim-x-3 col-1'></div>
        </div>


        <div className='confetti-container anim-y anim-y-3'>
          <div className='confetti anim-x anim-x-1 col-2 delay'></div>
        </div>
        <div className='confetti-container anim-y anim-y-3 delay'>
          <div className='confetti anim-x anim-x-2 col-3'></div>
        </div>
        <div className='confetti-container anim-y anim-y-3'>
          <div className='confetti anim-x anim-x-3 col-4'></div>
        </div>

        <div className='confetti-container anim-y anim-y-1'>
          <div className='confetti anim-x anim-x-4 col-5'></div>
        </div>
        <div className='confetti-container anim-y anim-y-2'>
          <div className='confetti anim-x anim-x-4 col-1 delay'></div>
        </div>
        <div className='confetti-container anim-y anim-y-3'>
          <div className='confetti anim-x anim-x-4 col-2'></div>
        </div>

        <div className='confetti-container anim-y anim-y-1  delay'>
          <div className='confetti anim-x col-3'></div>
        </div>
        <div className='confetti-container anim-y anim-y-2'>
          <div className='confetti anim-x col-4'></div>
        </div>
        <div className='confetti-container anim-y anim-y-3'>
          <div className='confetti anim-x col-5'></div>
        </div>
      </div>

    </div>
  )
}

export default Modal
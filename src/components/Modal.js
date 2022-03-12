import React from 'react';
import Fireworks from './Fireworks';

import './Modal.css';

function Modal({announce}) {
  console.log(announce);
  return (
    <div className='modal'>
      <div className='message'>{announce}!</div>
      {announce == 'time up' ? null : <Fireworks />}
    </div>
  )
}

export default Modal
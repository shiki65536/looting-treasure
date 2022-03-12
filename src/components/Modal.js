import React from 'react';
import Fireworks from './Fireworks';

import './Modal.css';

function Modal({announce}) {
  return (
    <div className='modal'>
      <div className='message'>{announce}!</div>
      {announce !== 'congratulations' ? null : <Fireworks />}
    </div>
  )
}

export default Modal
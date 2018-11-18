import React from 'react';

const HostPage = (props) => {
  return (
    <div className={`host-container`}>
      <button onClick={props.startGame}>
        START
      </button>
      <button onClick={props.resetGame}>
        RESET
      </button>
    </div>
  );
}

export default HostPage;

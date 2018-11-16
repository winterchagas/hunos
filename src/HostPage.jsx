import React from 'react';

const HostPage = (props) => {
  return (
    <div className={`host-container`}>
      <button onClick={props.startGame}>
        START
      </button>
    </div>
  );
}

export default HostPage;

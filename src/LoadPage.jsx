import React from 'react';

const LoadPage = (props) => {
  return (
    <div className={`load-container`}>
      <form onSubmit={props.submit}>
        <input type="text"/>
        <button>JOIN GAME</button>
      </form>
      <div>
        {props.error}
      </div>
    </div>
  );
}

export default LoadPage;

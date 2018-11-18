import React from 'react';
import './App.css';

let loadPage;

const LoadPage = (props) => {
  if (props.loggedIn) {
    loadPage = <h1>Waiting for other players..</h1>
  } else {
    loadPage =
      (<div className="load-form">
        <form onSubmit={props.submit}>
          <input type="text"/>
          <button>JOIN GAME</button>
        </form>
        <div>
          {props.error}
        </div>
      </div>);
  }
  return (
    <div className={`load-container`}>
      {loadPage}
    </div>
  );
};

export default LoadPage;

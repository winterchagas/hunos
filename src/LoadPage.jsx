import React from 'react';

let loadPage;

const LoadPage = (props) => {
  console.log('loadprops', props);
  if (props.loggedIn) {
    loadPage = <h1>Waiting for other players..</h1>
  } else {
    loadPage =
      (<div className={`load-container`}>
        <form onSubmit={props.submit}>
          <input type="text"/>
          <button>JOIN GAME</button>
        </form>
        <div>
          {props.error}
        </div>
      </div>);
  }
  return loadPage;
};

export default LoadPage;

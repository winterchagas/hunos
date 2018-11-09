import React from 'react';

const Bar = (props) => {
  return (
    <div className={`bar-container ${props.activeChoice && 'bar-show'}`}>
      <div>
        <span>
          {props.number.a}
        </span>
        <div style={{height: '100px'}}/>
      </div>
      <div>
        <span>
          {props.number.b}
        </span>
        <div style={{height: '150px'}}/>
      </div>
      <div>
        <span>
          {props.number.c}
        </span>
        <div style={{height: '5px'}}/>
      </div>
      <div>
        <span>
          {props.number.d}
        </span>
        <div style={{height: '50px'}}/>
      </div>
    </div>
  );
}

export default Bar;

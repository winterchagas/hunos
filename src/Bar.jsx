import React from 'react';

const Bar = (props) => {
  return (
    <div className={`bar-container ${props.activeChoice && 'bar-show'}`}>
      <div>
        <span>
          {props.number.A || 0}
        </span>
        <div style={{height: `${props.number.A * 8}px`, minHeight: '5px', maxHeight: '300px'}}/>
      </div>
      <div>
        <span>
          {props.number.B || 0}
        </span>
        <div style={{height: `${props.number.B * 8}px`, minHeight: '5px', maxHeight: '300px'}}/>
      </div>
      <div>
        <span>
          {props.number.C || 0}
        </span>
        <div style={{height: `${props.number.C * 8}px`, minHeight: '5px', maxHeight: '300px'}}/>
      </div>
      <div>
        <span>
          {props.number.D || 0}
        </span>
        <div style={{height: `${props.number.D * 8}px`, minHeight: '5px', maxHeight: '300px'}}/>
      </div>
    </div>
  );
}

export default Bar;

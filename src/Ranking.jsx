import React from 'react';
import './rankings.css';

const icons = [
  'images/Gold@1x.png',
  'images/Silver@1x.png',
  'images/Bronze@1x.png',
];

const Ranking = (props) => {
  return (
    <div className={`rankings-container`}>
      {props.rankings.map((item, index) => {
        let img, name, bar;
        if (index >= 0 && index < 3) {
          img = <img className="img" src={icons[index]} alt=""/>;
          name = <h1 className="name1">{item[0]}</h1>;
        } else {
          img = <span className="img" />;
          name = <h2 className="name1">{item[0]}</h2>;
        }
        if (item[1] < 10) {
          bar = (
            <div className="rectangle2">
              <div className="r2" style={{width: `${(item[1]/10)*100}%`}}/>
              <div className="r1" style={{width: `${(10-item[1])*10}%`}}/>
            </div>
          )
        } else {
          bar = <div className="rectangle"/>;
        }
        return (
          <div className="content1">
            {img}
            {name}
            {bar}
            <h1 className="ranking-correct-answers">
              {item[1]}
              <span className="ranking-total-questions">
                /10
              </span>
            </h1>
          </div>
        )
      })}
    </div>
  );
}

export default Ranking;

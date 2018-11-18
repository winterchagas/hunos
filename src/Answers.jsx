import React from 'react';


const Answers = (props) => {
  return (
    <div className="answer-container">
      {props.answers.map(item => {
        let rightChoiceClass;
        if (props.seeRightAnswer) {
          if (item.letter.toLowerCase() === props.rightChoice.toLowerCase()) {
            rightChoiceClass = 'right';
          } else if (
            item.letter.toLowerCase() !== props.rightChoice.toLowerCase() &&
            item.letter.toLowerCase() === props.activeChoice.toLowerCase()
          ) {
            rightChoiceClass = 'wrong';
          }
        }
        return (
          <div
            key={item.letter}
            className={`answer ${props.activeChoice && 'answer-disabled'} ${props.activeChoice && props.activeChoice !== item.letter && 'answer-opaque'}`}
            onClick={() => {
              props.pickAnswer(props.id, item.letter)
            }}>
            <span className="big-letter">
              {item.letter}
              </span>
            <span className="choice">
              {item.answer}
            </span>
            <span
              className={`right-choice ${rightChoiceClass}`}
            >
            </span>
          </div>
        )
      })}
    </div>
  );
};

export default Answers;

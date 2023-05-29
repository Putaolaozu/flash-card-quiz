import React, { useState, useRef, useEffect } from "react";

function Flashcard({ flashCard }) {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("initial");

  const frontEl = useRef();
  const backEl = useRef();

  function setMaxHeight() {
    const frontElHeight = frontEl.current.getBoundingClientRect().height;
    const backElHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontElHeight, backElHeight, 100));
  }

  useEffect(setMaxHeight, [flashCard.options, flashCard.question, flashCard.answer]);
  useEffect(() => {
    window.addEventListener("resize", setMaxHeight);
    return window.removeEventListener("resize", setMaxHeight);
  }, []);

  return (
    <div className={flip ? "card flip" : "card"} onClick={() => setFlip(!flip)} style={{ height: height }}>
      <div className="front" ref={frontEl}>
        <div className="question">{flashCard.question}</div>
        <ul className="options">
          {flashCard.options.map((option, index) => (
            <li className="option" key={index}>
              {option}
            </li>
          ))}
        </ul>
      </div>

      <div className="answer back" ref={backEl}>
        {flashCard.answer}
      </div>
    </div>
  );
}

export default Flashcard;

import React from "react";
import Flashcard from "./Flashcard";

function FlashcardList({ flashCards }) {
  return (
    <div className="card-grid">
      <h2>Flashcard Quiz</h2>
      {flashCards.map((flashcard) => {
        return <Flashcard key={flashcard.id} flashCard={flashcard} className={"flash-card"}></Flashcard>;
      })}
    </div>
  );
}

export default FlashcardList;

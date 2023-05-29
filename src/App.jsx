import { useState, useEffect } from "react";
import FlashcardList from "./FlashcardList";
import axios from "axios";
import "./app.css";
import CardForm from "./CardForm";

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);
  const [quizAmount, setQuizAmount] = useState("10");
  const [quizCategory, setQuizCategory] = useState("");

  useEffect(() => {
    axios
      .get(`https://opentdb.com/api.php?amount=${quizAmount}${quizCategory ? "&category=" + quizCategory : ""}`)
      .then((response) => {
        setFlashcards(
          response.data.results.map((questionItem, index) => {
            const question = questionItem.question;
            const options = shuffle([questionItem.correct_answer, ...questionItem.incorrect_answers]);
            const answer = questionItem.correct_answer;
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(question),
              options: options.map((option) => decodeString(option)),
              answer: decodeString(answer),
            };
          })
        );
      });
  }, [quizAmount, quizCategory]);

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  return (
    <>
      <CardForm setQuizAmount={setQuizAmount} setQuizCategory={setQuizCategory}></CardForm>
      <div className={`flash-card-list`}>
        <FlashcardList flashCards={flashcards}></FlashcardList>
      </div>
    </>
  );
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: "What is 2 + 2 ?",
    answer: "4",
    options: ["1", "2", "3", "4"],
  },
  {
    id: 2,
    question: "What is 2 + 3 ?",
    answer: "4",
    options: ["1", "2", "4", "5"],
  },
  {
    id: 3,
    question: "What is 2 + 4 ?",
    answer: "4",
    options: ["1", "2", "5", "6"],
  },
];
function shuffle(array) {
  return array.sort(() => Math.random() > 0.5);
}
export default App;

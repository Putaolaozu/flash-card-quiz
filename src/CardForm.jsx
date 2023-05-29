import { useRef, useEffect, useState } from "react";
import axios from "axios";

function CardForm({ setQuizAmount, setQuizCategory }) {
  const categoryEl = useRef();
  const amountEl = useRef();
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then(({ data }) => {
      setCategoryList(data.trivia_categories);
    });
  }, []);

  return (
    <form className="header" onSubmit={handleSubmit}>
      <label htmlFor="quizNumber">
        Number of questions
        <input type="number" id="quizNumber" min={1} step={1} defaultValue={10} ref={amountEl}></input>
      </label>
      <label htmlFor="category">
        Category of questions
        <select id="quizNumber" ref={categoryEl}>
          <option defaultChecked value="">
            All
          </option>
          {categoryList.map((item) => {
            return (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </label>
      <button type="submit">Generate</button>
    </form>
  );

  function handleSubmit(e) {
    e.preventDefault();
    console.log("clicked" + amountEl.current.value + categoryEl.current.value);
    setQuizAmount(amountEl.current.value);
    setQuizCategory(categoryEl.current.value);
  }
}

export default CardForm;

import { useEffect, useState } from 'react';
import CardsList from './components/CardsList';
import Header from './components/Header';

function App() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [childData, setChildData] = useState({
    category: 0,
    amount: 5,
  });

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://opentdb.com/api.php?amount=${childData.amount}&category=${childData.category}`
    )
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        const { results } = data;
        const questions = results.map((questionItem, idx) => {
          const { correct_answer } = questionItem;
          const { incorrect_answers } = questionItem;
          const options = [...incorrect_answers, correct_answer].map((option) =>
            decodeString(option)
          );

          return {
            id: `${idx} - ${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: decodeString(correct_answer),
            options: randomSort(options),
          };
        });
        setQuestions(questions);
      });
  }, [childData]);

  // sorting options in random older:
  function randomSort(arr) {
    let lastIdx = arr.length - 1;
    while (lastIdx > 0) {
      let randomIdx = Math.floor(Math.random() * lastIdx);
      [arr[lastIdx], arr[randomIdx]] = [arr[randomIdx], arr[lastIdx]];
      lastIdx--;
    }
    return arr;
  }

  // Decode strings (wanna to convert what is like that'&#039' to a normal string text)
  function decodeString(str) {
    // we just going to create an element, paste the text inside of it,
    // and then get the text back out of it..
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  }

  // Allow Passing data from Child component to Parent component
  function childToParent(childData) {
    return setChildData(childData);
  }

  return (
    <>
      <Header childToParent={childToParent} />
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <main className="container">
          <CardsList cardList={questions} />
        </main>
      )}
    </>
  );
}

export default App;

// const dummyData = [
//   {
//     id: 1,
//     question: 'what is 2 + 2?',
//     options: ['2', '3', '5', '4'],
//     answer: '4',
//   },
//   {
//     id: 2,
//     question: 'question_2',
//     options: ['Answer', 'Answer 1', 'Answer 2', 'Answer 3'],
//     answer: 'answer 3',
//   },
// ];

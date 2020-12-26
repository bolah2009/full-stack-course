import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Content = ({ anecdote }) => <div>{anecdote}</div>;

const Button = ({ name, handleClick }) => (
  <button onClick={() => handleClick()} type='button'>
    {name}
  </button>
);

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);

  console.log(selected);

  const generateRandomNumber = (length) => Math.floor(Math.random() * length);

  const handleClick = () => {
    const randomNumber = generateRandomNumber(anecdotes.length);
    setSelected(randomNumber);
  };

  return (
    <div>
      <h1>anecdotes</h1>
      <Content anecdote={anecdotes[selected]} />
      <Button name='next anecdotes' handleClick={handleClick} />
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>,
  document.getElementById('root')
);

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';

const Content = ({ anecdote, voteCount }) => (
  <div>
    <p>{anecdote}</p>
    <p>
      has
      {voteCount ? `${voteCount} vote(s)` : 'no vote'}
    </p>
  </div>
);

const Button = ({ name, handleClick }) => (
  <button onClick={() => handleClick()} type="button">
    {name}
  </button>
);

const MostVotes = ({ votes, anecdotes }) => {
  const maxVote = Math.max(...votes);
  const maxVoteIndex = votes.findIndex(vote => vote === maxVote);
  if (maxVote > 0) {
    return (
      <div>
        <h2>Anecdotes with most votes</h2>
        <Content anecdote={anecdotes[maxVoteIndex]} voteCount={maxVote} />
      </div>
    );
  }

  return (
    <div>
      <h2>No anecdotes with votes yet</h2>
    </div>
  );
};

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const generateRandomNumber = length => Math.floor(Math.random() * length);

  const nextAnecdotes = () => {
    const randomNumber = generateRandomNumber(anecdotes.length);
    setSelected(randomNumber);
  };

  const vote = () => {
    const votesCopy = [...votes];
    votesCopy[selected] += 1;
    setVotes([...votesCopy]);
  };

  return (
    <div>
      <h1>Anecdotes of the day</h1>
      <Content voteCount={votes[selected]} anecdote={anecdotes[selected]} />
      <div>
        <Button name="vote" handleClick={vote} />
        <Button name="next anecdotes" handleClick={nextAnecdotes} />
      </div>
      <MostVotes votes={votes} anecdotes={anecdotes} />
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
  document.getElementById('root'),
);

Content.propTypes = {
  anecdote: PropTypes.string.isRequired,
  voteCount: PropTypes.number.isRequired,
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

MostVotes.propTypes = {
  anecdotes: PropTypes.arrayOf(PropTypes.string).isRequired,
  votes: PropTypes.arrayOf(PropTypes.number).isRequired,
};

App.propTypes = {
  anecdotes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Header = ({ title }) => <h1>{title}</h1>;
const Button = ({ name, handleClick, count }) => (
  <button onClick={() => handleClick(count + 1)} type='button'>
    {name}
  </button>
);

const ButtonPanel = ({ clicks }) => {
  const renderButtons = clicks.map(({ name, count, handleClick }, index) => (
    <Button name={name} key={index} count={count} handleClick={handleClick} />
  ));

  return <div>{renderButtons}</div>;
};

const Part = ({ name, count }) => (
  <p>
    {name}: {count}
  </p>
);

const Statistics = ({ data: { good, neutral, bad } }) => {
  const all = good + neutral + bad;
  const average = all / 3;
  const positive = all ? `${(good * 100) / all}%` : "0%";

  return (
    <div>
      <Part name='good' count={good} />
      <Part name='neutral' count={neutral} />
      <Part name='bad' count={bad} />
      <Part name='all' count={all} />
      <Part name='average' count={average} />
      <Part name='positive' count={positive} />
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const clicks = [
    {
      name: 'good',
      count: good,
      handleClick: setGood,
    },
    {
      name: 'neutral',
      count: neutral,
      handleClick: setNeutral,
    },
    {
      name: 'bad',
      count: bad,
      handleClick: setBad,
    },
  ];

  const data = { good, bad, neutral };

  return (
    <div>
      <Header title='Give Feedback' />
      <ButtonPanel clicks={clicks} />
      <Statistics data={data} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

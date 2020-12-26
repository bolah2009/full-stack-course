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
  const renderButtons = clicks.map(({ name, count, handleClick, id }) => (
    <Button name={name} key={id} count={count} handleClick={handleClick} />
  ));

  return <div>{renderButtons}</div>;
};

const Statistic = ({ name, count }) => (
  <tr>
    <td>{name}</td>
    <td>{count}</td>
  </tr>
);

const Statistics = ({ data: { good, neutral, bad } }) => {
  const all = good + neutral + bad;
  const average = all / 3;
  const positive = all ? `${(good * 100) / all}%` : '0%';
  if (good || neutral || bad) {
    return (
      <table>
        <caption>Statistics</caption>
        <tbody>
        <Statistic name='good' count={good} />
        <Statistic name='neutral' count={neutral} />
        <Statistic name='bad' count={bad} />
        <Statistic name='all' count={all} />
        <Statistic name='average' count={average} />
        <Statistic name='positive' count={positive} />
        </tbody>
      </table>
    );
  }

  return <p>No feedback given</p>;
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
      id: 1
    },
    {
      name: 'neutral',
      count: neutral,
      handleClick: setNeutral,
      id: 2
    },
    {
      name: 'bad',
      count: bad,
      handleClick: setBad,
      id: 3
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

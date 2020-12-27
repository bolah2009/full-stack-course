import React, { useState } from 'react';

const Numbers = ({ persons }) => (
  <div>
    {persons.map((person) => (
      <p key={person.name}>{person.name + ' ' + person.number}</p>
    ))}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState({
    firstName: '',
    lastName: '',
    number: '',
  });
  const { firstName, lastName, number } = newName;

  const generateID = () =>
    Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 10);

  const nameAlreadyExist = (value) =>
    persons.some(({ name }) => name === value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = `${firstName} ${lastName}`;

    if (nameAlreadyExist(name)) {
      alert(`${name} is already added to phonebook`);
      return false;
    }

    const newPerson = {
      name,
      number,
      id: generateID(),
    };
    setPersons([...persons, newPerson]);
    setNewName({ firstName: '', lastName: '', number: '' });
    return true;
  };

  const handleChange = (e) => {
    setNewName({ ...newName, ...{ [`${e.target.name}`]: e.target.value } });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor='firstName'>first name:</label>
          <input
            required
            onChange={(e) => handleChange(e)}
            value={firstName}
            name='firstName'
            id='firstName'
          />
        </div>
        <div>
          <label htmlFor='lastName'>last name:</label>
          <input
            required
            onChange={(e) => handleChange(e)}
            value={lastName}
            name='lastName'
            id='lastName'
          />
        </div>
        <div>
          <label htmlFor='number'>number:</label>
          <input
            required
            onChange={(e) => handleChange(e)}
            value={number}
            name='number'
            id='number'
            type="tel"
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  );
};

export default App;

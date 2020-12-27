import React, { useState } from 'react';

const Numbers = ({ persons }) => (
  <div>
    {persons.map((person) => (
      <p key={person.name}>{person.name}</p>
    ))}
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState({ firstName: '', lastName: '' });
  const { firstName, lastName } = newName;

  const generateID = () =>
    Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 10);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = `${firstName} ${lastName}`;

    const newPersons = {
      name,
      id: generateID(),
    };
    setPersons([...persons, newPersons]);
    setNewName({ firstName: '', lastName: '' });
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
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  );
};

export default App;

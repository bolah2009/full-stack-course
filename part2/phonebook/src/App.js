import React, { useState } from 'react';

const Numbers = ({ persons }) => (
  <div>
    {persons.map((person) => (
      <p key={person.name}>{person.name + ' ' + person.number}</p>
    ))}
  </div>
);

const initialPersonsState = [
  { name: 'Arto Hellas', number: '040-123456', id: '0h8ifq6fsa' },
  { name: 'Ada Lovelace', number: '39-44-5323523', id: '0x1w9cna24' },
  { name: 'Buari Bola', number: '81-32-94888', id: '00d4mpe5zi' },
  { name: 'Dan Abramov', number: '12-43-234345', id: '04djf2luk6' },
  { name: 'Mary Poppendieck', number: '39-23-6423122', id: '0ixn23ehiu' },
];

const App = () => {
  const [persons, setPersons] = useState(initialPersonsState);
  const [filteredPersons, setfilteredPersons] = useState([...persons]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState({
    firstName: '',
    lastName: '',
    number: '',
  });
  const { firstName, lastName, number } = newName;

  const generateID = () =>
    Math.random()
      .toString(36)
      .replace(/[^a-z|\d]+/g, '')
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

  const filterPersons = (value) => {
    setfilteredPersons(
      persons.filter(({ name }) => RegExp(value, 'i').test(name))
    );
  };

  const handleFilterChange = ({ target: { value } }) => {
    const filterValue = value.replace(/[^a-z]+/gi, '');
    setFilter(filterValue);
    filterPersons(filterValue);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <label htmlFor='filter'>Filter Phonebook</label>
        <input
          type='text'
          onChange={(e) => handleFilterChange(e)}
          id='filter'
          name='filter'
          value={filter}
        />
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h2>Add a new record</h2>
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
            type='tel'
          />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={filteredPersons} />
    </div>
  );
};

export default App;

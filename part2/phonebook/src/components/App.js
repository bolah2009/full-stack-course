import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Persons from './Persons';
import Filter from './Filter';
import PersonForm from './PersonForm';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setfilteredPersons] = useState([...persons]);
  const [filter, setFilter] = useState('');
  const [newRecord, setNewRecord] = useState({
    firstName: '',
    lastName: '',
    number: '',
  });
  const { firstName, lastName, number } = newRecord;

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
    setNewRecord({ firstName: '', lastName: '', number: '' });
    return true;
  };

  const handleChange = (e) => {
    setNewRecord({ ...newRecord, ...{ [`${e.target.name}`]: e.target.value } });
  };

  const handleFilterChange = ({ target: { value } }) => {
    const filterValue = value.replace(/[^a-z| ]+/gi, '');
    setFilter(filterValue);
  };

  useEffect(() => {
    axios
      .get('http://localhost:3001/phonebook')
      .then(({ data }) => setPersons(data));
  }, []);

  useEffect(() => {
    setfilteredPersons(
      persons.filter(({ name }) => RegExp(filter, 'i').test(name))
    );
  }, [filter, persons]);

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleFilterChange={handleFilterChange} filter={filter} />
      <PersonForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        newRecord={newRecord}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;

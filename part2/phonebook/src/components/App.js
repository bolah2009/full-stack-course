import React, { useState, useEffect } from 'react';
import phonebookService from '../services/phonebook';
import Persons from './Persons';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Notification from './Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setfilteredPersons] = useState([...persons]);
  const [filter, setFilter] = useState('');
  const [newRecord, setNewRecord] = useState({
    firstName: '',
    lastName: '',
    number: '',
  });
  const [notification, setNotification] = useState({
    message: '',
    messageType: '',
  });

  const { firstName, lastName, number } = newRecord;

  const {
    getAll, create, deletePhonebook, update,
  } = phonebookService;

  const generateID = () => Math.random()
    .toString(36)
    .replace(/[^a-z|\d]+/g, '')
    .substr(0, 10);

  const nameAlreadyExist = value => persons.some(({ name }) => name === value);

  const handleSubmit = e => {
    e.preventDefault();
    const name = `${firstName} ${lastName}`;

    if (nameAlreadyExist(name)) {
      const { id, number: oldNumber } = persons.find(
        ({ name: currentName }) => name === currentName,
      );
      if (oldNumber === number) {
        alert(`${name} is already added to phonebook with the same number`);
        return false;
      }

      if (
        window.confirm(
          `${name} is already added to phonebook. Replace the old number with a new one?`,
        )
      ) {
        update(id, { name, number, id })
          .then(data => {
            setPersons([
              ...persons
                .map(person => (
                  id !== person.id ? person : { ...person, number: data.number }
                )),
            ]);
            setNewRecord({ firstName: '', lastName: '', number: '' });
            setNotification({
              message: `${name} number changed`,
              messageType: 'success',
            });
            setTimeout(() => {
              setNotification({ message: '', messageType: '' });
            }, 5000);
          })
          .catch(() => {
            setNotification({
              message: `Information of ${name} was already removed from server`,
              messageType: 'error',
            });
            setTimeout(() => {
              setNotification({ message: '', messageType: '' });
            }, 5000);
          });
      }

      return false;
    }

    const newPerson = {
      name,
      number,
      id: generateID(),
    };

    create(newPerson)
      .then(data => {
        setPersons([...persons, data]);
        setNewRecord({ firstName: '', lastName: '', number: '' });
        setNotification({ message: `Added ${name}`, messageType: 'success' });
        setTimeout(() => {
          setNotification({ message: '', messageType: '' });
        }, 5000);
      })
      .catch(() => {
        setNotification({
          message: 'An error occur while trying to add new contact, try again later',
          messageType: 'error',
        });
        setTimeout(() => {
          setNotification({ message: '', messageType: '' });
        }, 5000);
      });
    return true;
  };

  const handleChange = e => {
    setNewRecord({ ...newRecord, ...{ [`${e.target.name}`]: e.target.value } });
  };

  const handleDelete = ({ id, name }) => {
    if (window.confirm(`Delete ${name}?`)) {
      deletePhonebook(id)
        .then(() => {
          setPersons(persons.filter(({ id: currentID }) => id !== currentID));
          setNotification({
            message: `${name} deleted`,
            messageType: 'success',
          });
          setTimeout(() => {
            setNotification({ message: '', messageType: '' });
          }, 5000);
        })
        .catch(() => {
          setNotification({
            message: `Information of ${name} was already removed from server`,
            messageType: 'error',
          });
          setTimeout(() => {
            setNotification({ message: '', messageType: '' });
          }, 5000);
        });
    }
  };

  const handleFilterChange = ({ target: { value } }) => {
    const filterValue = value.replace(/[^a-z| ]+/gi, '');
    setFilter(filterValue);
  };

  useEffect(() => {
    getAll()
      .then(data => setPersons(data))
      .catch(() => {
        setNotification({
          message:
            'An error occur when trying to get all phonebook, try again later',
          messageType: 'error',
        });
        setTimeout(() => {
          setNotification({ message: '', messageType: '' });
        }, 5000);
      });
  }, [getAll]);

  useEffect(() => {
    setfilteredPersons(
      persons.filter(({ name }) => RegExp(filter, 'i').test(name)),
    );
  }, [filter, persons]);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <Filter handleFilterChange={handleFilterChange} filter={filter} />
      <PersonForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        newRecord={newRecord}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;

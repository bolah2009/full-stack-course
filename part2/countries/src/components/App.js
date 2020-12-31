import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './Countries';
import Filter from './Filter';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([...countries]);
  const [filter, setFilter] = useState('');

  const handleFilterChange = ({ target: { value } }) => {
    const filterValue = value.replace(/[^a-z| ]+/gi, '');
    setFilter(filterValue);
  };

  const showCountry = (country) => {
    setFilteredCountries([country]);
  };

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(({ data }) => {
      setCountries(data);
    });
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter(({ name }) => RegExp(filter, 'i').test(name))
    );
  }, [filter, countries]);

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter handleFilterChange={handleFilterChange} filter={filter} />
      <h2>Countries</h2>
      <Countries countries={filteredCountries} showCountry={showCountry} />
    </div>
  );
};

export default App;
